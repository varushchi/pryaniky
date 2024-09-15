import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Data{
  companySigDate: string
  companySignatureName: string
  documentName: string
  documentStatus: string
  documentType: string
  employeeNumber: string
  employeeSigDate: string
  employeeSignatureName: string
  id?: string
}

interface Props{
  addInput: Data
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  token: string
  toggleButton: () => void
  handleSubmit: () => void
  toggleSelectRow: () => void
}

export default function AddData(props : Props) {
  const HOST = 'https://test.v5.pryaniky.com'

  function handleClick(){
    const timeReg = new RegExp(/^[1-2][0-9][0-9][0-9]-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])(T(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9](:[0-5][0-9](.[0-9]{1,3}Z?|$)|$)|$)|$)$/)
    if(timeReg.test(props.addInput.companySigDate) && timeReg.test(props.addInput.employeeSigDate)){
      addItem()
      props.handleSubmit()
    }
    else{
      alert('Wrong date. Example: 2022-12-23T11:19:27.017Z')
    }

    
  }

  async function addItem() {
    await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
      method: 'POST',
      headers: {
        'x-auth': props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.addInput)
    })
    props.toggleButton()
    props.toggleSelectRow()
  }

  return (
    <div className='AddData'>
      <Box
        component="form"
        sx = {{
          display: 'flex',
          gap: '10px'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="companySigDate"
          label="companySigDate"
          variant="outlined"
          sx={{minWidth: '230px'}}
          size='small'
          value={props.addInput.companySigDate}
          onChange={(e) => props.handleChange(e)}
        />
        <TextField
          id="companySignatureName"
          label="companySignatureName"
          variant="outlined"
          size='small'
          value={props.addInput.companySignatureName}
          onChange={(e) => props.handleChange(e)}
        />
        <TextField
          id="documentName"
          label="documentName"
          variant="outlined"
          size='small'
          value={props.addInput.documentName}
          onChange={(e) => props.handleChange(e)}
        />
        <TextField
          id="documentStatus"
          label="documentStatus"
          variant="outlined"
          size='small'
          value={props.addInput.documentStatus}
          onChange={(e) => props.handleChange(e)}
        />
        <TextField
          id="documentType"
          label="documentType"
          variant="outlined"
          size='small'
          value={props.addInput.documentType}
          onChange={(e) => props.handleChange(e)}
        />
        <TextField
          id="employeeNumber"
          label="employeeNumber"
          variant="outlined"
          size='small'
          value={props.addInput.employeeNumber}
          onChange={(e) => props.handleChange(e)}
        />
        <TextField
          id="employeeSigDate"
          label="employeeSigDate"
          variant="outlined"
          size='small'
          sx={{minWidth: '230px'}}
          value={props.addInput.employeeSigDate}
          onChange={(e) => props.handleChange(e)}
        />
        <TextField
          id="employeeSignatureName"
          label="employeeSignatureName"
          variant="outlined"
          size='small'
          value={props.addInput.employeeSignatureName}
          onChange={(e) => props.handleChange(e)}
        />
        <Button
            variant="contained"
            onClick={handleClick}
            sx = {{height: '40px', width: '100px'}}
          >Save</Button>
      </Box>
    </div>
)
}
