import React, { CSSProperties } from 'react';

type Props = {
  addSupermarket: (txt: string, location: string) => void;
  addDepartment: (txt: string) => void;
  addAisle: (num: number) => void;
  addProduct: (txt: string) => void;
  supermarket?: string;
  department?: string;
  aisle?: string;
};

export default function AddOption({
  addSupermarket,
  addDepartment,
  addAisle,
  addProduct,
  supermarket,
  department,
  aisle,
}: Props) {
  const [supermarketName, setSupermarketName] = React.useState('');
  const [supermarketLocation, setSupermarketLocation] = React.useState('');
  const [departmentName, setDepartmentName] = React.useState('');
  const [aisleNumber, setAisleNumber] = React.useState('');
  const [productName, setProductName] = React.useState('');

  const styleFlex: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
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
          {supermarket && <div>סופר: {supermarket}</div>}
          {department && <div>מחלקה: {department}</div>}
          {aisle && <div>מעבר : {aisle}</div>}
        </div>
      </div>
      <div>
        {!aisle && !department && !supermarket && (
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
            <button onClick={() => addSupermarket(supermarketName, supermarketLocation)}>
              הוספת סופרמרקט
            </button>
          </div>
        )}
        {!department && supermarket && (
          <div style={styleFlex}>
            <input
              id='department-name'
              type='text'
              placeholder='Department Name'
              onChange={(e) => setDepartmentName(e.target.value)}
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
            />
            <button onClick={() => addAisle(+aisleNumber)}>הוספת מעבר</button>
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
            <button onClick={() => addProduct(productName)}>הוספת מוצר</button>
          </div>
        )}
      </div>
    </div>
  );
}
