import { observer } from 'mobx-react-lite';
import { CSSProperties, useState } from 'react';
import AddOption from './components/addOption';
import SuperList from './components/superList';
import SuperNamesList from './components/SuperNamesList';
import './App.css';
import Circular from './Circular';

function App() {
  const [arr, setArr] = useState<any[]>(['G', 'E', 'T']);
  const flexRowReverseBorder: CSSProperties = {
    padding: '10px',
    width: '80vw',
    border: '1px solid black',
  };

  const options = ['name', 'group', 'tesla', 'four', 'more'] as const;
  const [searchType, setSearchType] = useState<typeof options[number]>('name');

  const style: CSSProperties = {
    position: 'absolute',
    transition: 'all 0.2s',
    width: '100%',
    borderRadius: '50%',
    padding: '5px',
  };
  const position = {
    up: { transform: `translateX(50%) translateY(0%)` },
    right: { transform: `translateX(100%) translateY(100%)` },
    left: { transform: `translateX(0) translateY(100%)` },
    more: { transform: `translateX(50%) translateY(200%)` },
    down: { transform: `translateX(50%) translateY(100%)` },
  };

  const setSearch = () => {
    const newSearchType: Record<typeof options[number], typeof options[number]> = {
      name: 'four',
      four: 'tesla',
      tesla: 'group',
      group: 'more',
      more: 'name',
    };

    setSearchType(newSearchType[searchType]);
  };

  const second: Record<typeof options[number], Record<typeof options[number], CSSProperties>> = {
    name: {
      name: position.up,
      group: position.right,
      tesla: position.down,
      four: position.left,
      more: position.more,
    },
    four: {
      name: position.right,
      group: position.down,
      tesla: position.left,
      four: position.up,
      more: position.more,
    },
    tesla: {
      name: position.down,
      group: position.left,
      tesla: position.up,
      four: position.right,
      more: position.more,
    },
    group: {
      name: position.left,
      group: position.up,
      tesla: position.right,
      four: position.down,
      more: position.more,
    },
    more: {
      name: position.left,
      group: position.up,
      tesla: position.right,
      four: position.down,
      more: position.more,
    },
  };

  return (
    <div className='App'>
      <AddOption />
      <SuperNamesList />
      {/* 



      */}

      {/* <div onClick={setSearch} style={{ position: 'relative', height: '50px', width: '50px' }}>
        {options.map((option) => {
          const color = option === searchType ? '#646cff' : '';
          const styles = { ...style, ...second[searchType][option], backgroundColor: color };

          return (
            <div key={option} style={styles}>
              {option.substring(0, 1).toUpperCase()}
            </div>
          );
        })}
      </div> */}
      {/* <div style={{ width: `${arr.length * 10}px`, height: `${arr.length * 10}px` }}>
        <Circular
          arr={arr}
          width={arr.length * 10}
          setArr={() => {
            const f = arr.shift();
            setArr([...arr, f]);
          }}
        />
      </div> */}
      {/* 



      */}
      <div style={flexRowReverseBorder}>
        <SuperList />
      </div>
    </div>
  );
}

export default observer(App);
