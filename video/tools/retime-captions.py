# Recale chaque sous-titre de captions.ts sur l horodatage mot à mot : python3 retime-captions.py captions.ts sortie.json
import sys, json, re, unicodedata, difflib
capf, asrf = sys.argv[1], sys.argv[2]
src=open(capf).read()
ents=[(m.group(1), float(m.group(2)), float(m.group(3))) for m in re.finditer(r'\{text: (".*?"), start: ([\d.]+), end: ([\d.]+)\}', src)]
texts=[json.loads(e[0]) for e in ents]
def norm(s):
  s=unicodedata.normalize('NFD',s.lower()); s=''.join(c for c in s if unicodedata.category(c)!='Mn')
  return [w for w in re.split(r"[^a-z0-9]+", s) if w]
# ASR words with times
A=json.load(open(asrf)); words=[]; 
for tok,ts in zip(A['tokens'],A['ts']):
  if tok.startswith((' ','▁')) or not words: words.append([tok.lstrip(' ▁'),ts])
  else: words[-1][0]+=tok
aw=[];at=[]
for w,ts in words:
  for p in norm(w): aw.append(p); at.append(ts)
# caption tokens
cw=[];ci=[]
for k,tx in enumerate(texts):
  for p in norm(tx.replace('*','')): cw.append(p); ci.append(k)
sm=difflib.SequenceMatcher(None,cw,aw,autojunk=False)
tm=[None]*len(cw)
for a,b,n in sm.get_matching_blocks():
  for j in range(n): tm[a+j]=at[b+j]
# fuzzy fill for replace blocks of equal length
for tag,i1,i2,j1,j2 in sm.get_opcodes():
  if tag=='replace':
    for k in range(i2-i1):
      jj=j1+round(k*(j2-j1)/max(1,i2-i1)); 
      if jj<j2: tm[i1+k]=at[jj]
matched=sum(1 for x in tm if x is not None)
# interpolate
idx=[i for i,x in enumerate(tm) if x is not None]
for i in range(len(tm)):
  if tm[i] is None:
    lo=max([j for j in idx if j<i],default=None); hi=min([j for j in idx if j>i],default=None)
    if lo is None: tm[i]=tm[hi]
    elif hi is None: tm[i]=tm[lo]+0.3*(i-lo)
    else: tm[i]=tm[lo]+(tm[hi]-tm[lo])*(i-lo)/(hi-lo)
# monotonic
for i in range(1,len(tm)): tm[i]=max(tm[i],tm[i-1])
first={};last={}
for i,k in enumerate(ci):
  first.setdefault(k,tm[i]); last[k]=tm[i]
new=[]
for k in range(len(texts)):
  s=max(0,first[k]-0.22)
  nxt=first[k+1]-0.22 if k+1<len(texts) else last[k]+1.0
  e=min(nxt-0.03, last[k]+0.9)
  e=max(e,s+0.35)
  new.append((s,e))
# fix overlaps
for k in range(len(new)-1):
  if new[k][1]>new[k+1][0]-0.02: new[k]=(new[k][0],max(new[k][0]+0.2,new[k+1][0]-0.02))
out=src
lines=src.split('\n'); res=[]; k=0
for l in lines:
  m=re.match(r'(\s*\{text: ".*?", start: )([\d.]+)(, end: )([\d.]+)(\},.*)',l)
  if m: res.append(f"{m.group(1)}{new[k][0]:.2f}{m.group(3)}{new[k][1]:.2f}{m.group(5)}"); k+=1
  else: res.append(l)
open(capf,'w').write('\n'.join(res))
print('caption tokens',len(cw),'matched',matched, 'ratio %.2f'%(matched/len(cw)))
# drift report
d=[(texts[k],ents[k][1],new[k][0]) for k in range(len(texts))]
for x in d[::25]: print('%-35s old %.2f new %.2f diff %+.2f'%(x[0][:35],x[1],x[2],x[2]-x[1]))
