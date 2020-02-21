import React, { Component } from 'react';
import MapContainer from '../components/Map';
import {fetchPoiAllMetrics} from '../apis/product';

export default class DataMapSection extends Component {
    constructor(){
        super();
        this.state = {
            mapData: []
        }
    }

    componentDidMount(){
        fetchPoiAllMetrics()
        .then((data) => {
            let poiData = [];
            data.forEach((item) =>
                poiData.push({
                    id: item.poi_id,
                    name: item.name,
                    lat: item.lat,
                    lng: item.lon,
                    date: item.date,
                    hour: item.hour,
                    impressions: item.hour,
                    clicks: item.clicks,
                    revenue: item.revenue
                })
            );
            this.setState({
                mapData: poiData
            })
        })
    }
    render() {
        return (
            <section  className='cardEffect'>
                <h1>The points of interest</h1>
                <MapContainer data={this.state.mapData}/>
            </section>
        )
    }
}
