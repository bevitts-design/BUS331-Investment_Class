"""Build the maintained four-asset lesson extension; preserve existing slides."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json, math, zipfile, html
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'scripts/decks/chapter7-canva/multi-asset-extension.json'
OUT=ROOT/'outputs/chapter7-multi-asset-extension'
OUT.mkdir(parents=True,exist_ok=True)
slides=json.loads(SRC.read_text())
NAVY='#0A2540'; GOLD='#B8843D'; TEAL='#1B6F73'; PAPER='#FAF8F3'; STEEL='#355773'
def font(n,b=False):
    return ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia'+(' Bold' if b else '')+'.ttf',n)
def text(x,y,s,n=38,w=1740,c=NAVY,b=False):
    s=s.replace('→',' > ')
    f=font(n,b)
    for p in s.split('\n'):
        line=''
        for word in p.split():
            trial=(line+' '+word).strip()
            if d.textlength(trial,font=f)>w and line:
                drawline(x,y,line,f,c); y+=n*1.3; line=word
            else: line=trial
        drawline(x,y,line,f,c);y+=n*1.3
    return y
def drawline(x,y,s,f,c):
    bounds=d.textbbox((x,y),s,font=f)
    assert bounds[2]<1880 and bounds[3]<1045,(s,bounds)
    d.text((x,y),s,font=f,fill=c)
def box(x,y,w,h,c):d.rounded_rectangle((x,y,x+w,y+h),radius=16,fill=c)
images=[];manifest=[]
for i,s in enumerate(slides,1):
    im=Image.new('RGB',(1920,1080),PAPER); d=ImageDraw.Draw(im)
    text(80,55,s['title'],58,b=True);text(80,145,s['subtitle'],36)
    k=s['kind']
    if k=='teaching-table':
        widths=[440,660,660]
        box(80,250,1760,80,NAVY)
        x=80
        for width,label in zip(widths,s['headers']):
            text(x+22,270,label,34,w=width-44,c='white',b=True);x+=width
        for r,row in enumerate(s['rows']):
            y=330+r*100
            box(80,y,1760,100,'#E7EDEB' if r%2==0 else '#EBE9E2')
            x=80
            for width,value in zip(widths,row):
                text(x+22,y+26,value,38,w=width-44,c=NAVY if x==80 else TEAL);x+=width
        for j,value in enumerate(s['explain']):
            text(85,775+j*70,value,34)
    elif k=='transition':
        for j,g in enumerate(s['groups']):
            x=80+j*450;box(x,270,420,210,'#E7EDEB');text(x+22,295,g[0],52,w=376,c=TEAL,b=True);text(x+22,380,g[1],32,w=376)
        for j,v in enumerate(s['steps']):
            text(120,565+j*105,str(j+1)+'   '+v,44)
    elif k=='returns':
        for j,g in enumerate(s['groups']):
            x=80+j*900;box(x,250,860,275,'#E7EDEB');text(x+30,270,g[0],42,w=800,b=True);text(x+30,345,g[1],48,w=800,c=TEAL);text(x+30,440,g[2],32,w=800)
        for j,v in enumerate(s['steps']):text(85,590+j*92,v,36)
    elif k=='log-explainer':
        box(80,235,1760,115,'#E7EDEB')
        for j,v in enumerate(s['example']):text(105+j*580,265,v,34,w=555,c=TEAL,b=True)
        for j,g in enumerate(s['groups']):
            x=80+j*900;box(x,405,860,470,'#E7EDEB')
            text(x+25,425,g[0],32,w=810,b=True,c=TEAL)
            for r,v in enumerate(g[1:]):text(x+25,510+r*66,v,34,w=810)
    elif k=='covariance':
        for j,v in enumerate(s['steps']):text(85,245+j*100,str(j+1)+'   '+v,38)
        for j,g in enumerate(s['groups']):
            x=80+j*900;box(x,675,860,205,'#E7EDEB');text(x+24,692,g[0],36,w=812,b=True);text(x+24,750,g[1],32,w=812)
    elif k=='sharpe':
        box(80,230,1760,160,'#E7EDEB')
        text(105,250,s['formula'],34,w=1710,c=TEAL,b=True)
        text(105,325,s['example'],32,w=1710)
        widths=[470,390,460,440]
        x=80;box(80,445,1760,75,NAVY)
        for w,h in zip(widths,s['headers']):
            text(x+20,462,h,32,w=w-40,c='white',b=True);x+=w
        for r,row in enumerate(s['rows']):
            y=520+r*85;box(80,y,1760,85,'#E7EDEB' if r==0 else '#EBE9E2');x=80
            for w,v in zip(widths,row):
                text(x+20,y+20,v,38,w=w-40,c=TEAL if x>1300 else NAVY,b=True);x+=w
        for j,v in enumerate(s['steps']):text(85,735+j*60,v,34)
    elif k=='solver':
        text(100,230,'SOLVER PARAMETERS',34,c=TEAL,b=True)
        text(1000,230,'SUBJECT TO THE CONSTRAINTS',34,c=TEAL,b=True)
        for j,g in enumerate(s['groups']):
            y=295+j*160;box(80,y,860,145,'#E7EDEB')
            text(105,y+15,g[0],34,w=810,b=True)
            text(105,y+78,g[1],36,w=810,c=TEAL)
        for j,g in enumerate(s['constraints']):
            y=295+j*160;box(980,y,860,145,'#E7EDEB')
            text(1005,y+15,g[0],36,w=810,c=TEAL,b=True)
            text(1005,y+78,g[1],34,w=810)
        for j,v in enumerate(s['steps']):text(85,815+j*60,v,34)
    else:
        for j,g in enumerate(s['groups']):
            y=225+j*155;box(80,y,1760,140,'#E7EDEB');text(105,y+10,g[0],32,b=True);text(105,y+65,g[1],34,w=1710,c=TEAL)
        for j,v in enumerate(s['steps']):text(85,720+j*62,v,32)
    box(60,945,1800,100,NAVY);text(85,970,s['takeaway'],32,w=1740,c='white')
    name=f'{i:02}-{k}.png';im.save(OUT/name);images.append(im);manifest.append({'file':name,'title':s['title']})
assert math.isclose(sum([.0001,.0004,.0009,.0016])*.25**2,.0001875)
assert math.isclose(math.sqrt(.0001875*252),.21737065119284157)
assert math.isclose(math.log(1.02),.01980262729617973)
assert math.isclose(math.log(102/100)+math.log(104.04/102),math.log(104.04/100))
assert math.isclose(math.expm1(2*math.log(1.02)),.0404)
assert math.isclose(.5*.02+.5*(-.02),0,abs_tol=1e-12)
assert not math.isclose(.5*math.log(1.02)+.5*math.log(.98),0,abs_tol=1e-12)
assert math.isclose((.10-.04)/.12,.50)
assert math.isclose((.12-.04)/.20,.40)
from statistics import variance, stdev, mean, covariance
a=[.02,-.01,.03]; b=[-.01,.02,0]
portfolio=[.5*x+.5*y for x,y in zip(a,b)]
assert math.isclose(covariance(a,b),-.0002666666666666667)
matrix_variance=.25*variance(a)+.25*variance(b)+.5*covariance(a,b)
assert math.isclose(matrix_variance,variance(portfolio))
assert math.isclose(stdev(portfolio),.005773502691896258)
assert math.isclose(stdev(portfolio)*math.sqrt(252),.0916515138991168)
assert math.isclose(104.0094/100.98-1,.03)
import re
assert not re.search(r'\b[A-Z]{1,3}\$?\d+\b',json.dumps(slides)), 'Workbook cell references must remain student choices'
images[0].save(OUT/'Portfolio-Calculation-Slides.pdf',save_all=True,append_images=images[1:],resolution=144)
overview=Image.new('RGB',(1920,540*math.ceil(len(images)/2)),PAPER)
for j,im in enumerate(images):overview.paste(im.resize((960,540)),((j%2)*960,(j//2)*540))
overview.save(OUT/'Overview.png')
(OUT/'Teaching-Notes.md').write_text('# Four-asset portfolio extension\n\nInsert after the two-asset portfolio-risk explanation. Georgia substitutes for Georgia Pro. PNG text is flattened; maintain content in the JSON source. Workbook unchanged. Existing slides preserved.\n\n'+'\n\n'.join(f'## {i}. {s["title"]}\n\n{s["notes"]}' for i,s in enumerate(slides,1)))
(OUT/'Gallery.html').write_text('<!doctype html><meta charset="utf-8"><title>Portfolio extension</title><style>body{background:#0A2540;color:white;font:24px Georgia}img{width:100%}</style>'+''.join(f'<h2>{html.escape(m["title"])}</h2><img src="{m["file"]}" alt="{html.escape(m["title"])}">' for m in manifest))
with zipfile.ZipFile(OUT/'Canva-Slides.zip','w',zipfile.ZIP_DEFLATED) as z:
    for m in manifest:z.write(OUT/m['file'],m['file'])
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2))
print(f'{len(slides)} slides built; bounds and independent calculation checks passed.')
