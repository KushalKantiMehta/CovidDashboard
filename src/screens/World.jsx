import React from 'react'
import { useSelector } from 'react-redux'
import Paper from '@mui/material/Paper'
import { DataGrid } from '@mui/x-data-grid'
import './World.styles.css'

const World = () => {
  const world = useSelector((state) => state.world)
  const rows = world?.countries_stat
  console.log('world', world)

  const columns = [
    { field: 'country_name', headerName: 'Country Name', width: 170 },
    { field: 'cases', headerName: 'Cases', type: 'number', width: 150 },
    { field: 'deaths', headerName: 'Deaths', type: 'number', width: 150 },
    {
      field: 'total_recovered',
      headerName: 'Recovered',
      type: 'number',
      width: 150,
    },
    {
      field: 'active_cases',
      headerName: 'Active Cases',
      type: 'number',
      width: 150,
    },
  ]

  return (
    <div className='worldRoot'>
      <div className='worldMap'></div>
      <div className='worldTable'>
        {rows && (
          <Paper
            sx={{
              flexGrow: 1,
              height: '100%',
              mb: 2,
              borderRadius: '25px',
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(r) => r.country_name}
              pageSize={10}
              pageSizeOptions={[10, 25, 50]}
            />
          </Paper>
        )}
      </div>
    </div>
  )
}

export default World
