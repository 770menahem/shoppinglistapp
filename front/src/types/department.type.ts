import Aisle from './aisle.type';

type Department = {
  _id: string;
  name: string;
  aisles: Aisle[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default Department;
