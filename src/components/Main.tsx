import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddData from './AddData';
import ChangeData from './ChangeData';
import Button from '@mui/material/Button';
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
  const [isLoading, setIsLoading] = useState(false)
  const [dataChanged, setDataChanged] = useState(true)

  useEffect(() => {
    async function getTable(){
      setIsLoading(true)
      const res = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
        method: 'GET',
        headers: {
          'x-auth': props.token,
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      setTableData(data.data)
      setIsLoading(false)
    }
    getTable()
  },[props.token, dataChanged, deleteButton])


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
    tableData && await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${selectedRowId}`, {
      method: 'POST',
      headers: {
        'x-auth': props.token,
        'Content-Type': 'application/json'
      }
    })
    setDeleteButton(!deleteButton)
    setSelectedRowId(undefined)
  }

  useEffect(() => {
    tableData && setRowData(tableData.find(elem => elem.id === selectedRowId))
  }, [selectedRowId, tableData])

  return (
    <div className='Main'>
      {tableData && !isLoading &&
        <div className='datagrid'>
          <Paper sx={{ height: 400, maxWidth: '100%', marginBottom: '20px' }}>
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
            <Button
              variant="contained"
              onClick={() => setAddButton(!addButton)}
              sx = {{height: '40px', width: '100px'}}
            >Add</Button>
              {addButton && 
                <AddData 
                  token={props.token}
                  addInput={addInput}
                  handleChange={(e) => setAddInput({...addInput, [e.target.id]: e.target.value})}
                  handleSubmit = {() => setAddInput(InnitialAddInput)}
                  toggleSelectRow = {() => setSelectedRowId(undefined)}
                  toggleButton={() => {
                    setAddButton(!addButton)
                    setDataChanged(!dataChanged)
                  }}
                />}
            </div>
            <div className='change-button'>
              {selectedRowId && <Button
                variant="contained"
                onClick={() => setChangeButton(!changeButton)}
                sx = {{height: '40px', width: '100px'}}
              >Change</Button>}
              {changeButton && selectedRowId &&
                <ChangeData 
                  rowData = {rowData}
                  token = {props.token}
                  toggleButton={() => {
                    setChangeButton(!changeButton)
                    setDataChanged(!dataChanged)
                  }}
                  toggleSelectRow = {() => setSelectedRowId(undefined)}
                />
              }
            </div>
              {selectedRowId && <Button
                variant="contained"
                onClick={DeleteItem}
                sx = {{height: '40px', width: '100px'}}
              >Delete</Button>}
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.removeItem('userToken')
                  props.handleToken('')
                }}
                sx = {{height: '40px', width: '100px'}}
              >Logout</Button>
          </div>
        </div>
      }

      {isLoading && 
        <div className='isloading'>
          <div>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
          
        </div>
      }
    </div>
  )
}

