import React, { Component } from 'react';
import '../App.css';
import logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
        };
    }

    clickHandler = (event) => {
        const activePath = event.target.href.split('/');
        this.setState({
            active: activePath[activePath.length -1]
        });
    }

    render () {
        return (
            <section className='nav'>
                <ul>
                    <li>
                        <Link to="/" >
                            <img src={logo} className='logo' alt="EQ Works" />
                        </Link>
                        
                    </li>
                    <li>
                        <Link
                            onClick={this.clickHandler}
                            to="/chart"
                            className={this.state.active === 'chart' ? 'active': null}
                        >
                            Events-Chart
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={this.clickHandler}
                            to="/table"
                            className={this.state.active === 'table' ? 'active': null}
                        >
                            Statistics-Table
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={this.clickHandler}
                            to="/map"
                            className={this.state.active === 'map' ? 'active': null}
                        >
                            POI-Map
                        </Link>
                    </li>
                </ul>
            </section>
        );
    }
}