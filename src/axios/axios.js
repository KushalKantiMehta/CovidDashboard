import axios from 'axios'

// get world covid data , the data present is in csv format
const worldRequest = {
  method: 'GET',
  url: 'https://covid19.who.int/WHO-COVID-19-global-table-data.csv',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
}

export function getWorldData() {
  return axios
    .request(worldRequest)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.error(error)
      return error
    })
}

const indiaOptions = {
  method: 'GET',
  url: 'https://data.covid19india.org/v4/min/timeseries.min.json',
}

export function getIndiaData() {
  return axios
    .request(indiaOptions)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.error(error)
    })
}

const indiaOptionsNew = {
  method: 'GET',
  url: 'https://data.covid19india.org/v4/min/data.min.json',
}

export function getIndiaDataNew() {
  return axios
    .request(indiaOptionsNew)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.error(error)
    })
}

const worldMapRequest = {
  method: 'GET',
  url: 'https://code.highcharts.com/mapdata/custom/world-highres.topo.json',
}

export function getWorldMap() {
  return axios
    .request(worldMapRequest)
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.error(error)
    })
}
