import { useEffect, useState } from 'react';
import api from './api';
import './App.css';
import AddOption from './components/addOption';
import Choosing from './components/choosing';
import SuperList from './components/superList';
import Aisle from './types/aisle.type';
import Department from './types/department.type';
import Supermarket from './types/supermarket.type';

function App() {
  const [supermarkets, setSupermarkets] = useState<Supermarket[]>([]);
  const [supermarket, setSupermarket] = useState<Supermarket>();
  const [department, setDepartment] = useState<Department>();
  const [aisle, setAisle] = useState<Aisle>();

  const getSupers = async () => {
    const data = await api.getSupermarkets();
    setSupermarkets(data);
  };

  useEffect(() => {
    getSupers();
  }, []);

  const addSupermarket = async (name: string, location: string) => {
    const data = await api.createSupermarket(name, location);
    if (data) {
      getSupers();
    }
  };

  const addDepartment = async (name: string) => {
    const data = await api.createDepartment(name);
    if (data && supermarket) {
      await api.connectSupermarketToDepartment(supermarket._id!, data._id);
      getSupers();
    }
  };

  const addAisle = async (number: number) => {
    const data = await api.createAisle(number);
    if (data && department) {
      await api.connectDepartmentToAisle(department._id!, data._id);
      getSupers();
    }
  };

  const addProduct = async (name: string) => {
    const data = await api.createProduct(name);
    if (data && aisle) {
      await api.connectAisleToProduct(aisle._id!, data._id);
      getSupers();
    }
  };

  const deleteEntity = async (id: string, type: string) => {
    if (type === 'supermarket') {
      await api.deleteSupermarket(id);
    } else if (type === 'department') {
      await api.deleteDepartment(id);
    } else if (type === 'aisle') {
      await api.deleteAisle(id);
    } else if (type === 'product') {
      await api.deleteProduct(id);
    }

    getSupers();
  };

  return (
    <div className='App'>
      <AddOption
        supermarket={!supermarket ? '' : supermarket?.name + ' ' + supermarket?.location}
        department={department?.name}
        aisle={aisle?.number.toString()}
        addSupermarket={(txt: string, location: string) => addSupermarket(txt, location)}
        addDepartment={(txt: string) => addDepartment(txt)}
        addAisle={(num: number) => addAisle(num)}
        addProduct={(txt: string) => addProduct(txt)}
      />

      <SuperList
        supermarkets={supermarkets}
        deleteEntity={(id: string, type: string) => deleteEntity(id, type)}
        chooseNone={() => {
          console.log('none');

          setSupermarket(undefined);
          setAisle(undefined);
          setDepartment(undefined);
        }}
        chooseSupermarket={(supermarket: Supermarket) => {
          console.log('supermarket');

          setSupermarket(supermarket);
          setAisle(undefined);
          setDepartment(undefined);
        }}
        chooseDepartment={(department: Department, supermarket: Supermarket) => {
          console.log('department');
          setSupermarket(supermarket);
          setDepartment(department);
          setAisle(undefined);
        }}
        chooseAisle={(aisle: Aisle, department: Department, supermarket: Supermarket) => {
          console.log('aisle');
          setSupermarket(supermarket);
          setDepartment(department);
          setAisle(aisle);
        }}
      />
    </div>
  );
}

export default App;
