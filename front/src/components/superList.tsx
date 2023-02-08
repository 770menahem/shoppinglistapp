import { observer } from 'mobx-react-lite';
import { useMutation, useQueryClient } from 'react-query';
import api from '../api';
import store from '../store';
// import { deleteSupermarket } from '../store/actions';

import Department from './Department';

function SuperList() {
  const { supermarket, reset } = store;

  const chooseSupermarket = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    store.setCurrSupermarketId = supermarket._id;
  };

  const reloadSupermarkets = useMutation({
    mutationFn: api.getSupermarkets,
    onSuccess: (data) => {
      store.setSupermarkets = data;
      if (!data.map((d: { _id: string }) => d._id).includes(store.currSupermarketId)) {
        store.setSupermarket = data[0];
      }
    },
  });

  const deleteSupermarket = useMutation({
    mutationFn: api.deleteSupermarket,
    onSuccess: () => {
      reloadSupermarkets.mutate();
      reset();
    },
  });

  return (
    <div>
      <div style={{ border: '1px solid green' }}>
        {store.currSupermarketId === supermarket._id && (
          <span onClick={() => deleteSupermarket.mutate(supermarket._id)}>x</span>
        )}
        <div>
          {supermarket.name}
          <br />
          {supermarket.location}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '2px',
            justifyContent: 'center',
          }}
        >
          {supermarket.departments.map((department) => {
            return <Department key={department._id} department={department} />;
          })}
        </div>
      </div>
      <div onClick={chooseSupermarket}>+</div>
    </div>
  );
}

export default observer(SuperList);
