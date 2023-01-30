import { useEffect, useState } from 'react';
import { changeAisleDirection, deleteAisle } from '../store/asyncThunks';
import { setCurrAisleId, useAppDispatch } from '../store/reducers';
import AisleType, { Directions } from '../types/aisle.type';

import DirectionSelect from './directionSelect';
import Modal from './genericModal';
import { Product } from './Product';

type Props = {
  aisle: AisleType;
};

export function Aisle({ aisle }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState<Directions>(aisle.direction);

  useEffect(() => {
    if (direction !== aisle.direction) {
      dispatch(changeAisleDirection({ ...aisle, direction }) as any);
    }
  }, [direction]);

  return (
    <div
      style={{
        width: aisle.direction.includes('horizontal') ? '-webkit-fill-available' : '100%',
        height: aisle.direction.includes('vertical') ? '-webkit-fill-available' : '100%',
        border: '1px solid black',
        margin: '5px',
      }}
      id={`aisle-${aisle._id}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsModalOpen(true);
        dispatch(setCurrAisleId(aisle._id));
      }}
    >
      {isModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <div>
            <span>Change aisle direction</span>
            <DirectionSelect direction={direction} setDirection={setDirection} />
          </div>
        </Modal>
      )}
      <span
        onClick={(e) => {
          e.stopPropagation();
          dispatch(deleteAisle(aisle._id!) as any);
        }}
      >
        x{/* {aisle.direction.includes('horizontal') ? ' >' : ' v'} */}
      </span>
      <div>{aisle.number}</div>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: !aisle.direction.includes('horizontal') ? 'column' : 'row',
          }}
        >
          {aisle.products.map((product) => {
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setCurrAisleId(aisle._id));
                }}
                key={product._id}
                style={{
                  margin: aisle.direction.includes('horizontal') ? '5px 2px' : '2px 5px',
                }}
              >
                <Product product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
