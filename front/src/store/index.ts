import { makeAutoObservable } from 'mobx';
import api from '../api';
import Supermarket from '../types/supermarket.type';

class Store {
  currDepartmentId: string = '';
  currAisleId: string = '';
  currProductId: string = '';
  currSupermarketId: string = '';
  supermarkets: { name: string; _id: string; location: string }[] = [];
  supermarket: Supermarket = {
    _id: '123',
    name: 'Test Supermarket',
    location: 'Test Location',
    departments: [],
    aisles: [],
    products: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  public init = async () => {
    const res = await api.getSupermarkets();
    this.supermarkets = res.map((s: Supermarket) => ({
      name: s.name,
      _id: s._id,
      location: s.location,
    }));
    this.supermarket = res[0];
  };

  public reset = () => {
    if (!this.currSupermarketId) return;
    this.currSupermarketId = '';
    this.currDepartmentId = '';
    this.currAisleId = '';
    this.currProductId = '';
  };

  set setSupermarkets(supers: Supermarket[]) {
    this.supermarkets = supers.map((s: Supermarket) => ({
      name: s.name,
      _id: s._id,
      location: s.location,
    }));
  }

  set setCurrSupermarketId(id: string) {
    this.currSupermarketId = id;
    this.currDepartmentId = '';
    this.currAisleId = '';
    this.currProductId = '';
  }

  set setCurrDepartmentId(id: string) {
    this.currDepartmentId = id;
    this.currAisleId = '';
  }

  set setCurrAisleId(id: string) {
    this.currAisleId = id;
    this.currProductId = '';
  }

  set setCurrProductId(id: string) {
    this.currProductId = id;
  }

  set setSupermarket(supermarket: Supermarket) {
    this.supermarket = supermarket;
  }
}

const store = new Store();

export default store;
