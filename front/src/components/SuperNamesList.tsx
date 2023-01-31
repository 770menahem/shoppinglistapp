import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import store from '../store';
import { getSuper, getSupers } from '../store/actions';

function SuperNamesList() {
  const { supermarkets } = store;

  useEffect(() => {
    getSupers();
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
            onClick={() => getSuper(supermarket._id) as any}
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
