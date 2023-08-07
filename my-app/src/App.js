import React, { useState,useEffect ,useRef, useContext } from 'react';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';

import Graph from './Graph';
import GraphDetail from './components/GraphDetail';
import SensersStatus from './components/SensersStatus';
import { MDBContainer } from 'mdb-react-ui-kit';
import Datas from './data';


import '../src/App.css';

import FilterAllData from './components/Map/FilterAllData';


const BodyWrapper = styled.div`
  background-color: #E6ECF2;
`;

const ColorSchemesExample = () => {
  const [isPiezoSliderOpen, setIsPiezoSliderOpen] = useState(true);
  const [isRainSliderOpen, setIsRainSliderOpen] = useState(true);
  const [isLandslideSliderOpen, setIsLandslideSliderOpen] = useState(true);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [landslideData, setLandslideData] = useState([]);
  const [landslideData1, setLandslideData1] = useState([]);
  const [wtgData, setWTGData] = useState([]);
  const [msiButton, setMsiButton] = useState(true); // เพิ่ม state สำหรับ msiButton
  const [piezoButton, setPiezoButton] = useState(true); // เพิ่ม state สำหรับ piezoButton
  const [rainButton, setRainButton] = useState(true); 



  const handleButtonClick = (buttonName) => {
    if (buttonName === 'Piezo') {
      setIsPiezoSliderOpen((prevState) => !prevState);
      setPiezoButton((prevState) => !prevState); 

    } else if (buttonName === 'Rain') {
      setIsRainSliderOpen((prevState) => !prevState);
      setRainButton((prevState) => !prevState); 
    
    }
    else if (buttonName === 'Landslide') {
      setIsLandslideSliderOpen((prevState) => !prevState);
      setMsiButton((prevState) => !prevState); 

    }
  };

  return (
    <BodyWrapper>
      <Navbar style={{ background: '#FFFFFF' }}>
        <Container>
          <img className='img' src="/Vector.png" alt="Image" />
          <Navbar.Brand className="DashText">Dashboard</Navbar.Brand>
        </Container>
      </Navbar>

      <Stack gap={3}>

        <FilterAllData 
          selectedMarkers = {selectedMarkers}
          setSelectedMarkers = {setSelectedMarkers}
          landslideData = {landslideData}
          setLandslideData = {setLandslideData}
          wtgData = {wtgData}
          setWTGData = {setWTGData}
          landslideData1={landslideData1}
          setLandslideData1={setLandslideData1}
        />

        <div className={`shadow Graph $`} >
        <Stack gap={2} style={{  }}>
          <Stack direction="horizontal"  style={{ marginTop:'1.1%'}}>
            {/*  ปุ่มPiezo */}
            <div style={{ display: 'flex', flexDirection: 'row' , marginLeft: '1.2%',
            marginTop: ((isRainSliderOpen && !isLandslideSliderOpen)||(!isRainSliderOpen && isLandslideSliderOpen)) &&!isPiezoSliderOpen ? '-5.0%':'',
            marginBottom: isRainSliderOpen && isLandslideSliderOpen ? '5.0%':'',
          }}>
              {isPiezoSliderOpen && (
                <div className="slider">
                  <button
                    onClick={() => handleButtonClick('Piezo')}
                    style={{
                      order: isPiezoSliderOpen ? 1 : 2,
                      border: 'none',
                      position: 'relative',
                    }}
                    className='Piezodetail'
                  >
                    <div className='slideall'>
                      <Stack direction="horizontal" gap={4}>
                        <img className='imgbutton' src="./Piezoline.png" alt="Image" />
                        <div>
                          <Stack>
                            <div className='buttondetailtext'>Last update</div>
                            <div className='buttondetailtext'>10 มิถุนายน 2565</div>
                          </Stack>
                        </div>
                        <div>
                          <Stack direction="horizontal" gap={1}>
                            <div className='buttondetailtext'>status</div>
                            <img className='imgbutton' src="./onlinestatus.png" alt="Image" />
                          </Stack>
                        </div>
                      </Stack>
                    </div>
                  </button>
                </div>
              )}
              <button
                onClick={() => handleButtonClick('Piezo')}
                style={{
                  order: isPiezoSliderOpen ? 2 : 1,
                  border: 'none',
                  position: 'absolute',
                  zIndex: 2,
                }}
                className='Piezo'
              >
                <div className='Pizotext'>
                  เซนเซอร์วัดระดับน้ำใต้ดินบน
                </div>
              </button>
            </div>
            {/*  ปุ่มRain */}
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '17.60%' ,
            marginTop: ((isPiezoSliderOpen && !isLandslideSliderOpen)||(!isPiezoSliderOpen && isLandslideSliderOpen)) && !isRainSliderOpen ? '-5.0%':'',
            marginBottom: isPiezoSliderOpen && isLandslideSliderOpen ? '5.0%':'',
         }}>
              {isRainSliderOpen && (
                <div className="slider">
                  <button
                    onClick={() => handleButtonClick('Rain')}
                    style={{
                      order: isRainSliderOpen ? 1 : 2,
                      border: 'none',
                      position: 'relative',
                    }}
                    className='Piezodetail'
                  >
                    <div className='slideall'>
                      <Stack direction="horizontal" gap={4}>
                        <img className='imgbutton' src="./Rainline.png" alt="Image" />
                        <div>
                          <Stack>
                            <div className='buttondetailtext'>Last update</div>
                            <div className='buttondetailtext'>10 มิถุนายน 2565</div>
                          </Stack>
                        </div>
                        <div>
                          <Stack direction="horizontal" gap={1}>
                            <div className='buttondetailtext'>status</div>
                            <img className='imgbutton' src="./onlinestatus.png" alt="Image" />
                          </Stack>
                        </div>
                      </Stack>
                    </div>
                  </button>
                </div>
              )}
              <button
                onClick={() => handleButtonClick('Rain')}
                style={{
                  order: isRainSliderOpen ? 2 : 1,
                  border: 'none',
                  position: 'absolute',
                  zIndex: 2,
                  
                }}
                className='Rain'
              >
                <div className='Raintext'>
                  เซนเซอร์วัดระดับน้ำฝน
                </div>
              </button>
            </div>


            {/*  ปุ่มmsi */}     
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '17.60%',
            marginTop: ((isPiezoSliderOpen && !isRainSliderOpen)||(!isPiezoSliderOpen && isRainSliderOpen)) && !isLandslideSliderOpen ? '-5.0%':'',
            marginBottom: isPiezoSliderOpen && isRainSliderOpen ? '5.0%':''
      }}>
              {isLandslideSliderOpen && (
                <div className="slider">
                  <button
                    onClick={() => handleButtonClick('Landslide')}
                    style={{
                      order: isLandslideSliderOpen ? 1 : 2,
                      border: 'none',
                      position: 'relative',
                    }}
                    className='Piezodetail'
                  >
                    <div className='slideall'>
                      <Stack direction="horizontal" gap={4}>
                        <img className='imgbuttons' src="./Msi.png" alt="Image" />
                        <div>
                          <Stack>
                            <div className='buttondetailtext'>Last update</div>
                            <div className='buttondetailtext'>10 มิถุนายน 2565</div>
                          </Stack>
                        </div>
                        <div>
                          <Stack direction="horizontal" gap={1}>
                            <div className='buttondetailtext'>status</div>
                            <img className='imgbutton' src="./onlinestatus.png" alt="Image" />
                          </Stack>
                        </div>
                      </Stack>
                    </div>
                  </button>
                </div>
              )}
              <button
                onClick={() => handleButtonClick('Landslide')}
                style={{
                  order: isLandslideSliderOpen ? 2 : 1,
                  border: 'none',
                  position: 'absolute',
                  zIndex: 2,
                  
                }}
                className='Landslide'
              >
                <div className='Landslidetext'>
                  เซนเซอร์MSL
                </div>
              </button>
            </div>
            
          </Stack>
                <Datas 
                  selectedMarkers = { selectedMarkers }
                  msiButton = { msiButton }
                  piezoButton = { piezoButton }
                  rainButton = { rainButton }
                />
          </Stack>
        </div>

        <Stack direction="horizontal" gap={4} style={{marginBottom:'10px'}}>
          <div className={`shadow Graph-Detail `} >
          <h2 className='Headtext' style={{ marginLeft: '2.21%', marginTop: '1.44%' }}>
                  Graph Detail
                </h2>
            <GraphDetail 
              selectedMarkers={ selectedMarkers }
            />
          </div> 
          <MDBContainer><div className={`Senser shadow `}>
          <div className="scrollbar scrollbar-night-fade"  style={{width:'100%', height:'100%', flex:'start'}}>
          <h2 className='Headtext' style={{ marginLeft: '2.21%', marginTop: '1.44%' }}>
                  Sensor Status
                </h2>
            <SensersStatus 
              landslideData1 = { landslideData1 }
              wtgData = { wtgData }
            />
          </div> 
          </div>
          </MDBContainer>
        </Stack>
      </Stack>
    </BodyWrapper>
  );
}

export default ColorSchemesExample;