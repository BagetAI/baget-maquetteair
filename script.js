const searchInput = document.getElementById('search-input');
const form = document.getElementById('search-form');
const body = document.getElementById('catalog-body');
const count = document.getElementById('result-count');
const filters = [...document.querySelectorAll('.filter')];
const rows = [...body.querySelectorAll('tr')];

let activeEra = 'all';

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  rows.forEach((row) => {
    const matchesEra = activeEra === 'all' || row.dataset.era === activeEra;
    const searchable = `${row.dataset.search} ${row.innerText}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const show = matchesEra && matchesQuery;
    row.classList.toggle('hidden', !show);
    if (show) visible += 1;
  });

  count.textContent = `${visible} entr${visible === 1 ? 'y' : 'ies'} visible`;
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeEra = button.dataset.filter;
    applyFilters();
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  applyFilters();
});

searchInput.addEventListener('input', applyFilters);
applyFilters();
