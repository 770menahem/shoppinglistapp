import Supermarket from '../../types/supermarket.type';

const findProduct = (item: ShoppingListItem, store: Supermarket) => {
    let aisles: number = -1;
    const department = store.departments.find((d) =>
        d.aisles.some((a) => {
            const foundAisles = a.products.find((p) => p.name === item.name);
            aisles = a.number;
            return foundAisles;
        }),
    );

    if (!department) {
        aisles = -1;
        store.aisles.some((a) => {
            const foundAisles = a.products.find((p) => p.name === item.name);
            aisles = a.number;
            return foundAisles;
        });
    }

    return new ShoppingListItem(item.name, item.quantity, department?.name, aisles);
};

export function optimizeShoppingList(map: Supermarket, list: ShoppingList): ShoppingList {
    const optimizedList = new ShoppingList();

    for (let i = 0; i < list.items.length; i++) {
        const item = list.items[i];
        const f = findProduct(item, map);
        optimizedList.addItem(f);
    }
    optimizedList.items.sort((a, b) => (a?.aisle || 0) - (b.aisle || 0));

    return optimizedList;
}
