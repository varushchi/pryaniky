import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css'

interface Props{
  handleToken: (token: string) => void
}

export default function Login(props: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const [usernameFocus, setUsernameFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const HOST = 'https://test.v5.pryaniky.com'
    async function getToken(username: string, password: string,){
      const res = await fetch(`${HOST}/ru/data/v3/testmethods/docs/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })

      const data = await res.json();
      localStorage.setItem("userToken", data.data.token);
      props.handleToken(data.data.token)
  }

  function handleClick()
  {
    const userReg = new RegExp(/user\d+$/)
    const passwordReg = new RegExp(/password$/)

    if (userReg.test(username) && passwordReg.test(password)){
      getToken(username, password)
    }
    else if (!userReg.test(username) && !passwordReg.test(password)){
      setUsernameError(true)
      setPasswordError(true)
    }
    else if (!userReg.test(username)){
      setUsernameError(true)
    }
    else if (!passwordReg.test(password)){
      setPasswordError(true)
    }
  }

  useEffect(() => {
    if (!usernameFocus && username && !(new RegExp(/user\d+$/).test(username))){
      setUsernameError(true)
    }
    if(usernameFocus){
      setUsernameError(false)
    }
  }, [usernameFocus])

  useEffect(() => {
    if (!passwordFocus && password && !(new RegExp(/password$/).test(password))){
      setPasswordError(true)
    }
    if(passwordFocus){
      setPasswordError(false)
    }
  }, [passwordFocus])



  return (
    <div className='Login'>
      <Box
        component="form"
        sx = {{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Username"
          ref={usernameRef}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
          error={usernameError}
          helperText={usernameError && "Incorrect username"}
          variant="outlined" 
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
        />
        <TextField
          id="password"
          label="Password"
          ref={passwordRef}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          error={passwordError}
          helperText={passwordError && "Incorrect password"}
          type='password'
          variant="outlined"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <Button
          variant="contained"
          size="medium"
          onClick={()=>{handleClick()}}
          sx = {{height: '56px'}}
        >Login</Button>
      </Box>
    </div>
  )
}
