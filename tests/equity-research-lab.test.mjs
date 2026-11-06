import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const context=vm.createContext({});
vm.runInContext(await readFile(new URL('../Equity/sector-cap-lab/model.js',import.meta.url),'utf8'),context);
const M=context.EquityLab;
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
const observed=value=>({value:String(value),status:'reported',unit:'USD',period:'one-year basis',source:'Test source',date:'2026-11-05',explanation:''});
test('stock returns use observed market price and include cash dividends',()=>{
 const s=M.security('Company');s.metrics.price=observed(100);s.metrics.eps=observed(5);
 const base=M.outcome('Company',s,{method:'PE',growth:10,endPE:20,distribution:2});
 near(base.end,110);near(base.priceReturn,10);near(base.totalReturn,12);
 const down=M.outcome('Company',s,{method:'PE',growth:-20,endPE:15,distribution:1});
 near(down.end,60);near(down.totalReturn,-39);near(down.totalReturn*10/100,-3.9);
});
test('unusable earnings require alternative valuation; missing values do not become zero',()=>{
 const s=M.security('Company');s.metrics.price=observed(100);s.metrics.eps=observed(-2);
 assert.equal(M.outcome('Company',s,{method:'PE',growth:10,endPE:20,distribution:0}),null);
 near(M.outcome('Company',s,{method:'Other',target:80,distribution:0}).totalReturn,-20);
 assert.equal(M.outcome('Company',s,{method:'Other',target:80,distribution:''}),null);
 assert.equal(M.numeric('   '),null);assert.equal(M.numeric(false),null);
});
test('ETF scenario is fund-wide price change plus cash distributions',()=>{
 const s=M.security('ETF');s.metrics.price=observed(100);
 near(M.outcome('ETF',s,{priceChange:-20,distribution:2}).totalReturn,-18);
 near(M.outcome('ETF',s,{priceChange:-100,distribution:0}).totalReturn,-100);
 assert.equal(M.outcome('ETF',s,{priceChange:-101,distribution:0}),null);
 assert.equal(M.outcome('ETF',s,{priceChange:5,distribution:-1}),null);
});
test('sector reconciliation preserves cash and unclassified residuals',()=>{
 const w=Array(13).fill(0);w[0]=90;w[11]=5;w[12]=5;
 assert.equal(M.validWeights(w),true);assert.equal(M.validWeights(w.slice(0,11)),false);
 w[12]=4;assert.equal(M.validWeights(w),false);
 w[12]=-5;assert.equal(M.validWeights(w),false);
});
test('ETF eligibility is explicit and unavailable metrics need documented exceptions',()=>{
 const s=M.security('ETF');for(const status of ['','bond','leveraged','inverse','other','unknown']){s.eligibility=status;assert.equal(M.scope(s),false);}
 s.eligibility='eligible';assert.equal(M.scope(s),true);
 assert.equal(M.complete({...observed(0),status:'unavailable'},true),false);
 assert.equal(M.complete({...observed(''),status:'notMeaningful',explanation:'Negative earnings; used a documented cash-flow measure.'},true),true);
 assert.equal(M.complete(observed(''),true),false);assert.equal(M.complete(observed(0),true),true);
});
test('version-2 round trip retains both paths and extension; invalid shape rejected',()=>{
 const s=M.fresh();s.records.Company[0].name='Company A';s.records.ETF[0].name='ETF A';s.extended[5].name='Extended company';s.brief.includeExtended='yes';
 s.brief.role='Company purpose';s.briefs.ETF.role='ETF purpose';
 const out=M.importRecord(JSON.parse(JSON.stringify(s)));
 assert.equal(out.records.Company[0].name,'Company A');assert.equal(out.records.ETF[0].name,'ETF A');assert.equal(out.extended[5].name,'Extended company');assert.equal(out.brief.includeExtended,'yes');
 assert.equal(out.briefs.Company.role,'Company purpose');assert.equal(out.briefs.ETF.role,'ETF purpose');
 assert.throws(()=>M.importRecord({...s,type:'Bond'}));
 assert.throws(()=>M.importRecord({...s,extended:[]}));
});
test('legacy work remains intact and migrated observations require review',()=>{
 const old={version:1,notes:{path:'Stock',companyChoice:'2',companyAlternative:'4',macro:'Preserve thesis'},companies:Array.from({length:6},(_,i)=>({name:'Company '+i,pe:20,pb:2})),funds:Array.from({length:3},(_,i)=>({name:'Fund '+i,weights:Array(11).fill('')})),recommend:0,reject:1};
 const out=M.importRecord(old);assert.equal(out.type,'Company');assert.equal(out.records.Company[0].name,'Company 2');assert.equal(out.extended[4].name,'Company 4');assert.equal(out.records.Company[0].metrics.pe.status,'');assert.equal(out.brief.macro,'Preserve thesis');assert.equal(out.legacy,old);
 const again=M.importRecord(JSON.parse(JSON.stringify(out)));assert.equal(again.legacy.companies.length,6);
 assert.equal(again.records.ETF[0].eligibility,'');
});
test('compact observations inherit shared provenance and preserve P/E types and overrides',()=>{
 const s=M.security('Company');s.source='FactSet overview';s.date='2026-11-05';s.metrics.pe.value='22';s.metrics.pe.basis='forward';
 let o=M.effective(s,'pe');assert.equal(o.status,'reported');assert.equal(o.period,'Forward');assert.equal(o.source,'FactSet overview');assert.equal(o.date,'2026-11-05');assert.equal(o.unit,'×');
 s.metrics.pe.source='Specific valuation report';assert.equal(M.effective(s,'pe').source,'Specific valuation report');
 s.metrics.pe.basis='other';s.metrics.pe.period='Adjusted next fiscal year';assert.equal(M.effective(s,'pe').period,'Adjusted next fiscal year');
 s.metrics.pe.basis='notMeaningful';assert.equal(M.effective(s,'pe').status,'notMeaningful');assert.equal(s.metrics.pe.value,'22');
 const round=M.fresh();round.records.Company[0]=s;const out=M.importRecord(JSON.parse(JSON.stringify(round)));assert.equal(out.records.Company[0].metrics.pe.basis,'notMeaningful');assert.equal(out.records.Company[0].metrics.pe.source,'Specific valuation report');
});
test('earlier detailed observations recover their P/E type without losing their evidence',()=>{
 const s=M.fresh();s.records.Company[0].metrics.pe={...observed(18),period:'Trailing 12 months',explanation:'Preserve original note'};
 const out=M.importRecord(JSON.parse(JSON.stringify(s))),r=out.records.Company[0];assert.equal(r.metrics.pe.basis,'trailing');assert.equal(r.metrics.pe.period,'Trailing 12 months');assert.equal(r.metrics.pe.explanation,'Preserve original note');assert.equal(r.source,'Test source');assert.equal(r.date,'2026-11-05');
});
