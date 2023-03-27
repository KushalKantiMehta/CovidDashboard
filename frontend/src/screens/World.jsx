import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataWorld } from '../redux/actions/actions'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const World = () => {
  const world = useSelector((state) => state.world)

  const rows = world?.countries_stat
  console.log(rows)

  const headCells = [
    {
      id: 'country_name',
      numeric: false,
      disablePadding: false,
      label: 'Country',
    },
    {
      id: 'cases',
      numeric: true,
      disablePadding: false,
      label: 'Cases',
    },
    {
      id: 'deaths',
      numeric: true,
      disablePadding: false,
      label: 'Deaths',
    },
    {
      id: 'active_cases',
      numeric: true,
      disablePadding: false,
      label: 'Active Cases',
    },
    {
      id: 'total_recovered',
      numeric: true,
      disablePadding: false,
      label: 'Recovered',
    },
  ]

  function EnhancedTableHead() {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  console.log(rows)
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <EnhancedTableHead />
            <TableBody>
              {rows?.length &&
                rows?.map((row) => {
                  return (
                    <TableRow>
                      <TableCell align='left'>{row.country_name}</TableCell>
                      <TableCell align='right'>{row.cases}</TableCell>
                      <TableCell align='right'>{row.deaths}</TableCell>
                      <TableCell align='right'>{row.active_cases}</TableCell>
                      <TableCell align='right'>{row.total_recovered}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default World
