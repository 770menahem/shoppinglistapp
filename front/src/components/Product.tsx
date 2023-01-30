import { deleteProduct } from '../store/asyncThunks';
import { useAppDispatch } from '../store/reducers';
import ProductType from '../types/product.type';

export function Product({ product }: { product: ProductType }): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        padding: '1px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: '1px solid black',
        lineHeight: '1',
      }}
    >
      <span onClick={() => dispatch(deleteProduct(product._id!) as any)}>x</span>
      <span>{product.name}</span>
    </div>
  );
}
