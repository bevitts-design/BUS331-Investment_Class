(function(root){
  'use strict';
  const M=root.EquityLab,types=['Company','Fund','ETF'],statuses=['Researching','Reviewed','Shortlisted','Rejected'];
  const clone=v=>JSON.parse(JSON.stringify(v));let seq=0;
  const uid=()=>`r-${Date.now().toString(36)}-${(++seq).toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  const blankCase=()=>({method:'',growth:'',endPE:'',target:'',priceChange:'',distribution:'',rationale:''});
  function fresh(){return {version:3,project:{client:'',question:'',role:'',sector:'',geography:'',size:'',valuation:'',risk:'',cost:'',notes:''},records:[],drafts:{},selected:[],reportKind:'comparison'};}
  function record(type,at=new Date().toISOString()){
    if(!types.includes(type))throw Error('Unsupported security type.');
    const security=M.security(type);security.shareClass='';
    return {id:uid(),security,tracker:{status:'Researching',role:'',valuation:'',risk:'',question:''},collectedAt:at,updatedAt:at,lastReviewed:'',reviewFingerprint:'',analysis:{decision:'',weight:'',valuation:'',reward:'',fit:'',trigger:''},cases:[blankCase(),blankCase()],history:[]};
  }
  function fingerprint(r){return JSON.stringify({security:r.security,role:r.tracker.role,valuation:r.tracker.valuation,risk:r.tracker.risk,question:r.tracker.question});}
  function changedSinceReview(r){return !!r.lastReviewed&&r.reviewFingerprint!==fingerprint(r);}
  function content(r){const {history,updatedAt,...rest}=r;return JSON.stringify(rest);}
  function commit(book,draft,review=false,at=new Date().toISOString()){
    const i=book.records.findIndex(r=>r.id===draft.id);if(i<0)throw Error('Record not found.');
    const prior=book.records[i],next=clone(draft);next.collectedAt=prior.collectedAt;next.history=clone(prior.history);
    if(review||(next.tracker.status==='Reviewed'&&prior.tracker.status!=='Reviewed')){next.lastReviewed=at;next.reviewFingerprint=fingerprint(next);if(review&&next.tracker.status==='Researching')next.tracker.status='Reviewed';}
    if(content(next)!==content(prior)){
      const {history,...snapshot}=clone(prior);next.history.push({savedAt:at,record:snapshot});next.updatedAt=at;
    }else next.updatedAt=prior.updatedAt;
    book.records[i]=next;delete book.drafts[next.id];return next;
  }
  function hasContent(s){return !!(s.name||s.ticker||s.notes||s.business||Object.values(s.metrics).some(o=>String(o.value).trim()));}
  function scalar(v,def=''){if(v===undefined)return def;if(!['string','number'].includes(typeof v)||String(v).length>40000)throw Error('Invalid research field.');return String(v);}
  function merge(template,data){if(typeof template==='string')return scalar(data,template);if(Array.isArray(template)){if(data!==undefined&&(!Array.isArray(data)||data.length!==template.length))throw Error('Invalid research array.');return template.map((v,i)=>merge(v,data?.[i]));}const o={};for(const k of Object.keys(template))o[k]=merge(template[k],data?.[k]);return o;}
  function cleanRecord(data,withHistory=true){
    if(!data||!types.includes(data.security?.type)||typeof data.id!=='string'||!/^r-[a-zA-Z0-9_-]+$/.test(data.id))throw Error('Invalid security record.');
    const template=record(data.security.type);template.collectedAt='';template.updatedAt='';const out=merge({...template,history:[]},{...data,history:[]});out.id=data.id;
    if(!statuses.includes(out.tracker.status))throw Error('Invalid research status.');
    if(withHistory){if(data.history!==undefined&&(!Array.isArray(data.history)||data.history.length>2000))throw Error('Invalid history.');out.history=(data.history||[]).map(h=>({savedAt:scalar(h.savedAt),record:(()=>{const r=cleanRecord({...h.record,history:[]},false);delete r.history;return r;})()}));}
    return out;
  }
  function imported(data){
    if(data?.version===3){
      if(!Array.isArray(data.records)||data.records.length>2000)throw Error('Invalid notebook records.');const out=fresh();out.project=merge(out.project,data.project);out.records=data.records.map(r=>cleanRecord(r));
      const ids=new Set(out.records.map(r=>r.id));if(ids.size!==out.records.length)throw Error('Duplicate record identifiers.');
      if(data.selected!==undefined&&!Array.isArray(data.selected))throw Error('Invalid comparison selection.');out.selected=[...new Set(data.selected||[])].filter(id=>ids.has(id));
      out.reportKind=['profile','comparison','shortlist'].includes(data.reportKind)?data.reportKind:'comparison';
      if(data.drafts!==undefined&&(!data.drafts||typeof data.drafts!=='object'||Array.isArray(data.drafts)))throw Error('Invalid drafts.');
      for(const[id,d]of Object.entries(data.drafts||{})){if(!ids.has(id))continue;const r=cleanRecord(d);if(r.id!==id)throw Error('Invalid draft identifier.');out.drafts[id]=r;}
      if(data.legacyData)out.legacyData=data.legacyData;return out;
    }
    const prior=M.importRecord(data),out=fresh();out.legacyData=clone(data);out.project.client=prior.brief.client;out.project.role=prior.brief.role;out.project.notes=prior.brief.constraints;
    const added=[];
    for(const type of ['Company','ETF'])for(let i=0;i<prior.records[type].length;i++){
      const s=prior.records[type][i];if(!hasContent(s))continue;const r=record(type);r.security={...clone(s),shareClass:''};r.tracker.role=prior.briefs[type]?.role||out.project.role;
      if(i===0){const b=type===prior.type?prior.brief:prior.briefs[type];if(b){r.analysis={decision:b.verdict||'',weight:b.weight||'',valuation:b.valuation||'',reward:b.evidence||'',fit:b.suitability||'',trigger:b.trigger||''};r.tracker.valuation=b.valuation||'';r.tracker.risk=b.trigger||'';}r.cases=clone(prior.cases[type]);}
      out.records.push(r);added.push(JSON.stringify(s));
    }
    for(const s of prior.extended)if(hasContent(s)&&!added.includes(JSON.stringify(s))){const r=record('Company');r.security={...clone(s),shareClass:''};r.tracker.role='Imported company extension';out.records.push(r);}
    out.selected=out.records.slice(0,2).map(r=>r.id);return out;
  }
  const typeLabel=t=>({Company:'Stock',Fund:'Equity mutual fund',ETF:'Equity ETF'}[t]||t);
  function filter(records,{query='',type='',status='',role=''}={}){query=query.toLowerCase();role=role.toLowerCase();return records.filter(r=>(!type||r.security.type===type)&&(!status||r.tracker.status===status)&&(!role||r.tracker.role.toLowerCase().includes(role))&&(!query||[r.security.name,r.security.ticker,r.security.shareClass,r.security.sector,r.security.objective,r.tracker.valuation,r.tracker.risk].join(' ').toLowerCase().includes(query)));}
  root.EquityNotebook={fresh,record,commit,imported,filter,changedSinceReview,fingerprint,clone,typeLabel,types,statuses};
})(typeof window==='undefined'?globalThis:window);
