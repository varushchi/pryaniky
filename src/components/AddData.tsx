import React from 'react'

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
  handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
  token: string
  toggleButton: () => void
  handleSubmit: () => void
}

export default function AddData(props : Props) {
  const HOST = 'https://test.v5.pryaniky.com'

  function handleClick(){
    const timeReg = new RegExp(/^[1-2][0-9][0-9][0-9]-(0[1-9]|1[1-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])(T(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9](:[0-5][0-9](.[0-9]{1,3}Z?|$)|$)|$)|$)$/)
    if(timeReg.test(props.addInput.companySigDate) && timeReg.test(props.addInput.employeeSigDate)){
      addItem()
      props.toggleButton()
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
  }

  return (
    <div className='AddData'>
      <input type='text' name='companySigDate' value={props.addInput.companySigDate} onChange={(e) => props.handleChange(e)}/>
      <input type='text' name='companySignatureName' value={props.addInput.companySignatureName} onChange={(e) => props.handleChange(e)}/>
      <input type='text' name='documentName' value={props.addInput.documentName} onChange={(e) => props.handleChange(e)}/>
      <input type='text' name='documentStatus' value={props.addInput.documentStatus} onChange={(e) => props.handleChange(e)}/>
      <input type='text' name='documentType' value={props.addInput.documentType} onChange={(e) => props.handleChange(e)}/>
      <input type='text' name='employeeNumber' value={props.addInput.employeeNumber} onChange={(e) => props.handleChange(e)}/>
      <input type='text' name='employeeSigDate' value={props.addInput.employeeSigDate} onChange={(e) => props.handleChange(e)}/>
      <input type='text' name='employeeSignatureName' value={props.addInput.employeeSignatureName} onChange={(e) => props.handleChange(e)}/>
      <button onClick={handleClick}>Save</button>
    </div>
)
}
