import Supermarket from './types/supermarket.type';

const fetchReq = async (url: string, method: string, body?: any) => {
  const res = await fetch('http://localhost:1770' + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res;
};

const getSupermarkets = async () => {
  const res = await fetchReq('/supermarkets', 'GET');
  return res.json();
};

const getDepartments = async () => {
  const res = await fetchReq('/departments', 'GET');
  return res.json();
};

const getAisles = async () => {
  const res = await fetchReq('/aisles', 'GET');
  return res.json();
};

const getProducts = async () => {
  const res = await fetchReq('/products', 'GET');
  return res.json();
};

const getSupermarket = async (id: string) => {
  const res = await fetch(`/supermarkets/${id}`);
  return res.json();
};

const getDepartment = async (id: string) => {
  const res = await fetch(`/departments/${id}`);
  return res.json();
};

const getAisle = async (id: string) => {
  const res = await fetch(`/aisles/${id}`);
  return res.json();
};

const getProduct = async (id: string) => {
  const res = await fetch(`/products/${id}`);
  return res.json();
};

const deleteSupermarket = async (id: string) => {
  const res = await fetchReq(`/supermarkets/${id}`, 'DELETE');
  return res.json();
};

const deleteDepartment = async (id: string) => {
  const res = await fetchReq(`/departments/${id}`, 'DELETE');
  return res.json();
};

const deleteAisle = async (id: string) => {
  const res = await fetchReq(`/aisles/${id}`, 'DELETE');
  return res.json();
};

const deleteProduct = async (id: string) => {
  const res = await fetchReq(`/products/${id}`, 'DELETE');
  return res.json();
};

const createSupermarket = async (name: string, location: string) => {
  const res = await fetchReq('/supermarkets', 'POST', { name, location });
  return res.json();
};

const createDepartment = async (name: string) => {
  const res = await fetchReq('/departments', 'POST', { name });
  return res.json();
};

const createAisle = async (number: number) => {
  const res = await fetchReq('/aisles', 'POST', { number });
  return res.json();
};

const createProduct = async (name: string) => {
  const res = await fetchReq('/products', 'POST', { name });
  return res.json();
};

const connectSupermarketToDepartment = async (supermarketId: string, departmentId: string) => {
  const res = await fetchReq(`/supermarkets/${supermarketId}/department/${departmentId}`, 'PATCH');
  return res.json();
};

const connectDepartmentToAisle = async (departmentId: string, aisleId: string) => {
  const res = await fetchReq(`/departments/${departmentId}/aisle/${aisleId}`, 'PATCH');
  return res.json();
};

const connectAisleToProduct = async (aisleId: string, productId: string) => {
  const res = await fetchReq(`/aisles/${aisleId}/product/${productId}`, 'PATCH');
  return res.json();
};

export default {
  // get all
  getSupermarkets,
  getDepartments,
  getAisles,
  getProducts,

  // get one
  getSupermarket,
  getDepartment,
  getAisle,
  getProduct,

  // delete
  deleteSupermarket,
  deleteDepartment,
  deleteAisle,
  deleteProduct,

  // create
  createSupermarket,
  createDepartment,
  createAisle,
  createProduct,

  // connect
  connectSupermarketToDepartment,
  connectDepartmentToAisle,
  connectAisleToProduct,
};