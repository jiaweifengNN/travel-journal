/* 平潭自驾 · 风格试验 共享交互层
   localStorage 键与 ../行程.html 完全一致：六个风格 + 主页共享同一份数据 */
(function(){
"use strict";
const $ = id => document.getElementById(id);
const esc = s => {const d=document.createElement('div');d.textContent=s==null?'':s;return d.innerHTML};
const TRIP = window.TRIP;

/* ============ 出行前必看（travel-notices-v1） ============ */
(function(){
  const KEY='travel-notices-v1';
  const DEFAULT = TRIP.noticesDefault.map(x=>({t:x.t,d:false}));
  let items=[]; try{items=JSON.parse(localStorage.getItem(KEY))}catch(e){}
  if(!Array.isArray(items)){items=DEFAULT.slice()}
  const input=$('prepInput'), list=$('prepList'), count=$('prepCount');
  if(!input||!list) return;
  function persist(){const clean=items.map(x=>({t:x.t,d:!!x.d}));localStorage.setItem(KEY,JSON.stringify(clean))}
  function render(){
    if(count) count.textContent = items.length
      ? `还剩 ${items.filter(i=>!i.d).length} 项没确认 · 共 ${items.length} 项`
      : '全部确认完毕，出发 🚗';
    if(!items.length){list.innerHTML='<li class="prep-empty">清单空了。加一条出发前要确认的事。</li>';return}
    list.innerHTML='';
    items.forEach((it,i)=>{
      const li=document.createElement('li');
      li.className='prep-item'+(it.d?' done':'');
      li.innerHTML=`<span class="box" title="点一下=确认完成"></span><span class="txt">${esc(it.t)}</span>
        <button class="ic edit" title="编辑">✏️</button><button class="ic del" title="删除">🗑</button>`;
      li.querySelector('.box').addEventListener('click',()=>{items[i].d=!items[i].d;persist();render()});
      li.querySelector('.del').addEventListener('click',()=>{if(confirm('删掉这条注意事项？')){items.splice(i,1);persist();render()}});
      li.querySelector('.edit').addEventListener('click',()=>{
        const span=li.querySelector('.txt');
        const inp=document.createElement('input');inp.className='prep-edit';inp.maxLength=60;inp.value=items[i].t;
        span.replaceWith(inp);inp.focus();inp.select();
        const commit=()=>{const v=inp.value.trim();if(v)items[i].t=v;persist();render()};
        inp.addEventListener('keydown',e=>{if(e.key==='Enter')commit();if(e.key==='Escape')render()});
        inp.addEventListener('blur',commit);
      });
      list.appendChild(li);
    });
  }
  function add(){const t=input.value.trim();if(!t){input.focus();return}items.push({t,d:false});input.value='';persist();render()}
  $('prepAdd').addEventListener('click',add);
  input.addEventListener('keydown',e=>{if(e.key==='Enter')add()});
  render();
})();

/* ============ 逐日行程 ============ */
(function(){
  const box=$('dayList'); if(!box) return;
  TRIP.days.forEach(d=>{
    const el=document.createElement('section');
    el.className='day'; el.id='day-'+d.id;
    el.style.setProperty('--dc1',d.c1); el.style.setProperty('--dc2',d.c2);
    el.innerHTML=`
      <div class="day-head">
        <span class="day-date">${d.date}</span>
        <h3>${d.title}</h3>
        <span class="day-badge">${d.tag}</span>
      </div>
      <div class="day-sub">${d.sub}</div>
      ${d.drive.length?`<div class="drive-strip">${d.drive.map(v=>`
        <span class="drive"><span class="f">${v.f} → ${v.t}</span><span class="km">${v.km}km</span><span class="arr">${v.h}</span></span>`).join('')}
      </div>`:''}
      <ul class="tl">
        ${d.tl.map(v=>`<li><span class="t">${v.t}</span><span class="x">${v.x}${v.s?`<small>${v.s}</small>`:''}</span></li>`).join('')}
      </ul>
      <div class="day-foot">
        <span class="pill">住宿 <b>${d.stay}</b></span>
        ${d.pills.map(p=>`<span class="pill ${p.k}">${p.t}</span>`).join('')}
      </div>`;
    box.appendChild(el);
  });
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.06});
  document.querySelectorAll('.day').forEach(el=>io.observe(el));
})();

/* ============ 水煮作战图 ============ */
(function(){
  const box=$('szGrid'); if(!box) return;
  const note=$('eatNote'); if(note) note.textContent=TRIP.eatNote;
  TRIP.shuizhu.forEach(s=>{
    const el=document.createElement('div');
    el.className='sz';
    el.innerHTML=`<span class="rank">${s.rank}</span><h4>${s.name}</h4>
      <div class="addr">${s.addr}</div>
      <div class="eat">点这些：<b>${s.eat}</b></div>
      <div class="note">${s.note}</div>`;
    box.appendChild(el);
  });
})();

/* ============ 行前清单 + 备忘（pt2026v2） ============ */
(function(){
  const KEY='pt2026v2';
  let state={}; try{state=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
  const grid=$('ckGrid'); if(!grid) return;
  TRIP.checklist.forEach((c,i)=>{
    const lab=document.createElement('label');
    lab.className='ck';
    lab.innerHTML=`<input type="checkbox" data-i="${i}" ${state['ck'+i]?'checked':''}><span class="box"></span><span class="lbl">${c.t}</span>${c.lvl?'<span class="lvl">要预约</span>':''}`;
    grid.appendChild(lab);
  });
  grid.addEventListener('change',e=>{
    if(e.target.matches('input[type=checkbox]')){state['ck'+e.target.dataset.i]=e.target.checked;save()}
  });
  const memo=$('memo'), tip=$('savedTip');
  if(memo){ memo.value=state.memo||'';
    let tmr;
    memo.addEventListener('input',()=>{state.memo=memo.value;clearTimeout(tmr);tmr=setTimeout(()=>{save();if(tip){tip.textContent='已自动保存';setTimeout(()=>tip.textContent='',1800)}},600)});
  }
  function save(){localStorage.setItem(KEY,JSON.stringify(state))}
})();

/* ============ 随手记账（pt2026v2-exp） ============ */
(function(){
  const KEY='pt2026v2-exp';
  const CAT_COLOR=TRIP.money.colors, DAYS=TRIP.money.days;
  let exps=[]; try{exps=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){}
  const $id=id=>document.getElementById(id);
  const daySel=$id('expDay'); if(!daySel) return;
  DAYS.forEach(d=>{const o=document.createElement('option');o.textContent=d;daySel.appendChild(o)});
  daySel.value = exps.length ? DAYS[Math.min(DAYS.indexOf(exps[exps.length-1].d)+1, DAYS.length-1)] || exps[exps.length-1].d : '9.30';
  $id('expAdd').addEventListener('click',add);
  $id('expAmt').addEventListener('keydown',e=>{if(e.key==='Enter')add()});
  $id('expName').addEventListener('keydown',e=>{if(e.key==='Enter')add()});
  function add(){
    const d=daySel.value, n=$id('expName').value.trim(), c=$id('expCat').value, a=parseFloat($id('expAmt').value);
    if(!n){$id('expName').focus();return}
    if(!(a>0)){$id('expAmt').focus();return}
    exps.push({d,n,c,a,ts:Date.now()});save();
    $id('expName').value='';$id('expAmt').value='';$id('expName').focus();
  }
  $id('expCsv').addEventListener('click',()=>{
    const csv='\ufeff日期,事项,分类,金额(元)\n'+exps.map(e=>`${e.d},"${e.n.replace(/"/g,'""')}",${e.c},${e.a}`).join('\n');
    dl(csv,'平潭自驾账单.csv','text/csv');
  });
  $id('expClear').addEventListener('click',()=>{
    if(!exps.length)return;
    if(confirm(`确定清空全部 ${exps.length} 笔账？此操作不可恢复`)){exps=[];save()}
  });
  function save(){localStorage.setItem(KEY,JSON.stringify(exps));render()}
  function render(){
    const total=exps.reduce((s,e)=>s+e.a,0);
    $id('expTotal').textContent=total%1?total.toFixed(2):total;
    const byCat={};exps.forEach(e=>byCat[e.c]=(byCat[e.c]||0)+e.a);
    $id('catChips').innerHTML=Object.entries(byCat).map(([c,v])=>
      `<span class="cat-chip" style="color:${CAT_COLOR[c]}">${c} <b>${v%1?v.toFixed(1):v}</b></span>`).join('');
    const list=$id('expList');
    if(!exps.length){list.innerHTML='<div class="exp-empty">还没记账。吃完第一顿海鲜回来，输一笔试试。</div>';return}
    list.innerHTML=exps.map((e,i)=>`
      <div class="exp-row">
        <span class="d">${e.d}</span>
        <span class="n">${esc(e.n)}</span>
        <span class="a">¥${e.a%1?e.a.toFixed(2):e.a}</span>
        <span class="c"><span class="cat" style="color:${CAT_COLOR[e.c]};border:1px solid ${CAT_COLOR[e.c]}44">${e.c}</span></span>
        <button class="del" data-i="${i}" title="删除">×</button>
      </div>`).join('');
    list.querySelectorAll('.del').forEach(b=>b.addEventListener('click',()=>{exps.splice(+b.dataset.i,1);save()}));
  }
  function dl(text,name,type){
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([text],{type:type+';charset=utf-8'}));
    a.download=name;a.click();URL.revokeObjectURL(a.href);
  }
  render();
})();

/* ============ 趣事速记（pt2026v2-notes） ============ */
(function(){
  const KEY='pt2026v2-notes';
  let notes=[]; try{notes=JSON.parse(localStorage.getItem(KEY))||[]}catch(e){}
  const input=$('noteInput'), list=$('noteList'); if(!input||!list) return;
  function save(){localStorage.setItem(KEY,JSON.stringify(notes));render()}
  function render(){
    if(!notes.length){list.innerHTML='<li class="exp-empty">还没有记录。路上遇到好玩的事，一句话记下来。</li>';return}
    list.innerHTML=[...notes].reverse().map((n,ri)=>{
      const i=notes.length-1-ri, t=new Date(n.ts), pad=x=>String(x).padStart(2,'0');
      return `<li class="note-item"><span class="ts">${pad(t.getMonth()+1)}.${pad(t.getDate())} ${pad(t.getHours())}:${pad(t.getMinutes())}</span><span class="x">${esc(n.t)}</span><button class="del" data-i="${i}">×</button></li>`;
    }).join('');
    list.querySelectorAll('.del').forEach(b=>b.addEventListener('click',()=>{notes.splice(+b.dataset.i,1);save()}));
  }
  function add(){const t=input.value.trim();if(!t){input.focus();return}notes.push({t,ts:Date.now()});input.value='';save()}
  $('noteAdd').addEventListener('click',add);
  input.addEventListener('keydown',e=>{if(e.key==='Enter')add()});
  render();
})();

/* ============ 照片墙 + 轮播（IndexedDB pt2026photos，与主页共享） ============ */
(function(){
  const DB='pt2026photos';
  const $id=id=>document.getElementById(id);
  let db;
  function open(){
    return new Promise((res,rej)=>{
      const r=indexedDB.open(DB,1);
      r.onupgradeneeded=e=>{if(!e.target.result.objectStoreNames.contains('photos'))e.target.result.createObjectStore('photos',{keyPath:'id',autoIncrement:true})};
      r.onsuccess=e=>res(e.target.result); r.onerror=()=>rej(r.error);
    });
  }
  function tx(mode,fn){
    return new Promise((res,rej)=>{
      const t=db.transaction('photos',mode),s=t.objectStore('photos'),q=fn(s);
      t.oncomplete=()=>res(q&&q.result); t.onerror=()=>rej(t.error);
    });
  }
  const getAll=()=>tx('readonly',s=>s.getAll());
  const put=p=>tx('readwrite',s=>s.add(p));
  const del=id=>tx('readwrite',s=>s.delete(id));
  function compress(file){
    return new Promise(res=>{
      const img=new Image(),url=URL.createObjectURL(file);
      img.onload=()=>{
        const MAX=1600;let {width:w,height:h}=img;
        if(Math.max(w,h)>MAX){const k=MAX/Math.max(w,h);w=Math.round(w*k);h=Math.round(h*k)}
        const c=document.createElement('canvas');c.width=w;c.height=h;
        c.getContext('2d').drawImage(img,0,0,w,h);
        URL.revokeObjectURL(url);
        res({data:c.toDataURL('image/jpeg',.85),name:file.name});
      };
      img.onerror=()=>{URL.revokeObjectURL(url);res(null)};
      img.src=url;
    });
  }
  const btn=$id('phBtn'), file=$id('phFile'); if(!btn) return;
  btn.addEventListener('click',()=>file.click());
  file.addEventListener('change',async e=>{
    for(const f of e.target.files){const p=await compress(f);if(p)await put({...p,ts:Date.now()})}
    e.target.value='';refresh();
  });
  let slideIdx=0, slideTimer=null, photos=[];
  function refresh(){getAll().then(ps=>{photos=ps;renderGrid();renderSlide()})}
  function renderGrid(){
    const g=$id('phGrid');
    g.innerHTML=photos.map(p=>`
      <div class="ph"><img src="${p.data}" data-id="${p.id}" alt="${esc(p.name)}" loading="lazy"><button class="x" data-id="${p.id}" title="删除">×</button></div>`).join('');
    g.querySelectorAll('.x').forEach(b=>b.addEventListener('click',()=>del(+b.dataset.id).then(refresh)));
    g.querySelectorAll('img').forEach(im=>im.addEventListener('click',()=>{
      slideIdx=photos.findIndex(p=>p.id===+im.dataset.id);showSlide();
      $id('slideBox').scrollIntoView({behavior:'smooth',block:'center'});
    }));
  }
  function renderSlide(){
    const box=$id('slideBox'), empty=$id('slideEmpty'), dots=$id('slideDots'), cap=$id('slideCap');
    box.querySelectorAll('img.slide-img').forEach(i=>i.remove());
    if(!photos.length){empty.style.display='flex';dots.innerHTML='';cap.style.display='none';stopSlide();return}
    empty.style.display='none';
    photos.forEach(p=>{const im=document.createElement('img');im.src=p.data;im.className='slide-img';im.alt=p.name;box.insertBefore(im,dots)});
    dots.innerHTML=photos.map((_,i)=>`<i class="${i===slideIdx?'on':''}"></i>`).join('');
    cap.style.display='block';
    slideIdx=Math.min(slideIdx,photos.length-1);
    showSlide();startSlide();
  }
  function showSlide(){
    const imgs=[...document.querySelectorAll('#slideBox img.slide-img')];
    if(!imgs.length)return;
    imgs.forEach((im,i)=>im.classList.toggle('on',i===slideIdx));
    const dots=$id('slideDots');
    [...dots.children].forEach((d,i)=>d.classList.toggle('on',i===slideIdx));
    const p=photos[slideIdx], t=new Date(p.ts), pad=x=>String(x).padStart(2,'0');
    $id('slideCap').innerHTML=`<b>${pad(t.getMonth()+1)}.${pad(t.getDate())} ${pad(t.getHours())}:${pad(t.getMinutes())}</b> · ${esc(p.name)} <span style="opacity:.7">(${slideIdx+1}/${photos.length})</span>`;
  }
  function startSlide(){stopSlide();if(photos.length>1)slideTimer=setInterval(()=>{slideIdx=(slideIdx+1)%photos.length;showSlide()},4000)}
  function stopSlide(){if(slideTimer){clearInterval(slideTimer);slideTimer=null}}
  open().then(d=>{db=d;refresh()}).catch(()=>{btn.style.display='none'});
})();
})();
