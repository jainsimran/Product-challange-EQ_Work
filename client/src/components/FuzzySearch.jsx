import React, { Component } from 'react';

export default class FuzzySearch extends Component {
    constructor(){
        super();
        this.state = {
            searchInput: ''
        }
    }

    searchHandler = (event) => { 
        this.setState({ searchInput: event.target.value});
        this.props.searchHandler(event.target.value);
    }

    render() {
        return (
            <section className='searchBox'>
                Search by name:
                <input 
                type='text' 
                value={this.state.searchInput}
                onChange={this.searchHandler}/>
            </section>
        )
    }
}
