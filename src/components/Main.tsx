import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AddData from './AddData';
import ChangeData from './ChangeData';
import './Main.css'

interface Props{
  token: string
  handleToken: (token: string) => void
}

export default function Main(props: Props) {
  const HOST = 'https://test.v5.pryaniky.com'

  interface Data{
    companySigDate: string
    companySignatureName: string
    documentName: string
    documentStatus: string
    documentType: string
    employeeNumber: string
    employeeSigDate: string
    employeeSignatureName: string
    id: string
  }

  const [tableData, setTableData] = useState<undefined | Data[]>()
  const [addButton, setAddButton] = useState(false)
  const InnitialAddInput = {
    companySigDate: '2022-12-23T11:19:27.017Z',
    companySignatureName: 'test',
    documentName: 'test',
    documentStatus: 'test',
    documentType: 'test',
    employeeNumber: 'test',
    employeeSigDate: '2022-12-23T11:19:27.017Z',
    employeeSignatureName: 'test'
  }
  const [addInput, setAddInput] = useState(InnitialAddInput)
  const [deleteButton, setDeleteButton] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(undefined)
  const [changeButton, setChangeButton] = useState(false)
  const [rowData, setRowData] = useState<Data | undefined>()

  useEffect(() => {
    async function getTable(){
      const res = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
        method: 'GET',
        headers: {
          'x-auth': props.token,
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      setTableData(data.data)
    }
    getTable()
  },[props.token, addButton, deleteButton, changeButton])


  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID'},
    {field: 'companySigDate', headerName: 'Company sign date', maxWidth: 200, width: 200},
    {field: 'companySignatureName', headerName: 'Company signature name', maxWidth: 200, width: 200},
    {field: 'documentName', headerName: 'Document name', maxWidth: 200, width: 200},
    {field: 'documentStatus', headerName: 'Document status', maxWidth: 150, width: 150},
    {field: 'documentType', headerName: 'Document type', maxWidth: 200, width: 200},
    {field: 'employeeNumber', headerName: 'Employee number', maxWidth: 150, width: 150},
    {field: 'employeeSigDate', headerName: 'Employee sign date', maxWidth: 200, width: 200},
    {field: 'employeeSignatureName', headerName: 'Employee signature name', maxWidth: 200, width: 200},
  ]

  const rows = tableData && tableData.map(elem => {
    return{
      ...elem,
      companySigDate: new Date(elem.companySigDate).toLocaleString(),
      employeeSigDate: new Date(elem.employeeSigDate).toLocaleString()
    }
  })

  async function DeleteItem() {
    tableData && selectedRowId && await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${selectedRowId}`, {
      method: 'POST',
      headers: {
        'x-auth': props.token,
        'Content-Type': 'application/json'
      }
    })
    selectedRowId && setDeleteButton(!deleteButton)
  }

  useEffect(() => {
    tableData && setRowData(tableData.find(elem => elem.id === selectedRowId))
  }, [selectedRowId, tableData])

  function handleDeleteButton(){
    selectedRowId ? DeleteItem() : alert('Select Row')
  }

  function handleChangeButton(){
    if (selectedRowId)
    setChangeButton(!changeButton)
    else{
      setChangeButton(false)
      alert('Select Row')
    }
  }


  return (
    <div className='Main'>
      {tableData && 
        <div className='datagrid'>
          <Paper sx={{ height: 400, maxWidth: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableMultipleRowSelection = {true}
              onRowSelectionModelChange={(item) => item.length > 0 ? setSelectedRowId(String(item[0])) : setSelectedRowId(undefined)}
              sx={{ border: 0 }}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              }}
            />
          </Paper>
          <div className='change-buttons'>
            <div className='add-button'>
            <button onClick={() => setAddButton(!addButton)}>Add</button>  
              {addButton && 
                <AddData 
                  token={props.token}
                  addInput={addInput}
                  handleChange={(e) => setAddInput({...addInput, [e.target.name]: e.target.value})}
                  handleSubmit = {() => setAddInput(InnitialAddInput)}
                  toggleButton={() => setAddButton(!addButton)}
                />}
            </div>
            <div className='change-button'>
              <button onClick={handleChangeButton}>Change</button>
              {changeButton && selectedRowId &&
                <ChangeData 
                  rowData = {rowData}
                  token = {props.token}
                  toggleButton={() => setChangeButton(!changeButton)}
                />
              }
            </div>
            
              <button className='delete-button' onClick={handleDeleteButton}>Delete</button>
          </div>
          
            
        </div>
      }
      <button className='logout-button' onClick={() => {
        localStorage.removeItem('userToken')
        props.handleToken('')
      }
      }>Logout</button>
      
    </div>
    
  )
}
