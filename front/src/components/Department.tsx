import { observer } from 'mobx-react-lite';
import { useQueryClient, useMutation } from 'react-query';
import api from '../api';
import store from '../store';
// import { deleteDepartment } from '../store/actions';
import DepartmentType from '../types/department.type';
import Aisle from './Aisle';

export default observer(function Department({
  department,
}: {
  department: DepartmentType;
}): JSX.Element {
  const result = department.aisles.reduce(
    (acc, aisle) => {
      if (aisle.direction?.includes('end')) {
        acc[2].push(aisle);
      } else if (aisle.direction?.includes('start')) {
        acc[0].push(aisle);
      } else {
        acc[1].push(aisle);
      }
      return acc;
    },
    [[], [], []] as typeof department.aisles[]
  );

  const reloadSuper = useMutation({
    mutationFn: () => api.getSupermarket(store.currSupermarketId),
    onSuccess: (data) => {
      store.setSupermarket = data;
    },
  });
  const deleteDepartment = useMutation({
    mutationFn: (id: string) => api.deleteDepartment(id),
    onSuccess: () => {
      reloadSuper.mutate();
    },
  });

  return (
    <div
      style={{
        padding: '2px',
        margin: '2px',
        cursor: 'pointer',
        border: '1px solid blue',
      }}
    >
      {store.currDepartmentId === department._id && (
        <span onClick={() => deleteDepartment.mutate(department._id)}>x</span>
      )}

      <div>{department.name}</div>
      {result.map((aisles, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
          {aisles.map((aisle) => {
            return <Aisle key={aisle._id} aisle={aisle} />;
          })}
        </div>
      ))}

      <div
        onClick={(e) => {
          e.stopPropagation();
          console.log('department clicked');
          store.setCurrDepartmentId = department._id;
        }}
      >
        +
      </div>
    </div>
  );
});
