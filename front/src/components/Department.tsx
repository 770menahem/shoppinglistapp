import { deleteDepartment } from '../store/asyncThunks';
import { setCurrDepartmentId, useAppDispatch } from '../store/reducers';
import AisleType from '../types/aisle.type';
import DepartmentType from '../types/department.type';
import Supermarket from '../types/supermarket.type';
import { Aisle } from './Aisle';

export function Department({ department }: { department: DepartmentType }): JSX.Element {
  const dispatch = useAppDispatch();
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

      <div style={{}}>
        {department.aisles.find((aisle) => aisle.direction.includes('start')) && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {department.aisles
              .filter((aisle) => aisle.direction.includes('start'))
              .map((aisle) => {
                return <Aisle key={aisle._id} aisle={aisle} />;
              })}
          </div>
        )}

        {
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {department.aisles
              .filter(
                (aisle) => !aisle.direction.includes('start') && !aisle.direction.includes('end')
              )
              .map((aisle) => {
                return <Aisle key={aisle._id} aisle={aisle} />;
              })}
          </div>
        }
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {department.aisles
            .filter((aisle) => aisle.direction.includes('end'))
            .map((aisle) => {
              return <Aisle key={aisle._id} aisle={aisle} />;
            })}
        </div>
      </div>
    </div>
  );
}
