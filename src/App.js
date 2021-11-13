import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Slack from './components/Slack';

function App() {
  const [page, setPage] = useState('login');  
  // console.log(process.env.REACT_APP_SLACK_ENDPOINT)

  if(page === 'login') {
    return <Login setPage={setPage} />
  }

  if(page === 'signup') {
    return <Signup setPage={setPage} />
  }

  if(page === 'slack') {
    return <Slack setPage={setPage} />
  }
}

export default App;
