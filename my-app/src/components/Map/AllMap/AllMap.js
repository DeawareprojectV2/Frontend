import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet'

const AllMap = ({ landslideData1, rainfallData, wtgData, handleMarkerClick, selectedMarkers}) => {
    const markerLSIcon = new L.Icon({
        iconUrl: require('../../../images/landslidemarker2.png'),
        iconSize: [35, 40],
      })
    
      const markerLSIcon1 = new L.Icon({
        iconUrl: require('../../../images/landslidemarker.png'),
        iconSize: [35,40],
      })
    const markerRFIcon = new L.Icon({
        iconUrl: require('../../../images/rainfallmarker2.png'),
        iconSize: [35, 40],
    
    })

    const markerRFIcon1 = new L.Icon({
        iconUrl: require('../../../images/rainfallmarker.png'),
        iconSize: [35,40],
    })

    const markerWTGIcon = new L.Icon({
        iconUrl: require('../../../images/wtgmarker2.png'),
        iconSize: [35, 40],
    
    })

    const markerWTGIcon1 = new L.Icon({
        iconUrl: require('../../../images/wtgmarker.png'),
        iconSize: [35,40],
    })

    const landslideMarkerData = landslideData1.map(item => ({...item,type:'Landslide'}))
  return (
    <div>
        {landslideMarkerData.map((item, index) => (
            <Marker 
                key = {index}
                position={[item.latitude, item.longitude]}
                eventHandlers={{click : () => handleMarkerClick(item)}}
                icon={
                    selectedMarkers.some(marker => marker.device_id === item.device_id)
                      ? markerLSIcon  // หรือเลือก icon ที่มีกรอบสีเขียว
                      : markerLSIcon1
                  }
            >
                <Tooltip direction='top' offset={[0, -20]}>
                    <div>
                        <h6>Marker Info</h6>
                        <p>type: {item.type}</p>
                        <p>device_id: Lansdslide{item.device_id.slice(-2)}</p>
                        <p>altitude: {item.altitude}</p>
                    </div>
                </Tooltip >
            </Marker>
        ))}

        {rainfallData.map((item, index) => (
            <Marker
                key={index}
                position={[item.latitude, item.longitude]}
                icon={
                    selectedMarkers.some(marker => marker.station_id === item.station_id)
                      ? markerRFIcon  // หรือเลือก icon ที่มีกรอบสีเขียว
                      : markerRFIcon1
                  }
                eventHandlers={{ click: () => handleMarkerClick(item) }}    
            >
                <Tooltip direction='top' offset={[0, -20]}>
                    <div>
                        <h6>Marker Info</h6>
                        <p>type: {item.type}</p>
                        <p>station_id: {item.station_id}</p>
                        <p>rain_data: {item.rain_data}</p>
                    </div>
                </Tooltip>
            </Marker>
        ))}

        {wtgData.map((item, index) => (
            <Marker
                key={index}
                position={[item.latitude, item.longitude]}
                icon={
                    selectedMarkers.some(marker => marker.device_id === item.device_id)
                      ? markerWTGIcon  // หรือเลือก icon ที่มีกรอบสีเขียว
                      : markerWTGIcon1
                  }
                eventHandlers={{ click: () => handleMarkerClick(item) }}
            >
                <Tooltip direction='top' offset={[0, -20]}>
                    <div>
                        <h6>Marker Info</h6>
                        <p>type: {item.type}</p>
                        <p>WTG{item.device_id.slice(-2)}</p>
                        <p>kpa: {item.kpa}</p>
                    </div>
                </Tooltip>
            </Marker>
        ))}
    </div>
  )
}

export default AllMap