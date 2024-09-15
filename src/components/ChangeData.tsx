import React, { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Data{
  companySigDate?: string
  companySignatureName?: string
  documentName?: string
  documentStatus?: string
  documentType?: string
  employeeNumber?: string
  employeeSigDate?: string
  employeeSignatureName?: string
  id?: string
}

interface Props{
  rowData: Data | undefined
  token: string
  toggleButton: () => void
  toggleSelectRow: () => void
  handleChildLoading: (bool: boolean) => void
}

export default function ChangeData(props: Props) {

  const HOST = 'https://test.v5.pryaniky.com'

  const [inputValue, setInputValue] = useState<Data | undefined>()
  const [companyDateError, setCompanyDateError] = useState(false)
  const [employeeDateError, setEmployeeDateError] = useState(false)
  const companyDateRef = useRef(null)
  const employeeDateRef = useRef(null)
  const [companyDateFocus, setCompanyDateFocus] = useState(false)
  const [employeeDateFocus, setEmployeeDateFocus] = useState(false)

  useEffect(()=>{
    setInputValue({
      companySigDate: props.rowData?.companySigDate,
      companySignatureName: props.rowData?.companySignatureName,
      documentName: props.rowData?.documentName,
      documentStatus: props.rowData?.documentStatus,
      documentType: props.rowData?.documentType,
      employeeNumber: props.rowData?.employeeNumber,
      employeeSigDate: props.rowData?.employeeSigDate,
      employeeSignatureName: props.rowData?.employeeSignatureName
    })
  }, [props.rowData])


  async function changeItem() {
    props.handleChildLoading(true)
    await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${props.rowData?.id}`, {
      method: 'POST',
      headers: {
        'x-auth': props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputValue)
    })
    props.handleChildLoading(false)
    props.toggleButton()
    props.toggleSelectRow()
  }

  function handleClick()
  {
    const timeReg = new RegExp(/^[1-2][0-9][0-9][0-9]-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])(T(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9](.[0-9]{1,3}Z?|$)|$)|$)$/)
    if (inputValue && inputValue.companySigDate && inputValue.employeeSigDate){
      if (timeReg.test(inputValue.companySigDate) && timeReg.test(inputValue.employeeSigDate)){
        changeItem()
      }
      else if (!timeReg.test(inputValue.companySigDate) && !timeReg.test(inputValue.employeeSigDate)){
        setCompanyDateError(true)
        setEmployeeDateError(true)
      }
      else if (!timeReg.test(inputValue.employeeSigDate)){
        setEmployeeDateError(true)
      }
      else if (!timeReg.test(inputValue.companySigDate)){
        setCompanyDateError(true)
      }
    }
    
    else{
      alert('Wrong date. Example: 2022-12-23T11:19:27.017Z')
    }
  }

  useEffect(() => {
    const timeReg = new RegExp(/^[1-2][0-9][0-9][0-9]-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])(T(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9](.[0-9]{1,3}Z?|$)|$)|$)$/)
    if (!companyDateFocus && inputValue && inputValue.companySigDate && !timeReg.test(inputValue.companySigDate)){
      setCompanyDateError(true)
    }
    if(companyDateFocus){
      setCompanyDateError(false)
    }
  }, [companyDateFocus])

  useEffect(() => {
    const timeReg = new RegExp(/^[1-2][0-9][0-9][0-9]-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])(T(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9](.[0-9]{1,3}Z?|$)|$)|$)$/)
    if (!employeeDateFocus && inputValue && inputValue.employeeSigDate && !timeReg.test(inputValue.employeeSigDate)){
      setEmployeeDateError(true)
    }
    if(employeeDateFocus){
      setEmployeeDateError(false)
    }
  }, [employeeDateFocus])
  

  return (
    <div>
      {inputValue && 
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
            ref={companyDateRef}
            onFocus={() => setCompanyDateFocus(true)}
            onBlur={() => setCompanyDateFocus(false)}
            error={companyDateError}
            helperText={companyDateError && "Incorrect company sign date"}
            value={inputValue.companySigDate}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: String(e.target.value)})}
          />
          <TextField
            id="companySignatureName"
            label="companySignatureName"
            variant="outlined"
            size='small'
            value={inputValue.companySignatureName}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: String(e.target.value)})}
          />
          <TextField
            id="documentName"
            label="documentName"
            variant="outlined"
            size='small'
            value={inputValue.documentName}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: String(e.target.value)})}
          />
          <TextField
            id="documentStatus"
            label="documentStatus"
            variant="outlined"
            size='small'
            value={inputValue.documentStatus}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: String(e.target.value)})}
          />
          <TextField
            id="documentType"
            label="documentType"
            variant="outlined"
            size='small'
            value={inputValue.documentType}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: String(e.target.value)})}
          />
          <TextField
            id="employeeNumber"
            label="employeeNumber"
            variant="outlined"
            size='small'
            value={inputValue.employeeNumber}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: String(e.target.value)})}
          />
          <TextField
            id="employeeSigDate"
            label="employeeSigDate"
            variant="outlined"
            size='small'
            ref={employeeDateRef}
            onFocus={() => setEmployeeDateFocus(true)}
            onBlur={() => setEmployeeDateFocus(false)}
            error={employeeDateError}
            helperText={employeeDateError && "Incorrect employee sign date"}
            sx={{minWidth: '230px'}}
            value={inputValue.employeeSigDate}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: String(e.target.value)})}
          />
          <TextField
            id="employeeSignatureName"
            label="employeeSignatureName"
            variant="outlined"
            size='small'
            value={inputValue.employeeSignatureName}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.id]: String(e.target.value)})}
          />
          <Button
            variant="contained"
            onClick={handleClick}
            sx = {{height: '40px', width: '100px'}}
          >Save</Button>
        </Box>
      }
    </div>
  )
}
