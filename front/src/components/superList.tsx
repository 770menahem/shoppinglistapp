import { observer } from 'mobx-react-lite';
import store from '../store';
import { deleteSupermarket } from '../store/actions';

import Department from './Department';

function SuperList() {
  const { supermarket, reset } = store;

  const chooseSupermarket = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    store.setCurrSupermarketId = supermarket._id;
  };

  return (
    <div onClick={chooseSupermarket}>
      <div style={{ border: '1px solid green' }}>
        {store.currSupermarketId === supermarket._id && (
          <span onClick={() => deleteSupermarket(supermarket._id)}>x</span>
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
    </div>
  );
}

export default observer(SuperList);
