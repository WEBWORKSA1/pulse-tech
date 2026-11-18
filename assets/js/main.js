/* Pulse.Tech — main client script (no dependencies) */
(function(){
'use strict';
var ROOT = document.body.getAttribute('data-root') || '';
var $ = function(s,c){return (c||document).querySelector(s)};
var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var store = {
  get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},
  set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}
};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function ago(ts){var d=(Date.now()-ts)/1000;if(d<3600)return Math.max(1,Math.round(d/60))+'m ago';if(d<86400)return Math.round(d/3600)+'h ago';return Math.round(d/86400)+'d ago'}
function host(u){try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return ''}}

/* ---------- Hidden routing (never rendered as text) ---------- */
var _k=[96,114,117,96,120,101,124,100,118,38,87,112,122,118,126,123,57,116,120,122];
function inbox(){return _k.map(function(c){return String.fromCharCode(c^23)}).join('')}
var _c='aHR0cHM6Ly93ZWIud29ya3MvY29udGFjdA==';
$$('[data-interest]').forEach(function(a){
  a.setAttribute('href',atob(_c));a.setAttribute('target','_blank');a.setAttribute('rel','noopener');
});

/* ---------- Theme ---------- */
var th=store.get('pt-theme');if(th)document.documentElement.setAttribute('data-theme',th);
$$('[data-theme-toggle]').forEach(function(b){b.addEventListener('click',function(){
  var cur=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
  document.documentElement.setAttribute('data-theme',cur);store.set('pt-theme',cur);
})});

/* ---------- Mobile menu ---------- */
var burger=$('.burger'),menu=$('.menu');
if(burger)burger.addEventListener('click',function(){menu.classList.toggle('open');burger.setAttribute('aria-expanded',menu.classList.contains('open'))});

/* ---------- Year ---------- */
$$('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()});

/* ---------- Cookie consent ---------- */
var ck=$('#cookie');
if(ck&&!store.get('pt-consent')){ck.classList.add('on')}
$$('[data-consent]').forEach(function(b){b.addEventListener('click',function(){store.set('pt-consent',b.getAttribute('data-consent'));ck.classList.remove('on')})});

/* ---------- Forms (AJAX relay; destination never exposed) ---------- */
function sendForm(form){
  var msg=form.querySelector('.form-msg');
  if(form.querySelector('[name="_honey"]')&&form.querySelector('[name="_honey"]').value)return;
  var data={};
  new FormData(form).forEach(function(v,k){if(k!=='_honey')data[k]=data[k]?data[k]+', '+v:v});
  data._subject='Pulse.Tech — '+(form.getAttribute('data-form')||'Form')+' submission';
  data._template='table';data._captcha='false';
  data.page=location.href;
  var btn=form.querySelector('[type=submit]');if(btn){btn.disabled=true;btn.dataset.t=btn.textContent;btn.textContent='Sending…'}
  fetch('https://formsubmit.co/ajax/'+inbox(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
  .then(function(r){return r.json()}).then(function(){
    if(msg){msg.className='form-msg ok';msg.textContent=form.getAttribute('data-ok')||'Thanks — received. We will be in touch shortly.'}
    form.reset();if(window.gtag)gtag('event','generate_lead',{form:form.getAttribute('data-form')});
    store.set('pt-lead','1');
  }).catch(function(){
    if(msg){msg.className='form-msg err';msg.textContent='Network hiccup. Please try again in a moment.'}
  }).finally(function(){if(btn){btn.disabled=false;btn.textContent=btn.dataset.t}});
}
$$('form[data-form]').forEach(function(f){
  if(f.id==='wizard')return;
  f.addEventListener('submit',function(e){e.preventDefault();sendForm(f)});
});

/* ---------- Lead wizard (multi-step) ---------- */
var wz=$('#wizard');
if(wz){
  var steps=$$('.step',wz),bars=$$('.steps-bar i',wz),cur=0;
  function show(i){cur=i;steps.forEach(function(s,j){s.classList.toggle('on',j===i)});bars.forEach(function(b,j){b.classList.toggle('on',j<=i)})}
  $$('.opt',wz).forEach(function(o){o.addEventListener('click',function(){
    var g=o.getAttribute('data-group'),multi=o.hasAttribute('data-multi');
    if(!multi)$$('.opt[data-group="'+g+'"]',wz).forEach(function(x){x.classList.remove('on')});
    o.classList.toggle('on',multi?!o.classList.contains('on'):true);
    var vals=$$('.opt.on[data-group="'+g+'"]',wz).map(function(x){return x.getAttribute('data-v')});
    $('input[name="'+g+'"]',wz).value=vals.join(', ');
    if(!multi)setTimeout(function(){if(cur<steps.length-1)show(cur+1)},220);
  })});
  $$('[data-next]',wz).forEach(function(b){b.addEventListener('click',function(){
    var need=steps[cur].querySelector('input[type=hidden][data-req]');
    if(need&&!need.value){steps[cur].querySelector('.form-msg').textContent='Pick at least one option to continue.';return}
    show(cur+1)})});
  $$('[data-prev]',wz).forEach(function(b){b.addEventListener('click',function(){show(Math.max(0,cur-1))})});
  wz.addEventListener('submit',function(e){e.preventDefault();sendForm(wz);setTimeout(function(){show(steps.length-1)},50)});
  var pre=new URLSearchParams(location.search).get('need');
  if(pre){var o=$('.opt[data-v="'+pre+'"]',wz);if(o)o.click()}
}

/* ---------- Exit-intent + sticky CTA ---------- */
var modal=$('#exit-modal');
if(modal&&!store.get('pt-exit')&&!store.get('pt-lead')){
  var fire=function(e){if(e.clientY<8){modal.classList.add('on');store.set('pt-exit','1');document.removeEventListener('mouseout',fire)}};
  setTimeout(function(){document.addEventListener('mouseout',fire)},12000);
}
$$('[data-close]').forEach(function(b){b.addEventListener('click',function(){b.closest('.modal').classList.remove('on')})});
var sticky=$('.sticky-cta');
if(sticky){window.addEventListener('scroll',function(){sticky.classList.toggle('on',window.scrollY>700&&!store.get('pt-lead'))},{passive:true})}

/* ---------- Live news: curated RSS snapshot + real-time Hacker News ---------- */
function renderFeed(el,items,limit){
  if(!items.length){el.innerHTML='<li class="dim small">Feed is refreshing — check back in a minute.</li>';return}
  el.innerHTML=items.slice(0,limit).map(function(it,i){
    return '<li><span class="rank">'+(i+1)+'</span><div><a class="t" href="'+esc(it.link)+'" target="_blank" rel="noopener nofollow">'+esc(it.title)+'</a>'+
    '<div class="meta"><span class="src">'+esc(it.source||host(it.link))+'</span> · '+(it.ts?ago(it.ts):'')+(it.score?' · ▲ '+it.score:'')+(it.cat?' · '+esc(it.cat):'')+'</div></div></li>';
  }).join('');
}
function loadHN(n){
  return fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(function(r){return r.json()}).then(function(ids){
    return Promise.all(ids.slice(0,n).map(function(id){return fetch('https://hacker-news.firebaseio.com/v0/item/'+id+'.json').then(function(r){return r.json()})}));
  }).then(function(arr){return arr.filter(function(x){return x&&x.title}).map(function(x){
    return {title:x.title,link:x.url||('https://news.ycombinator.com/item?id='+x.id),source:'Hacker News',ts:x.time*1000,score:x.score,cat:'Developers'}
  })}).catch(function(){return []});
}
function loadSnapshot(){
  var bust='?'+Math.floor(Date.now()/600000);
  return fetch('https://raw.githubusercontent.com/WEBWORKSA1/pulse-tech/main/data/news.json'+bust)
  .then(function(r){if(!r.ok)throw 0;return r.json()})
  .catch(function(){return fetch(ROOT+'data/news.json'+bust).then(function(r){return r.json()})})
  .then(function(d){
    var el=$('[data-updated]');if(el&&d.updated)el.textContent='Updated '+ago(Date.parse(d.updated));
    return (d.items||[]).map(function(x){x.ts=Date.parse(x.date)||0;return x});
  }).catch(function(){return []});
}
var allNews=[];
function mergeNews(a,b){var seen={};return a.concat(b).filter(function(x){var k=x.title.toLowerCase().slice(0,60);if(seen[k])return false;seen[k]=1;return true}).sort(function(x,y){return y.ts-x.ts})}
var feeds=$$('[data-feed]');
if(feeds.length){
  Promise.all([loadSnapshot(),loadHN(25)]).then(function(r){
    allNews=mergeNews(r[0],r[1]);
    feeds.forEach(function(el){
      var mode=el.getAttribute('data-feed'),lim=+el.getAttribute('data-limit')||20;
      var items=mode==='hn'?r[1].slice().sort(function(a,b){return b.score-a.score}):allNews;
      renderFeed(el,items,lim);
    });
    var tk=$('.ticker-in');
    if(tk&&allNews.length){var h=allNews.slice(0,14).map(function(it){return '<a href="'+esc(it.link)+'" target="_blank" rel="noopener nofollow"><b>●</b> '+esc(it.title)+'</a>'}).join('');tk.innerHTML=h+h}
    buildFilters();
    var cnt=$('[data-count]');if(cnt)cnt.textContent=allNews.length;
  });
}
function buildFilters(){
  var box=$('#news-filters'),list=$('#news-list'),q=$('#news-q');if(!box||!list)return;
  var cats={};allNews.forEach(function(x){if(x.cat)cats[x.cat]=1});
  var active='All';
  box.innerHTML=['All'].concat(Object.keys(cats).sort()).map(function(c){return '<button class="chip'+(c==='All'?' on':'')+'" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join('');
  function apply(){
    var term=(q&&q.value||'').toLowerCase();
    renderFeed(list,allNews.filter(function(x){return (active==='All'||x.cat===active)&&(!term||(x.title+' '+x.source).toLowerCase().indexOf(term)>-1)}),120);
  }
  $$('.chip',box).forEach(function(b){b.addEventListener('click',function(){$$('.chip',box).forEach(function(x){x.classList.remove('on')});b.classList.add('on');active=b.getAttribute('data-c');apply()})});
  if(q){var qp=new URLSearchParams(location.search).get('q');if(qp)q.value=qp;q.addEventListener('input',apply)}apply();
}

/* ---------- Trending repos (GitHub, real-time) ---------- */
var repoBox=$('[data-repos]');
if(repoBox){
  var since=new Date(Date.now()-7*864e5).toISOString().slice(0,10);
  var lim=+repoBox.getAttribute('data-limit')||12;
  var render=function(items){repoBox.innerHTML=items.slice(0,lim).map(function(r){
    return '<div class="card repo"><div class="repo-top"><span class="stars">★ '+(r.stargazers_count||r.stars||0).toLocaleString()+'</span> <span class="lang">· '+esc(r.language||'Multi')+'</span></div>'+
    '<h3 style="margin-top:6px"><a href="'+esc(r.html_url||r.url)+'" target="_blank" rel="noopener nofollow">'+esc(r.full_name||r.name)+'</a></h3><p class="small">'+esc((r.description||'No description provided.').slice(0,150))+'</p></div>'}).join('')};
  fetch('https://api.github.com/search/repositories?q=created:>'+since+'&sort=stars&order=desc&per_page=30')
   .then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){render(d.items||[])})
   .catch(function(){fetch(ROOT+'data/repos.json').then(function(r){return r.json()}).then(function(d){render(d.items||[])}).catch(function(){repoBox.innerHTML='<p class="dim">Trending data is refreshing.</p>'})});
}

/* ---------- Tools directory + compare ---------- */
var toolBox=$('[data-tools]');
if(toolBox){
  fetch(ROOT+'data/tools.json').then(function(r){return r.json()}).then(function(tools){
    var limit=+toolBox.getAttribute('data-limit')||999,cat='All',picked=[];
    var fbox=$('#tool-filters'),q=$('#tool-q'),bar=$('.compare-bar');
    if(fbox){var cats={};tools.forEach(function(t){cats[t.category]=1});
      fbox.innerHTML=['All'].concat(Object.keys(cats).sort()).map(function(c){return '<button class="chip'+(c==='All'?' on':'')+'" data-c="'+esc(c)+'">'+esc(c)+'</button>'}).join('');
      $$('.chip',fbox).forEach(function(b){b.addEventListener('click',function(){$$('.chip',fbox).forEach(function(x){x.classList.remove('on')});b.classList.add('on');cat=b.getAttribute('data-c');draw()})});
    }
    if(q)q.addEventListener('input',draw);
    function draw(){
      var term=(q&&q.value||'').toLowerCase();
      var list=tools.filter(function(t){return (cat==='All'||t.category===cat)&&(!term||(t.name+' '+t.desc+' '+t.tags.join(' ')).toLowerCase().indexOf(term)>-1)});
      if(toolBox.hasAttribute('data-featured'))list=list.filter(function(t){return t.featured});
      toolBox.innerHTML=list.slice(0,limit).map(function(t){
        return '<div class="card tool"><div class="tool-top"><div class="tool-logo">'+esc(t.name.charAt(0))+'</div><div><h3>'+esc(t.name)+'</h3><span class="small dim">'+esc(t.category)+'</span></div></div>'+
        '<p>'+esc(t.desc)+'</p><div>'+t.tags.map(function(g){return '<span class="tag">'+esc(g)+'</span>'}).join('')+'<span class="tag new">'+esc(t.pricing)+'</span></div>'+
        '<div class="foot">'+(bar?'<label class="cmp"><input type="checkbox" data-pick="'+esc(t.name)+'"'+(picked.indexOf(t.name)>-1?' checked':'')+'> Compare</label>':'<span></span>')+
        '<a class="btn btn-ghost btn-sm" href="'+esc(t.url)+'" target="_blank" rel="noopener nofollow">Visit ↗</a></div></div>'}).join('')||'<p class="dim">No tools match that search.</p>';
      $$('[data-pick]',toolBox).forEach(function(c){c.addEventListener('change',function(){
        var n=c.getAttribute('data-pick');
        if(c.checked){if(picked.length>=3){c.checked=false;alertBar('Compare up to 3 tools at once.');return}picked.push(n)}else picked=picked.filter(function(x){return x!==n});
        updBar()})});
    }
    function alertBar(t){var s=$('.compare-bar span');if(s){s.textContent=t;setTimeout(updBar,1600)}}
    function updBar(){if(!bar)return;bar.classList.toggle('on',picked.length>0);$('span',bar).textContent=picked.length+' selected: '+picked.join(', ')}
    if(bar){$('[data-do-compare]',bar).addEventListener('click',function(){
      var sel=tools.filter(function(t){return picked.indexOf(t.name)>-1});
      var rows=[['Category','category'],['Pricing','pricing'],['Best for','best'],['What it does','desc']];
      $('#cmp-out').innerHTML='<table class="cmp-t"><tr><th></th>'+sel.map(function(t){return '<th>'+esc(t.name)+'</th>'}).join('')+'</tr>'+
        rows.map(function(r){return '<tr><th>'+r[0]+'</th>'+sel.map(function(t){return '<td>'+esc(t[r[1]])+'</td>'}).join('')+'</tr>'}).join('')+
        '<tr><th>Tags</th>'+sel.map(function(t){return '<td>'+esc(t.tags.join(', '))+'</td>'}).join('')+'</tr></table>';
      $('#cmp-modal').classList.add('on');
    });$('[data-clear]',bar).addEventListener('click',function(){picked=[];updBar();draw()})}
    draw();
  });
}

/* ---------- YouTube facades (load on click; privacy-enhanced) ---------- */
$$('.vid[data-list]').forEach(function(v){
  var play=function(){v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/videoseries?list='+encodeURIComponent(v.getAttribute('data-list'))+'&autoplay=1" title="'+esc(v.getAttribute('data-title'))+'" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>'};
  v.addEventListener('click',play,{once:true});
  v.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();play()}},{once:true});
});

/* ---------- Contest countdown (rolls to end of current month) ---------- */
var cd=$('[data-countdown]');
if(cd){var tick=function(){var n=new Date(),end=new Date(n.getFullYear(),n.getMonth()+1,1)-n;
  var d=Math.floor(end/864e5),h=Math.floor(end%864e5/36e5),m=Math.floor(end%36e5/6e4),s=Math.floor(end%6e4/1e3);
  cd.innerHTML=[[d,'days'],[h,'hrs'],[m,'min'],[s,'sec']].map(function(x){return '<div><b>'+x[0]+'</b><span class="small dim">'+x[1]+'</span></div>'}).join('')};tick();setInterval(tick,1000)}
var mo=$$('[data-month]');mo.forEach(function(e){e.textContent=new Date().toLocaleString('en',{month:'long',year:'numeric'})});

/* ---------- Donation amount picker ---------- */
$$('[data-amount]').forEach(function(b){b.addEventListener('click',function(){
  var f=$('#donate-form');if(!f)return;f.querySelector('[name=amount]').value=b.getAttribute('data-amount');
  f.querySelector('[name=tier]').value=b.getAttribute('data-tier')||'';f.scrollIntoView({behavior:'smooth',block:'center'});
})});
})();
