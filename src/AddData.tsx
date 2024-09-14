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
}

export default function AddData(props : Props) {
  const HOST = 'https://test.v5.pryaniky.com'

  function handleClick(){
    addItem()
    props.toggleButton()
  }

  async function addItem() {
    const res = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
      method: 'POST',
      headers: {
        'x-auth': props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.addInput)
    })

    console.log(JSON.stringify(props.addInput))

    const data = await res.json();
  }

  return (
    <div>
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
