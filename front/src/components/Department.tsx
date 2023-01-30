import { deleteDepartment } from '../store/asyncThunks';
import { setCurrDepartmentId, useAppDispatch } from '../store/reducers';
import DepartmentType from '../types/department.type';

import { Aisle } from './Aisle';

export function Department({ department }: { department: DepartmentType }): JSX.Element {
  const dispatch = useAppDispatch();

  const result = department.aisles.reduce(
    (acc, aisle) => {
      if (aisle.direction.includes('end')) {
        acc[2].push(aisle);
      } else if (aisle.direction.includes('start')) {
        acc[0].push(aisle);
      } else {
        acc[1].push(aisle);
      }
      return acc;
    },
    [[], [], []] as typeof department.aisles[]
  );

  return (
    <div
      style={{
        padding: '2px',
        margin: '2px',
        cursor: 'pointer',
        border: '1px solid black',
      }}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setCurrDepartmentId(department._id));
      }}
    >
      <span onClick={() => dispatch(deleteDepartment(department._id!) as any)}>x</span>

      <div>{department.name}</div>

      {result.map((aisles, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
          {aisles.map((aisle) => {
            return <Aisle key={aisle._id} aisle={aisle} />;
          })}
        </div>
      ))}
    </div>
  );
}
