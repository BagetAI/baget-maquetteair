const chips = document.querySelectorAll('.chip');
const search = document.getElementById('search');
const rows = document.querySelectorAll('.catalog-row');

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ');
}

function applyFilters() {
  const query = normalize(search.value);
  const active = [...chips].find((chip) => chip.classList.contains('active'))?.textContent || '';
  const activeQuery = normalize(active);

  rows.forEach((row) => {
    const text = normalize(row.textContent);
    const visible = text.includes(query) && (activeQuery ? text.includes(activeQuery) : true);
    row.style.display = visible ? '' : 'none';
  });
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((btn) => btn.classList.remove('active'));
    chip.classList.add('active');
    applyFilters();
  });
});

search.addEventListener('input', applyFilters);
applyFilters();
