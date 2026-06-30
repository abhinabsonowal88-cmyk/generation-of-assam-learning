// ---------- DATA ----------
const categories = ["SSC GD","Assam Police AB","Assam Police UB","Assam Police SI","Assam Rifles","BSF","CRPF","CISF","ITBP","SSB","Railway","Banking","Other Government Exams"];

const books = [
  {name:"SSC GD Complete Guide", cat:"SSC GD", desc:"Full syllabus coverage with chapter-wise practice sets and previous year papers.", price:"₹249", rating:"4.9"},
  {name:"Assam Police AB Premium Notes", cat:"Assam Police", desc:"Concise, exam-focused notes for Assam Police Armed Branch recruitment.", price:"₹199", rating:"4.8"},
  {name:"Assam Police UB Premium Notes", cat:"Assam Police", desc:"Complete preparation kit for Unarmed Branch constable recruitment.", price:"₹199", rating:"4.7"},
  {name:"Assam Police SI Complete Preparation", cat:"Assam Police", desc:"In-depth guide for Sub-Inspector exam with mock tests and analysis.", price:"₹299", rating:"4.9"},
  {name:"Assam Rifles Preparation Guide", cat:"Assam Rifles", desc:"Topic-wise breakdown tailored to the Assam Rifles recruitment pattern.", price:"₹249", rating:"4.8"},
  {name:"General Knowledge — Assam Edition", cat:"General Knowledge", desc:"Assam-specific GK covering history, culture, geography and current affairs.", price:"₹149", rating:"4.7"},
  {name:"Current Affairs Monthly", cat:"Current Affairs", desc:"A fresh, exam-ready current affairs digest delivered every month.", price:"₹99", rating:"4.6"},
  {name:"English Grammar Master Book", cat:"Skills", desc:"Builds strong grammar fundamentals tested across every competitive exam.", price:"₹179", rating:"4.7"},
  {name:"Mathematics Shortcut Tricks", cat:"Skills", desc:"Speed-focused shortcut methods to save crucial minutes in the exam hall.", price:"₹179", rating:"4.8"},
  {name:"Reasoning Master Book", cat:"Skills", desc:"Pattern-based reasoning practice with detailed solved examples.", price:"₹179", rating:"4.7"},
];

// ---------- RENDER BOOKS ----------
const grid = document.getElementById('bookGrid');
function renderBooks(filter){
  grid.innerHTML = "";
  books.filter(b => filter==="All" || b.cat===filter).forEach(b=>{
    const card = document.createElement('div');
    card.className = "book-card";
    card.innerHTML = `
      <div class="book-cover">
        <span class="tag">${b.cat}</span>
        <h5>${b.name}</h5>
      </div>
      <div class="book-body">
        <p>${b.desc}</p>
        <div class="book-meta">
          <span class="price">${b.price}</span>
          <span class="rating">★ ${b.rating}</span>
        </div>
        <div class="book-actions">
          <button class="btn btn-outline" onclick="alert('Preview is a UI demo. Wire this up to your PDF preview or sample chapter.')">Preview</button>
          <button class="btn btn-gold" onclick="alert('Buy Now is a UI demo. Connect a payment gateway (e.g. Razorpay/Stripe) to process real purchases.')">Buy Now</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}
renderBooks("All");

document.getElementById('filterRow').addEventListener('click', e=>{
  if(!e.target.classList.contains('chip')) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  e.target.classList.add('active');
  renderBooks(e.target.dataset.cat);
});
function filterByCat(cat){
  const match = [...document.querySelectorAll('.chip')].find(c=>c.dataset.cat===cat);
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  if(match){ match.classList.add('active'); renderBooks(cat); }
  else { renderBooks("All"); }
  document.getElementById('ebooks').scrollIntoView({behavior:'smooth'});
}

// ---------- SEARCH SUGGESTIONS ----------
const input = document.getElementById('heroSearch');
const suggestBox = document.getElementById('suggestBox');
input.addEventListener('input', ()=>{
  const v = input.value.trim().toLowerCase();
  if(!v){ suggestBox.classList.remove('show'); return; }
  const matches = categories.filter(c=>c.toLowerCase().includes(v));
  if(matches.length===0){ suggestBox.classList.remove('show'); return; }
  suggestBox.innerHTML = matches.map(m=>`<a href="#ebooks" onclick="quickSearch('${m.replace(/'/g,"")}')">${m} <span class="tag">Exam category</span></a>`).join('');
  suggestBox.classList.add('show');
});
document.addEventListener('click', e=>{
  if(!suggestBox.contains(e.target) && e.target!==input) suggestBox.classList.remove('show');
});
function quickSearch(term){
  suggestBox.classList.remove('show');
  input.value = term;
  const broad = books.some(b=>b.cat===term) ? term : "All";
  renderBooks(broad);
}

// ---------- THEME TOGGLE ----------
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', ()=>{
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.textContent = isDark ? '🌙' : '☀️';
});

// ---------- COUNTERS ----------
const counters = document.querySelectorAll('.counter');
let countersStarted = false;
function animateCounters(){
  counters.forEach(el=>{
    const target = parseInt(el.dataset.target);
    const decimal = el.dataset.decimal ? parseInt(el.dataset.decimal) : null;
    let cur = 0;
    const step = Math.max(target/60,1);
    const t = setInterval(()=>{
      cur += step;
      if(cur>=target){ cur = target; clearInterval(t); }
      el.textContent = decimal ? (cur/decimal).toFixed(1) : Math.floor(cur).toLocaleString();
    }, 25);
  });
}
const statsObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !countersStarted){ countersStarted = true; animateCounters(); }
  });
},{threshold:.4});
statsObserver.observe(document.querySelector('.stats-band'));

// ---------- AUTH MODAL (mock) ----------
function openAuth(tab){
  document.getElementById('authModal').classList.add('show');
  switchTab(tab);
}
function closeAuth(){ document.getElementById('authModal').classList.remove('show'); }
function switchTab(tab){
  const isLogin = tab==='login';
  document.getElementById('tabLogin').classList.toggle('active', isLogin);
  document.getElementById('tabSignup').classList.toggle('active', !isLogin);
  document.getElementById('modalTitle').textContent = isLogin ? 'Welcome back' : 'Create your account';
  document.getElementById('signupName').style.display = isLogin ? 'none' : 'block';
}
function mockLogin(){
  closeAuth();
  document.getElementById('authArea').innerHTML = `
    <div class="profile-chip" onclick="alert('Account Settings, Purchased Ebooks and Logout would live in a real dashboard once Firebase is connected.')">
      <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop">
      <span>Rituraj B.</span>
    </div>`;
}