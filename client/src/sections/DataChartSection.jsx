import React, { Component } from 'react';
import LineGraph from '../components/LineGraph';
import { fetchEventDailyData, fetchEventHourlyData } from '../apis/product';

export default class DataChartSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFrequencyType: 'daily',
            formattedData: null,
            label: [],
            data: [],
            title: 'Daily events',
            xAxisLabel: ''
        }
    }

    componentDidMount() {
        this.getDailyEventsData();
    }

    getHourlyEventsData = () => {
        const mapEventsPerDate = {};
        fetchEventHourlyData()
            .then(eventdata => {
                eventdata.map(item => {
                    const currentItemDate = item.date.split('T')[0];
                    if (mapEventsPerDate[currentItemDate]) {
                        const dateList = mapEventsPerDate[currentItemDate];
                        dateList.push({ hour: item.hour, event: item.events });
                        mapEventsPerDate[currentItemDate] = dateList;
                    } else {
                        mapEventsPerDate[currentItemDate] = [{ hour: item.hour, event: item.events }];
                    }
                    return null;
                });
                this.setState({
                    formattedData: mapEventsPerDate,
                    title: 'Hourly events',
                    xAxisLabel: 'The number of hours of a selected date'
                });
            });
    }

    getDailyEventsData = () => {
        fetchEventDailyData()
            .then(eventdata => {
                let eventdate = [];
                let eventnum = [];
                eventdata.forEach((e) => {
                    eventdate.push(this.formatDate(e.date));
                    eventnum.push(e.events);
                });
                this.setState({
                    label: eventdate,
                    data: eventnum,
                    title: 'Daily events',
                    xAxisLabel: 'Date'
                })
            })
    }

    formatDate = inputDate => inputDate.split('T')[0];

    switchData = () => {
        if (this.state.dataFrequencyType === 'hourly') {
            this.setState({ 
                label: null, 
                data: null 
            })
            this.getHourlyEventsData();
        }
        else {
            this.getDailyEventsData();
        }
    }

    handleChangeDataFrequencyType = (event) => {
        this.setState({
            dataFrequencyType: event.target.value
        }, this.switchData);
    }

    handleDateSelection = (event) => {
        const selectedDate = event.target.value;
        const eventsOnSelectedDate = this.state.formattedData[selectedDate];
        let newDateLabel = [];
        let newDateData = [];
        eventsOnSelectedDate.forEach((date) => {
            newDateLabel.push(date.hour);
            newDateData.push(date.event);
        });
        this.setState({
            label: newDateLabel,
            data: newDateData
        });
    }


    render() {
        return (
            <section className="cardEffect">
            <h2>Show the number of events on the following basis:</h2>
                <section>
                    <label>
                        <input
                            type="radio"
                            value="daily"
                            onChange={this.handleChangeDataFrequencyType}
                            checked={this.state.dataFrequencyType === 'daily'}
                        />
                        Daily basis
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="hourly"
                            onChange={this.handleChangeDataFrequencyType}
                            checked={this.state.dataFrequencyType === 'hourly'}
                        />
                        Hourly basis
                    </label>
                    {this.state.dataFrequencyType === 'hourly' && this.state.formattedData && (
                        <select
                            onChange={this.handleDateSelection}
                        >
                            <option>Select Date</option>
                        {Object.keys(this.state.formattedData).map((dt, idx) => (
                            <option value={dt} key={idx}>{dt}</option>
                        ))}
                        </select>
                    )}
                </section>

                <LineGraph
                    label={this.state.label}
                    data={this.state.data}
                    title={this.state.title}
                    xAxisLabel={this.state.xAxisLabel}
                />
            </section>
        )
    }
}
