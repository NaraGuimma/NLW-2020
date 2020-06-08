nameEntity.focus();

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
  )
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('input[name=state]');

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;

  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`;

  citySelect.innerHTML = '<option value>Selecione a cidade</option>';
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document
  .querySelector('select[name=uf]')

  // passando a funcao por referencia, nao coloca ()
  .addEventListener('change', getCities);

// itens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll('.items-grid li');
for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('input[name=items]');

let selectedItems = [];
function handleSelectedItem() {
  // colocar uma classe como selected ou nao.
  // 1 click - selected
  // 2 clicks - not selected
  const itemLi = event.target;
  // o toggle é inteligente para adicionar ou remover um item identificando se ele já foi clicado antes ou nao
  itemLi.classList.toggle('selected');

  // so pegar o numero do data-id
  const itemId = itemLi.dataset.id;

  console.log('ITEM', itemId);

  // verificar se existem itens selecionados
  // pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex((item) => {
    // const itemFound = item === itemId;
    // return itemFound;
    return item === itemId;
  });

  // se já estiver selecionado, tirar da seleçao
  // if (alreadySelected != -1)

  if (alreadySelected >= 0) {
    // tirar da seleçao
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });
    selectedItems = filteredItems;
  } else {
    // se nao estiver selecionado, adicionar à seleçao
    // selectedItems.push(itemId);
    selectedItems = [...selectedItems, itemId];
  }
  console.log(selectedItems);
  // atualizar o campo input hidden com os itens selecionados

  collectedItems.value = selectedItems;
}
