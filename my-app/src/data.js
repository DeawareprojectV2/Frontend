import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import axios from "axios";

const Datas = ({ selectedMarkers, msiButton, piezoButton, rainButton }) => {
  const [chartData, setChartData] = useState([]);
  const [msidevice, setMsidevice] = useState([]);
  const [rainfalldevice, setrainfalldevice] = useState([]);
  const [rainData,setRaindata] = useState([]);
  const [piezoData,setPiezodata] = useState([]);
  const [piezodevice, setpiezodevice] = useState([]);
  // const formatDate = (date) => {
  //   const day = date.getDate().toString().padStart(2, '0'); // ใส่เลขวันให้เป็นสองหลักและใส่เลข 0 ถ้าเป็นเลขเดียว
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0'); // เดือนเริ่มจาก 0 ดังนั้นต้องบวก 1
  //   const year = date.getFullYear(); // ปี
  //   return `${year}-${month}-${day}`;
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {

          if(msidevice.length ===1){
          const filteredData = (
            await axios.get(
              "http://localhost:8080/api/landslide/landslideAlldata/" +
              msidevice
            )
          ).data;
          const dailyChartData = filteredData.map((array) => array.slice(1));
          setChartData(dailyChartData);
        }
        else{
       
          const filteredData = (
            await axios.get(
              "http://localhost:8080/api/landslide/landslideAlldata/" +
              Object.values(msidevice)[-1]
            )
          ).data;
          const dailyChartData = filteredData.map((array) => array.slice(1));
          setChartData(dailyChartData);


        }
        if(rainfalldevice.length === 1){

          const filteredData = (
            await axios.get(
              "http://localhost:8080/api/rainfall/rainfallAlldata/" +
              rainfalldevice
            )
          ).data;
          setRaindata(filteredData)
          setrainfalldevice([])

        
        }
        if(piezodevice.length === 1){

            const filteredData = (
              await axios.get(
                "http://localhost:8080/api/wtg/wtgAlldata/" +
                piezodevice
              )
            ).data;
            
          setPiezodata(filteredData);
          setpiezodevice([])

        
        }
        
        // const parsedData = filteredData.data.map((item) => ({
        //   x: item.timestamp,
        //   y: parseFloat(item.altitude),
        // }));
        // const timestamps = parsedData.map(item => new Date(item.x.split(' ')[0])); // แปลง timestamp string ให้เป็นวันที่แบบ Date (ไม่รวมเวลา)
        // const minTimestamp = new Date(Math.min(...timestamps)); // แปลงกลับเป็น Date
        // const maxTimestamp = new Date(Math.max(...timestamps)); // แปลงกลับเป็น Date
        // const startDateFormatted = formatDate(minTimestamp); // แปลงวันที่เป็นรูปแบบ "DD-MM-YYYY"
        // const endDateFormatted = formatDate(maxTimestamp); // แปลงวันที่เป็นรูปแบบ "DD-MM-YYYY"

        // const startDate = new Date(startDateFormatted);
        // const endDate = new Date(endDateFormatted);

        // const dailyChartData = [];

        // for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        //   if (date <= endDate) {
        //     const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        //     const formattedDate = date.toLocaleDateString('en-GB', options);
        //     const filteredChartData = parsedData.filter((item) => item.x.substring(0, 10) === date.toISOString().substring(0, 10));
        //     const yAxisData = filteredChartData.map((item) => item.y);
        //     const parts = formattedDate.split('/');
        //     const year = parts[2];
        //     const month = parseInt(parts[1], 10);
        //     const day = parseInt(parts[0], 10);
        //     const lastFormattedDate = `${year}/${month}/${day - 1}`;

        //     if (Math.min(...yAxisData) !== Infinity) {
        //       dailyChartData.push([
        //         lastFormattedDate,
        //         yAxisData[0],
        //         yAxisData[yAxisData.length - 1],
        //         Math.min(...yAxisData),
        //         Math.max(...yAxisData),
        //       ]);
        //     }

        //   }
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [msidevice,rainfalldevice,selectedMarkers,piezodevice]);
  useEffect(() => {
    const filteredMsidevice = selectedMarkers.filter(
      (item) => item.type === "Landslide"
    );
    const msinames = filteredMsidevice.map((item) => item.device_id);
    const msiname = Object.values(msinames);
    setMsidevice(msiname);

  }, [selectedMarkers]);

  useEffect(() => {
    
    const filteredrainfalldevice = selectedMarkers.filter( (item) => item.type === "Rainfall"
    );
    const rainfalldevicename = filteredrainfalldevice.map((item) => ([item.station_id]));
    
    setrainfalldevice(rainfalldevicename);

    
  }, [selectedMarkers]);

  useEffect(() => {
    const filteredpiezodevice = selectedMarkers.filter( (item) => item.type === "Peizo"
    );
    const piezodevicename = filteredpiezodevice.map((item) => ([item.device_id]));
    setpiezodevice(piezodevicename);

    
  }, [selectedMarkers]);

  

  // คืนค่า chartData เพื่อให้สามารถใช้งานข้อมูลกราฟได้ต่
  return (
    <>
      <Graph
        selectedMarkers={selectedMarkers}
        Graphdatas={chartData}
        msiButton={msiButton}
        piezoButton={piezoButton}
        rainButton={rainButton}
        rainData = {rainData}
        piezodevice = {piezodevice}
        piezoData = {piezoData}
      />

    </>
  );
};

export default Datas;
