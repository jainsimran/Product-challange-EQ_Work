import React, { Component } from 'react';

export default class MapMarker extends Component {
    constructor() {
        super();
        this.state = {
            showInfo: false
        }
    }

    showInfo = () => {
        this.setState({ showInfo: !this.state.showInfo });
    }

    formatRevenue = (inputDate) => inputDate.split('.')[0];

    render() {
        return (
            <section className='labelMaker' onClick={() => this.showInfo()}>
                {this.state.showInfo &&
                    <section>
                        <div className='infoWindow'>
                            <button className='closeBtn'>X</button>
                            <h1>{this.props.poi.name}</h1>
                            <p>Total Impressions= <span className='boldValue'>{this.props.poi.impressions}</span> </p>
                            <p>Total Revenue= <span className='boldValue'>{this.formatRevenue(this.props.poi.revenue)}</span></p>
                            <p>Hours= <span className='boldValue'>{this.props.poi.hour}</span></p>
                        </div> 
                    </section>}
            </section>
                );
            }
        }
