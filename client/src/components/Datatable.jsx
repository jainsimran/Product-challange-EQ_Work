import React, { Component } from 'react';

export default class Datatable extends Component {
  render() {
    return (
      <section className="scrolltable">
        <h1>{this.props.title}</h1>
        <table>
          <tbody>
            <tr>
              {this.props.columns.map((col,name) => (<th key={name}>{col.name}</th>))}
            </tr>
            {
              this.props.data.map((item, idx) => (
                <tr key={idx} className={this.props.highlightIdxs.includes(idx) ? 'highlight' : null}>
                  {this.props.columns.map((col,index) => (<td key={index}>{item[col.name]}</td>))}
                </tr>
              ))
            }
          </tbody>
        </table>

      </section>

    )
  }
}
