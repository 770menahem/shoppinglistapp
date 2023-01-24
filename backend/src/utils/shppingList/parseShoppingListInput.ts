import { ShoppingList } from '../modules/ShoppingList';
import { ShoppingListItem } from '../modules/ShoppingListItem';

export function parseShoppingListInput(input: string): ShoppingList {
  // Parse the input string and create a ShoppingList object
  // with the appropriate ShoppingListItem objects.
  // For example:
  const list = new ShoppingList();
  input.split('\n').forEach((line) => {
    const [name, quantity] = line.split(',');
    list.addItem(new ShoppingListItem(name, parseInt(quantity, 10)));
  });
  return list;
}
