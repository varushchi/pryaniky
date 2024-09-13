import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface Props{
  token: string
  handleSubmit: (token: string) => void
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

  useEffect(() => {
    async function get(){
      const res = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
        method: 'GET',
        headers: {
          'x-auth': props.token,
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json();
      setTableData(data.data)
      console.log(props.token)
    }
    get()
  },[props.token]) // change dependency or useEffect


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

  return (
    <div className='Main'>
      {tableData && 
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
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
      }

      <button onClick={() => {
        localStorage.removeItem('userToken')
        props.handleSubmit('')
      }
      }>Logout</button>
    </div>
  )
}
