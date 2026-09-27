const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const toast=(msg,type='success')=>{let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}t.className=`toast show ${type}`;t.textContent=msg;clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>t.classList.remove('show'),2800)};
const money=n=>'₹'+Number(n||0).toLocaleString('en-IN');
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const plannerCopy={home:{title:'Your Home Plan'},party:{title:'Your Party Plan'},jewelry:{title:'Your Jewelry Plan'}};

// Theme
const savedTheme=localStorage.getItem('ps-theme')||'light';
document.documentElement.dataset.theme=savedTheme;
const themeBtn=$('#theme');
const syncThemeIcon=()=>{if(themeBtn){const dark=document.documentElement.dataset.theme==='dark';themeBtn.innerHTML=dark?'<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.7 8.7 0 1 0 20.5 14.5Z"/></svg>':'<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';themeBtn.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');themeBtn.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode')}};
syncThemeIcon();
themeBtn?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('ps-theme',next);syncThemeIcon();toast(`${next==='dark'?'Dark':'Light'} mode enabled`)});

// Mobile menu
$('#menu')?.addEventListener('click',()=>$('.links')?.classList.toggle('mobile-open'));
$$('.links a').forEach(a=>a.addEventListener('click',()=>$('.links')?.classList.remove('mobile-open')));

// Scroll reveal
$$('.reveal').forEach(el=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.08});io.observe(el)});

// Direct budget entry
$$('.budget-input').forEach(input=>input.addEventListener('input',()=>{if(Number(input.value||0)>10000000)input.value=10000000}));

const images={
  home:[
    'https://images.pexels.com/photos/29012626/pexels-photo-29012626.jpeg?cs=srgb&dl=pexels-beyza-kilicdere-1855080990-29012626.jpg&fm=jpg',
    'https://images.pexels.com/photos/34992781/pexels-photo-34992781.jpeg?cs=srgb&dl=pexels-liuuu-_61-2383408-34992781.jpg&fm=jpg',
    'https://images.pexels.com/photos/7745984/pexels-photo-7745984.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  party:[
    'https://images.pexels.com/photos/7328590/pexels-photo-7328590.jpeg?cs=srgb&dl=pexels-pnw-prod-7328590.jpg&fm=jpg',
    'https://images.pexels.com/photos/7180730/pexels-photo-7180730.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/7548036/pexels-photo-7548036.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  jewelry:[
    'https://images.pexels.com/photos/5043048/pexels-photo-5043048.jpeg?cs=srgb&dl=pexels-shaantanu-bhatt-941724-5043048.jpg&fm=jpg',
    'https://images.pexels.com/photos/28347075/pexels-photo-28347075.jpeg?cs=srgb&dl=pexels-dream_-makkerzz-1603229-28347075.jpg&fm=jpg',
    'https://images.pexels.com/photos/6716445/pexels-photo-6716445.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ]
};

const storeCatalog={
  home:[
    ['Amazon','https://www.amazon.in/s?k=home+decor',''],['Flipkart','https://www.flipkart.com/search?q=home%20decor','️'],['IKEA','https://www.ikea.com/in/en/search/?q=home%20decor',''],['Pepperfry','https://www.pepperfry.com/site_product/search?q=home%20decor',''],['Urban Ladder','https://www.urbanladder.com/search?query=home%20decor','️'],['Myntra','https://www.myntra.com/search?q=home%20decor',''],['AJIO','https://www.ajio.com/search/?text=home%20decor',''],['Meesho','https://www.meesho.com/search?q=home%20decor',''],['Tata CLiQ','https://www.tatacliq.com/search/?searchCategory=all&text=home%20decor',''],['Croma','https://www.croma.com/searchB?q=home%20decor','']
  ],
  party:[
    ['Swiggy','https://www.swiggy.com/search?query=catering',''],['Zomato','https://www.zomato.com/india/restaurants?query=catering','️'],['Amazon','https://www.amazon.in/s?k=party+decorations',''],['Flipkart','https://www.flipkart.com/search?q=party%20decorations','️'],['Blinkit','https://blinkit.com/s/?q=party%20decorations',''],['Zepto','https://www.zeptonow.com/search?query=party%20decorations',''],['BigBasket','https://www.bigbasket.com/ps/?q=party%20decorations',''],['JioMart','https://www.jiomart.com/search/party%20decorations',''],['BookMyShow','https://in.bookmyshow.com/','️'],['Ferns N Petals','https://www.fnp.com/','']
  ],
  jewelry:[
    ['Tanishq','https://www.tanishq.co.in/',''],['CaratLane','https://www.caratlane.com/',''],['Mia','https://www.miabytanishq.com/',''],['Bluestone','https://www.bluestone.com/',''],['Kalyan Jewellers','https://www.kalyanjewellers.net/',''],['Malabar Gold & Diamonds','https://www.malabargoldanddiamonds.com/',''],['Amazon','https://www.amazon.in/s?k=jewellery',''],['Flipkart','https://www.flipkart.com/search?q=jewellery','️'],['Myntra','https://www.myntra.com/search?q=jewellery',''],['AJIO','https://www.ajio.com/search/?text=jewellery','']
  ]
};

function storeUrl(name,url,q){
  const encoded=encodeURIComponent(q||'recommended products');
  if(['Amazon','Flipkart','Myntra','AJIO','Meesho','Swiggy','Zomato','Blinkit','Zepto','BigBasket'].includes(name)){
    const idx=url.indexOf('=');
    return idx>0?url.slice(0,idx+1)+encoded:url;
  }
  return url;
}
function storeButtons(type,query){
  const stores=storeCatalog[type]||storeCatalog.home;
  return `<div class="store-panel"><div class="store-panel-head"><div><b>Compare before you buy</b><div class="muted small-copy">Open multiple shopping and service platforms for the same idea</div></div><span class="store-count">${stores.length} platforms</span></div><div class="store-grid">${stores.map(([name,url,icon])=>`<a class="store-btn" href="${storeUrl(name,url,query)}" target="_blank" rel="noopener noreferrer"><span>${icon}</span><span>${esc(name)}</span><span class="external">↗</span></a>`).join('')}</div></div>`;
}

function getFormData(form){
  const fd=new FormData(form), obj={};
  for(const [k,v] of fd.entries()) obj[k]=v;
  obj.budget=Math.max(100,Number(obj.budget||0));
  return obj;
}

function makeItems(type,d){
  const imgs=images[type];
  if(type==='home') return [
    ['Modern accent chair','Comfort + statement furniture',Math.round(d.budget*.18),Math.round(d.budget*.22),imgs[0]],
    ['Warm pendant lighting','Soft ambient upgrade',Math.round(d.budget*.07),Math.round(d.budget*.09),imgs[1]],
    ['Living décor bundle','Plants, vase & finishing touches',Math.round(d.budget*.08),Math.round(d.budget*.10),imgs[2]],
    ['Storage / side table','Useful piece without overspending',Math.round(d.budget*.09),Math.round(d.budget*.12),imgs[1]],
    ['Textile refresh','Curtains, cushions or rug',Math.round(d.budget*.10),Math.round(d.budget*.13),imgs[2]],
    ['Statement upgrade','One premium-looking focal item',Math.round(d.budget*.14),Math.round(d.budget*.18),imgs[0]]
  ];
  if(type==='party') return [
    ['Food & catering plan','Balanced menu with smart portions',Math.round(d.budget*.32),Math.round(d.budget*.40),imgs[0]],
    ['Decoration package','High-impact balloons, backdrop & table',Math.round(d.budget*.10),Math.round(d.budget*.15),imgs[1]],
    ['Cake & dessert table','Choose a focal dessert instead of many extras',Math.round(d.budget*.08),Math.round(d.budget*.12),imgs[2]],
    ['Music & activities','Playlist + simple games / activities',Math.round(d.budget*.06),Math.round(d.budget*.10),imgs[0]],
    ['Invites & party supplies','Digital invites + reusable basics',Math.round(d.budget*.03),Math.round(d.budget*.06),imgs[1]],
    ['Venue / setup reserve','Protect a buffer for unexpected costs',Math.round(d.budget*.08),Math.round(d.budget*.12),imgs[2]]
  ];
  return [
    ['Hero necklace','Main occasion piece',Math.round(d.budget*.45),Math.round(d.budget*.55),imgs[0]],
    ['Matching earrings','Keep the set coordinated',Math.round(d.budget*.16),Math.round(d.budget*.22),imgs[1]],
    ['Everyday ring','A smaller piece for repeat wear',Math.round(d.budget*.08),Math.round(d.budget*.14),imgs[2]],
    ['Bangle / bracelet','Optional finishing piece',Math.round(d.budget*.10),Math.round(d.budget*.16),imgs[1]],
    ['Minimal alternative','Use a lighter design to lower spend',Math.round(d.budget*.12),Math.round(d.budget*.18),imgs[2]],
    ['Premium statement set','For a higher-impact look',Math.round(d.budget*.55),Math.round(d.budget*.68),imgs[0]]
  ];
}

function renderPlan(data){
  const results=$('#results'); if(!results)return;
  const meta=plannerCopy[data.type]||plannerCopy.home;
  const budget=Number(data.budget||0);
  const items=makeItems(data.type,data);
  const priority=data.focus||data.priority||data.piece||'Balanced';
  const targetSpend=Math.round(budget*(data.quality==='Premium'?0.88:data.quality==='Value'?0.68:0.78));
  const reserve=Math.max(0,budget-targetSpend);
  const baseline=Math.round(targetSpend*1.12);
  const potential=Math.max(0,baseline-targetSpend);
  const maxPct=Math.min(100,Math.round((targetSpend/budget)*100));
  const query=data.type==='home'?`${data.room||'home'} ${data.style||'modern'} ${priority} decor`:data.type==='party'?`${data.event_type||'party'} ${priority} party`: `${data.occasion||'jewelry'} ${data.style||'elegant'} ${data.metal||''} ${data.piece||'jewelry'}`;
  const cards=items.map((it,i)=>`<article class="product-card">
    <img class="product-image" loading="lazy" src="${it[4]}" alt="${esc(it[0])} visual inspiration">
    <div class="product-body"><div class="product-meta"><div><span class="store-pill">Visual inspiration</span><h3 style="margin:8px 0 3px">${esc(it[0])}</h3><div class="muted">${esc(it[1])}</div></div><div class="product-price">${money(it[2])}<div class="product-old">${money(it[3])}</div></div></div>
    <div class="product-actions"><a class="btn" target="_blank" rel="noopener noreferrer" href="${storeUrl('Amazon','https://www.amazon.in/s?k=',query+' '+it[0])}">Amazon ↗</a><a class="btn" target="_blank" rel="noopener noreferrer" href="${storeUrl('Flipkart','https://www.flipkart.com/search?q=',query+' '+it[0])}">Flipkart ↗</a></div></div></article>`).join('');
  const breakdown=data.type==='home'
    ?[['Furniture',.35],['Lighting',.12],['Décor',.13],['Reserve',.40]]
    :data.type==='party'
    ?[['Food & drinks',.38],['Decor',.14],['Venue',.18],['Fun & extras',.10],['Reserve',.20]]
    :[['Hero piece',.50],['Matching piece',.18],['Finishing pieces',.10],['Reserve',.22]];
  const rows=breakdown.map(([label,p])=>`<div class="budget-row"><span>${label}</span><b>${money(Math.round(budget*p))}</b></div>`).join('');
  results.innerHTML=`<span class="eyebrow">Generated for you</span>
    <h2 style="font-family:'Space Grotesk'">${meta.title}</h2>
    <p class="muted">Budget ${money(budget)} · ${esc(priority)} priority · ${data.guests?`${esc(data.guests)} guests · ${money(Math.round(budget/Math.max(1,Number(data.guests))))} per guest`:''}</p>
    <div class="result-hero">
      <div class="photo-hero"><img src="${images[data.type][0]}" alt="${esc(meta.title)} photo inspiration"><div class="photo-overlay"><b>Visual inspiration</b><div style="font-size:12px;margin-top:4px">Real photography helps you picture the result before shopping.</div></div></div>
      <div class="savings-card"><span class="eyebrow">Money-saving view</span><div class="savings-amount">${money(potential)}</div><div><b>potential planning savings target</b></div><div class="budget-meter"><span style="width:${maxPct}%"></span></div><div class="muted small-copy">Planned shopping spend: ${money(targetSpend)} · protected reserve: ${money(reserve)}</div><ul class="savings-list"><li>Compare at least 2 stores before checkout.</li><li>Use one statement item and cheaper supporting pieces.</li><li>Keep the reserve untouched until the end.</li></ul></div>
    </div>
    <div class="budget-breakdown">${rows}</div>
    <div class="plan-tip"><div></div><div><b>How PocketSmart helps you save</b><span class="muted">It separates a protected reserve, shows value alternatives and sends you to multiple stores so you can compare instead of buying the first option.</span></div></div>
    <h3 style="margin-top:24px">More choices for your plan</h3>
    <div class="product-grid">${cards}</div>
    <div class="photo-credit">Photos are visual inspiration from Pexels. Product images are not an indication of exact stock or price. Always verify the current retailer listing before purchase.</div>
    ${storeButtons(data.type,query)}
    <div class="result-actions"><button class="btn" type="button" data-save-plan>Save plan</button><a class="btn primary" href="/recommendations">View all recommendations →</a></div>`;
  $('[data-save-plan]')?.addEventListener('click',async()=>{await savePlannerHistory(data);toast('Plan saved to planner history')});
}

$$('[data-planner]').forEach(form=>form.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=form.querySelector('button[type="submit"]'); const old=btn?.innerHTML;
  if(btn){btn.disabled=true;btn.innerHTML='<span class="spinner"></span> Building your visual plan…'}
  try{
    const data=getFormData(form);
    data.type=form.dataset.type||'home';
    await new Promise(r=>setTimeout(r,500));
    renderPlan(data);
    await savePlannerHistory(data);
    toast('Your visual plan is ready');
    $('#results')?.scrollIntoView({behavior:'smooth',block:'start'});
  }catch(err){console.error(err);toast('Please check your budget and try again.','error')}
  finally{if(btn){btn.disabled=false;btn.innerHTML=old}}
}));


// Live budget details (screenshot-style)
function updateBudgetPreview(form){
  const input=form.querySelector('.budget-input'); const preview=form.querySelector('[data-budget-preview]');
  if(!input || !preview) return;
  const budget=Math.max(0,Number(input.value||0));
  const type=form.dataset.type||'home';
  const reserve=type==='home'?0.20:type==='party'?0.18:0.15;
  const spend=budget*(1-reserve);
  const labels=type==='home'
    ?[['Furniture',.35],['Lighting',.12],['Decor',.13],['Reserve',.40]]
    :type==='party'
    ?[['Food',.38],['Venue',.18],['Decor',.14],['Reserve',.20]]
    :[['Hero piece',.50],['Matching',.18],['Details',.10],['Reserve',.22]];
  const cells=labels.slice(0,3).map(([label,p])=>`<div class="budget-mini"><span>${label}</span><b>${money(Math.round(budget*p))}</b></div>`).join('');
  preview.querySelector('[data-budget-total]').textContent=money(budget);
  preview.querySelector('[data-budget-spend]').textContent=money(Math.round(spend));
  preview.querySelector('[data-budget-reserve]').textContent=money(Math.round(budget*reserve));
  preview.querySelector('[data-budget-cells]').innerHTML=cells;
}
$$('.budget-input').forEach(input=>{
  input.addEventListener('input',()=>updateBudgetPreview(input.form));
  updateBudgetPreview(input.form);
});
$$('.quick-budget').forEach(btn=>btn.addEventListener('click',()=>{
  const form=btn.closest('form'), input=form?.querySelector('.budget-input');
  if(input){input.value=btn.dataset.amount; input.dispatchEvent(new Event('input',{bubbles:true}));}
}));
$$('.password-toggle').forEach(btn=>btn.addEventListener('click',()=>{
  const input=document.getElementById(btn.dataset.target);
  if(!input)return;
  input.type=input.type==='password'?'text':'password';
  btn.textContent=input.type==='password'?'Show':'Hide';
}));

// Optional local demo authentication. Planning never requires an account.
function getCurrentUser(){return localStorage.getItem('ps-demo-username')||''}
function syncAccountNav(){
  const name=getCurrentUser();
  const actions=$('.actions');
  if(!actions) return;
  const theme=actions.querySelector('#theme');
  const menu=actions.querySelector('#menu');
  actions.querySelectorAll('a[href=\"/login\"], a[href=\"/register\"]').forEach(a=>a.remove());
  actions.querySelectorAll('[data-account-nav]').forEach(el=>el.remove());
  if(name){
    const profile=document.createElement('a');
    profile.className='btn'; profile.href='/profile'; profile.dataset.accountNav='profile'; profile.textContent='Profile';
    const logout=document.createElement('button');
    logout.className='btn primary'; logout.type='button'; logout.dataset.accountNav='logout'; logout.textContent='Log out';
    logout.addEventListener('click',()=>{
      localStorage.removeItem('ps-demo-user');
      localStorage.removeItem('ps-demo-username');
      localStorage.removeItem('ps-demo-email');
      toast('Logged out');
      setTimeout(()=>location.href='/',350);
    });
    if(menu) actions.insertBefore(profile,menu); else actions.appendChild(profile);
    if(menu) actions.insertBefore(logout,menu); else actions.appendChild(logout);
  }else{
    const login=document.createElement('a'); login.className='btn'; login.href='/login'; login.textContent='Log in';
    const create=document.createElement('a'); create.className='btn primary'; create.href='/register'; create.textContent='Create Account';
    if(menu) actions.insertBefore(login,menu); else actions.appendChild(login);
    if(menu) actions.insertBefore(create,menu); else actions.appendChild(create);
  }
}
syncAccountNav();
async function savePlannerHistory(data){
  const key='ps-planner-history';
  const entry={...data,id:Date.now(),createdAt:new Date().toISOString(),username:getCurrentUser()||'Guest'};
  try{
    const history=JSON.parse(localStorage.getItem(key)||'[]');
    history.unshift(entry);
    localStorage.setItem(key,JSON.stringify(history.slice(0,50)));
  }catch(err){ console.warn('Browser history storage unavailable:',err); }
  try{
    const response=await fetch('/api/history',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(entry)});
    if(!response.ok) throw new Error(`History save failed: ${response.status}`);
  }catch(err){ console.warn('Server history save unavailable:',err); }
  return entry;
}
function renderWelcome(){
  const el=$('[data-welcome]'); if(!el)return;
  const name=getCurrentUser();
  el.textContent=name?`Welcome, ${name}. Build a clear plan, compare options, and stay in control of your budget.`:'Welcome to PocketSmart AI. Explore the planners freely and create an account only if you want a personalized profile and saved name.';
}
renderWelcome();
$$('[data-auth]').forEach(form=>form.addEventListener('submit',async e=>{
  e.preventDefault();
  const password=form.querySelector('input[name="password"]');
  const confirm=form.querySelector('input[name="confirm_password"]');
  if(confirm && password && password.value!==confirm.value){toast('Passwords do not match','error');return;}
  const btn=form.querySelector('button[type="submit"]'); const old=btn?.innerHTML;
  if(btn){btn.disabled=true;btn.innerHTML='<span class="spinner"></span> Please wait…'}
  await new Promise(r=>setTimeout(r,650));
  localStorage.setItem('ps-demo-user','1');
  localStorage.setItem('ps-demo-username',form.querySelector('input[name="username"]')?.value || form.querySelector('input[name="email"]')?.value || 'User');
  const emailField=form.querySelector('input[name="email"]');
  if(emailField) localStorage.setItem('ps-demo-email',emailField.value);
  toast(form.dataset.mode==='register'?'Account created successfully':'Welcome back');
  setTimeout(()=>location.href='/',450);
}));

$$('[data-demo]').forEach(f=>f.addEventListener('submit',async e=>{e.preventDefault();const btn=f.querySelector('button[type="submit"]');if(btn){btn.disabled=true;const old=btn.innerHTML;btn.innerHTML='<span class="spinner"></span> Saving…';await new Promise(r=>setTimeout(r,500));btn.disabled=false;btn.innerHTML=old}toast('Changes saved successfully')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('.links')?.classList.remove('mobile-open')});
