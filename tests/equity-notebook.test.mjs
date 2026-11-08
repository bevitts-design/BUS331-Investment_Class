import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';import {readFile} from 'node:fs/promises';
const ctx=vm.createContext({});for(const name of ['model.js','notebook-model.js'])vm.runInContext(await readFile(new URL('../Equity/sector-cap-lab/'+name,import.meta.url),'utf8'),ctx);
const M=ctx.EquityLab,N=ctx.EquityNotebook,clone=x=>JSON.parse(JSON.stringify(x));
test('notebook accepts growing mixed record lists and filters without losing records',()=>{
 const b=N.fresh();for(const t of ['Company','ETF','Fund','Company','Fund']){const r=N.record(t);r.security.name='Example '+b.records.length;r.tracker.role=t==='Company'?'Growth':'Core equity';b.records.push(r);}
 b.records[2].tracker.status='Shortlisted';b.records[2].security.shareClass='Admiral';
 assert.equal(N.filter(b.records,{type:'Fund'}).length,2);assert.equal(N.filter(b.records,{status:'Shortlisted'}).length,1);assert.equal(N.filter(b.records,{role:'growth'}).length,2);assert.equal(N.filter(b.records,{query:'admiral'}).length,1);assert.equal(b.records.length,5);
});
test('save retains prior observations and reasoning, while review date stays distinct',()=>{
 const b=N.fresh(),r=N.record('Company','2026-11-01T10:00:00Z');b.records.push(r);
 let d=clone(r);d.security.name='Example';d.security.metrics.pe.value='20';d.security.metrics.pe.basis='forward';d.tracker.valuation='Initial interpretation';
 N.commit(b,d,true,'2026-11-02T10:00:00Z');assert.equal(b.records[0].lastReviewed,'2026-11-02T10:00:00Z');assert.equal(N.changedSinceReview(b.records[0]),false);
 d=clone(b.records[0]);d.security.metrics.pe.value='25';d.tracker.valuation='Revised interpretation';b.drafts[d.id]=d;
 N.commit(b,d,false,'2026-11-03T10:00:00Z');const out=b.records[0];assert.equal(out.collectedAt,'2026-11-01T10:00:00Z');assert.equal(out.lastReviewed,'2026-11-02T10:00:00Z');assert.equal(N.changedSinceReview(out),true);
 assert.equal(out.history.at(-1).record.security.metrics.pe.value,'20');assert.equal(out.history.at(-1).record.tracker.valuation,'Initial interpretation');assert.equal(out.history.at(-1).record.lastReviewed,'2026-11-02T10:00:00Z');assert.equal(b.drafts[out.id],undefined);
 const n=out.history.length;N.commit(b,clone(out),false,'2026-11-04T10:00:00Z');assert.equal(b.records[0].history.length,n);
 N.commit(b,clone(out),true,'2026-11-04T11:00:00Z');assert.equal(N.changedSinceReview(b.records[0]),false);
});
test('drafts, selection, histories and fund share class survive version-3 roundtrip',()=>{
 const b=N.fresh(),r=N.record('Fund');b.records.push(r);r.security.shareClass='Class I';b.selected=[r.id];b.drafts[r.id]=clone(r);b.drafts[r.id].security.name='Uncommitted name';
 const out=N.imported(clone(b));assert.equal(out.records[0].security.shareClass,'Class I');assert.equal(out.records[0].security.name,'');assert.equal(out.drafts[r.id].security.name,'Uncommitted name');assert.equal(out.selected[0],r.id);
 N.commit(out,out.drafts[r.id]);const again=N.imported(clone(out));assert.equal(again.records[0].history.length,1);assert.equal(again.records[0].history[0].record.security.name,'');
 assert.throws(()=>N.imported({...clone(b),records:[clone(r),clone(r)]}));assert.throws(()=>N.imported({...clone(b),records:[{...clone(r),id:'bad.id'}]}));
});
test('earlier lab migration preserves all populated securities and the full original',()=>{
 const old=M.fresh();old.type='Company';old.records.Company[0].name='Stock A';old.records.Company[1].name='Stock B';old.records.ETF[0].name='ETF A';old.extended[2].name='Extension C';old.brief.valuation='Original rationale';old.cases.Company[0].rationale='Original scenario';
 const out=N.imported(clone(old));assert.equal(out.records.length,4);assert.equal(out.records.find(r=>r.security.name==='Stock A').analysis.valuation,'Original rationale');assert.equal(out.records.find(r=>r.security.name==='Stock A').cases[0].rationale,'Original scenario');assert.equal(out.records.find(r=>r.security.name==='Extension C').tracker.role,'Imported company extension');assert.equal(out.legacyData.extended.length,6);assert.equal(out.records.every(r=>!r.lastReviewed),true);
 assert.equal(N.imported(clone(out)).legacyData.brief.valuation,'Original rationale');
});
test('mutual fund inputs use NAV and preserve scope restrictions',()=>{
 const f=M.security('Fund');f.metrics.nav.value='50';f.metrics.nav.status='reported';f.metrics.expense.value='0.35';
 assert.equal(M.coreKeys('Fund').includes('minimum'),true);assert.equal(M.coreKeys('Fund').includes('load'),true);assert.equal(M.definitions('Fund').some(d=>d.key==='price'),false);
 assert.ok(Math.abs(M.outcome('Fund',f,{priceChange:10,distribution:1}).totalReturn-12)<1e-10);
 for(const status of ['','bond','leveraged','inverse','other','unknown']){f.eligibility=status;assert.equal(M.scope(f),false);}f.eligibility='eligible';assert.equal(M.scope(f),true);
});
