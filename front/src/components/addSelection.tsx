import store from '../store';

export default function AddSelection() {
  const options = {
    Supermarket: { txt: 'Supermarket', func: store.setCurrSupermarketId },
    department: { txt: 'department', func: store.setCurrDepartmentId },
    Aisle: { txt: 'Aisle', func: store.setCurrAisleId },
    Product: { txt: 'Product', func: store.setCurrProductId },
  };

  return (
    <div>
      {Object.keys(options).map((optionKey) => {
        return (
          <div
            key={optionKey}
            onClick={() => {
              options[optionKey as keyof typeof options] = optionKey;
            }}
          >
            {optionKey}
          </div>
        );
      })}
    </div>
  );
}
