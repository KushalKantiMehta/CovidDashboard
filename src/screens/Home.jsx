import React from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import AnimatedNumbers from 'react-animated-numbers'
import mapDataIndia from '../MapData/indiaMap'
import { useNavigate } from 'react-router-dom'
import stateKVP from '../assets/state'
import './Home.styles.css'
require('highcharts/modules/map')(Highcharts)
const Home = () => {
  const indiaNew = useSelector((state) => state.indiaNew)
  const indiaTimeLine = useSelector((state) => state.india)
  const [mapDataIndiaValues, setMapDataIndiaValues] = React.useState({
    confirmed: [],
    deceased: [],
    recovered: [],
    tested: [],
  })
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
  const [tileActive, setTileActive] = React.useState(true)
  const [tileDeaths, setTileDeaths] = React.useState(false)
  const [tileRecovered, setTileRecovered] = React.useState(false)
  const [tileTested, setTileTested] = React.useState(false)

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
    { field: 'deceased', headerName: 'Deaths', type: 'number', width: 110 },
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
    const confirmedTemp = Object.values(indiaTimeLine?.TT?.dates ?? {}).map(
      (val) => {
        return val?.total?.confirmed ?? 0
      }
    )
    const deceasedTemp = Object.values(indiaTimeLine?.TT?.dates ?? {}).map(
      (val) => {
        return val?.total?.deceased ?? 0
      }
    )
    const recoveredTemp = Object.values(indiaTimeLine?.TT?.dates ?? {}).map(
      (val) => {
        return val?.total?.recovered ?? 0
      }
    )
    const testedTemp = Object.values(indiaTimeLine?.TT?.dates ?? {}).map(
      (val) => {
        return val?.total?.tested ?? 0
      }
    )
    setConfrimedTimelineValue(confirmedTemp)
    setDeathsTimelineValue(deceasedTemp)
    setRecoveredTimelineValue(recoveredTemp)
    setTestedTimelineValue(testedTemp)
  }, [indiaTimeLine])

  React.useEffect(() => {
    const Mapconfrimed = Object.keys(indiaNew).map((value) => {
      return ['in-' + value.toLowerCase(), indiaNew?.[value]?.total?.confirmed]
    })
    const Mapdeceased = Object.keys(indiaNew).map((value) => {
      return ['in-' + value.toLowerCase(), indiaNew?.[value]?.total?.deceased]
    })
    const MapTested = Object.keys(indiaNew).map((value) => {
      return ['in-' + value.toLowerCase(), indiaNew?.[value]?.total?.tested]
    })
    const MapRecovered = Object.keys(indiaNew).map((value) => {
      return ['in-' + value.toLowerCase(), indiaNew?.[value]?.total?.recovered]
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
    setMapDataIndiaValues({
      confirmed: [...Mapconfrimed],
      deceased: [...Mapdeceased],
      tested: [...MapTested],
      recovered: [...MapRecovered],
    })
  }, [indiaNew])

  const navigate = useNavigate()

  const mapOnlickHandler = (s) => {
    if (s !== 'in-tt') {
      navigate('/state/' + s)
    }
  }

  const tileclickhandler = (s) => {
    if (s === 'tested') {
      setTileActive(false)
      setTileDeaths(false)
      setTileRecovered(false)
      setTileTested(true)
    }
    if (s === 'recovered') {
      setTileActive(false)
      setTileDeaths(false)
      setTileRecovered(true)
      setTileTested(false)
    }
    if (s === 'deaths') {
      setTileActive(false)
      setTileDeaths(true)
      setTileRecovered(false)
      setTileTested(false)
    }
    if (s === 'active') {
      setTileActive(true)
      setTileDeaths(false)
      setTileRecovered(false)
      setTileTested(false)
    }
    console.log(
      'active',
      tileActive,
      'deaths',
      tileDeaths,
      'recovered',
      tileRecovered,
      'tested',
      tileTested
    )
  }

  const getMapData = () => {
    if (tileDeaths) {
      return mapDataIndiaValues?.deceased
    }
    if (tileRecovered) {
      return mapDataIndiaValues?.recovered
    }
    if (tileTested) {
      return mapDataIndiaValues?.tested
    }
    if (tileActive) {
      return mapDataIndiaValues?.confirmed
    }
  }
  const getMapLabel = () => {
    if (tileDeaths) {
      return 'Deaths'
    }
    if (tileRecovered) {
      return 'Recovered'
    }
    if (tileTested) {
      return 'Tested'
    }
    return 'Confirmed'
  }

  const getColorConfig = () => {
    if (tileDeaths) {
      return [
        [0, '#ec9e9b'],
        [0.2, '#e47470'],
        [0.4, '#d83530'],
        [0.6, '#d83530'],
        [0.8, '#9e221e'],
        [1, '#891d1a'],
      ]
    }
    if (tileRecovered) {
      return [
        [0, '#dbf8dc'],
        [0.2, '#9bec9e'],
        [0.4, '#5be05f'],
        [0.6, '#26c92b'],
        [0.8, '#1e9e22'],
        [1, '#1a891d'],
      ]
    }
    if (tileTested) {
      return [
        [0, '#d4dbf4'],
        [0.2, '#2f7ed8'],
        [0.4, '#2671c8'],
        [0.6, '#2165b3'],
        [0.8, '#1d599d'],
        [1, '#000000'],
      ]
    }
    if (tileActive) {
      return [
        [0, '#f7f8db'],
        [0.4, '#dfe470'],
        [0.6, '#d1d831'],
        [0.9, '#adb422'],
        [1, '#c2c926'],
      ]
    }
  }

  const getMaxValue = () => {
    if (tileDeaths) {
      return 100000
    }
    if (tileRecovered) {
      return 6000000
    }
    if (tileTested) {
      return 200000000
    }
    if (tileActive) {
      return 6000000
    }
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
      max: getMaxValue(),
      stops: getColorConfig(),
    },
    plotOptions: {
      series: {
        point: {
          events: {
            click: (e) => {
              mapOnlickHandler(e?.point?.['hc-key'])
            },
          },
        },
      },
    },
    series: [
      {
        data: getMapData(),
        name: getMapLabel(),
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
      borderColor: '#EBBA95',
      borderRadius: 20,
      borderWidth: 2,
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
        color: '#ffee58',
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
      borderColor: '#EBBA95',
      borderRadius: 20,
      borderWidth: 2,
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
        color: '#FF0000',
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
      borderColor: '#EBBA95',
      borderRadius: 20,
      borderWidth: 2,
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
        color: '#7cb342',
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
      borderColor: '#EBBA95',
      borderRadius: 20,
      borderWidth: 2,
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
              <div
                className='tile active'
                onClick={(e) => tileclickhandler('active')}
              >
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
              <div
                className='tile deaths'
                onClick={(e) => tileclickhandler('deaths')}
              >
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
              <div
                className='tile tested'
                onClick={(e) => tileclickhandler('tested')}
              >
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
              <div
                className='tile recovered'
                onClick={(e) => tileclickhandler('recovered')}
              >
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
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'confirmed', sort: 'asc' }],
                  },
                }}
              />
            </Paper>
          )}
        </div>
        <div style={{ flex: 1 }} className='chartSection'>
          <div className='lineGraph'>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptionsconfrimed}
            />
          </div>
          <div className='lineGraph'>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptionstested}
            />
          </div>
          <div className='lineGraph'>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptionsRecovered}
            />
          </div>
          <div className='lineGraph'>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptionsdeceased}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
