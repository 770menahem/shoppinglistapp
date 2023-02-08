import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import api from '../api';
import store from '../store';
// import { changeAisleDirection, deleteAisle } from '../store/actions';
import AisleType, { Directions } from '../types/aisle.type';
import DirectionSelect from './directionSelect';
import Modal from './modal';
import Product from './Product';

export default observer(function Aisle({ aisle }: { aisle: AisleType }): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState<Directions>(aisle.direction);

  const reloadSuper = useMutation({
    mutationFn: () => api.getSupermarket(store.currSupermarketId),
    onSuccess: (data) => {
      store.setSupermarket = data;
    },
  });

  const change = useMutation({
    mutationFn: (p: { id: string; direction: Directions }) =>
      api.changeAisleDirection(p.id, p.direction),
    onSuccess: () => {
      reloadSuper.mutate();
    },
  });

  useEffect(() => {
    if (direction !== aisle.direction) {
      change.mutate({ id: aisle._id, direction });
    }
  }, [direction]);

  const isHorizontal = aisle.direction?.includes('horizontal');

  const deleteAisle = useMutation({
    mutationFn: (id: string) => api.deleteAisle(id),
    onSuccess: () => {
      reloadSuper.mutate();
    },
  });

  return (
    <div
      style={{
        width: isHorizontal ? '-webkit-fill-available' : '100%',
        height: !isHorizontal ? '-webkit-fill-available' : '100%',
        border: '1px solid purple',
        margin: '5px',
      }}
    >
      {isModalOpen && (
        <Modal isOpen={true} onClose={() => setIsModalOpen(false)}>
          <div>
            <span>Change aisle direction</span>
            <DirectionSelect
              direction={direction}
              setDirection={(dir: Directions) => {
                setDirection(dir);
                setIsModalOpen(false);
              }}
            />
          </div>
        </Modal>
      )}
      {store.currAisleId === aisle._id && (
        <span onClick={() => deleteAisle.mutate(aisle._id)}>x</span>
      )}
      <div>{aisle.number}</div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        edit
      </div>
      <div>
        <div style={{ display: 'flex', flexDirection: !isHorizontal ? 'column' : 'row' }}>
          {aisle.products.map((product) => {
            return (
              <div key={product._id} style={{ margin: isHorizontal ? '5px 2px' : '2px 5px' }}>
                <Product product={product} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          store.setCurrAisleId = aisle._id;
        }}
      >
        +
      </div>
    </div>
  );
});
