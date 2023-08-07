import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const GraphDetail = ({ selectedMarkers }) => {

  return (
    <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Station ID</TableCell>
        <TableCell align="right">Device ID</TableCell>
        <TableCell align="right">Type</TableCell>
        <TableCell align="right">Date</TableCell>
        <TableCell align="right">Time</TableCell>
        <TableCell align="right">Data</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {selectedMarkers && selectedMarkers.length > 0 ? (
        selectedMarkers.map((item, index) => {
          if (item.type === 'Landslide') {
            return (
              <TableRow key={index}>
                <TableCell>-</TableCell>
                <TableCell align="right">{item.device_id}</TableCell>
                <TableCell align="right">{item.type}</TableCell>
                <TableCell align="right">{item.timestamp.split(' ')[0]}</TableCell>
                <TableCell align="right">{item.timestamp.split(' ')[1]}</TableCell>
                <TableCell align="right">{item.altitude}</TableCell>
              </TableRow>
            );
          } else if (item.type === 'Rainfall') {
            return (
              <TableRow key={index}>
                <TableCell>{item.station_id}</TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">{item.type}</TableCell>
                <TableCell align="right">{item.timestamp.split(' ')[0]}</TableCell>
                <TableCell align="right">{item.timestamp.split(' ')[1]}</TableCell>
                <TableCell align="right">{item.rain_data}</TableCell>
              </TableRow>
            );
          } else if (item.type === 'Peizo') {
            return (
              <TableRow key={index}>
                <TableCell>-</TableCell>
                <TableCell align="right">{item.device_id}</TableCell>
                <TableCell align="right">{item.type}</TableCell>
                <TableCell align="right">{item.timestamp.split(' ')[0]}</TableCell>
                <TableCell align="right">{item.timestamp.split(' ')[1]}</TableCell>
                <TableCell align="right">{item.kpa}</TableCell>
              </TableRow>
            );
          }
          return null; // ต้อง return null เมื่อไม่ตรงกับเงื่อนไขใดๆ เพื่อป้องกัน Error
        })
      ) : (
        <TableRow>
          <TableCell colSpan={6} align='center'>No Selected Marker</TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
  )
}

export default GraphDetail
