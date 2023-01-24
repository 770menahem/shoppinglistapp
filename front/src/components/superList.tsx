import { useState } from 'react';
import Aisle from '../types/aisle.type';
import DepartmentType from '../types/department.type';
import Product from '../types/product.type';
import Supermarket from '../types/supermarket.type';

import { Department } from './Department';

type Props = {
  supermarkets: Supermarket[];
  chooseSupermarket: (supermarket: Supermarket) => void;
  chooseDepartment: (department: DepartmentType, supermarket: Supermarket) => void;
  chooseAisle: (aisle: Aisle, department: DepartmentType, supermarket: Supermarket) => void;
  deleteEntity: (id: string, type: string) => void;
  chooseNone: () => void;
};

export default function SuperList({
  supermarkets,
  chooseSupermarket,
  chooseDepartment,
  chooseAisle,
  deleteEntity,
  chooseNone,
}: Props) {
  const [chooseSuper, setChooseSuper] = useState<Supermarket | undefined>(undefined);

  return (
    <div onClick={() => chooseNone()}>
      <h2>Supermarket List</h2>

      <div
        className='supermarkets'
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'space-around',
          padding: '5px',
          width: '80vw',
        }}
      >
        <div
          style={{
            margin: '0 10px',
            padding: '2px',
            cursor: 'pointer',
          }}
        >
          {supermarkets.map((supermarket) => {
            return (
              <div
                key={supermarket._id}
                onClick={() => setChooseSuper(supermarket)}
                style={{ border: '1px solid black', margin: '0 2px', padding: '5px' }}
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
        <div>
          {supermarkets
            .filter((supermarket) => supermarket._id === chooseSuper?._id)
            .map((supermarket) => {
              return (
                <div key={supermarket._id} style={{ border: '1px solid black' }}>
                  <span onClick={() => deleteEntity(supermarket._id!, 'supermarket')}>x</span>
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
                      cursor: 'pointer',
                      flexWrap: 'wrap',
                      border: '1px solid black',
                      alignItems: 'center',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      chooseSupermarket(supermarket);
                    }}
                  >
                    {supermarket.departments.map((department) => {
                      return (
                        <div
                          key={department._id}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',

                            flexWrap: 'wrap',
                            padding: '2px',
                            cursor: 'pointer',
                            border: '1px solid black',
                          }}
                        >
                          <Department
                            supermarket={supermarket}
                            department={department} // department is a Department type
                            chooseDepartment={chooseDepartment}
                            chooseAisle={chooseAisle}
                            deleteEntity={deleteEntity}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
