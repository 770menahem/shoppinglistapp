import ProductType from '../types/product.type';

export function Product({
  product,
  deleteEntity,
}: {
  product: ProductType;
  deleteEntity: (id: string, type: string) => void;
}): JSX.Element {
  return (
    <div style={{ padding: '1px', display: 'flex', flexDirection: 'column' }}>
      <span onClick={() => deleteEntity(product._id!, 'product')}>x</span>
      <span>{product.name}</span>
    </div>
  );
}
