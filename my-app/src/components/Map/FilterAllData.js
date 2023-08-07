import React, { useEffect, useState } from 'react';
import Map from './Map';
import axios from 'axios';



const FilterAllData = ({ selectedMarkers, setSelectedMarkers, landslideData, setLandslideData, wtgData, setWTGData, landslideData1, setLandslideData1 }) => {
  const [rainfallData, setRainfallData] = useState([]);

  const updateData = async () => {
    try {
      const responseLandslideLatest = await axios.get('http://localhost:8080/api/landslide/landslideLatest');
      setLandslideData1(responseLandslideLatest.data);

      const responseLandslideLatest14Days = await axios.get('http://localhost:8080/api/landslide/landslideLatest14Days');
      setLandslideData(responseLandslideLatest14Days.data);

      const responseRainfallLatest = await axios.get('http://localhost:8080/api/rainfall/rainfallLatest');
      setRainfallData(responseRainfallLatest.data);

      const responseWTGLatest = await axios.get('http://localhost:8080/api/wtg/wtgLatest');
      setWTGData(responseWTGLatest.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    updateData(); // ให้อัพเดทข้อมูลเมื่อคอมโพเนนต์ถูกโหลด

    const updateInterval = setInterval(() => {
      updateData(); // อัพเดทข้อมูลทุก 30 นาที
    }, 30 * 1000);

    return () => {
      clearInterval(updateInterval); // เมื่อคอมโพเนนต์ถูกทำลาย ยกเลิกการเรียกอัพเดท
    };
  }, []);

  return (
    <div>
      <Map
        selectedMarkers = {selectedMarkers}
        setSelectedMarkers = {setSelectedMarkers}
        landslideData = {landslideData}
        landslideData1= {landslideData1}
        rainfallData = {rainfallData}
        wtgData = {wtgData}
      />
    </div>
  )
}

export default FilterAllData