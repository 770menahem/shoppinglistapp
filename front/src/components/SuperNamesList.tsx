import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import store from '../store';
// import { getSuper, getSupers } from '../store/actions';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import api from '../api';
function SuperNamesList() {
  const { supermarkets } = store;

  // useEffect(() => {
  //   store.getSupermarkets();
  // }, []);

  useQuery({
    queryKey: ['supers'],
    queryFn: api.getSupermarkets,
    onSuccess: (data) => {
      store.setSupermarkets = data;
      if (!data.map((d: { _id: string }) => d._id).includes(store.currSupermarketId)) {
        store.setSupermarket = data[0];
      }
    },
  });

  const queryClient = useQueryClient();
  const getSuper = useMutation({
    mutationFn: api.getSupermarket,
    onSuccess: (data) => {
      queryClient.setQueryData(['supers', data._id], data);

      store.setSupermarket = data;
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

        margin: '0 10px',
        padding: '2px',
        cursor: 'pointer',
      }}
    >
      {supermarkets.map((supermarket) => {
        return (
          <div
            key={supermarket._id}
            onClick={() => getSuper.mutate(supermarket._id) as any}
            style={{ borderBottom: '1px solid black', margin: '0 2px', padding: '5px' }}
          >
            <div>
              {supermarket.name}
              <br />
              {supermarket.location}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default observer(SuperNamesList);
