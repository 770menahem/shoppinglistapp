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
    if (!this.supermarket) {
      this.supermarket = res[0];
    }
  };

  public reset = () => {
    if (!this.currSupermarketId) return;
    this.currSupermarketId = '';
    this.currDepartmentId = '';
    this.currAisleId = '';
    this.currProductId = '';
  };

  public getSupermarkets = async () => {
    const res = await api.getSupermarkets();
    this.supermarkets = res.map((s: Supermarket) => ({
      name: s.name,
      _id: s._id,
      location: s.location,
    }));

    this.supermarket = res[0];
  };

  public getSuper = async (id: string) => {
    const res = await api.getSupermarket(id);

    store.setSupermarket = res;
  };

  set setSupermarkets(supers: Supermarket[]) {
    console.log('setSupermarkets');

    this.supermarkets = supers.map((s: Supermarket) => ({
      name: s.name,
      _id: s._id,
      location: s.location,
    }));
  }

  set setCurrSupermarketId(id: string) {
    console.log('setCurrSupermarketId');

    this.currSupermarketId = id;
    this.currDepartmentId = '';
    this.currAisleId = '';
    this.currProductId = '';
  }

  set setCurrDepartmentId(id: string) {
    console.log('setCurrDepartmentId');

    this.currSupermarketId = this.supermarket._id!;
    this.currDepartmentId = id;
    this.currAisleId = '';
  }

  set setCurrAisleId(id: string) {
    console.log('setCurrAisleId');
    this.currSupermarketId = this.supermarket._id!;

    this.supermarket.departments.forEach((d) => {
      if (d.aisles.find((a) => a._id === id)) {
        this.currDepartmentId = d._id!;
      }
    });

    this.currAisleId = id;
    this.currProductId = '';
  }

  set setCurrProductId(id: string) {
    console.log('setCurrProductId');
    this.currSupermarketId = this.supermarket._id!;
    this.supermarket.departments.forEach((d) => {
      d.aisles.forEach((a) => {
        if (a.products.find((p) => p._id === id)) {
          this.currDepartmentId = d._id!;
          this.currAisleId = a._id!;
        }
      });
    });

    this.currProductId = id;
  }

  set setSupermarket(supermarket: Supermarket) {
    console.log('setSupermarket');

    this.supermarket = supermarket;
  }
}

const store = new Store();

export default store;
