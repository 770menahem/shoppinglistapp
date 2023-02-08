import { observer } from 'mobx-react-lite';
import React, { CSSProperties, useState } from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import api from '../api';
import store from '../store';
// import { createAisle, createDepartment, createProduct, createSuper } from '../store/actions';
import { Directions } from '../types/aisle.type';
import DirectionSelect from './directionSelect';

function AddOption() {
  const [supermarketName, setSupermarketName] = React.useState('');
  const [supermarketLocation, setSupermarketLocation] = React.useState('');
  const [departmentName, setDepartmentName] = React.useState('');
  const [aisleNumber, setAisleNumber] = React.useState('');
  const [productName, setProductName] = React.useState('');
  const [direction, setDirection] = useState<Directions>('vertical');

  const { supermarket, currSupermarketId, currDepartmentId, currAisleId } = store;
  const department = supermarket.departments.find((d) => d._id === currDepartmentId);
  const aisle = department?.aisles.find((a) => a._id === currAisleId);

  const styleFlex: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const queryClient = useQueryClient();

  const reloadSuper = useMutation({
    mutationFn: () => api.getSupermarket(currSupermarketId),
    onSuccess: (data) => {
      store.setSupermarket = data;
    },
  });

  const reloadSupermarkets = useMutation({
    mutationFn: api.getSupermarkets,
    onSuccess: (data) => {
      store.setSupermarkets = data;
      store.setSupermarket = data[data.length - 1];
    },
  });

  const createSuper = useMutation({
    mutationFn: (p: { name: string; location: string }) =>
      api.createSupermarket(p.name, p.location),
    onSuccess: () => {
      reloadSupermarkets.mutate();
    },
  });

  const createDepartment = useMutation({
    mutationFn: (name: string) => api.ccDepartment(name, currSupermarketId),
    onSuccess: () => {
      reloadSuper.mutate();
    },
  });

  const createAisle = useMutation({
    mutationFn: (p: { number: number; direction: Directions }) =>
      api.ccAisle(p.number, p.direction, currDepartmentId),
    onSuccess: () => {
      reloadSuper.mutate();
    },
  });

  const createProduct = useMutation({
    mutationFn: (name: string) => api.ccProduct(name, currAisleId),
    onSuccess: () => {
      reloadSuper.mutate();
    },
  });

  return (
    <div
      style={{
        padding: '10px 0',
        width: '20%',
        margin: '0 auto',
      }}
    >
      <div>
        {supermarket && <div>הוספה ל</div>}
        <div>
          {currSupermarketId && <div>{supermarket.name}</div>}
          {department && <div>{department.name}</div>}
          {aisle && <div>{aisle.number}</div>}
        </div>
      </div>
      <div>
        {!aisle && !department && !currSupermarketId && (
          <div style={styleFlex}>
            <input
              id='supermarket-name'
              type='text'
              placeholder='Supermarket Name'
              onChange={(e) => setSupermarketName(e.target.value)}
            />
            <input
              id='supermarket-location'
              type='text'
              placeholder='Supermarket location'
              onChange={(e) => setSupermarketLocation(e.target.value)}
            />
            <button
              onClick={() =>
                createSuper.mutate({ name: supermarketName, location: supermarketLocation })
              }
            >
              הוספת סופרמרקט
            </button>
          </div>
        )}
        {!department && currSupermarketId && (
          <div style={styleFlex}>
            <input
              id='department-name'
              type='text'
              placeholder='Department Name'
              onChange={(e) => setDepartmentName(e.target.value)}
            />
            <button onClick={() => createDepartment.mutate(departmentName)}>הוספת מחלקה</button>
          </div>
        )}
        {!aisle && department && supermarket && (
          <div style={styleFlex}>
            <input
              id='aisle-number'
              type='number'
              placeholder='Aisle Number'
              onChange={(e) => setAisleNumber(e.target.value)}
            />
            <DirectionSelect direction={direction} setDirection={setDirection} />
            <button onClick={() => createAisle.mutate({ number: +aisleNumber, direction })}>
              הוספת מעבר
            </button>
          </div>
        )}
        {aisle && department && supermarket && (
          <div style={styleFlex}>
            <input
              id='product-name'
              type='text'
              placeholder='Product Name'
              onChange={(e) => setProductName(e.target.value)}
            />
            <button onClick={() => createProduct.mutate(productName)}>הוספת מוצר</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(AddOption);
