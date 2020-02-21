import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 43.6708,
        lng: -79.3899
      },
      zoom: 10,
      showInfo: false
    }
  }

   showInfo = () => {
    this.setState({ showInfo: !this.state.showInfo });
  }

  render() {
    const Marker = () => {
      return (
        <section className='labelMaker' onClick={this.showInfo}> 
          {this.state.showInfo ? <div className='infoWindow'><h1>test</h1></div> : null}
        </section>
      );
    }


    const Poimarker = () => {
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
                  <Marker
                    key={idx}
                    lat={item.lat}
                    lng={item.lng}
                    title={item.name}
                  >
                  </Marker>
                );
              })
            }
          </GoogleMapReact>
        </section>
      );
    }
    return (
      <section>
        <Poimarker />
      </section>
    );
  }
}