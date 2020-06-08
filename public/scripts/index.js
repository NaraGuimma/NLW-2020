const buttonSearch = document.querySelector('#page-home main a');
const modal = document.querySelector('#modal');
const close = document.querySelector('#modal .header a');
// let searchCity = document.getElementById('searchCity');

// addEventListener só funciona em um elemente
// querySelectorAll retorna uma lista de elementos
buttonSearch.addEventListener('click', () => {
  // modal.classList.toggle("hide")
  modal.classList.remove('hide');
  searchCity.focus();
});

close.addEventListener('click', () => {
  modal.classList.add('hide');
});
