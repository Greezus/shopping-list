var state = {
  items: [
    {name: 'milk', checked: false},
    {name: 'oranges', checked: false},
    {name: 'pepperoni', checked: true},
    {name: 'chicken', checked: false},
  ]
}

function addItem(state, item) {
  state.items.unshift(item);
}

function checkItem(item) {
  item.checked = !item.checked;
}

function deleteItem(index) {
  state.items.splice(index, 1);
}

function renderItems(state, element) {
  element.empty();
  var itemElements = state.items.map(function(item, index) {
    var itemElement = $(`
      <li id="js-item-${index}" class="js-shopping-item">
        <span class="js-shopping-item-name shopping-item">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="js-shopping-item-toggle shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="js-shopping-item-delete shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>
    `)
    if (item.checked) {
      itemElement.find('.js-shopping-item-name').addClass('shopping-item__checked');
    }
    return itemElement;
  });
  element.append(itemElements);
  return itemElements;
}

function setup() {
  $('.js-shopping-list').on('click', '.js-shopping-item-toggle', function(e) {
    var itemIndex = $(this).parents('.js-shopping-item').attr('id').split('-')[2];
    checkItem(state.items[itemIndex]);
    renderItems(state, $('.js-shopping-list'));
  });

  $('.js-shopping-list').on('click', '.js-shopping-item-delete', function(e) {
    var itemIndex = $(this).parents('.js-shopping-item').attr('id').split('-')[2];
    deleteItem(itemIndex);
    renderItems(state, $('.js-shopping-list'));
  });

  $('#js-shopping-list-form').on('submit', function(e) {
    e.preventDefault();
    var itemName = $('#shopping-list-entry').val();
    var newItem = {
      name: itemName,
      checked: false
    };
    addItem(state, newItem);
    $('#shopping-list-entry').val('')
    renderItems(state, $('.js-shopping-list'));
  });
}

function main() {
  setup();
  var shoppingListElement = $('.js-shopping-list');
  renderItems(state, shoppingListElement);
}

$(main());
