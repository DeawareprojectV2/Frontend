import React, { useState } from 'react'
import { Marker, Tooltip, Polyline, Circle } from 'react-leaflet';
import { animated, useSprings } from 'react-spring';
import arrowIcon from '../../../images/arrowicon2.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12.5, 20.5],
});


L.Marker.prototype.options.icon = DefaultIcon;

const AnimatedMarker = animated(Marker);

const MarkerLandslide = ({ landslideData1 ,data, Zoom, handleMarkerClick, selectedMarkers }) => {
  const markerIcon = new L.Icon({
    iconUrl: require('../../../images/landslidemarker2.png'),
    iconSize: [35, 40],
  })

  const markerIcon1 = new L.Icon({
    iconUrl: require('../../../images/landslidemarker.png'),
    iconSize: [35,40],
  })

  const landslideMarkerData = landslideData1.map(item => ({...item,type:'Landslide'}))
  const startEndPoints = data.slice(0, data.length/2).map((item, index) => {
    const start = [Number(item.latitude), Number(item.longitude)];
    const end = [
      Number(data[index + data.length/2].latitude) + 0.0001,
      Number(data[index + data.length/2].longitude) + 0.0001 
    ]
    return { start, end };
  });
  
  // Function to calculate the angle between two points
  function calculateAngel(lat1, long1, lat2, long2) {
    let dLon = (long2 - long1);

    let y = Math.sin(dLon) * Math.cos(lat2);
    let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
            * Math.cos(lat2) * Math.cos(dLon);

    let brng = Math.atan2(y, x);

    brng = (brng * 180 / Math.PI + 360) % 360;
  
    return brng;
  }

  // Function to calculate the distance between two points
  function calculateDistance(lat1, long1, lat2, long2) {
    long1 =  long1 * Math.PI / 180;
    long2 = long2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = long2 - long1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
             + Math.cos(lat1) * Math.cos(lat2)
             * Math.pow(Math.sin(dlon / 2),2);
           
    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth
    let r = 6371;
    let distance = c * r
    // calculate the result
    return(distance.toFixed(3));
  }
  
  //Animation Icon
  const arrowIconOptions = startEndPoints.map((item, index) => {
    let brng = calculateAngel(item.end[0], item.end[1], item.start[0], item.start[1]);
    return L.divIcon({
      className: "marker-icon",
      html: `<img src=${arrowIcon} style="transform: rotate(${brng}deg); width: 20px; height: auto;" />`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  });

  //Animation start point to end point
  const markerSprings = useSprings(
    startEndPoints.length,
    startEndPoints.map((item) => ({  
      position: item.start,
      from: { position: item.end },
      config: { duration: 1000 },
      loop: true
    }))
  )
  
  const [showAnimatedMarker, setShowAnimatedMarker] = useState(true);
  const [showPolyline, setShowPolyline] = useState(false);
  const [showMarker, setShowMarker] = useState(true)

  //
  const handleAnimatedMarkerClick = () => {
    setShowAnimatedMarker(false);
    setShowPolyline(true);
    setShowMarker(false)
  };

  const handlePolylineClick = () => {
    setShowAnimatedMarker(true);
    setShowPolyline(false);
    setShowMarker(true);
  };

  function TooltipPolyline({ showPolyline, startEndPoints, handlePolylineClick }) {
    if (Zoom < 17 && showPolyline) {
      handlePolylineClick(); // เรียกใช้ฟังก์ชันเพื่อทำการเปลี่ยนค่าตัวแปรต่าง ๆ
    }
    return (
      <>
        {showPolyline &&
          startEndPoints.map((item, index) => (
            <React.Fragment key={index}>
              <Circle center={[item.start[0], item.start[1]]} color='white' radius={2} />
              <Circle center={[item.end[0], item.end[1]]} color='black' radius={2} />
  
              <Polyline
                positions={[
                  [item.start[0], item.start[1]],
                  [item.end[0], item.end[1]],
                ]}
                color="blue"
                weight={5}
                eventHandlers={{ click: handlePolylineClick }}
              >
                <Tooltip direction='top' permanent >
                  <div>
                    <p>Distance {index + 1}: {calculateDistance(item.start[0], item.start[1], item.end[0], item.end[1])} km</p>
                  </div>
                </Tooltip>
              </Polyline>
            </React.Fragment>
          ))}
      </>
    );
  }
  
  return (
    <div>
      {Zoom > 17 && showAnimatedMarker &&
        markerSprings.map((props, index) => (
        //  Math.abs(data[index].diff2d - data[index + data.length / 2].diff2d) > 5 ? (
          <AnimatedMarker
            key={index}
            position={props.position}
            icon={arrowIconOptions[index]}
            eventHandlers={{ click:  handleAnimatedMarkerClick }}
          />
    //  ) : null
  ))
}
{showMarker ?
      landslideMarkerData.map((item, index) => (
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
              <p>altitude: {item.altitude}</p>
            </div>
          </Tooltip>
        </Marker>
      )) : (
        null
      )
    }
    <TooltipPolyline 
      showPolyline={showPolyline}
      startEndPoints={startEndPoints}
      handlePolylineClick={handlePolylineClick}
    />
    </div>
  )
}

export default MarkerLandslide