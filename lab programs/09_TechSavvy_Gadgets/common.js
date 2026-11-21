/* Shared helpers: DOM, localStorage "database", authentication, role-based menus */
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const DB={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v??d}catch{return d}},set(k,v){localStorage.setItem(k,JSON.stringify(v))}};
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inr=n=>'₹'+Number(n).toLocaleString('en-IN');
const today=()=>new Date().toISOString().slice(0,10);
const addM=(d,m)=>{const x=new Date(d);x.setMonth(x.getMonth()+m);return x.toISOString().slice(0,10)};
const view=h=>{$('#app').innerHTML=h};
const go=i=>$$('#nav button')[i].click();
const toast=m=>{const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),2300)};
const opts=(a,sel)=>a.map(x=>`<option${x==sel?' selected':''}>${esc(x)}</option>`).join('');
function table(cols,rows){if(!rows.length)return'<p class=muted>No records.</p>';return`<div class=tw><table><tr>${cols.map(c=>`<th>${c[0]}</th>`).join('')}</tr>${rows.map(r=>`<tr>${cols.map(c=>`<td>${c[1](r)}</td>`).join('')}</tr>`).join('')}</table></div>`}
function onForm(sel,fn){const f=$(sel);f.onsubmit=e=>{e.preventDefault();fn(Object.fromEntries(new FormData(f)),f)}}
/* Simple collection (table) stored in localStorage */
const Store=(k,seed=[])=>({all(){let v=DB.get(k);if(v==null){v=seed.map(o=>({id:uid(),...o}));DB.set(k,v)}return v},save(v){DB.set(k,v)},
 add(o){const v=this.all();o.id=o.id||uid();v.push(o);this.save(v);return o},upd(id,p){this.save(this.all().map(x=>x.id==id?{...x,...p}:x))},
 del(id){this.save(this.all().filter(x=>x.id!=id))},get(id){return this.all().find(x=>x.id==id)}});
/* Authentication (demo only: passwords are stored in plain text in localStorage) */
const Auth={app:'',init(a,seeds=[]){this.app=a;seeds.forEach(s=>{if(!this.find(s.username,s.role))this.add({...s})})},
 list(){return DB.get(this.app+':users',[])},find(u,r){return this.list().find(x=>x.username===u&&x.role===r)},
 add(u){const l=this.list();u.id=u.id||uid();l.push(u);DB.set(this.app+':users',l);return u},
 update(id,p){DB.set(this.app+':users',this.list().map(x=>x.id===id?{...x,...p}:x))},
 remove(id){DB.set(this.app+':users',this.list().filter(x=>x.id!==id))},
 cur(){const c=DB.get(this.app+':cur');return c?this.list().find(x=>x.id===c)||null:null},
 login(u,p,r){const x=this.find(u,r);if(!x||x.password!==p)return'Invalid username or password';if(x.approved===false)return'Account is waiting for admin approval';DB.set(this.app+':cur',x.id)},
 logout(){localStorage.removeItem(this.app+':cur')}};
function loginUI(cfg){
 view(`<div class=card style="max-width:380px;margin:30px auto"><h2 id=lt>Login</h2><form id=f><label>Role<select name=role>${cfg.roles.map(r=>`<option value=${r.id}>${r.label}</option>`).join('')}</select></label><div id=extra></div><label>Username<input name=username required></label><label>Password<input name=password type=password required></label><button>Login</button></form><p id=sw class=muted></p><p id=msg class=err></p></div>`);
 let mode='login';const f=$('#f'),el=f.elements;
 const sync=()=>{const r=cfg.roles.find(x=>x.id===el.role.value);if(!r.reg)mode='login';
  $('#extra').innerHTML=mode=='reg'?'<label>Full name<input name=name required></label><label>Phone<input name=phone></label>':'';
  f.querySelector('button').textContent=$('#lt').textContent=mode=='reg'?'Register':'Login';
  $('#sw').innerHTML=(r.reg?`<a href=# id=tg>${mode=='reg'?'Have an account? Login':'New user? Register'}</a><br>`:'')+(cfg.hint||'');
  const tg=$('#tg');if(tg)tg.onclick=e=>{e.preventDefault();mode=mode=='reg'?'login':'reg';sync()}};
 el.role.onchange=sync;sync();
 f.onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f)),r=cfg.roles.find(x=>x.id==d.role);
  if(mode=='reg'){if(Auth.find(d.username,d.role))return $('#msg').textContent='Username already taken';
   Auth.add({...d,...(r.approval?{approved:false}:{})});if(r.approval){mode='login';sync();return $('#msg').textContent='Registered. Please wait for admin approval, then login.'}}
  const m=Auth.login(d.username,d.password,d.role);if(m)return $('#msg').textContent=m;boot(cfg)}}
function boot(cfg){
 Auth.init(cfg.app,cfg.seed);document.title=cfg.title;
 document.body.innerHTML=`<header><h1>${cfg.title}</h1><nav id=nav></nav><span id=who></span></header><main id=app></main>`;
 const u=Auth.cur();if(!u)return loginUI(cfg);
 $('#who').innerHTML=`${esc(u.name||u.username)} · ${u.role} <button id=lo>Logout</button>`;$('#lo').onclick=()=>{Auth.logout();boot(cfg)};
 const items=cfg.menu[u.role](u);$('#nav').innerHTML=items.map(m=>`<button>${m[0]}</button>`).join('');
 const bs=$$('#nav button');bs.forEach((b,i)=>b.onclick=()=>{bs.forEach(x=>x.classList.remove('on'));b.classList.add('on');items[i][1]()});bs[0].click()}
