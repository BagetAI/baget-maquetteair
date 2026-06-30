const catalog = [
  { code: 'MAQ-001', era: 'WWII', manufacturer: 'Tamiya', subject: 'Supermarine Spitfire Mk.Vb', paint: 'Ocean Gray / Dark Green', equivalent: 'FS 36152 / RAF chip cross-check', livery: '1942 Eastern Front escort, RAF Day Fighter Scheme' },
  { code: 'MAQ-002', era: 'WWII', manufacturer: 'Airfix', subject: 'Messerschmitt Bf 109G-6', paint: 'RLM 74 / 75 / 76', equivalent: 'Gunze H66 / H417 / H417 notes', livery: 'Late-war Luftwaffe intercept, Balkan theater' },
  { code: 'MAQ-003', era: 'Cold War', manufacturer: 'Hasegawa', subject: 'McDonnell F-4E Phantom II', paint: 'SEA Tactical Scheme', equivalent: 'FS 34079 / 34102 / 30219', livery: 'USAF Southeast Asia, 1972 line jet' },
  { code: 'MAQ-004', era: 'Cold War', manufacturer: 'Revell', subject: 'F-104G Starfighter', paint: 'Natural Metal + anti-glare olive', equivalent: 'Aluminum lacquer / Olive Drab panel', livery: 'Luftwaffe JaboG 31, late 1960s' },
  { code: 'MAQ-005', era: 'Modern', manufacturer: 'Tamiya', subject: 'F-35A Lightning II', paint: 'Low-Visibility Gray', equivalent: 'FS 36170 / custom RAM note', livery: 'USAF production finish, operational test airframe' },
  { code: 'MAQ-006', era: 'Modern', manufacturer: 'Revell', subject: 'Dassault Rafale C', paint: 'Blue-gray airframe blend', equivalent: 'FS 35237 family / marine note', livery: 'French Air and Space Force air-police scheme' }
];

const liveryStrip = [
  { title: 'RAF Day Fighter', detail: 'Spitfire Mk.Vb / 1942' , color: '#8a9380' },
  { title: 'Luftwaffe Late War', detail: 'Bf 109G-6 / 1944' , color: '#9aa0a0' },
  { title: 'SEA Tactical', detail: 'F-4E Phantom II / 1972' , color: '#816b4e' },
  { title: 'Low-Visibility Gray', detail: 'F-35A / current' , color: '#d6d9dd' }
];

const results = document.getElementById('results');
const eraFilter = document.getElementById('eraFilter');
const manufacturerFilter = document.getElementById('manufacturerFilter');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const strip = document.getElementById('liveryStrip');
const form = document.getElementById('signupForm');
const status = document.getElementById('formStatus');

function renderRows(items) {
  results.innerHTML = items.map(item => `
    <article class="row">
      <div class="code">${item.code}</div>
      <div>
        <strong>${item.subject}</strong>
        <div class="meta">${item.paint}</div>
      </div>
      <div class="meta">
        <strong>${item.equivalent}</strong><br />
        Manufacturer: ${item.manufacturer}
      </div>
      <div class="badge">${item.era}</div>
      <div class="meta" style="grid-column: 1 / -1; padding-top: 2px;">${item.livery}</div>
    </article>
  `).join('');
  resultCount.textContent = `${items.length} reference${items.length === 1 ? '' : 's'}`;
}

function applyFilters() {
  const era = eraFilter.value;
  const manufacturer = manufacturerFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  const filtered = catalog.filter(item => {
    const text = `${item.code} ${item.subject} ${item.paint} ${item.equivalent} ${item.livery} ${item.manufacturer} ${item.era}`.toLowerCase();
    return (era === 'all' || item.era === era) &&
      (manufacturer === 'all' || item.manufacturer === manufacturer) &&
      (!query || text.includes(query));
  });

  renderRows(filtered.length ? filtered : catalog.slice(0, 2));
}

function renderStrip() {
  strip.innerHTML = liveryStrip.map(item => `
    <div class="swatch" style="background: linear-gradient(180deg, ${item.color}, #ffffff 88%);">
      <strong>${item.title}</strong>
      <span>${item.detail}</span>
    </div>
  `).join('');
}

eraFilter.addEventListener('change', applyFilters);
manufacturerFilter.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = `Request noted for ${document.getElementById('intentInput').value}. We will open the first catalog set around that search pattern.`;
  form.reset();
});

renderStrip();
renderRows(catalog);
