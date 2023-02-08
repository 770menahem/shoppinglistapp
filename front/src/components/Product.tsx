import { observer } from 'mobx-react-lite';
import { useQueryClient, useMutation } from 'react-query';
import api from '../api';
import store from '../store';
// import { deleteProduct } from '../store/actions';
import ProductType from '../types/product.type';

export default observer(function Product({ product }: { product: ProductType }): JSX.Element {
  const queryClient = useQueryClient();
  const deleteProduct = useMutation({
    mutationFn: (id: string) => api.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['supers', store.currSupermarketId], { exact: true });
    },
  });

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
      {store.currProductId === product._id && (
        <span onClick={() => deleteProduct.mutate(product._id)}>x</span>
      )}
      <span>{product.name}</span>
    </div>
  );
});
