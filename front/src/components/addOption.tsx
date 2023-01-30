import { CSSProperties, useState } from 'react';
import { createAisle, createDepartment, createProduct, createSuper } from '../store/asyncThunks';
import { useAppDispatch, useAppSelector } from '../store/reducers';
import { Directions } from '../types/aisle.type';
import DirectionSelect from './directionSelect';

export default function AddOption() {
  const dispatch = useAppDispatch();

  const supermarket = useAppSelector((state) => state.supermarket);
  const supermarketId = useAppSelector((state) => state.currSupermarketId);
  const departmentId = useAppSelector((state) => state.currDepartmentId);
  const aisleId = useAppSelector((state) => state.currAisleId);
  const department = supermarket.departments.find((d) => d._id === departmentId);
  const aisle = department?.aisles.find((a) => a._id === aisleId);

  const [supermarketName, setSupermarketName] = useState('');
  const [supermarketLocation, setSupermarketLocation] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [aisleNumber, setAisleNumber] = useState('');
  const [direction, setDirection] = useState<Directions>('vertical');
  const [productName, setProductName] = useState('');

  const styleFlex: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const resetFields = () => {
    setSupermarketName('');
    setSupermarketLocation('');
    setDepartmentName('');
    setAisleNumber('');
    setProductName('');
  };

  const addSupermarket = async (supermarketName: string, supermarketLocation: string) => {
    dispatch(createSuper({ name: supermarketName, location: supermarketLocation }) as any);
    resetFields();
  };

  const addAisle = async (number: number, direction: Directions) => {
    dispatch(createAisle({ number, direction, departmentId: departmentId! }) as any);
    resetFields();
  };
  const addProduct = async (name: string, aisleId: string) => {
    dispatch(createProduct({ name, aisleId }) as any);
    resetFields();
  };

  const addDepartment = async (name: string) => {
    dispatch(createDepartment({ name, supermarketId: supermarketId! }) as any);
    resetFields();
  };

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
          {supermarketId && <div>{supermarket.name}</div>}
          {department && <div>{department.name}</div>}
          {aisle && <div>{aisle.number}</div>}
        </div>
      </div>
      <div>
        {!aisle && !department && !supermarketId && (
          <div style={styleFlex}>
            <input
              id='supermarket-name'
              type='text'
              placeholder='Supermarket Name'
              onChange={(e) => setSupermarketName(e.target.value)}
              value={supermarketName}
            />
            <input
              id='supermarket-location'
              type='text'
              placeholder='Supermarket location'
              onChange={(e) => setSupermarketLocation(e.target.value)}
              value={supermarketLocation}
            />
            <button onClick={() => addSupermarket(supermarketName, supermarketLocation)}>
              הוספת סופרמרקט
            </button>
          </div>
        )}
        {!department && supermarketId && (
          <div style={styleFlex}>
            <input
              id='department-name'
              type='text'
              placeholder='Department Name'
              onChange={(e) => setDepartmentName(e.target.value)}
              value={departmentName}
            />
            <button onClick={() => addDepartment(departmentName)}>הוספת מחלקה</button>
          </div>
        )}
        {!aisle && department && supermarket && (
          <div style={styleFlex}>
            <input
              id='aisle-number'
              type='number'
              placeholder='Aisle Number'
              onChange={(e) => setAisleNumber(e.target.value)}
              value={aisleNumber}
            />
            {/* add direction select */}
            <DirectionSelect direction={direction} setDirection={setDirection} />
            <button onClick={() => addAisle(+aisleNumber, direction)}>הוספת מעבר</button>
          </div>
        )}
        {aisle && department && supermarket && (
          <div style={styleFlex}>
            <input
              id='product-name'
              type='text'
              placeholder='Product Name'
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            <button onClick={() => addProduct(productName, aisleId!)}>הוספת מוצר</button>
          </div>
        )}
      </div>
    </div>
  );
}
