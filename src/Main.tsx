import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AddData from './AddData';
import DeleteData from './DeleteData';

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
  const [addInput, setAddInput] = useState({
    companySigDate: '2022-12-23T11:19:27.017Z\t',
    companySignatureName: 'test',
    documentName: 'test',
    documentStatus: 'test',
    documentType: 'test',
    employeeNumber: 'test',
    employeeSigDate: '2022-12-23T11:19:27.017Z\t',
    employeeSignatureName: 'test'
  })
  const [deleteButton, setDeleteButton] = useState(false)
  const [optionValue, setOptionvalue] = useState('1')

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
  },[props.token, addButton, deleteButton])


  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID'},
    {field: 'companySigDate', headerName: 'companySigDate', minWidth: 200},
    {field: 'companySignatureName', headerName: 'companySignatureName', minWidth: 200},
    {field: 'documentName', headerName: 'documentName', minWidth: 200},
    {field: 'documentStatus', headerName: 'documentStatus', minWidth: 150},
    {field: 'documentType', headerName: 'documentType', minWidth: 200},
    {field: 'employeeNumber', headerName: 'employeeNumber', minWidth: 100},
    {field: 'employeeSigDate', headerName: 'employeeSigDate', minWidth: 200},
    {field: 'employeeSignatureName', headerName: 'employeeSignatureName', minWidth: 200},
  ]

  const rows = tableData && tableData.map(elem => {
    return{
      ...elem
    }
  })

  async function DeleteItem() {
    const res = tableData && await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${tableData[Number(optionValue)-1].id}`, {
      method: 'POST',
      headers: {
        'x-auth': props.token,
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <div className='Main'>
      {tableData && 
        <div>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection
              disableMultipleRowSelection = {true}
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
          <button onClick={() => setAddButton(!addButton)}>Add</button>  
          {addButton && 
            <AddData 
              token={props.token}
              addInput={addInput}
              handleChange={(e) => setAddInput({...addInput, [e.target.name]: e.target.value})}
              toggleButton={() => setAddButton(!addButton)}
            />}
          <button onClick={() => setDeleteButton(!deleteButton)}>Delete</button>
          {deleteButton &&
            <DeleteData
              length={tableData.length}
              toggleButton={() => {
                DeleteItem()
                console.log(tableData)
                setDeleteButton(!deleteButton)
              }}
              handleChange={(e) => setOptionvalue(e.target.value)}
            />}
        </div>
      }
      <button onClick={() => {
        localStorage.removeItem('userToken')
        props.handleToken('')
      }
      }>Logout</button>
      
    </div>
    
  )
}
