import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Main from './Main';

function App() {

  const [userToken, setUserToken] = useState<undefined | null | string>(localStorage.getItem("userToken"))

  return (
    <div className="App">
      {!userToken && <Login handleSubmit={(token: string) => setUserToken(token)}/>}
      
      {userToken && <Main token={userToken} handleSubmit={(token: string) => setUserToken(token)}/>}
    </div>
  );
}

export default App;
