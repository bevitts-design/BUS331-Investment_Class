import fs from 'node:fs/promises';import {Presentation,PresentationFile} from '@oai/artifact-tool';
const root='/tmp/bus331-editable-infographics',C={navy:'#0A2540',teal:'#1B6F73',gold:'#B8843D',paper:'#FAF8F3',pale:'#E8EEEE',white:'#FFFFFF'};
function rect(s,x,y,w,h,fill){return s.shapes.add({geometry:'rect',position:{left:x,top:y,width:w,height:h},fill,line:{fill:'none',width:0}})}
function text(s,str,x,y,w,h,size=36,color=C.navy,bold=false,alignment='left'){const q=rect(s,x,y,w,h,'none');q.text=str;q.text.style={fontSize:size,color,bold,typeface:'Georgia Pro',wrap:'word',verticalAlignment:'middle',autoFit:'none',alignment};q.text.insets=4;return q}
function path(s,pts,color,width=4){s.shapes.add({geometry:'custom',position:{left:0,top:0,width:1920,height:1080},fill:'none',line:{fill:color,width,style:'solid'},customPaths:[{width:1920,height:1080,commands:pts.map((p,i)=>i?{lineTo:{x:p[0],y:p[1]}}:{moveTo:{x:p[0],y:p[1]}})}]})}
function line(s,x,y,a,b,col=C.navy,w=4){path(s,[[x,y],[a,b]],col,w)}
function dot(s,x,y,col,r=13){s.shapes.add({geometry:'ellipse',position:{left:x-r,top:y-r,width:2*r,height:2*r},fill:col,line:{fill:C.paper,width:3}})}
function make(){const P=Presentation.create({slideSize:{width:1920,height:1080}});P.theme.defaultFont='Georgia Pro';const s=P.slides.add();s.background.fill=C.paper;return[P,s]}
function footer(s,str){rect(s,70,955,1780,75,C.navy);text(s,str,95,962,1730,60,36,C.white,true,'center')}
const[p,s]=make();text(s,'Complete portfolio: the investor’s whole mix',70,45,1780,110,62,C.navy,true);text(s,'Risky portfolio + risk-free investment',70,158,1780,65,42,C.navy,false,'center');
for(const [start,col] of [[Math.PI/2,C.teal],[-Math.PI/2,C.gold]]){const pts=[];for(let j=0;j<=100;j++){const a=start+j/100*Math.PI;pts.push([490+230*Math.cos(a),550+230*Math.sin(a)])}path(s,pts,col,125)}
text(s,'100%',310,472,360,80,70,C.navy,true,'center');text(s,'of invested\nwealth',310,555,360,110,39,C.navy,false,'center');
text(s,'50% risky portfolio',110,845,500,50,32,C.teal,true);text(s,'50% T-bills',630,845,290,50,32,C.gold,true);
text(s,'y = risky fraction of total wealth',980,285,840,90,42,C.navy,true);text(s,'1−y = fraction invested in T-bills',980,385,840,90,41,C.navy);
text(s,'Inside the risky portfolio',980,525,840,70,42,C.teal,true);text(s,'Stocks',1010,655,330,85,44,C.teal,true,'center');text(s,'Bonds',1450,655,330,85,44,C.teal,true,'center');line(s,1390,610,1190,650,C.teal);line(s,1390,610,1610,650,C.teal);text(s,'The stock/bond mix is a separate decision.',980,770,840,120,38);
text(s,'Example: y=0.50 → 50% risky portfolio + 50% T-bills',80,895,1760,50,35,C.navy,true,'center');footer(s,'A complete portfolio is one allocation of the investor’s wealth.');text(s,'T-bills are modeled as risk-free over the investment period.',90,1035,1740,35,25,C.navy,false,'center');s.speakerNotes.text='The risky portfolio may contain multiple risky assets. y measures the proportion of the investor’s wealth in that portfolio, not its internal stock weight. The illustration assumes no borrowing. A bond fund is risky; T-bills are modeled as risk-free for the specified holding period.';
const[q,t]=make();text(t,'Capital allocation line (CAL)',70,45,1780,110,65,C.navy,true);text(t,'Different allocations of the same risky portfolio and T-bills',70,155,1780,65,38,C.navy,false,'center');
const px=x=>190+x/.20*900,py=y=>765-y/.10*440;
line(t,190,310,190,765);line(t,190,765,1110,765);
for(const x of [0,.10,.20]){line(t,px(x),765,px(x),780);text(t,`${Math.round(x*100)}%`,px(x)-55,786,110,55,32,C.navy,false,'center')}
for(const y of [0,.03,.065,.10]){line(t,175,py(y),190,py(y));text(t,`${y*100}%`,80,py(y)-27,95,55,32,C.navy,false,'right')}
line(t,190,py(.03),1090,py(.10),C.teal,7);line(t,190,py(.065),px(.10),py(.065),C.pale,3);line(t,px(.10),py(.065),px(.10),765,C.pale,3);
for(const[x,y,c]of[[0,.03,C.gold],[.10,.065,C.teal],[.20,.10,C.teal]])dot(t,px(x),py(y),c,15);
text(t,'All T-bills · y=0',235,py(.03)+8,470,60,32);text(t,'50/50 mix · y=0.5',px(.10)+20,py(.065)+8,460,60,32);text(t,'All risky · y=1',800,260,370,55,32);text(t,'Expected return E(Rc)',90,235,1050,60,36,C.navy,true);text(t,'Risk: standard deviation σc',210,835,900,60,36,C.navy,true,'center');
text(t,'Move along the line',1200,285,640,75,46,C.navy,true);text(t,'Changing y changes risky exposure.\nThe risky portfolio’s composition\nstays the same.',1200,380,640,170,35);
text(t,'Risky: return 10%, risk 20%\nT-bills: return 3%, risk 0',1200,565,640,110,34);text(t,'At 50% risky',1200,690,640,65,40,C.teal,true);text(t,'Return = 3% + 0.5(10%−3%) = 6.5%\nRisk = 0.5 × 20% = 10%',1200,770,640,115,31);
text(t,'E(Rc)=Rf+y[E(Rp)−Rf]     |     σc=yσp, for y≥0',100,900,1720,50,36,C.navy,true,'center');footer(t,'Each point is a complete portfolio. Together, the points form the CAL.');text(t,'Illustration: 0≤y≤1, no borrowing; T-bills are risk-free over the investment period.',90,1035,1740,35,24,C.navy,false,'center');t.speakerNotes.text='Hypothetical risky expected return .10, standard deviation .20, risk-free rate .03. At y=.5, complete return .065 and SD .10. The CAL is the available set when mixing the fixed risky portfolio with the risk-free asset. All objects are independently editable. The graph assumes no borrowing.';
for(const [name,P]of[['Complete Portfolio',p],['Capital Allocation Line',q]]){const blob=await P.export({slide:P.slides.items[0],format:'png',scale:1});await fs.writeFile(`${root}/build/${name}.png`,new Uint8Array(await blob.arrayBuffer()));await(await PresentationFile.exportPptx(P)).save(`${root}/build/${name}.pptx`)}
