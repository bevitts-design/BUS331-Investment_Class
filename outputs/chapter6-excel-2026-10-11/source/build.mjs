import fs from 'node:fs/promises';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const out=new URL('../',import.meta.url).pathname;
const navy='#0A2540',teal='#1B6F73',gold='#FFF2CC';
const blank=['C15:H19','C23:C29','C33:C38','C41','C43','C45'];
function makeSheet(wb,name,inputs,solved){
 const s=wb.worksheets.add(name);s.showGridLines=false;
 s.getRange('A1:J46').format.font={name:'Arial',size:11,color:navy};
 s.getRange('A1:A46').format.columnWidth=3;
 s.getRange('B1:B46').format.columnWidth=29;
 s.getRange('C1:H46').format.columnWidth=18;
 s.getRange('I1:I46').format.columnWidth=3;
 s.getRange('J1:J46').format.columnWidth=65;
 s.getRange('B2').values=[['Chapter 6: '+name]];s.getRange('B2').format.font={size:17,bold:true,color:navy};
 s.getRange('B4').values=[['Hypothetical annual inputs']];
 s.getRange('B5:C8').values=[['Risky expected return',inputs[0]],['Risky standard deviation',inputs[1]],['T-bill return',inputs[2]],['Risk aversion A',inputs[3]]];
 s.getRange('C5:C7').setNumberFormat('0.00%');s.getRange('C8').setNumberFormat('0.0');
 s.getRange('C5:C8').format.fill=gold;s.getRange('C5:C8').format.font.color='#0000FF';
 s.getRange('J5:J8').values=[['Change yellow inputs to test an assumption.'],['T-bills have zero risk over this holding period.'],['No borrowing or shorting: risky weight is between 0% and 100%.'],['Utility is a preference score, not a promised return.']];
 s.getRange('B11').values=[['Compare allocation choices']];
 s.getRange('B12').values=[['Calculate each row, identify the highest utility, and explain the tradeoff.']];
 s.getRange('B14:H14').values=[['Risky weight y','T-bill weight','Expected return','Standard deviation','Variance','Risk penalty','Utility score']];
 s.getRange('B14:H14').format={fill:navy,font:{color:'#FFFFFF',bold:true,size:11},wrapText:true,rowHeight:36};
 s.getRange('B15:B19').values=[[0],[.25],[.5],[.75],[1]];
 s.getRange('B15:E19').setNumberFormat('0.00%');s.getRange('F15:H19').setNumberFormat('0.000000');
 s.getRange('B15:B19').format.font.color='#0000FF';
 s.getRange('B22:C22').values=[['Find the optimal allocation','Result']];
 s.getRange('B23:B29').values=[['Risk premium'],['Risky variance'],['A × risky variance'],['Unconstrained risky weight'],['Feasible risky weight'],['T-bill weight'],['Sharpe ratio']];
 s.getRange('B32:C32').values=[['Evaluate the optimum','Result']];
 s.getRange('B33:B38').values=[['Expected return'],['Standard deviation'],['Variance'],['Risk penalty'],['Utility score'],['Best listed risky weight']];
 s.getRange('B41').values=[['Explain your choice']];
 s.getRange('J41').values=[['Why can an allocation with a lower return have higher utility?']];
 s.getRange('B43').values=[['Sensitivity: A doubles']];
 s.getRange('J43').values=[['Predict the direction, then calculate the new optimal risky weight.']];
 s.getRange('B45').values=[['Explain the sensitivity']];
 s.getRange('J45').values=[['Keep return, risk, and T-bill inputs unchanged.']];
 for(const r of [22,32])s.getRange(`B${r}:C${r}`).format={fill:teal,font:{color:'#FFFFFF',bold:true}};
 for(const area of blank)s.getRange(area).format.fill=solved?'#F1F5F6':gold;
 s.getRange('C23').setNumberFormat('0.00%');s.getRange('C24:C25').setNumberFormat('0.000000');s.getRange('C26:C28').setNumberFormat('0.00%');s.getRange('C29').setNumberFormat('0.0000');
 s.getRange('C33:C34').setNumberFormat('0.00%');s.getRange('C35:C37').setNumberFormat('0.000000');s.getRange('C38').setNumberFormat('0.00%');s.getRange('C43').setNumberFormat('0.00%');
 if(solved){
  s.getRange('C15:H15').formulas=[['=1-B15','=B15*$C$5+C15*$C$7','=B15*$C$6','=E15^2','=0.5*$C$8*F15','=D15-G15']];
  s.getRange('C15:H19').fillDown();
  s.getRange('C23:C29').formulas=[['=C5-C7'],['=C6^2'],['=C8*C24'],['=C23/C25'],['=MAX(0,MIN(1,C26))'],['=1-C27'],['=C23/C6']];
  s.getRange('C33:C38').formulas=[['=C27*C5+C28*C7'],['=C27*C6'],['=C34^2'],['=0.5*C8*C35'],['=C33-C36'],['=INDEX(B15:B19,MATCH(MAX(H15:H19),H15:H19,0))']];
  s.getRange('C43').formulas=[['=MAX(0,MIN(1,C23/((2*C8)*C24)))']];
  s.getRange('C41').values=[['Risk reduces utility through the penalty; the highest return need not maximize utility.']];
  s.getRange('C45').values=[['Higher A increases the penalty for risk, reducing the optimal risky allocation.']];
  s.getRange('C41:H41').merge();s.getRange('C45:H45').merge();
  s.getRange('C41:H41').format.wrapText=true;s.getRange('C45:H45').format.wrapText=true;
 }else{s.getRange('C41:H41').merge();s.getRange('C45:H45').merge();}
 for(const r of [41,45])s.getRange(`B${r}:H${r}`).format.rowHeight=36;
 if(solved && name!=='You try it'){
  s.getRange('J14').values=[['Formula meaning']];
  s.getRange('J15:J19').values=[['Return = risky weight × risky return + T-bill weight × T-bill return'],['Standard deviation = risky weight × risky standard deviation'],['Variance = complete-portfolio standard deviation squared'],['Risk penalty = 0.5 × A × complete-portfolio variance'],['Utility = expected return − risk penalty']];
  s.getRange('J23:J29').values=[['Risk premium = risky return − T-bill return'],['Square risky standard deviation; use decimal returns.'],['This is the denominator of the optimal-weight formula.'],['Optimal y = risk premium / (A × risky variance)'],['Apply the stated no-borrowing and no-shorting constraints.'],['T-bill weight = 1 − risky weight'],['Sharpe = risk premium / risky standard deviation']];
  s.getRange('C15:H19').conditionalFormats.addCustom('H15=MAX($H$15:$H$19)',{fill:'#DDEFEA'});
 }
 s.getRange('J1:J46').format.wrapText=true;
 s.getRange('J14:J29').format.rowHeight=30;
 return s;
}
await fs.mkdir(out,{recursive:true});
const model=Workbook.create();makeSheet(model,'Slide model',[.10,.20,.03,4],true);makeSheet(model,'Worked example',[.09,.15,.03,4],true);
const student=Workbook.create();makeSheet(student,'You try it',[.12,.20,.04,5],false);
const key=Workbook.create();makeSheet(key,'You try it',[.12,.20,.04,5],true);
for(const [wb,file] of [[model,out+'Chapter-6-Worked-Model.xlsx'],[student,out+'Chapter-6-You-Try-It.xlsx'],[key,'/private/tmp/Chapter-6-You-Try-It-INSTRUCTOR.xlsx']]){
 wb.recalculate();
 const x=await SpreadsheetFile.exportXlsx(wb);await x.save(file);
 console.log(await wb.inspect({kind:'region',sheetId:wb.worksheets.getItemAt(0).name,range:'B23:C38',maxChars:1800}));
 const render=await wb.render({sheetName:wb.worksheets.getItemAt(0).name,range:'B2:H38',scale:1.4,format:'png'});
 await fs.writeFile(file.replace('.xlsx','.png'),new Uint8Array(await render.arrayBuffer()));
 for(const sh of wb.worksheets.items){
  const full=await wb.render({sheetName:sh.name,range:'B2:J45',scale:1,format:'png'});
  await fs.writeFile(file.replace('.xlsx','-'+sh.name.replaceAll(' ','-')+'-full.png'),new Uint8Array(await full.arrayBuffer()));
 }
}
const ms=model.worksheets.getItem('Worked example');
if(Math.abs(ms.getRange('C27').values[0][0]-2/3)>1e-10)throw Error('Worked optimum');
if(Math.abs(ms.getRange('C37').values[0][0]-.05)>1e-10)throw Error('Worked utility');
const ks=key.worksheets.getItem('You try it');
if(Math.abs(ks.getRange('C27').values[0][0]-.4)>1e-10)throw Error('Practice optimum');
if(Math.abs(ks.getRange('C37').values[0][0]-.056)>1e-10)throw Error('Practice utility');
console.log('Independent expected-result checks passed');
