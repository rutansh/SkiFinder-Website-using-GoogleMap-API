import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {GoogleMap,withScriptjs,withGoogleMap,Marker,InfoWindow} from "react-google-maps";
import * as parksData from "./data/skateboard-parks.json";
import mapStyles from "./mystyle"


function Map()
{
  const [selectedPark, setSelectedPark] = useState(null);

  return (
  <GoogleMap 
  defaultZoom={10} 
  defaultCenter={{lat:45.4211,lng:-75.6903}}
  defaultOptions={{styles:mapStyles}}
  >
  {parksData.features.map(park=>(
    <Marker 
    key={park.properties.PARK_ID} 
    position={{ lat: park.geometry.coordinates[1],
    lng:park.geometry.coordinates[0]}}

    onClick={() => {
      setSelectedPark(park);
    }}
    />
    ))
    }
     {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h1>Park Name: {selectedPark.properties.NAME}</h1>
            
            <h3>Address: {selectedPark.properties.ADDRESS}</h3>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
  
  </GoogleMap>
  );
}
const WrappedMap=withScriptjs(withGoogleMap(Map));
function App() {
  return (

    <div style={{width:'100vw',height:'100vh'}}className="App">
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=APIKEY`}
      loadingElement={<div style={{height:"100%"}}/>}
      containerElement={<div style={{height:"100%"}}/>}
      mapElement={<div style={{height:"100%"}}/>}/>
    </div>
  );
}

export default App;
