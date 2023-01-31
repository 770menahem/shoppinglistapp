import { observer } from 'mobx-react-lite';
import { CSSProperties } from 'react';
import AddOption from './components/addOption';
import SuperList from './components/superList';
import SuperNamesList from './components/SuperNamesList';
import './App.css';
import store from './store';

function App() {
  const flexRowReverseBorder: CSSProperties = {
    padding: '10px',
    width: '80vw',
    border: '1px solid black',
  };

  return (
    <div className='App'>
      <AddOption />
      <SuperNamesList />
      <div style={flexRowReverseBorder}>
        <SuperList />
      </div>
    </div>
  );
}

export default observer(App);
