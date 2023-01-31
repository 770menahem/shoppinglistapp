import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import store from '../store';
import { changeAisleDirection, deleteAisle } from '../store/actions';
import AisleType, { Directions } from '../types/aisle.type';
import DirectionSelect from './directionSelect';
import Modal from './modal';
import Product from './Product';

export default observer(function Aisle({ aisle }: { aisle: AisleType }): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState<Directions>(aisle.direction);

  useEffect(() => {
    if (direction !== aisle.direction) {
      changeAisleDirection(aisle._id, direction);
    }
  }, [direction]);

  const isHorizontal = aisle.direction?.includes('horizontal');

  return (
    <div
      style={{
        width: isHorizontal ? '-webkit-fill-available' : '100%',
        height: !isHorizontal ? '-webkit-fill-available' : '100%',
        border: '1px solid purple',
        margin: '5px',
      }}
      onClick={(e) => {
        e.stopPropagation();
        store.setCurrAisleId = aisle._id;
      }}
    >
      {isModalOpen && (
        <Modal isOpen={true} onClose={() => setIsModalOpen(false)}>
          <div>
            <span>Change aisle direction</span>
            <DirectionSelect direction={direction} setDirection={setDirection} />
          </div>
        </Modal>
      )}
      {store.currAisleId === aisle._id && <span onClick={() => deleteAisle(aisle._id)}>x</span>}
      <div onClick={(e) => setIsModalOpen(true)}>{aisle.number}</div>
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
    </div>
  );
});
