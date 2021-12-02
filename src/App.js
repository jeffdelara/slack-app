import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Slack from './components/Slack';

function App() {
  const [page, setPage] = useState('login');  

  // check if already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');

    if(user) {
      setPage('slack'); 
    }
  });

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
