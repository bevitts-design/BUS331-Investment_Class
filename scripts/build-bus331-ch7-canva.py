"""Rebuild the authorized Chapter 7 raster slide package from maintained JSON.

Original figures and classroom examples only; no assigned answer-key outputs.
Run with the bundled Python runtime (Pillow). This is an image export, not a
migration of BUS331's shared HTML presentation runtime.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, math, textwrap, zipfile, html

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'scripts/decks/chapter7-canva/slides.json'
OUT = ROOT / 'outputs/chapter7-canva-2026-10-12'
OUT.mkdir(parents=True, exist_ok=True)
NAVY='#0A2540'; GOLD='#B8843D'; TEAL='#1B6F73'; TERRA='#9C4A2B'; STEEL='#355773'; PAPER='#FAF8F3'
FONT=Path('/System/Library/Fonts/Supplemental/Georgia.ttf')
BOLD=Path('/System/Library/Fonts/Supplemental/Georgia Bold.ttf')
slides=json.loads(SRC.read_text())
assert len(slides)==30
checks=[]

def font(n,b=False): return ImageFont.truetype(str(BOLD if b else FONT),n)
def txt(x,y,s,n=38,color=NAVY,width=1750,b=False,leading=1.28):
    f=font(n,b); lines=[]
    for para in str(s).split('\n'):
        line=''
        for word in para.split():
            trial=(line+' '+word).strip()
            if d.textlength(trial,font=f)>width and line: lines.append(line);line=word
            else: line=trial
        lines.append(line)
    for line in lines:
        box=d.textbbox((x,y),line,font=f)
        if box[2]>1900 or box[3]>1070: checks.append({'slide':index,'text':line,'box':box})
        d.text((x,y),line,font=f,fill=color); y+=round(n*leading)
    return y
def box(x,y,w,h,fill='white',outline=None): d.rounded_rectangle((x,y,x+w,y+h),radius=20,fill=fill,outline=outline,width=2)
def pill(x,y,label,color=TEAL):
    box(x,y,470,90,color);txt(x+25,y+19,label,34,'white',width=420,b=True)
def line(points,color=TEAL,width=7): d.line(points,fill=color,width=width,joint='curve')
def arrow(x1,y1,x2,y2,color=STEEL):
    line([(x1,y1),(x2,y2)],color,7); a=math.atan2(y2-y1,x2-x1)
    d.polygon([(x2,y2),(x2-24*math.cos(a-.5),y2-24*math.sin(a-.5)),(x2-24*math.cos(a+.5),y2-24*math.sin(a+.5))],fill=color)
def formula(s,y=230):
    box(80,y,1760,125,'#E7EDEB');txt(110,y+20,s,36,width=1700);return y+150
def table(headers,rows,y=280, widths=None, n=34):
    widths=widths or ([480,820,460] if len(headers)==3 else [500,380,440,440])
    x=80;total=sum(widths);box(x,y,total,68,NAVY)
    for w,h in zip(widths,headers):txt(x+18,y+14,h,30,'white',width=w-36,b=True);x+=w
    y+=68
    for j,row in enumerate(rows):
        # Height follows wrapped text; never shrink text to fit.
        heights=[]
        for w,s in zip(widths,row):
            count=1
            for p in str(s).split('\n'):
                cur=''
                for word in p.split():
                    if d.textlength((cur+' '+word).strip(),font=font(n))>w-36 and cur:count+=1;cur=word
                    else:cur=(cur+' '+word).strip()
            heights.append(count)
        rh=max(90,max(heights)*int(n*1.28)+30)
        d.rectangle((80,y,80+total,y+rh),fill='white' if j%2==0 else '#EDEFEA')
        x=80
        for w,s in zip(widths,row):txt(x+18,y+17,s,n,width=w-36);x+=w
        y+=rh
    return y
def plot_axes(x=170,y=820,w=1000,h=500):
    line([(x,y-h),(x,y),(x+w,y)],STEEL,4)
    txt(x+180,y+35,'Risk: annual standard deviation',30,width=w)
    txt(x,y-h-65,'Expected annual return',30,width=w)
    for risk in [0,.05,.10,.15,.20]:
        xx=x+risk/.22*w;line([(xx,y),(xx,y+10)],STEEL,3);txt(xx-30,y+12,f'{risk:.0%}',25,width=100)
    for ret in [.06,.08,.10,.12]:
        yy=y-(ret-.05)/.08*h;line([(x-10,yy),(x,yy)],STEEL,3);txt(x-70,yy-15,f'{ret:.0%}',25,width=100)
    return lambda risk,ret:(x+risk/.22*w,y-(ret-.05)/.08*h)
def stats(w,rho=.2):return .06+.06*w, math.sqrt(w*w*.04+(1-w)**2*.01+2*w*(1-w)*rho*.2*.1)
def dot(x,y,color=TEAL,r=10):d.ellipse((x-r,y-r,x+r,y+r),fill=color)

manifest=[]
for index,s in enumerate(slides,1):
    im=Image.new('RGB',(1920,1080),PAPER);d=ImageDraw.Draw(im)
    d.rectangle((0,0,1920,14),fill=GOLD)
    txt(80,42,s['tag'],28,TEAL,b=True)
    txt(80,96,s['title'],62,width=1760,b=True)
    k=s['kind']; y=230
    if 'formula' in s:y=formula(s['formula']);
    if 'definitions' in s:y=txt(95,y,s['definitions'],30,width=1730)+24
    if k=='hook':
        txt(100,260,'Stock fund',44,b=True);txt(100,335,'20% volatility',72,TEAL,b=True)
        txt(1000,260,'Bond fund',44,b=True);txt(1000,335,'10% volatility',72,STEEL,b=True)
        arrow(650,470,850,585);arrow(1240,470,1050,585)
        box(570,610,800,215,NAVY);txt(620,645,'A stock–bond mix',54,'white',width=700,b=True)
        txt(620,725,'Predict its volatility',38,'white',width=700)
    elif k=='risk':
        x0,y0=130,800;line([(x0,260),(x0,y0),(1120,y0)],STEEL,4)
        pts=[(x0+t*930,y0-(125+380*math.exp(-t*5))) for t in [j/100 for j in range(101)]]
        line(pts,TEAL,9);line([(x0,675),(1060,675)],TERRA,5)
        txt(165,250,'Total portfolio risk',37,TEAL,b=True)
        txt(480,695,'Systematic risk remains',35,TERRA,width=650,b=True)
        txt(230,835,'Number of distinct holdings',32)
        txt(1220,300,'Firm-specific',43,TEAL,b=True,width=600)
        txt(1220,365,'Recall, lawsuit, management change',38,width=580)
        txt(1220,555,'Systematic',43,TERRA,b=True,width=600)
        txt(1220,620,'Recession, inflation, interest rates',38,width=580)
    elif k=='movement':
        for j,(label,vals,col) in enumerate([('Same direction',[.25,.75,.30,.70,.20],TERRA),('Different patterns',[.6,.2,.85,.4,.8],TEAL)]):
            x=110+j*900;txt(x,260,label,45,col,b=True,width=800)
            a=[(x+t*170,700-v*300) for t,v in enumerate([.3,.8,.35,.75,.25])]
            b=[(x+t*170,700-v*300) for t,v in enumerate(vals)]
            line(a,NAVY,8);line(b,col,8)
            txt(x,760,'Stock fund',34,NAVY);txt(x+380,760,'Second fund',34,col)
        txt(110,850,'Schematic return patterns across the same periods',30,STEEL)
    elif k in ['table','sheet']:
        n=30 if k=='sheet' else 34
        widths=[300,970,490] if k=='sheet' else None
        if k=='sheet' and index==7:widths=[280,740,740]
        if index==6:widths=[360,530,870]
        if index==9:widths=[380,950,430]
        if index==24:widths=[850,450,460]
        if index==14:widths=[300,850,610]
        y=table(s['headers'],s['rows'],y+10,widths,n)
        if s.get('aside'):txt(100,y+25,s['aside'],34,width=1720,b=False)
    elif k=='steps':
        for j,(label,val) in enumerate(s['steps']):
            txt(95,y,label,33,TEAL,b=True);y+=50
            y=txt(95,y,val,42,width=1720)+35
    elif k=='signs':
        for j,(a,b,label,col) in enumerate([('Above','Above','Positive',TEAL),('Below','Below','Positive',TEAL),('Above','Below','Negative',TERRA)]):
            yy=y+j*135
            pill(90,yy,'Stock: '+a,NAVY);txt(590,yy+20,'×',48,STEEL)
            pill(690,yy,'Bond: '+b,STEEL);arrow(1210,yy+45,1360,yy+45,col);txt(1410,yy+22,label,42,col,b=True,width=430)
    elif k=='correlation':
        txt(110,y+10,'0.001320 ÷ (0.124900 × 0.017436)',47,width=1690)
        txt(110,y+90,'ρ = +0.606',78,TEAL,b=True)
        yy=760;line([(180,yy),(1720,yy)],STEEL,8)
        for v,label in [(-1,'−1: opposite'),(0,'0: no linear link'),(1,'+1: together')]:
            x=950+v*770;dot(x,yy,STEEL);txt(x-(0 if v==-1 else 150),yy+30,label,30,width=450)
        x=950+.606143*770;dot(x,yy,TEAL,18);txt(x-160,yy-75,'Our example',36,TEAL,b=True)
    elif k=='compare':
        for j,entries in enumerate([s['left'],s['right']]):
            x=90+j*900;box(x,260,840,600,'white')
            yy=290
            for z,t in enumerate(entries):yy=txt(x+35,yy,t,42 if z==0 else 36,TEAL if j==0 else STEEL,width=770,b=z==0)+55
    elif k=='assets':
        table(['Annual input','Stock fund','Bond fund'],[['Expected return','12%','6%'],['Standard deviation','20%','10%'],['Variance','0.0400','0.0100']],280,[720,520,520],42)
        pill(100,730,'Correlation: 0.20');pill(700,730,'Risk-free rate: 3%',STEEL)
        txt(100,850,'Base mix: 60% stocks + 40% bonds',44,b=True)
    elif k=='allocation':
        x=110; yy=y+20
        box(x,yy,1020,140,TEAL);box(x+1020,yy,680,140,STEEL)
        txt(x+40,yy+35,'60% stocks',51,'white',b=True);txt(x+1060,yy+35,'40% bonds',51,'white',b=True)
        txt(110,yy+195,'0.60 × 12% = 7.20%',48,TEAL,b=True)
        txt(1030,yy+195,'0.40 × 6% = 2.40%',48,STEEL,b=True,width=760)
        txt(480,yy+320,'7.20% + 2.40% = 9.60%',62,NAVY,b=True)
    elif k=='variance':
        for j,(label,value,col) in enumerate([('Stock term','0.60² × 0.20² = 0.01440',TEAL),('Bond term','0.40² × 0.10² = 0.00160',STEEL),('Co-movement term','2 × 0.60 × 0.40 × 0.004 = 0.00192',TERRA)]):
            yy=y+j*130;txt(100,yy,label,34,col,b=True);txt(600,yy,value,43,width=1200)
        txt(100,850,'Add: 0.01440 + 0.00160 + 0.00192 = 0.01792',44,b=True)
    elif k=='practice':
        y=table(['Given','Value'],s['rows'],260,[1050,710],38)
        txt(100,y+35,s['aside'],40,width=1700)
    elif k=='corrbars':
        for j,(rho,label) in enumerate([(1,'+1.00'),(.2,'+0.20'),(0,'0.00'),(-1,'−1.00')]):
            risk=stats(.6,rho)[1];yy=y+20+j*105
            txt(100,yy,'ρ = '+label,36,b=True);box(400,yy, risk/.20*1100,65,TEAL if rho<1 else STEEL)
            txt(430+risk/.20*1100,yy,f'{risk:.2%}',39,b=True,width=350)
        txt(110,850,'ρ = −1 can produce zero risk only at special offsetting weights.',33,width=1710)
    elif k=='frontier':
        point=plot_axes(); ws=[j/200 for j in range(201)]
        low=[];high=[]
        for w in ws:
            ret,risk=stats(w);(low if w<1/7 else high).append(point(risk,ret))
        line(low,TERRA,8);line(high,TEAL,8)
        ret,risk=stats(1/7);xx,yy=point(risk,ret);dot(xx,yy,GOLD,14)
        txt(1180,270,'Upper branch',43,TEAL,b=True,width=620);txt(1180,340,'Efficient risky portfolios',36,width=600)
        txt(1180,465,'Leftmost point',43,GOLD,b=True,width=620);txt(1180,535,'Global minimum variance',36,width=600)
        txt(1180,675,'Many-asset inputs',38,STEEL,b=True,width=620);txt(1180,735,'N means, N variances,\nN(N − 1)/2 covariances',32,width=620)
        txt(260,905,'Illustrative long-only two-fund opportunity set',27,STEEL)
    elif k=='sharpe':
        for j,(label,val,col) in enumerate([('100% stocks',.45,GOLD),('60/40 mix',(.096-.03)/stats(.6)[1],TEAL),('100% bonds',.30,STEEL)]):
            yy=330+j*160;txt(100,yy,label,36,b=True,width=460);box(100,yy+55,val/.55*550,65,col);txt(140+val/.55*550,yy+62,f'{val:.3f}',39,col,b=True,width=200)
        txt(920,260,'Steeper CAL = higher Sharpe',36,TEAL,b=True,width=890)
        x0,y0,pw,ph=1010,820,710,440
        pt=lambda risk,ret:(x0+risk/.22*pw,y0-(ret-.02)/.13*ph)
        line([(x0,y0-ph),(x0,y0),(x0+pw,y0)],STEEL,4)
        for w in [j/200 for j in range(201)]:
            ret,risk=stats(w)
            if w==0:curve=[]
            curve.append(pt(risk,ret))
        line(curve,TEAL,7)
        for slope,col in [(.30,STEEL),(.45,GOLD),(.4984350509344221,TEAL)]:line([pt(0,.03),pt(.22,.03+slope*.22)],col,4)
        for slope,label,col,dy in [(.4984350509344221,'Optimal',TEAL,-28),(.45,'Stocks',GOLD,0),(.30,'Bonds',STEEL,0)]:
            txt(1740,pt(.22,.03+slope*.22)[1]+dy,label,26,col,width=150)
        xx,yy=pt(.11814756762890007,.0888888888888889);dot(xx,yy,TEAL,12)
        txt(xx+25,yy-60,'Tangency',31,TEAL,b=True,width=400)
        txt(930,340,'Expected return',28,STEEL,width=650)
        txt(940,pt(0,.03)[1]-16,'3%',27,STEEL,width=100)
        for risk in [0,.10,.20]:
            xx,yy=pt(risk,.02);txt(xx-15,yy+10,f'{risk:.0%}',27,STEEL,width=100)
        txt(1080,870,'Annual standard deviation',29,STEEL,width=650)
    elif k=='tangency':
        txt(100,y,'Running example',42,TEAL,b=True)
        txt(100,y+85,'eS = 12% − 3% = 9%\neB = 6% − 3% = 3%',44,width=770)
        txt(1040,y+85,'c = 0.004\nσS² = 0.04; σB² = 0.01',44,width=750)
        txt(100,y+270,'Bond numerator: 0.03 × 0.04 − 0.09 × 0.004 = 0.00084',40,width=1710)
        txt(100,y+365,'Denominator: 0.00162; bond weight = 51.85%',44,b=True,width=1710)
    elif k=='separation':
        pill(110,260,'Optimal risky mix',NAVY)
        txt(110,380,'48.15% stocks\n51.85% bonds',53,width=650,b=True)
        arrow(660,455,900,455)
        txt(1000,275,'Choose y = 60% in the risky mix',44,width=780,b=True)
        yy=405
        for label,val,col in [('Stocks',.6*13/27,TEAL),('Bonds',.6*14/27,STEEL),('Bills',.4,GOLD)]:
            txt(1000,yy,label,37,col,b=True);box(1230,yy,val/.4*370,65,col);txt(1640,yy,f'{val:.2%}',37,col,width=220);yy+=120
        txt(110,750,'E(RC) = yE(RP) + (1 − y)Rf;     σC = yσP',42,width=1710)
        txt(110,830,'CAL = bills + a risky portfolio. CML uses the market portfolio.',33,width=1710)
    elif k=='limits':
        for j,(title,body) in enumerate([('Estimation','Expected returns and correlations change; test assumptions.'),('Pooling and sharing','Pooling adds exposures. Sharing spreads a fixed risk among investors.'),('Time horizon','More years do not guarantee smaller cumulative losses.')]):
            yy=260+j*190;txt(100,yy,title,43,TEAL,b=True,width=620);txt(760,yy,body,39,width=1060)
        txt(100,850,'Q1–Q2: measure / Q3: combine / Q4: sample / Q5: vary / Q6–Q7: optimize',30,width=1710)
    box(60,945,1800,88,NAVY)
    txt(85,968,s['takeaway'],32,'white',width=1740)
    txt(80,1038,'BUS331  ·  Efficient Diversification  ·  Hypothetical teaching examples',24,STEEL)
    txt(1710,1038,f'{index:02} / 30',24,STEEL,width=170)
    name=f'{index:02}-'+''.join(c if c.isalnum() else '-' for c in s['title'].lower()).strip('-')+'.png'
    im.save(OUT/name,optimize=True)
    manifest.append({'slide':index,'file':name,'title':s['title'],'connection':s['link'],'visual':k})

assert not checks, checks
# Independent numeric checks for all published classroom outputs.
p=[.2,.5,.3];a=[.25,.10,-.10];b=[.04,.06,.02]
mu=lambda v:sum(x*y for x,y in zip(p,v))
va=lambda v:sum(x*(y-mu(v))**2 for x,y in zip(p,v))
c=sum(x*(y-mu(a))*(z-mu(b)) for x,y,z in zip(p,a,b))
assert math.isclose(mu(a),.07) and math.isclose(mu(b),.044)
assert math.isclose(va(a),.0156) and math.isclose(va(b),.000304)
assert math.isclose(c,.00132) and math.isclose(c/math.sqrt(va(a)*va(b)),.606142506204135,rel_tol=1e-6)
assert math.isclose(stats(.6)[1]**2,.01792)
assert math.isclose(stats(.2)[1]**2,.00928)
wb=(.03*.04-.09*.004)/(.03*.04+.09*.01-(.03+.09)*.004)
assert math.isclose(wb,14/27)
ret,sd=stats(1-wb)
assert math.isclose(ret,.0888888888888889) and math.isclose(sd,.11814814814814815,rel_tol=1e-5)
assert math.isclose((ret-.03)/sd,.498433,rel_tol=1e-5)
assert math.isclose(stats(1/7)[1],.0956182887467515,rel_tol=1e-5)
assert math.isclose(sum((x-.05)**2 for x in [.08,-.04,.12,.04])/3,.00466666666666667)
for r,w in [(1,.6),(-1,.6),(0,.6)]: assert stats(w,r)[1]>=0

(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2))
notes=['# Chapter 7 teaching guide','\n30 slides. Georgia substitutes for Georgia Pro in these flattened PNGs. All examples are hypothetical annual data. Reveal slides follow student attempts.']
for i,s in enumerate(slides,1): notes.append(f"\n## {i}. {s['title']}\n\n{s['notes']}\n\nWorkbook connection: {s['link']}")
(OUT/'Teaching-Guide.md').write_text('\n'.join(notes))
imgs=[Image.open(OUT/x['file']).convert('RGB') for x in manifest]
imgs[0].save(OUT/'Chapter-7-30-Slide-Preview.pdf',save_all=True,append_images=imgs[1:],resolution=144)
for start in range(0,30,10):
    page=Image.new('RGB',(1920,2800),'#ddd');pd=ImageDraw.Draw(page)
    for j,img in enumerate(imgs[start:start+10]):
        thumb=img.resize((900,506)); xx=30+(j%2)*960; yy=20+(j//2)*556
        page.paste(thumb,(xx,yy))
        pd.text((xx,yy+512),f"{start+j+1:02}  {slides[start+j]['title']}",font=font(22),fill=NAVY)
    page.save(OUT/f'Overview-{start+1:02}-{start+10:02}.jpg')
readme='''# Chapter 7 Canva image package

30 original 1920×1080 PNG slides, in numbered teaching order. Upload the PNGs to Canva or copy/paste individual images into a 16:9 presentation. Each is a complete slide. Text inside a PNG is flattened; edit the JSON source and rebuild to change it. Georgia is used as the available substitute for Georgia Pro. The PDF is a preview, not an editable deck.

The teaching guide contains talk tracks, practice debriefs and workbook construction guidance. Worked examples use different inputs from the assigned key. No original Canva design or workbook was changed, and nothing was published.

The maintained source is scripts/decks/chapter7-canva/slides.json. Rebuild with scripts/build-bus331-ch7-canva.py using Python with Pillow. The builder verifies numeric outputs and image bounds.

Sequence: 1–3 diversification; 4–12 probability-weighted moments and co-movement; 13–14 historical samples; 15–21 two-asset portfolio construction and sensitivity; 22–23 minimum variance and frontier; 24–28 Sharpe and optimal risky weights; 29 complete portfolio and separation; 30 limits and transfer.

Source basis: current Canva Chapters 6–7 design, Chapter 7 integrated Excel reference, and BKM Chapter 7 instructor-manual objectives. Original diagrams avoid copying publisher artwork. Course Presentation Design Standard v1.2 supplies teaching patterns; the explicit PNG request takes precedence over its default editable Canva format. BUS331's palette is retained. This package does not replace the maintained HTML deck runtime.
'''
(OUT/'README.md').write_text(readme)
gallery='<html><meta charset="utf-8"><title>Chapter 7 slide images</title><style>body{background:#0A2540;color:white;font:20px Georgia;margin:40px}img{width:100%;max-width:1400px}a{color:#eac48d}section{margin:40px 0}</style><h1>Efficient Diversification · 30 slide images</h1><p>Open an image to copy or save it for Canva.</p>'
for m in manifest:gallery+=f'<section><h2>{m["slide"]}. {html.escape(m["title"])}</h2><a href="{m["file"]}"><img alt="{html.escape(m["title"])}" src="{m["file"]}"></a></section>'
(OUT/'Gallery.html').write_text(gallery+'</html>')
with zipfile.ZipFile(OUT/'Chapter-7-Canva-Images.zip','w',zipfile.ZIP_DEFLATED) as z:
    for m in manifest:z.write(OUT/m['file'],m['file'])
    for name in ['README.md','Teaching-Guide.md','manifest.json']:z.write(OUT/name,name)
print(f'Saved {len(manifest)} slides. Numeric and image-bound checks passed. Output: {OUT}')
