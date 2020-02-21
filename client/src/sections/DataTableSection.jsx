import React, { Component } from 'react';
import Datatable from '../components/Datatable';
import { fetchStatsDaily, fetchPoiAllMetrics } from '../apis/product';
import FuzzySearch from '../components/FuzzySearch';

export default class DataTableSection extends Component {
    constructor() {
        super();
        this.state = {
            searchedDataset: [], // list of ids of all tuples that has search string
            data: [],
            columns: [],
            dataFrequencyType: 'hourly',
            title: 'Daily statistics'
        }
    }

    componentDidMount() {
        this.getHourlyStatsData();
    }

    searchHandler = (str) => {
        if (!str.trim()) {
            this.setState({
                searchedDataset: [],
            });
            return;
        }
        const strContainingIdxs = [];
        this.state.data.map((item, idx) => item.name.toLowerCase().includes(str.toLowerCase()) ? strContainingIdxs.push(idx) : null);
        this.setState({
            searchedDataset: strContainingIdxs,
        });
    }

    getDailyStatsData() {
        fetchStatsDaily()
            .then(data => {
                let statsData = [];
                let statsColumns = [
                    {name: 'date'},
                    {name: 'impressions'},
                    {name: 'clicks'},
                    {name: 'revenue'}
                ];
                data.forEach((e) => {
                    statsData.push({
                        date: this.formatDate(e.date),
                        impressions: e.impressions,
                        clicks: e.clicks,
                        revenue: e.revenue
                    })
                });
                this.setState({
                    data: statsData,
                    columns: statsColumns,
                    title: 'Daily statistics'
                })
            })
    }

    getHourlyStatsData() {
        fetchPoiAllMetrics()
            .then(data => {
                let statsColumns = [
                    {name: 'name'},
                    {name: 'date'},
                    {name: 'hour'},
                    {name: 'impressions'},
                    {name: 'clicks'},
                    {name: 'revenue'}
                ];
                let statsData = [];
                data.forEach((e) => {
                    statsData.push({
                        name: e.name,
                        date: this.formatDate(e.date),
                        impressions: e.impressions,
                        clicks: e.clicks,
                        revenue: this.roundedRevenue(e.revenue),
                        hour: e.hour
                    })
                });
                this.setState({
                    data: statsData,
                    columns: statsColumns,
                    title: 'Hourly statistics'
                })
            })
    }

    switchData = () => {
        if (this.state.dataFrequencyType === 'hourly') {
            this.getHourlyStatsData();
        }
        else {
            this.getDailyStatsData();
        }
    }

    handleChangeDataFrequencyType = (event) => {
        this.setState({
            dataFrequencyType: event.target.value,
        }, this.switchData);
    }

    formatDate = inputDate => inputDate.split('T')[0];

    roundedRevenue = inputRevenue => inputRevenue.split('.')[0];

    render() {
        return (
            <section className='cardEffect'>
                <h2>Show statistics of events on the following basis:</h2>
                <section>
                    <label>
                        <input
                            type="radio"
                            value="daily"
                            onChange={this.handleChangeDataFrequencyType}
                            checked={this.state.dataFrequencyType === 'daily'}
                        />
                        Daily 
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="hourly"
                            onChange={this.handleChangeDataFrequencyType}
                            checked={this.state.dataFrequencyType === 'hourly'}
                        />
                        Hourly 
                    </label>
                    {this.state.dataFrequencyType === 'hourly' ? <FuzzySearch searchHandler={this.searchHandler} /> : null}
                </section>

                <Datatable
                    data={this.state.data}
                    columns={this.state.columns}
                    title={this.state.title}
                    highlightIdxs={this.state.searchedDataset}
                />
            </section>
        )
    }
}