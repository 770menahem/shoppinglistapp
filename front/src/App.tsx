import AddOption from './components/addOption';
import SuperList from './components/superList';
import { SuperNamesList } from './components/SuperNamesList';
import { CSSProperties } from 'react';
import './App.css';

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

export default App;
