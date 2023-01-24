import Supermarket from '../types/supermarket.type';

export default function Choosing(props: {
  supermarket?: Supermarket;
  department?: string;
  aisle?: string;
}) {
  return (
    <div
      style={{
        padding: '10px 0',
        border: '1px solid black',
      }}
    >
      <h4>הוספה ל</h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <div>{props.aisle ? `מעבר : ${props.aisle}` : ''}</div>
        <div>{props.department ? `מחלקה: ${props.department}` : ''}</div>
        <div>{props.supermarket ? `סופר: ${props.supermarket.name}` : ''}</div>
      </div>
    </div>
  );
}
