import GoogleMapReact from 'google-map-react';
import Marker from './MapMarket';

function GoogleMap(props) {
console.log(props.mapData);
  const defaultProps = {
    center: {
      lat: Number(props.mapData.lat),
      lng: Number(props.mapData.lng)
    },
    zoom: 13
  };
  // props.mapData
  return (
    // Important! Always set the container height explicitly
    <div style={{ margin: '20px 0px',  height: '320px', width: '100%' }}>
      <div>Meet place</div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBhDAfdblJgwp2HgP5goShP6_o7eUgVq7U' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
        <Marker
          lat={Number(props.mapData.lat)}
          lng={Number(props.mapData.lng)}
          text="My Marker"
        >1</Marker>
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMap