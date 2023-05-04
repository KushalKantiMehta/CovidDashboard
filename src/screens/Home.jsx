import React from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import AnimatedNumbers from 'react-animated-numbers'
import mapDataIndia from '../MapData/indiaMap'
import stateKVP from '../assets/state'
import './Home.styles.css'
require('highcharts/modules/map')(Highcharts)
const Home = () => {
  const indiaNew = useSelector((state) => state.indiaNew)
  const indiaTimeLine = useSelector((state) => state.india)
  const [mapDataIndiaValues, setMapDataIndiaValues] = React.useState([])
  const [confrimedTimelineValue, setConfrimedTimelineValue] = React.useState([])
  const [testedTimelineValue, setTestedTimelineValue] = React.useState([])
  const [recoveredTimelineValue, setRecoveredTimelineValue] = React.useState([])
  const [deathsTimelineValue, setDeathsTimelineValue] = React.useState([])
  const [indiaTotalValues, setIndiaTotalValues] = React.useState({
    confirmed: 0,
    deceased: 0,
    recovered: 0,
    tested: 0,
    vaccinated1: 0,
    vaccinated2: 0,
  })

  console.log('timeline', indiaTimeLine)

  const rows = Object.keys(indiaNew).map((val) => {
    return {
      state_name: stateKVP?.[val],
      confirmed: indiaNew?.[val]?.total?.confirmed,
      deceased: indiaNew?.[val]?.total?.deceased,
      recovered: indiaNew?.[val]?.total?.recovered,
      tested: indiaNew?.[val]?.total?.tested,
      vaccinated1: indiaNew?.[val]?.total?.vaccinated1,
      vaccinated2: indiaNew?.[val]?.total?.vaccinated2,
    }
  })

  const columns = [
    { field: 'state_name', headerName: 'State Name', width: 170 },
    {
      field: 'confirmed',
      headerName: ' Confirmed Cases',
      type: 'number',
      width: 150,
    },
    { field: 'deceased', headerName: 'Deaths', type: 'number', width: 150 },
    {
      field: 'recovered',
      headerName: 'Recovered',
      type: 'number',
      width: 150,
    },
    {
      field: 'tested',
      headerName: 'Tested Cases',
      type: 'number',
      width: 150,
    },
    {
      field: 'vaccinated1',
      headerName: 'Vaccinated Dose 1',
      type: 'number',
      width: 150,
    },
    {
      field: 'vaccinated2',
      headerName: 'Vaccinated Dose 2',
      type: 'number',
      width: 150,
    },
  ]

  React.useEffect(() => {
    const confirmedTemp = Object.values(indiaTimeLine?.TT?.dates).map((val) => {
      return val?.total?.confirmed ?? 0
    })
    const deceasedTemp = Object.values(indiaTimeLine?.TT?.dates).map((val) => {
      return val?.total?.deceased ?? 0
    })
    const recoveredTemp = Object.values(indiaTimeLine?.TT?.dates).map((val) => {
      return val?.total?.recovered ?? 0
    })
    const testedTemp = Object.values(indiaTimeLine?.TT?.dates).map((val) => {
      return val?.total?.tested ?? 0
    })
    setConfrimedTimelineValue(confirmedTemp)
    setDeathsTimelineValue(deceasedTemp)
    setRecoveredTimelineValue(recoveredTemp)
    setTestedTimelineValue(testedTemp)
  }, [indiaTimeLine])

  React.useEffect(() => {
    const temp = Object.keys(indiaNew).map((value) => {
      return ['in-' + value.toLowerCase(), indiaNew?.[value]?.total?.confirmed]
    })
    const total = Object.keys(indiaNew).reduce(
      (accumulator, value) => {
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

  const mapOnlickHandler = () => {
    console.log('a')
  }

  const mapOptionsIndia = {
    chart: {
      map: mapDataIndia,
      height: '95%',
      backgroundColor: '',
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
    plotOptions: {
      series: {
        point: {
          events: {
            click: mapOnlickHandler(),
          },
        },
      },
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

  const chartOptionsconfrimed = {
    chart: {
      height: '150px',
    },
    title: {
      text: '',
    },

    yAxis: {
      title: {
        text: 'Number of Cases',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2020 to 2022',
      },
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: 'Confrimed',
        data: confrimedTimelineValue,
      },
    ],
  }

  const chartOptionsdeceased = {
    chart: {
      height: '150px',
    },
    title: {
      text: '',
    },

    yAxis: {
      title: {
        text: 'Number of Cases',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2020 to 2022',
      },
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: 'Deaths',
        data: deathsTimelineValue,
      },
    ],
  }

  const chartOptionsRecovered = {
    chart: {
      height: '150px',
    },
    title: {
      text: '',
    },

    yAxis: {
      title: {
        text: 'Number of Cases',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2020 to 2022',
      },
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: 'Recovered',
        data: recoveredTimelineValue,
      },
    ],
  }

  const chartOptionstested = {
    chart: {
      height: '150px',
    },
    title: {
      text: '',
    },

    yAxis: {
      title: {
        text: 'Number of Cases',
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2020 to 2022',
      },
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: 'Tested',
        data: testedTimelineValue,
      },
    ],
  }

  return (
    <div className='home'>
      <div className='homeContent'>
        <div className='basicDetails'>
          <div style={{ flex: 1 }} className='tileRoot'>
            <div className='tileSubRoot'>
              <div className='tile active'>
                Confirmed
                <AnimatedNumbers
                  includeComma
                  animateToNumber={indiaTotalValues?.confirmed ?? 0}
                  fontStyle={{ fontSize: 20 }}
                  locale='en-US'
                  configs={[
                    { mass: 1, tension: 220, friction: 100 },
                    { mass: 1, tension: 180, friction: 130 },
                    { mass: 1, tension: 280, friction: 90 },
                    { mass: 1, tension: 180, friction: 135 },
                    { mass: 1, tension: 260, friction: 100 },
                    { mass: 1, tension: 210, friction: 180 },
                  ]}
                ></AnimatedNumbers>
              </div>
              <div className='tile deaths'>
                Total Deaths
                <AnimatedNumbers
                  includeComma
                  animateToNumber={indiaTotalValues?.deceased ?? 0}
                  fontStyle={{ fontSize: 20 }}
                  locale='en-US'
                  configs={[
                    { mass: 1, tension: 220, friction: 100 },
                    { mass: 1, tension: 180, friction: 130 },
                    { mass: 1, tension: 280, friction: 90 },
                    { mass: 1, tension: 180, friction: 135 },
                    { mass: 1, tension: 260, friction: 100 },
                    { mass: 1, tension: 210, friction: 180 },
                  ]}
                ></AnimatedNumbers>
              </div>
            </div>
            <div className='tileSubRoot'>
              <div className='tile tested'>
                Tested Cases
                <AnimatedNumbers
                  includeComma
                  animateToNumber={indiaTotalValues?.tested ?? 0}
                  fontStyle={{ fontSize: 20 }}
                  locale='en-US'
                  configs={[
                    { mass: 1, tension: 220, friction: 100 },
                    { mass: 1, tension: 180, friction: 130 },
                    { mass: 1, tension: 280, friction: 90 },
                    { mass: 1, tension: 180, friction: 135 },
                    { mass: 1, tension: 260, friction: 100 },
                    { mass: 1, tension: 210, friction: 180 },
                  ]}
                ></AnimatedNumbers>
              </div>
              <div className='tile recovered'>
                Total Recovered
                <AnimatedNumbers
                  includeComma
                  animateToNumber={indiaTotalValues?.recovered ?? 0}
                  fontStyle={{ fontSize: 20 }}
                  locale='en-US'
                  configs={[
                    { mass: 1, tension: 220, friction: 100 },
                    { mass: 1, tension: 180, friction: 130 },
                    { mass: 1, tension: 280, friction: 90 },
                    { mass: 1, tension: 180, friction: 135 },
                    { mass: 1, tension: 260, friction: 100 },
                    { mass: 1, tension: 210, friction: 180 },
                  ]}
                ></AnimatedNumbers>
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
        <div style={{ flex: 2 }}>
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
                getRowId={(r) => r.state_name}
                pageSize={10}
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'confirmed', sort: 'asc' }],
                  },
                }}
              />
            </Paper>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsconfrimed}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionstested}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsRecovered}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsdeceased}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
