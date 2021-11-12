import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Slack from './components/Slack';

function App() {
  const [page, setPage] = useState('slack');  

  if(page === 'login') {
    return <Login setPage={setPage} />
  }

  if(page === 'slack') {
    return <Slack setPage={setPage} />
  }
}

export default App;
