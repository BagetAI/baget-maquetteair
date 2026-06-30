const form = document.querySelector('.capture-form');
const email = document.querySelector('#email');
const query = document.querySelector('#query');
const button = document.querySelector('.search-bar button');

button.addEventListener('click', () => {
  query.value = 'Search catalog by era, manufacturer, or color code';
  query.focus();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = email.value.trim();
  if (!value) {
    email.focus();
    return;
  }
  form.innerHTML = '<div class="capture-confirmation"><strong>Request queued.</strong><span>We will send early access details to ' + value + '.</span></div>';
});
