import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';
import MapMarker from './MapMarker';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 43.6708,
        lng: -79.3899
      },
      zoom: 3
    }
  }

  render() {
    return (
      <section style={{ height: '85vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `AIzaSyCk79ODgAFqY9di7oVX5Zh_zdIyecxZvks` }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {
            this.props.data.map((item, idx) => {
              return (
                <MapMarker
                  key={idx}
                  lat={item.lat}
                  lng={item.lng}
                  poi={item}

                >
                </MapMarker>
              );
            })
          }
        </GoogleMapReact>
      </section>
    );

  }
}