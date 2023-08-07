import React from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet';

const MarkerRainfall = ({ data, handleMarkerClick, selectedMarkers }) => {
    const markerIcon = new L.Icon({
        iconUrl: require('../../../images/rainfallmarker2.png'),
        iconSize: [35, 40],
    
    })

    const markerIcon1 = new L.Icon({
        iconUrl: require('../../../images/rainfallmarker.png'),
        iconSize: [35,40],
    })

  return (
    <div>
        {data.map((item, index) => (
            <Marker
                key={index}
                position={[item.latitude, item.longitude]}
                icon={
                    selectedMarkers.some(marker => marker.station_id === item.station_id)
                      ? markerIcon  // หรือเลือก icon ที่มีกรอบสีเขียว
                      : markerIcon1
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
    </div>
  )
}

export default MarkerRainfall