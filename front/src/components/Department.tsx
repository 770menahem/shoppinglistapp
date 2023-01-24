import AisleType from '../types/aisle.type';
import DepartmentType from '../types/department.type';
import Supermarket from '../types/supermarket.type';
import { Aisle } from './Aisle';

export function Department({
  supermarket,
  department,
  chooseDepartment,
  chooseAisle,
  deleteEntity,
}: {
  supermarket: Supermarket;
  department: DepartmentType;
  chooseDepartment: (department: DepartmentType, supermarket: Supermarket) => void;
  chooseAisle: (aisle: AisleType, department: DepartmentType, supermarket: Supermarket) => void;
  deleteEntity: (id: string, type: string) => void;
}): JSX.Element {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        chooseDepartment(department, supermarket);
      }}
    >
      <span onClick={() => deleteEntity(department._id!, 'department')}>x</span>

      <div>{department.name}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {department.aisles.map((aisle) => {
          return (
            <div
              key={aisle._id}
              style={{
                display: 'flex',
                flexDirection: 'row',

                padding: '2px',
                margin: ' 0 5px',
                cursor: 'pointer',
                border: '1px solid black',
              }}
            >
              <Aisle
                aisle={aisle}
                department={department}
                supermarket={supermarket}
                chooseAisle={chooseAisle}
                deleteEntity={deleteEntity}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
