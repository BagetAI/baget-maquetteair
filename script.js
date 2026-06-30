const catalog = [
  {
    name: 'Messerschmitt Bf 109 G-6',
    era: 'World War II',
    manufacturer: 'RLM archive',
    paint: 'RLM 74 Graugrün',
    equivalence: 'approx. RAF Ocean Grey',
    livery: 'JG 27, Mediterranean theater',
    swatch: '#7c8475',
  },
  {
    name: 'Supermarine Spitfire Mk.Vb',
    era: 'World War II',
    manufacturer: 'British Spec',
    paint: 'Dark Green',
    equivalence: 'approx. FS 34079',
    livery: 'RAF Day Fighter Scheme',
    swatch: '#52614a',
  },
  {
    name: 'North American F-86F Sabre',
    era: 'Cold War',
    manufacturer: 'USAF finish',
    paint: 'Aluminum',
    equivalence: 'metallic natural metal',
    livery: 'Korean War air superiority',
    swatch: '#c7c1b7',
  },
  {
    name: 'Mitsubishi A6M5 Zero',
    era: 'World War II',
    manufacturer: 'IJN standard',
    paint: 'Amber Gray',
    equivalence: 'warm gray-green',
    livery: 'Carrier-based Pacific scheme',
    swatch: '#c4bcaa',
  },
  {
    name: 'Focke-Wulf Fw 190 A-8',
    era: 'World War II',
    manufacturer: 'RLM archive',
    paint: 'RLM 76 Lichtblau',
    equivalence: 'approx. pale sky blue',
    livery: 'Eastern Front intercept',
    swatch: '#b8c2c6',
  },
  {
    name: 'de Havilland Mosquito B Mk.IV',
    era: 'World War II',
    manufacturer: 'RAF reference',
    paint: 'Medium Sea Grey',
    equivalence: 'approx. FS 36270',
    livery: 'Pathfinder Force',
    swatch: '#8e9494',
  },
];

const sampleEntries = catalog.slice(0, 3);
const state = { search: '', era: 'All', manufacturer: 'All' };

const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const eraFilters = document.getElementById('eraFilters');
const manufacturerFilters = document.getElementById('manufacturerFilters');
const catalogPreview = document.getElementById('catalogPreview');
const resultCount = document.getElementById('resultCount');
const sampleStack = document.getElementById('sampleStack');
const waitlistForm = document.getElementById('waitlistForm');
const formNote = document.getElementById('formNote');

const eras = ['All', ...new Set(catalog.map((item) => item.era))];
const manufacturers = ['All', ...new Set(catalog.map((item) => item.manufacturer))];

function renderChips(container, items, key) {
  container.innerHTML = items
    .map(
      (item) => `
        <button class="chip${state[key] === item ? ' active' : ''}" type="button" data-filter="${key}" data-value="${item}">
          ${item}
        </button>`
    )
    .join('');
}

function matches(item) {
  const haystack = [item.name, item.era, item.manufacturer, item.paint, item.equivalence, item.livery]
    .join(' ')
    .toLowerCase();
  const term = state.search.toLowerCase();
  return (
    haystack.includes(term) &&
    (state.era === 'All' || item.era === state.era) &&
    (state.manufacturer === 'All' || item.manufacturer === state.manufacturer)
  );
}

function rowMarkup(item, variant = 'catalog') {
  return `
    <article class="${variant === 'sample' ? 'sample-row' : 'catalog-row'}">
      <div>
        <strong>${item.name}</strong>
        <span class="tag">${item.era}</span>
      </div>
      <div>
        <span class="tag">Manufacturer</span>
        <p>${item.manufacturer}</p>
      </div>
      <div>
        <span class="tag">Paint equivalence</span>
        <p><span class="swatch" style="background:${item.swatch}"></span>${item.paint}</p>
      </div>
      <div>
        <span class="tag">Sample livery</span>
        <p>${item.livery}</p>
      </div>
    </article>
  `;
}

function render() {
  const filtered = catalog.filter(matches);
  catalogPreview.innerHTML = filtered.map((item) => rowMarkup(item)).join('') || '<div class="catalog-row"><div><strong>No entries match.</strong><p>Try a different paint line, era, or livery keyword.</p></div></div>';
  sampleStack.innerHTML = sampleEntries.map((item) => rowMarkup(item, 'sample')).join('');
  resultCount.textContent = `${filtered.length} entr${filtered.length === 1 ? 'y' : 'ies'}`;
  renderChips(eraFilters, eras, 'era');
  renderChips(manufacturerFilters, manufacturers, 'manufacturer');
}

searchInput.addEventListener('input', (event) => {
  state.search = event.target.value.trim();
  render();
});

clearSearch.addEventListener('click', () => {
  state.search = '';
  searchInput.value = '';
  render();
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  const { filter, value } = button.dataset;
  state[filter] = value;
  render();
});

waitlistForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = 'Request captured for the 2026 index backlog.';
  waitlistForm.reset();
});

render();
