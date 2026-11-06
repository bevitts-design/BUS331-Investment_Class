(function(root){
  'use strict';
  const sectors=['Information Technology','Financials','Health Care','Consumer Discretionary','Industrials','Communication Services','Consumer Staples','Energy','Utilities','Real Estate','Materials','Cash','Other / unclassified'];
  const common=[
    ['price','Market price','currency / share','Confirm exchange, trading currency and closing/last-price date.'],
    ['pe','P/E','×','Specify trailing or forward period, adjusted/reported earnings and aggregation method for an ETF. Do not average holding P/Es.'],
    ['beta','Beta','ratio','Identify benchmark, estimation window and return frequency.'],
    ['volatility','Annualized volatility','%','State measurement window and return frequency; fund/security risk is not complete portfolio risk.'],
    ['yield','Dividend / distribution yield','%','Record the exact yield label, calculation basis and period. Yield is not total return.'],
    ['return1','Trailing 1-year total return','% cumulative','Match benchmark, currency, end date, distributions and fee treatment; ETFs must identify NAV or market-price return.'],
    ['return3','Trailing 3-year total return','% annualized','Use consistent fund/security and benchmark definitions; explain insufficient history.']
  ];
  const company=[['marketCap','Market capitalization','billions; specify currency','Verify actual size; providers use different small/mid/large thresholds.'],['eps','EPS matching valuation period','currency / share','Identify fiscal period, basic/diluted and adjusted/reported basis. Negative earnings may make P/E unusable.'],['growth','Expected EPS growth','%','Identify forecast horizon and consensus versus your own estimate.'],['pb','Price / book','×','Explain whether book value is a useful denominator for this industry.'],['quality','Industry quality measure','specify','Choose an appropriate measure, such as ROE for banks or operating margin for software.'],['strength','Financial strength and cash flow','specify','Record relevant debt, liquidity and cash-flow values with fiscal periods; interpret industry differences.']];
  const etf=[['nav','NAV','currency / share','Use the same date and currency as market price where possible; NAV is not intrinsic value.'],['aum','Assets under management','millions/billions; currency','Preserve displayed units.'],['expense','Net expense ratio','% annually','Identify net/gross basis, waivers and dates.'],['liquidity','Trading and implementation','specify','Find average volume and its period, bid/ask spread, premium/discount to NAV, and relevant access/trading constraints.'],['benchmark','Benchmark return comparison','specify','Record matched benchmark returns, periods and dates for the total-return observations. Explain tracking differences.']];
  function definitions(type){return [...common,...(type==='ETF'?etf:company)].map(([key,label,unit,hint])=>({key,label,unit,hint,numeric:!['strength','liquidity','benchmark'].includes(key)}));}
  const observation=()=>({value:'',unit:'',period:'',source:'',date:'',status:'',explanation:'',basis:''});
  function security(type){return {type,name:'',ticker:'',exchange:'',currency:'',sector:'',industry:'',objective:'',approach:'',eligibility:'',eligibilitySource:'',eligibilityDate:'',business:'',catalysts:'',risks:'',exceptions:'',source:'',date:'',notes:'',metrics:Object.fromEntries(definitions(type).map(d=>[d.key,observation()])),weights:sectors.map(()=>''),sectorSource:'',sectorDate:'',sectorBasis:'',holdings:Array.from({length:5},()=>({name:'',ticker:'',weight:'',sector:''})),holdingsSource:'',holdingsDate:'',holdingsAnalysis:''};}
  const blankCase=()=>({method:'',growth:'',endPE:'',target:'',priceChange:'',distribution:'',rationale:''});
  const blankBrief=()=>({client:'',role:'',constraints:'',comparability:'',verdict:'',weight:'',thesis:'',macro:'',evidence:'',valuation:'',alternative:'',suitability:'',downside:'',trigger:'',limitations:'',ai:'',challenge:'',includeExtended:'no'});
  function fresh(){return {version:2,type:'Company',records:{Company:[security('Company'),security('Company')],ETF:[security('ETF'),security('ETF')]},brief:blankBrief(),briefs:{Company:blankBrief(),ETF:blankBrief()},cases:{Company:[blankCase(),blankCase()],ETF:[blankCase(),blankCase()]},extended:Array.from({length:6},()=>security('Company'))};}
  const numeric=v=>typeof v!=='boolean'&&v!==null&&v!==undefined&&String(v).trim()!==''&&Number.isFinite(Number(v))?Number(v):null;
  function complete(o,numericRequired=false){return !!o && ['reported','unavailable','notMeaningful'].includes(o.status) && (o.status==='reported'?(numericRequired?numeric(o.value)!==null:String(o.value).trim()!=='')&&['unit','period','source','date'].every(k=>String(o[k]||'').trim()):['explanation','source','date'].every(k=>String(o[k]||'').trim()));}
  function validWeights(weights){return weights.length===sectors.length&&weights.every(v=>numeric(v)!==null&&+v>=0&&+v<=100)&&Math.abs(weights.reduce((a,b)=>a+ +b,0)-100)<=.1;}
  function scope(s){return s.type!=='ETF'||s.eligibility==='eligible';}
  const coreKeys=type=>type==='ETF'?['price','pe','beta','volatility','yield','return1','nav','expense']:['price','pe','eps','growth','marketCap','beta','volatility','yield'];
  function effective(s,k){const d=definitions(s.type).find(d=>d.key===k),o=s.metrics[k];return {...o,status:o.basis==='notMeaningful'?'notMeaningful':o.basis==='unavailable'?'unavailable':o.status||((numeric(o.value)!==null||String(o.value).trim())?'reported':''),unit:o.unit||d.unit,period:k==='pe'?(o.basis==='forward'?'Forward':o.basis==='trailing'?'Trailing':o.basis==='other'?(o.period||'Other'):o.period):o.period,source:o.source||s.source,date:o.date||s.date};}
  function outcome(type,s,c){
    const p=effective(s,'price');
    if(p.status!=='reported'||!(numeric(p.value)>0)||numeric(c.distribution)===null||+c.distribution<0)return null;
    let end;
    if(type==='ETF') {if(numeric(c.priceChange)===null||+c.priceChange < -100)return null;end=+p.value*(1+ +c.priceChange/100);}
    else if(c.method==='PE') {const eps=effective(s,'eps');if(eps.status!=='reported'||!(numeric(eps.value)>0)||numeric(c.growth)===null||+c.growth < -100||!(numeric(c.endPE)>0))return null;end=+eps.value*(1+ +c.growth/100)* +c.endPE;}
    else if(c.method==='Other'){if(numeric(c.target)===null||+c.target<0)return null;end=+c.target;}else return null;
    const priceReturn=(end/ +p.value-1)*100,totalReturn=((end+ +c.distribution)/ +p.value-1)*100;
    return {start:+p.value,end,priceReturn,totalReturn};
  }
  // Merge only known keys with strict scalar types; preserve unrecognized legacy material separately.
  function merge(template,input){if(typeof template==='number')return template;if(typeof template==='string'){if(input===undefined)return template;if(!['string','number'].includes(typeof input)||String(input).length>30000)throw Error('Invalid research field.');return String(input);}if(Array.isArray(template)){if(input!==undefined&&(!Array.isArray(input)||input.length!==template.length))throw Error('Invalid research array.');return template.map((v,i)=>merge(v,input?.[i]));}const out={};for(const k of Object.keys(template))out[k]=merge(template[k],input?.[k]);return out;}
  function simplifyDefaults(s){
    const pe=s.metrics.pe;
    if(!pe.basis)pe.basis=pe.status==='notMeaningful'?'notMeaningful':pe.status==='unavailable'?'unavailable':/forward/i.test(pe.period)?'forward':/trailing|ttm/i.test(pe.period)?'trailing':pe.period?'other':'';
    const sources=[...new Set(Object.values(s.metrics).map(o=>o.source).filter(Boolean))],dates=[...new Set(Object.values(s.metrics).map(o=>o.date).filter(Boolean))];
    if(!s.source&&sources.length)s.source=sources.join('; ');
    if(!s.date&&dates.length===1)s.date=dates[0];
    return s;
  }
  function importRecord(data){
    if(!data||typeof data!=='object')throw Error('Invalid research file.');
    if(data.version===2){if(!['Company','ETF'].includes(data.type))throw Error('Invalid asset type.');const out=merge(fresh(),data);out.version=2;out.type=data.type;out.briefs[out.type]=JSON.parse(JSON.stringify(out.brief));for(const t of ['Company','ETF'])out.records[t].forEach(s=>{s.type=t;simplifyDefaults(s);});out.extended.forEach(s=>{s.type='Company';simplifyDefaults(s);});if(data.legacy)out.legacy=data.legacy;return out;}
    if(data.version!==1||!Array.isArray(data.companies)||data.companies.length!==6||!Array.isArray(data.funds)||data.funds.length!==3)throw Error('Unsupported research file.');
    const out=fresh();out.legacy=data;out.type=data.notes?.path==='Stock'?'Company':'ETF';
    const map=(old,s,isETF)=>{if(!old||typeof old!=='object')throw Error('Invalid legacy security.');s.name=String(old.name||'');s.currency=String(old.currency||'');s.sector=String(old.sector||'');s.industry=String(old.industry||'');for(const [k,oldKey]of Object.entries(isETF?{pe:'pe',expense:'fee'}:{price:'price',pe:'pe',eps:'eps',marketCap:'cap',growth:'growth',pb:'pb',quality:'quality'})){s.metrics[k]={...observation(),value:String(old[oldKey]??''),source:String(old.source||''),date:String(old.date||''),period:String(old.definition||'')};}s.business=String(old.business||old.objective||'');s.catalysts=String(old.outlook||'');s.risks=String(old.riskEvidence||'');s.exceptions='Imported version-1 evidence: review definitions, sources, dates and eligibility before using this report.';if(isETF){s.objective=String(old.objective||old.benchmark||'');s.approach=String(old.kind||'');s.weights=[...(old.weights||Array(11).fill('')).map(String),'',''];}return s;};
    out.extended=data.companies.map((c)=>map(c,security('Company'),false));
    const pick=(n,max,fallback)=>Number.isInteger(+n)&&+n>=0&&+n<max?+n:fallback;
    out.records.Company=[out.extended[pick(data.notes?.companyChoice,6,0)],out.extended[pick(data.notes?.companyAlternative,6,1)]].map(s=>JSON.parse(JSON.stringify(s)));
    out.records.ETF=[map(data.funds[pick(data.recommend,3,0)],security('ETF'),true),map(data.funds[pick(data.reject,3,1)],security('ETF'),true)];
    const n=data.notes||{};for(const[k,v]of Object.entries({client:n.client,role:n.mandate,comparability:n.sameRole,verdict:n.verdict,weight:out.type==='Company'?n.stockWeight:data.funds[pick(data.recommend,3,0)]?.allocation,thesis:n.thesis,macro:n.macro,evidence:n.case,valuation:n.valuation,alternative:n.alternative,suitability:n.suitability,trigger:n.risk,limitations:n.scenario,ai:n.ai,challenge:n.challenge}))out.brief[k]=String(v??'');return out;
  }
  root.EquityLab={sectors,definitions,coreKeys,effective,security,fresh,numeric,complete,validWeights,scope,outcome,importRecord};
})(typeof window==='undefined'?globalThis:window);
