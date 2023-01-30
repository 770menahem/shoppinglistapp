import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { Directions } from '../types/aisle.type';

const getSupers = createAsyncThunk('supermarket/getSupers', async () => {
  console.log('getSupers');
  const res = await api.getSupermarkets();

  return res;
});

const getSuper = createAsyncThunk('supermarket/getSuper', async (id: string) => {
  console.log(`getSuper ${id}`);

  const res = await api.getSupermarket(id);

  return res;
});

const createSuper = createAsyncThunk(
  'supermarket/createSuper',
  async ({ name, location }: { name: string; location: string }) => {
    console.log(`createSuper ${name} ${location}`);

    const res = await api.createSupermarket(name, location);

    return res;
  }
);

const createDepartment = createAsyncThunk(
  'supermarket/createDepartment',
  async ({ name, supermarketId }: { name: string; supermarketId: string }, { dispatch }) => {
    console.log(`createDepartment ${name} ${supermarketId}`);

    const res = await api.createDepartment(name);
    await api.connectSupermarketToDepartment(supermarketId, res._id);

    dispatch(getSuper(supermarketId));
    return supermarketId;
  }
);

type CreateAisle = {
  number: number;
  direction: Directions;
  departmentId: string;
};

const createAisle = createAsyncThunk(
  'supermarket/createAisle',
  async ({ number, direction, departmentId }: CreateAisle, { dispatch, getState }) => {
    console.log(`createAisle ${number} ${direction} ${departmentId}`);

    const res = await api.createAisle(number, direction);

    await api.connectDepartmentToAisle(departmentId, res._id);

    dispatch(getSuper((getState() as any).supermarket._id));
    return res;
  }
);

const createProduct = createAsyncThunk(
  'supermarket/createProduct',
  async ({ name, aisleId }: { name: string; aisleId: string }, { dispatch, getState }) => {
    console.log(`createProduct ${name} ${aisleId}`);

    const res = await api.createProduct(name);

    await api.connectAisleToProduct(aisleId, res._id);
    dispatch(getSuper((getState() as any).supermarket._id));

    return res;
  }
);

// delete
const deleteSupermarket = createAsyncThunk(
  'supermarket/deleteSupermarket',
  async (id: string, { dispatch }) => {
    console.log(`deleteSupermarket ${id}`);

    await api.deleteSupermarket(id);

    dispatch(getSupers());
    return id;
  }
);

const deleteDepartment = createAsyncThunk(
  'supermarket/deleteDepartment',
  async (id: string, { dispatch, getState }) => {
    console.log(`deleteDepartment ${id}`);

    await api.deleteDepartment(id);

    dispatch(getSuper((getState() as any).supermarket._id));
    return id;
  }
);

const deleteAisle = createAsyncThunk(
  'supermarket/deleteAisle',
  async (id: string, { dispatch, getState }) => {
    console.log(`deleteAisle ${id}`);

    await api.deleteAisle(id);

    dispatch(getSuper((getState() as any).supermarket._id));
    return id;
  }
);

const deleteProduct = createAsyncThunk(
  'supermarket/deleteProduct',
  async (id: string, { dispatch, getState }) => {
    console.log(`deleteProduct ${id}`);

    await api.deleteProduct(id);

    dispatch(getSuper((getState() as any).supermarket._id));
    return id;
  }
);

// update
const changeAisleDirection = createAsyncThunk(
  'supermarket/updateAisle',
  async (aisle: any, { dispatch, getState }) => {
    console.log(`updateAisle ${aisle._id}`);

    await api.changeAisleDirection(aisle._id, aisle.direction);

    dispatch(getSuper((getState() as any).supermarket._id));
    return aisle;
  }
);

export {
  getSupers,
  getSuper,
  createSuper,
  createDepartment,
  createAisle,
  createProduct,
  deleteSupermarket,
  deleteDepartment,
  deleteAisle,
  deleteProduct,
  changeAisleDirection,
};
