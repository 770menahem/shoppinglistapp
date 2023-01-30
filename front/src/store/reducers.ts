import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '.';
import Supermarket from '../types/supermarket.type';
import { getSupers, getSuper, createSuper } from './asyncThunks';

const initialState: {
  currDepartmentId?: string;
  currAisleId?: string;
  currProductId?: string;
  currSupermarketId?: string;
  supermarkets: { name: string; _id: string; location: string }[];
  supermarket: Supermarket;
} = {
  currDepartmentId: undefined,
  currAisleId: undefined,
  currProductId: undefined,
  currSupermarketId: undefined,

  supermarket: {
    _id: '123',
    name: 'Test Supermarket',
    location: 'Test Location',
    departments: [],
    aisles: [],
    products: [],
  },
  supermarkets: [
    {
      _id: '123',
      name: 'Test Supermarket',
      location: 'Test Location',
    },
  ],
};

export const supermarketSlice = createSlice({
  name: 'supermarket',
  initialState,
  reducers: {
    setCurrDepartmentId: (state, action) => {
      console.log('setCurrDepartmentId');

      state.currDepartmentId = action.payload;
      state.currAisleId = undefined;
    },
    setCurrAisleId: (state, action) => {
      console.log('setCurrAisleId');

      state.currAisleId = action.payload;
      state.currDepartmentId = state.supermarket.departments.find((d) =>
        d.aisles.find((a) => a._id === action.payload)
      )?._id;
    },
    setCurrProductId: (state, action) => {
      console.log('setCurrProductId');
      state.currProductId = action.payload;
    },
    setCurrSupermarketId: (state, action) => {
      console.log('setCurrSupermarketId');
      state.currSupermarketId = action.payload;
      state.currDepartmentId = undefined;
      state.currAisleId = undefined;
    },
    reset: (state) => {
      console.log('reset');

      state.currDepartmentId = undefined;
      state.currAisleId = undefined;
      state.currSupermarketId = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSupers.fulfilled, (state, action) => {
      state.supermarkets = action.payload.map((s: Supermarket) => ({
        name: s.name,
        _id: s._id,
        location: s.location,
      }));
      state.supermarket = action.payload[0];
    });
    builder.addCase(getSuper.fulfilled, (state, action) => {
      state.supermarket = action.payload;
    });
    builder.addCase(createSuper.fulfilled, (state, action) => {
      state.supermarkets.push({
        name: action.payload.name,
        _id: action.payload._id,
        location: action.payload.location,
      });
    });
  },
});

export const {
  setCurrSupermarketId,
  setCurrDepartmentId,
  setCurrAisleId,
  setCurrProductId,
  reset,
} = supermarketSlice.actions;

export default supermarketSlice.reducer;

export const selectSupermarkets = (state: RootState) => state.supermarkets;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
