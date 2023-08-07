import React, { useState, useEffect } from 'react'
import { MapContainer, useMap, TileLayer } from 'react-leaflet';
import MarkerLandslide from './Landslide/MarkerLandslide';
import MarkerRainfall from './Rainfall/MarkerRainfall';
import MarkerWTG from './WaterGroundPressure/MarkerWTG';
import AllMap from './AllMap/AllMap';
import Stack from 'react-bootstrap/esm/Stack';
import Form from 'react-bootstrap/Form';
import '../Map/Map.css';
const MarkerContext = React.createContext();

const Map = ({ landslideData, landslideData1, rainfallData, wtgData, selectedMarkers, setSelectedMarkers }) => {

  const options = ['AllMap', 'Landslide', 'Rainfall', 'Waterground'];
  const [selectedOption, setSelectedOption] = useState('Landslide');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  console.log('selected', selectedMarkers);

  const handleMarkerClick = (item) => {
    setSelectedMarkers((prevMarkers) => {
      if (item.type === 'Rainfall') {
        if (prevMarkers.find(marker => marker.station_id === item.station_id)) {
          return prevMarkers.filter((marker) => marker.station_id !== item.station_id);
        } else {
          return [...prevMarkers, item];
        }
      } else {
        if (prevMarkers.find(marker => marker.device_id === item.device_id)) {
          return prevMarkers.filter((marker) => marker.device_id !== item.device_id);
        } else {
          return [...prevMarkers, item];
        }
      }
    });
  };

  const handleDeleteMarker = (id, type) => {
    setSelectedMarkers((prevMarkers) =>
      prevMarkers.filter((marker) =>
        (type === 'Landslide' && marker.device_id !== id) ||
        (type === 'Rainfall' && marker.station_id !== id) ||
        (type === 'Peizo' && marker.device_id !== id)
      )
    );
  };

  const [Zoom, setZoom] = useState(9); 
  const MapEvents = () => {
    const map = useMap();
    useEffect(() => {
      function handleZoomEnd() {
        const zoom = map.getZoom();
        setZoom(zoom);
      }
      map.on('zoomend', handleZoomEnd);
      return () => {
        map.off('zoomend', handleZoomEnd);
      };
    }, [map])

    return null
  }
  
  return (
    <MarkerContext.Provider value={selectedMarkers}>
      <div>

        <Stack direction="horizontal" gap={4}>

          <div className={`shadow Maps`}>
            <Stack>
              <Stack direction="horizontal" gap={4}>
                <h1 className='Headtext' style={{ marginLeft: '2.21%', marginTop: '1.44%' }}>
                  Landslide Map
                </h1>
                <div>
                  <div className='cardSelect'>
                    {options.map((option) => (

                      <label key={option} >
                        <Form.Check
                          label={option}
                          value={option}
                          checked={selectedOption === option}
                          onChange={handleOptionChange}
                          className='selectOption'

                        />

                      </label>

                    ))} </div>
                </div>
              </Stack>
              <MapContainer
              className='MapContainer'
               
                center={[18.34, 99.7]}
                zoom={12}
              >
                <MapEvents />
                {selectedOption === 'AllMap' && (
                  <AllMap
                    landslideData1={landslideData1}
                    rainfallData={rainfallData}
                    wtgData={wtgData}
                    selectedMarkers={selectedMarkers}
                    handleMarkerClick={handleMarkerClick}
                    handleDeleteMarker={handleDeleteMarker}
                  />
                )}
                {selectedOption === 'Landslide' && (
                  <MarkerLandslide
                    data={landslideData}
                    landslideData1={landslideData1}
                    selectedMarkers = {selectedMarkers}
                    Zoom={Zoom}
                    handleMarkerClick={handleMarkerClick}
                    handleDeleteMarker={handleDeleteMarker}
                  />
                )}
                {selectedOption === 'Rainfall' && (
                  <MarkerRainfall
                    data={rainfallData}
                    selectedMarkers={selectedMarkers}
                    handleMarkerClick={handleMarkerClick}
                    handleDeleteMarker={handleDeleteMarker}
                  />
                )}
                {selectedOption === 'Waterground' && (
                  <MarkerWTG
                    data={wtgData}
                    selectedMarkers={selectedMarkers}
                    handleMarkerClick={handleMarkerClick}
                    handleDeleteMarker={handleDeleteMarker}
                  />
                )}
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution=""
                />
              </MapContainer>
            </Stack>
          </div>

          <div className={`groupchoose shadow `}>


            {selectedMarkers.length > 0 ? (


              selectedMarkers.length < 2 ? (
                <div >
                  <h1 className='Headtext' style={{ marginLeft: '8.04%', marginTop: '3.44%',width:'170px' }}>
                    Map Details
                  </h1>

                  {selectedMarkers.map((marker, index) => (
                    marker.type === 'Landslide' && (
                      <div key={index} className='markerChoose'  style={{height:'300px'}}>
                        <div className='textMarker'>
                          <h5 style={{marginLeft:'-50px'}}>{marker.type}</h5>
                          <p>Device_id {marker.device_id}</p>
                          <p style={{marginTop:'5px'}}>mine_n: <span style={{color:'#43D100'}}>{marker.mine_n}</span></p>
                          <p>mine_e: <span style={{color:'#F00'}}>{marker.mine_e}</span></p>
                          <p>Latitude: {marker.latitude}</p>
                          <p>Longitude: {marker.longitude}</p>
                          <button className='deleteButton' onClick={() => handleDeleteMarker(marker.device_id, marker.type)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  ))}

                  {selectedMarkers.map((marker, index) => (
                    marker.type === 'Rainfall' && (
                      <div key={index} className='markerChoose'>
                        <div className='textMarker'>
                        <h5 style={{marginLeft:'-50px'}}> {marker.type}</h5>
                          <p>station_id: {marker.station_id}</p>
                          <p>rain_data: {marker.rain_data}</p>
                          <button className='deleteButton' onClick={() => handleDeleteMarker(marker.station_id, marker.type)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  ))}

                  {selectedMarkers.map((marker, index) => (
                    marker.type === 'Peizo' && (
                      <div key={index} className='markerChoose'>
                        <div className='textMarker'>
                        <h5 style={{marginLeft:'-50px'}}>{marker.type}</h5>
                          <p>device_id: {marker.device_id}</p>
                          <p>kpa: <span style={{color:'#43D100'}}>{parseFloat(marker.kpa).toFixed(4)}</span></p>
                          <button className='deleteButton' onClick={() => handleDeleteMarker(marker.device_id, marker.type)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  ))}
                </div>



              ) : (

                <div className="scrollbar scrollbar-night-fade  ">
                  <h1 className='Headtext' style={{ marginLeft: '8.04%', marginTop: '3.44%' }}>
                    Map Details
                  </h1>

                  {selectedMarkers.map((marker, index) => (
                    marker.type === 'Landslide' && (
                      <div key={index} className='markerChoose2'>
                        <div className='textMarker'>
                        <h5 style={{marginLeft:'-50px'}}> {marker.type}</h5>
                        <p>Device_id {marker.device_id}</p>
                          <p style={{marginTop:'5px'}}>mine_n: <span style={{color:'#43D100'}}>{marker.mine_n}</span></p>
                          <p>mine_e: <span style={{color:'#F00'}}>{marker.mine_e}</span></p>
                          <p>Latitude: {marker.latitude}</p>
                          <p>Longitude: {marker.longitude}</p>
                      
                          <button className='deleteButton2' onClick={() => handleDeleteMarker(marker.device_id, marker.type)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  ))}

                  {selectedMarkers.map((marker, index) => (
                    marker.type === 'Rainfall' && (
                      <div key={index} className='markerChoose2'>
                        <div className='textMarker' style={{marginLeft:'-50px'}}>
                        <h5 style={{marginLeft:'-50px'}}> {marker.type}</h5>
                          <p>station_id: {marker.station_id}</p>
                          <p>rain_data: {marker.rain_data}</p>
                          <button className='deleteButton2' onClick={() => handleDeleteMarker(marker.station_id, marker.type)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  ))}

                  {selectedMarkers.map((marker, index) => (
                    marker.type === 'Peizo' && (
                      <div key={index} className='markerChoose2'>
                        <div className='textMarker'>
                        <h5 style={{marginLeft:'-50px'}}>{marker.type}</h5>
                          <p>device_id: {marker.device_id}</p>
                          <p>kpa: <span style={{color:'#43D100'}}>{parseFloat(marker.kpa).toFixed(4)}</span></p>
                          <button className='deleteButton2' onClick={() => handleDeleteMarker(marker.device_id, marker.type)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  ))}
                </div>


              )

            ) : (
              <div className='Choose'>Choose Your Marker</div>
            )}
            </div>
        </Stack>
      </div>
    </MarkerContext.Provider>

  )
}
export { MarkerContext };
export default Map