import store from '.';
import api from '../api';
import { Directions } from '../types/aisle.type';

const getSupers = async () => {
  const res = await api.getSupermarkets();

  store.setSupermarkets = res;
  store.setSupermarket = res[0];
};

const getSuper = async (id: string) => {
  const res = await api.getSupermarket(id);

  store.setSupermarket = res;
};

const createSuper = async (name: string, location: string) => {
  await api.createSupermarket(name, location);
  getSupers();
};

const createDepartment = async (name: string) => {
  const res = await api.createDepartment(name);
  await api.connectSupermarketToDepartment(store.supermarket._id!, res._id);
  getSuper(store.supermarket._id!);
};

const createAisle = async (number: number, direction: Directions) => {
  const res = await api.createAisle(number, direction);
  await api.connectDepartmentToAisle(store.currDepartmentId, res._id);
  getSuper(store.supermarket._id!);
};

const createProduct = async (name: string) => {
  const res = await api.createProduct(name);
  await api.connectAisleToProduct(store.currAisleId, res._id);
  getSuper(store.supermarket._id!);
};

const deleteSupermarket = async (id: string) => {
  await api.deleteSupermarket(id);
  getSupers();
};

const deleteDepartment = async (id: string) => {
  await api.deleteDepartment(id);
  getSuper(store.supermarket._id!);
};

const deleteAisle = async (id: string) => {
  await api.deleteAisle(id);
  getSuper(store.supermarket._id!);
};

const deleteProduct = async (id: string) => {
  await api.deleteProduct(id);
  getSuper(store.supermarket._id!);
};

const changeAisleDirection = async (id: string, direction: Directions) => {
  await api.changeAisleDirection(id, direction);
  getSuper(store.supermarket._id!);
};

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
