import { useEffect } from 'react';
import { RootState } from '../store';
import { getSupers, getSuper } from '../store/asyncThunks';
import { useAppDispatch, useAppSelector } from '../store/reducers';

export function SuperNamesList() {
  const dispatch = useAppDispatch();
  const supermarkets = useAppSelector((state: RootState) => state.supermarkets);

  useEffect(() => {
    dispatch(getSupers() as any);
  }, []);

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
            onClick={() => dispatch(getSuper(supermarket._id) as any)}
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
