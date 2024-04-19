import { MapContainer, TileLayer, useMapEvents, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import MarkerPoint from '../MarkerPoint/MarkerPoint';
import { useEffect, useState } from 'react';


export default function Map({ intermediateCheckpoint, setPositionOfIntermediateCheckpoint, modeBuilding, checkpoints, isWidgetsActive, setTrack, setCreationCheckpointWindow, setCreationTrackWindow, typeCheckpoint, positionOfNewCheckpoint, setPositionOfNewCheckpoint, startCheckpoint, setPositionOfStartCheckpoint, endCheckpoint, setPositionOfEndCheckpoint, imagesForCheckpoints, track }) {
  const [colour, setColour] = useState(true);
  const [weight, setWeight] = useState(5);

  function CheckpointMarker() {
    useMapEvents({
      click(e) {
        setCreationCheckpointWindow(true);
        setPositionOfNewCheckpoint([e.latlng.lat, e.latlng.lng]);
      }
    })
  
    return positionOfNewCheckpoint === null ? null : <MarkerPoint position={positionOfNewCheckpoint} imageIcon={typeCheckpoint} isPopup={false}/>
  }

  function TrackMarker() {
    useMapEvents({
      click(e) {
        if (startCheckpoint === null)
        {
          setPositionOfStartCheckpoint([e.latlng.lat, e.latlng.lng]);
          setCreationTrackWindow(true);
        }
        else if (startCheckpoint !== null && endCheckpoint === null)
        {
          setPositionOfEndCheckpoint([e.latlng.lat, e.latlng.lng]);
        }
        else if (startCheckpoint !== null && endCheckpoint !== null)
        {
            setPositionOfIntermediateCheckpoint(prev => [...prev, endCheckpoint])
            setPositionOfEndCheckpoint([e.latlng.lat, e.latlng.lng]);
        }
      }
    })
  
    return  <>
              {startCheckpoint === null ? null : <MarkerPoint position={startCheckpoint} imageIcon={4} isPopup={false}/>}
              {endCheckpoint === null ? null :  <MarkerPoint position={endCheckpoint} imageIcon={5} isPopup={false}/>}
              {intermediateCheckpoint.map(point => <MarkerPoint position={point} key={point[1]} imageIcon={6} isPopup={false}/>)}
            </>
  }

  useEffect(() => {
    if (!isWidgetsActive.CheckpointActive) {
        setCreationCheckpointWindow(false);
        setPositionOfNewCheckpoint(null);
    }
  }, [isWidgetsActive.CheckpointActive]);

  useEffect(() => {
    if (!isWidgetsActive.TrackActive) {
        setCreationTrackWindow(false);
        setPositionOfStartCheckpoint(null);
        setPositionOfEndCheckpoint(null);
    }
  }, [isWidgetsActive.TrackActive]);


  useEffect(() => {
    if (startCheckpoint !== null && endCheckpoint !== null) {
      if (intermediateCheckpoint.length === 0)
      {
        if (modeBuilding === 0)
        {
            getRequest(startCheckpoint, endCheckpoint);
        }
        else
        {
            setTrack(prev => [...prev, [startCheckpoint[1], startCheckpoint[0]], [endCheckpoint[1], endCheckpoint[0]]]);
        }
      }
      else
      {
        if (modeBuilding === 0)
        {
            getRequest(intermediateCheckpoint[intermediateCheckpoint.length - 1], endCheckpoint);
        }
        else
        {
            setTrack(prev => [...prev, [intermediateCheckpoint[intermediateCheckpoint.length - 1][1],intermediateCheckpoint[intermediateCheckpoint.length - 1][0]], [endCheckpoint[1], endCheckpoint[0]]]);
        }
      }
    }
  }, [endCheckpoint]);

  function changeColorAndWeight() {
    setColour(prevColour => !prevColour);
    setWeight(prevWeight => prevWeight === 5 ? 8 : 5);
  }

  return (
      <>
        <MapContainer 
                    zoomControl={false} 
                    attributionControl={false} 
                    className='map'center={[56.837405, 60.656652]} 
                    zoom={13} 
                    doubleClickZoom={false}>

          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>

              {checkpoints && checkpoints.map((points) => <MarkerPoint 
                                                              idPoint={points.id} 
                                                              key={points.id} 
                                                              position={[points.x, points.y]} 
                                                              name={points.name} 
                                                              description={points.description} 
                                                              imageIcon={points.type}
                                                              isPopup={true}
                                                              image={imagesForCheckpoints.find(file => file.fileDownloadName === `${points.id}.jpg`) || null}
                                                          />) }
        
          {isWidgetsActive.CheckpointActive ? <CheckpointMarker /> : null}
          
          {isWidgetsActive.TrackActive ? <TrackMarker /> : null}


          <Polyline positions={track.map(point => [point[1], point[0]])} 
                    pathOptions={{color: colour ? "#2172D4" : "#1F5393", weight:weight}} 
                    eventHandlers={{click: changeColorAndWeight}} />

        </MapContainer>
      </>
  )

  async function getRequest(start, end) {
    let response = await fetch(`https://router.project-osrm.org/route/v1/foot/${start[1]},${start[0]};${end[1]},${end[0]}?alternatives=true&geometries=geojson`)
    let data = await response.json()
    let routes = data.routes[0].geometry.coordinates;
    setTrack(prev => [...prev, ...routes]);
  }
}