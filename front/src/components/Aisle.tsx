import React from 'react';
import AisleType from '../types/aisle.type';
import Department from '../types/department.type';
import ProductType from '../types/product.type';
import Supermarket from '../types/supermarket.type';
import { Product } from './Product';

export function Aisle({
  supermarket,
  department,
  aisle,
  chooseAisle,
  deleteEntity,
}: {
  supermarket: Supermarket;
  department: Department;
  aisle: AisleType;
  chooseAisle: (aisle: AisleType, department: Department, supermarket: Supermarket) => void;
  deleteEntity: (id: string, type: string) => void;
}): JSX.Element {
  return (
    <div
      id={`aisle-${aisle._id}`}
      onClick={(e) => {
        e.stopPropagation();
        chooseAisle(aisle, department, supermarket);
      }}
    >
      <span onClick={() => deleteEntity(aisle._id!, 'aisle')}>x</span>
      <div>מעבר {aisle.number}</div>
      <div>
        {aisle.products.map((product) => {
          return (
            <div
              key={product._id}
              style={{
                padding: '0 2px',
                cursor: 'pointer',
                border: '1px solid black',
              }}
            >
              <Product product={product} deleteEntity={deleteEntity} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
