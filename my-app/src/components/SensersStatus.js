import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import axios from 'axios';

const SensersStatus = ({ landslideData1, wtgData }) => {
  const [allSensorLS, setAllSensorLS] = useState([]);
  const [allSensorWTG, setAllSensorWTG] = useState([]);

  const updateData = async () => {
    try {
      const responseLandslideDevice_id = await axios.get('http://localhost:8080/api/landslide/device_idLS');
      setAllSensorLS(responseLandslideDevice_id.data);

      const responseWtgDevice_id = await axios.get('http://localhost:8080/api/wtg/device_idWTG');
      setAllSensorWTG(responseWtgDevice_id.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    updateData();

    const updateInterval = setInterval(() => {
      updateData();
    }, 30 * 1000);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  const onlineSensorsLS = allSensorLS.filter(sensor => landslideData1.some(item => item.device_id === sensor.device_id));
  const offlineSensorsLS = allSensorLS.filter(sensor => !landslideData1.some(item => item.device_id === sensor.device_id));

  const onlineSensorsWTG = allSensorWTG.filter(sensor => wtgData.some(item => item.device_id === sensor.device_id));
  const offlineSensorsWTG = allSensorWTG.filter(sensor => !wtgData.some(item => item.device_id === sensor.device_id));

  console.log('onlineWTG', onlineSensorsWTG);
  console.log('offlineWTG', offlineSensorsWTG);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Device ID</TableCell>
            <TableCell align='right'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offlineSensorsLS.map((item, index) => (
            <TableRow key={index}>
              <TableCell>Lansdslide{item.device_id.slice(-2)}</TableCell>
              <TableCell>
                Offline
                <FiberManualRecordIcon style={{ color: 'red' , fontSize: 15 }}></FiberManualRecordIcon>
              </TableCell>
            </TableRow>
          ))}
          {offlineSensorsWTG.map((item, index) => (
            <TableRow key={index}>
              <TableCell>WTG{item.device_id.slice(-3)}</TableCell>
              <TableCell>
                Offline
                <FiberManualRecordIcon style={{ color: 'red' , fontSize: 15 }}></FiberManualRecordIcon>
              </TableCell>
            </TableRow>
          ))}
          {onlineSensorsLS.map((item, index) => (
            <TableRow key={index}>
              <TableCell>Lansdslide{item.device_id.slice(-2)}</TableCell>
              <TableCell>
                Online
                <FiberManualRecordIcon style={{ color: 'lightgreen', fontSize: 15  }}></FiberManualRecordIcon>
              </TableCell>
            </TableRow>
          ))}
          
          {onlineSensorsWTG.map((item, index) => (
            <TableRow key={index}>
              <TableCell>WTG{item.device_id.slice(-2)}</TableCell>
              <TableCell>
                Online
                <FiberManualRecordIcon style={{ color: 'lightgreen', fontSize: 15 }}></FiberManualRecordIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SensersStatus;