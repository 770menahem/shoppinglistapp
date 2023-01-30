import { RootState } from '../store';
import { deleteSupermarket } from '../store/asyncThunks';
import { reset, setCurrSupermarketId, useAppDispatch, useAppSelector } from '../store/reducers';

import { Department } from './Department';

export default function SuperList() {
  const currSuper = useAppSelector((state: RootState) => state.supermarket);
  const dispatch = useAppDispatch();

  const chooseSupermarket = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    dispatch(setCurrSupermarketId(currSuper._id));
  };
  return (
    <div onClick={() => dispatch(reset())}>
      <div>
        <div key={currSuper._id} style={{ border: '1px solid black' }}>
          <span onClick={() => dispatch(deleteSupermarket(currSuper._id!) as any)}>x</span>
          <div>
            {currSuper.name}
            <br />
            {currSuper.location}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '2px',
              cursor: 'pointer',
              border: '1px solid black',
              justifyContent: 'center',
            }}
            onClick={chooseSupermarket}
          >
            {currSuper.departments.map((department) => {
              return <Department key={department._id} department={department} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
