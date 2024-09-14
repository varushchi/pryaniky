import React, { useEffect, useState } from 'react'

interface Props{
  handleSubmit: (token: string) => void
}

export default function Login(props: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const HOST = 'https://test.v5.pryaniky.com'
    async function post(username: string, password: string,){
      const res = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })

      const data = await res.json();
      localStorage.setItem("userToken", data.data.token);
      props.handleSubmit(data.data.token)
  }

  function handleClick()
  {
    const userReg = new RegExp(/user\d+$/)
    const passwordReg = new RegExp(/password$/)
    if (userReg.test(username) && passwordReg.test(password)){
      post(username, password)
    }
    else{
      alert('wrong username or password')
    }

  }

  return (
    <div className='Login'>
      <form onSubmit={(e) => {e.preventDefault()}}>
        <input type='text' name='user' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={()=>{handleClick()}}>Login</button>
      </form>
    </div>
  )
}
