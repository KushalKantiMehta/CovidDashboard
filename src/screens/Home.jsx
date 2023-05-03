import React from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import mapDataIndia from '../MapData/indiaMap'

import './Home.styles.css'
require('highcharts/modules/map')(Highcharts)
const Home = () => {
  const world = useSelector((state) => state.world)
  const indiaNew = useSelector((state) => state.indiaNew)
  const [mapDataIndiaValues, setMapDataIndiaValues] = React.useState([])
  const [indiaTotalValues, setIndiaTotalValues] = React.useState({
    confirmed: 0,
    deceased: 0,
    recovered: 0,
    tested: 0,
    vaccinated1: 0,
    vaccinated2: 0,
  })
  const rows = world?.countries_stat
  const [dataBarChart, setDataBarChart] = React.useState([])
  console.log(world)
  console.log(indiaNew)

  React.useEffect(() => {
    const temp = Object.keys(indiaNew).map((value) => {
      return ['in-' + value.toLowerCase(), indiaNew?.[value]?.total?.confirmed]
    })
    const total = Object.keys(indiaNew).reduce(
      (accumulator, value) => {
        console.log(accumulator)
        console.log(indiaNew?.[value]?.confirmed)
        return {
          confirmed:
            accumulator?.confirmed + indiaNew?.[value]?.total?.confirmed,
          deceased: accumulator?.deceased + indiaNew?.[value]?.total?.deceased,
          recovered:
            accumulator?.recovered + indiaNew?.[value]?.total?.recovered,
          tested: accumulator?.tested + indiaNew?.[value]?.total?.tested,
          vaccinated1:
            accumulator?.vaccinated1 + indiaNew?.[value]?.total?.vaccinated1,
          vaccinated2:
            accumulator?.vaccinated2 + indiaNew?.[value]?.total?.vaccinated2,
        }
      },
      {
        confirmed: 0,
        deceased: 0,
        recovered: 0,
        tested: 0,
        vaccinated1: 0,
        vaccinated2: 0,
      }
    )
    setIndiaTotalValues(total)
    setMapDataIndiaValues(temp)
  }, [indiaNew])

  const mapOptionsIndia = {
    chart: {
      map: mapDataIndia,
      height: '95%',
      backgroundColor: '#00FFFFFF',
    },
    title: {
      text: '',
    },
    mapNavigation: {
      enabled: false,
    },

    colorAxis: {
      min: 0,
    },

    series: [
      {
        data: mapDataIndiaValues,
        name: 'Confrimed',
        states: {
          hover: {
            color: '#BADA55',
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
      },
    ],
  }

  React.useEffect(() => {
    const temp = [
      parseFloat(world?.world_total?.total_cases.replaceAll(',', '')),
      parseFloat(world?.world_total?.total_deaths.replaceAll(',', '')),
      parseFloat(world?.world_total?.active_cases.replaceAll(',', '')),
      parseFloat(world?.world_total?.total_recovered.replaceAll(',', '')),
    ]
    if (temp) {
      console.log('temp', temp)
      setDataBarChart(temp)
    }
  }, [world])

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    series: [
      {
        name: 'Confirmed',
        type: 'column',
        data: [indiaTotalValues?.confirmed],
      },
      {
        name: 'Deaths',
        type: 'column',
        data: [indiaTotalValues?.deceased],
      },
      {
        name: 'Tested',
        type: 'column',
        data: [indiaTotalValues?.tested],
      },
      {
        name: 'Recovered',
        type: 'column',
        data: [indiaTotalValues?.recovered],
      },
      {
        name: 'Vaccinated Dose 1',
        type: 'column',
        data: [indiaTotalValues?.vaccinated1],
      },
      {
        name: 'Vaccinated Dose 2',
        type: 'column',
        data: [indiaTotalValues?.vaccinated2],
      },
    ],
    xAxis: {
      categories: ['Covid Data'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'No of Cases',
      },
    },
  }

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
        <div className='basicDetails'>
          <div style={{ flex: 1 }} className='tileRoot'>
            <div className='tileSubRoot'>
              <div className='tile'>
                Confirmed <br />
                {indiaTotalValues?.confirmed ?? 0}
              </div>
              <div className='tile'>
                Total Deaths
                <br />
                {indiaTotalValues?.deceased ?? 0}
              </div>
            </div>
            <div className='tileSubRoot'>
              <div className='tile'>
                Tested Cases
                <br />
                {indiaTotalValues?.tested ?? 0}
              </div>
              <div className='tile'>
                Total Recovered
                <br />
                {indiaTotalValues?.recovered ?? 0}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </div>
        <div className='indiaMap'>
          <HighchartsReact
            options={mapOptionsIndia}
            highcharts={Highcharts}
            constructorType={'mapChart'}
          />
        </div>
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
        <div style={{ flex: 1 }}></div>
      </div>
    </div>
  )
}

export default Home
