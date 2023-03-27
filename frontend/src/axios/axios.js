import axios from 'axios'

// get world covid data
const worldRequest = {
  method: 'GET',
  url: 'https://corona-virus-world-and-india-data.p.rapidapi.com/api',
  headers: {
    'X-RapidAPI-Key': 'c8208a25cbmshad1ebaef0e01d95p1f67c5jsn18e7ec37ebd2',
    'X-RapidAPI-Host': 'corona-virus-world-and-india-data.p.rapidapi.com',
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
