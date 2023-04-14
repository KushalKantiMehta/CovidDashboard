import React from 'react'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'

import './Home.styles.css'
const Home = () => {
  const world = useSelector((state) => state.world)
  const rows = world?.countries_stat
  console.log(world)

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
    <div className='home'>
      <div className='homeContent'>
        <div className='basicDetails'> some basic details</div>
        <div className='indiaMap'>India chart map</div>
      </div>
      <div className='homeTable'>
        <div style={{ flex: 1 }}>
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
        <div style={{ flex: 1 }} className='tileRoot'>
          <div className='tileSubRoot'>
            <div className='tile'>
              Total Cases <br />
              {world?.world_total?.total_cases ?? 0}
            </div>
            <div className='tile'>
              Total Deaths
              <br />
              {world?.world_total?.total_deaths ?? 0}
            </div>
          </div>
          <div className='tileSubRoot'>
            <div className='tile'>
              Active Cases
              <br />
              {world?.world_total?.active_cases ?? 0}
            </div>
            <div className='tile'>
              Total Recovered
              <br />
              {world?.world_total?.total_recovered ?? 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
