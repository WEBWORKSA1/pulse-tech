// Pulse.Tech self-updating feed builder.
// Runs on GitHub Actions (cron). Pulls public RSS/Atom headlines + GitHub trending
// and writes data/news.json + data/repos.json. Stores headline, link, source and date
// only — no article bodies — and always links back to the original publisher.
import { writeFile } from 'node:fs/promises';

const FEEDS = [
  ['TechCrunch','https://techcrunch.com/feed/','Startups'],
  ['The Verge','https://www.theverge.com/rss/index.xml','Gadgets'],
  ['Ars Technica','https://feeds.arstechnica.com/arstechnica/index','Science & Tech'],
  ['Engadget','https://www.engadget.com/rss.xml','Gadgets'],
  ['Wired','https://www.wired.com/feed/rss','Culture & Tech'],
  ['VentureBeat','https://venturebeat.com/feed/','AI'],
  ['The Next Web','https://thenextweb.com/feed','Startups'],
  ['ZDNET','https://www.zdnet.com/news/rss.xml','Enterprise'],
  ['TechRadar','https://www.techradar.com/rss','Gadgets'],
  ['Gizmodo','https://gizmodo.com/feed','Culture & Tech'],
  ['9to5Mac','https://9to5mac.com/feed/','Apple'],
  ['9to5Google','https://9to5google.com/feed/','Google & Android'],
  ['Android Authority','https://www.androidauthority.com/feed/','Google & Android'],
  ['BleepingComputer','https://www.bleepingcomputer.com/feed/','Security'],
  ['The Register','https://www.theregister.com/headlines.atom','Enterprise'],
  ["Tom's Hardware",'https://www.tomshardware.com/feeds/all','Hardware'],
  ['How-To Geek','https://www.howtogeek.com/feed/','How-To'],
  ['MIT Technology Review','https://www.technologyreview.com/feed/','AI'],
  ['Slashdot','https://rss.slashdot.org/Slashdot/slashdotMain','Developers'],
  ['Hacker News','https://hnrss.org/frontpage','Developers'],
  ['Digital Trends','https://www.digitaltrends.com/feed/','Gadgets'],
  ['InfoQ','https://feed.infoq.com/','Developers'],
];

const decode = s => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1')
  .replace(/<[^>]+>/g,'')
  .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
  .replace(/&quot;/g,'"').replace(/&#0?39;|&apos;/g,"'").replace(/&#8217;/g,'’')
  .replace(/&#8216;/g,'‘').replace(/&#8220;/g,'“').replace(/&#8221;/g,'”').replace(/&#8211;/g,'–').replace(/&#8212;/g,'—')
  .replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n)).trim();
const pick = (block, tag) => { const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`,'i')); return m ? decode(m[1]) : ''; };

async function getFeed([source,url,cat]){
  try{
    const ctl = new AbortController(); const t = setTimeout(()=>ctl.abort(), 15000);
    const res = await fetch(url,{signal:ctl.signal,headers:{'User-Agent':'PulseTechBot/1.0 (+headline aggregator)'}});
    clearTimeout(t); if(!res.ok) throw new Error(res.status);
    const xml = await res.text();
    const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
    return blocks.slice(0,12).map(b=>{
      let link = pick(b,'link');
      if(!link){ const m=b.match(/<link[^>]*href="([^"]+)"/i); link=m?m[1]:''; }
      const date = pick(b,'pubDate') || pick(b,'updated') || pick(b,'published') || pick(b,'dc:date');
      return { title: pick(b,'title').slice(0,220), link, source, cat, date: date ? new Date(date).toISOString() : new Date().toISOString() };
    }).filter(x=>x.title && /^https?:/.test(x.link));
  }catch(e){ console.warn('skip',source,e.message); return []; }
}

const results = (await Promise.all(FEEDS.map(getFeed))).flat();
const seen = new Set();
const items = results
  .filter(x=>{const k=x.title.toLowerCase().slice(0,70); if(seen.has(k)) return false; seen.add(k); return true;})
  .sort((a,b)=>Date.parse(b.date)-Date.parse(a.date))
  .slice(0,240);

if(items.length){
  await writeFile('data/news.json', JSON.stringify({updated:new Date().toISOString(), sources:FEEDS.length, items}, null, 1));
  console.log('news items', items.length);
}

try{
  const since = new Date(Date.now()-7*864e5).toISOString().slice(0,10);
  const h = {'Accept':'application/vnd.github+json','User-Agent':'PulseTechBot'};
  if(process.env.GITHUB_TOKEN) h.Authorization = 'Bearer '+process.env.GITHUB_TOKEN;
  const r = await fetch(`https://api.github.com/search/repositories?q=created:>${since}&sort=stars&order=desc&per_page=30`,{headers:h});
  const d = await r.json();
  if(d.items?.length){
    const repos = d.items.map(({full_name,html_url,description,language,stargazers_count})=>({full_name,html_url,description,language,stargazers_count}));
    await writeFile('data/repos.json', JSON.stringify({updated:new Date().toISOString(), items:repos}, null, 1));
    console.log('repos', repos.length);
  }
}catch(e){ console.warn('repos skip', e.message); }
