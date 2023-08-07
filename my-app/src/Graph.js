import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import axios from "axios";
const upColor = "#ec0000";
const upBorderColor = "#8A0000";
const downColor = "#00da3c";
const downBorderColor = "#008F28";

const Graph = ({ Graphdatas, msiButton, piezoButton, rainButton,selectedMarkers,rainfalldevice,piezodevice,rainData,piezoData }) => {



  useEffect(() => {
    
    if (!Array.isArray(Graphdatas) || Graphdatas.length === 0) {
      console.error(
        "ไม่สามารถแสดงกราฟได้เนื่องจากข้อมูลไม่ถูกต้องหรือไม่มีข้อมูล"
      );
      return;
    }
    const chart = echarts.init(document.getElementById("main"));
    const data = Graphdatas.map(function (item) {
      return [+item[1], +item[2], +item[3], +item[4]];
    });

    let minMsi = 1000;
    let maxMsi = 0;
    for (let i = 0; i < Graphdatas.length; i++) {

      if (Graphdatas[i][3] !== null && Graphdatas[i][4] !== null) {

        if (minMsi > Graphdatas[i][3]) {
          minMsi = Graphdatas[i][3];
          console.log(minMsi)
        }
        if (maxMsi < Graphdatas[i][4]) {
          maxMsi = Graphdatas[i][4];
        }
      }
    }

    const seriesData = [{
      name: "Msi",
      type: "candlestick",
      data: data,
      itemStyle: {
        color: downColor,
        color0: upColor,
        borderColor: downBorderColor,
        borderColor0: upBorderColor,
      },
      yAxisIndex: 0,
  
    },
    {
      name: "Rain",
      type: "line",
      data: rainData,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1,
        color: "#00A3FF",
      },
      yAxisIndex: 2,
    },
    {
      name: "Kpa",
      type: "line",
      data: piezoData,
      showSymbol: false,
      lineStyle: {
        width: 1,
        color: "#FF8A01",
      },
      yAxisIndex: 1,
    },
    ];
  
    

  
    





    const option = {
      title: {
        text: "Graph",
        left: "5%",
      },
      legend: {
        data: ["Msi", "Kpa", "Rain"],
        inactiveColor: "#777",
        selected: { Msi: msiButton, Kpa: piezoButton, Rain: rainButton },
      },
      xAxis: [
        {
          data: Graphdatas.map((item) => item[0]),
          axisLine: { lineStyle: { color: "#8392A5" } },

        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: true,
          type: "cross",
          lineStyle: {
            color: "#376df4",
            width: 1,
            opacity: 1,
          },
        },
      },
      
      dataZoom: [
        {
          type: "slider", // เปลี่ยนเป็น 'slider'
          start: 60, // ตั้งค่าเริ่มต้นให้ dataZoom ทำงานในส่วนแรกของข้อมูล
          end: 100, // ตั้งค่าเริ่มต้นให้ dataZoom ทำงานในส่วนสุดท้ายของข้อมูล
          textStyle: {
            color: "#8392A5",
          },
          handleIcon:
            "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          dataBackground: {
            areaStyle: {
              color: "#8392A5",
            },
            lineStyle: {
              opacity: 0.8,
              color: "#8392A5",
            },
          },
          brushSelect: true,

        },
        {
          type: "slider", // เปลี่ยนเป็น 'slider'
          start: 60, // ตั้งค่าเริ่มต้นให้ dataZoom ทำงานในส่วนแรกของข้อมูล
          end: 100, // ตั้งค่าเริ่มต้นให้ dataZoom ทำงานในส่วนสุดท้ายของข้อมูล
          textStyle: {
            color: "#8392A5",
          },
          handleIcon:
            "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          dataBackground: {
            areaStyle: {
              color: "#8392A5",
            },
            lineStyle: {
              opacity: 0.8,
              color: "#8392A5",
            },
          },
          brushSelect: true,
        },
      ],

      yAxis: [
        {
         type: "value",
          min: minMsi,
          max: maxMsi, 
          type: "log",
           // ใช้สเกลเลขลอการิทึมในแกน y ของกราฟแท่งเทียน
        },
        {

          min: Math.max(...piezoData)-10,
          max:Math.max(...piezoData)+10, // กำหนดค่าขั้นต่ำในสเกลเลขลอการิทึม
          type: "log",
          
        },
        {
          
          min: Math.max(...rainData)-100,
          max:Math.max(...rainData)+100,// กำหนดค่าขั้นต่ำในสเกลเลขลอการิทึม
          type: "log", // ใช้สเกลเลขลอการิทึมในแกน y ของกราฟเส้น
        },
      ],
      series: seriesData
    };

    chart.setOption(option);


    return () => {
      chart.dispose();

    };
  }, [Graphdatas, msiButton, piezoButton, rainButton,selectedMarkers,rainData]);

  return (
    <div
      id="main"
      style={{
        width: "100%",
        height: "500px",
        marginTop: "7%",
        position: "absolute",
        marginLeft: "-2.75%",
      }}
    > {console.log(rainfalldevice)}</div>
  );
};

export default Graph;
