import React, { useEffect, useState } from 'react'

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
}

export default function ChangeData(props: Props) {

  const HOST = 'https://test.v5.pryaniky.com'

  const [inputValue, setInputValue] = useState<Data | undefined>()

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
    await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${props.rowData?.id}`, {
      method: 'POST',
      headers: {
        'x-auth': props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputValue)
    })
  }

  function handleClick()
  {
    const timeReg = new RegExp(/^[1-2][0-9][0-9][0-9]-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])(T(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9](:[0-5][0-9](.[0-9]{1,3}Z?|$)|$)|$)|$)$/)
    if (inputValue && inputValue.companySigDate && inputValue.employeeSigDate && timeReg.test(inputValue.companySigDate) && timeReg.test(inputValue.employeeSigDate)){
      changeItem()
      props.toggleButton()
    }
    else{
      alert('Wrong date. Example: 2022-12-23T11:19:27.017Z')
    }
    
  }

  return (
    <div>
      {inputValue && 
        <div className='ChangeData'>
          <input
            type='text'
            name='companySigDate'
            value={inputValue.companySigDate}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: String(e.target.value)})}
          />
          <input
            type='text'
            name='companySignatureName'
            value={inputValue.companySignatureName}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: String(e.target.value)})}
          />
          <input
            type='text'
            name='documentName'
            value={inputValue.documentName}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: String(e.target.value)})}
          />
          <input
            type='text'
            name='documentStatus'
            value={inputValue.documentStatus}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: String(e.target.value)})}
          />
          <input
            type='text'
            name='documentType'
            value={inputValue.documentType}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: String(e.target.value)})}
          />
          <input
            type='text'
            name='employeeNumber'
            value={inputValue.employeeNumber}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: String(e.target.value)})}
          />
          <input
            type='text'
            name='employeeSigDate'
            value={inputValue.employeeSigDate}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: String(e.target.value)})}
          />
          <input
            type='text'
            name='employeeSignatureName'
            value={inputValue.employeeSignatureName}
            onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: String(e.target.value)})}
          />
          <button onClick={()=>handleClick()}>Save</button>
        </div>
      }
        
    </div>
  )
}
