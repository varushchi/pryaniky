import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';

function App() {

  const [userToken, setUserToken] = useState<undefined | null | string>(localStorage.getItem("userToken"))

  return (
    <div className="App">
      {!userToken && <Login handleToken={(token: string) => setUserToken(token)}/>}
      {userToken && <Main token={userToken} handleToken={(token: string) => setUserToken(token)}/>}
    </div>
  );
}

export default App;
