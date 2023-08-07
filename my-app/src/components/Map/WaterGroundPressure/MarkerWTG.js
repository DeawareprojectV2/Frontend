import React from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'

const MarkerWTG = ({ data, handleMarkerClick, selectedMarkers }) => {
    const markerIcon = new L.Icon({
        iconUrl: require('../../../images/wtgmarker2.png'),
        iconSize: [35, 40],
    
    })

    const markerIcon1 = new L.Icon({
        iconUrl: require('../../../images/wtgmarker.png'),
        iconSize: [35,40],
    })
    console.log('marker data',data)
  return (
    <div>
        {data.map((item, index) => (
            <Marker
                key={index}
                position={[item.latitude, item.longitude]}
                icon={
                    selectedMarkers.some(marker => marker.device_id === item.device_id)
                      ? markerIcon  // หรือเลือก icon ที่มีกรอบสีเขียว
                      : markerIcon1
                  }
                eventHandlers={{ click: () => handleMarkerClick(item) }}
            >
                <Tooltip direction='top' offset={[0, -20]}>
                    <div>
                        <h6>Marker Info</h6>
                        <p>type: {item.type}</p>
                        <p>device_id: {item.device_id}</p>
                        <p>kpa: {item.kpa}</p>
                    </div>
                </Tooltip>
            </Marker>
        ))}
    </div>
  )
}

export default MarkerWTG