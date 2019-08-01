import React, { Component } from "react";
import TimeForm from "./TimeForm";

const mockData = [
    {
        id: 1,
        Time: '9:00 am'
    },{
        id: 2,
        Time: '9:15 am'
    },{
        id: 3,
        Time: '9:30 am'
    },{
        id: 4,
        Time: '9:45 am'
    },{
        id: 5,
        Time: '10:00 am'
    },{
        id: 6,
        Time: '10:15 am'
    },{
        id: 7,
        Time: '10:30 am'
    },{
        id: 8,
        Time: '10:45 am'
    },{
        id: 9,
        Time: '11:00 am'
    },{
        id: 10,
        Time: '11:15 am'
    },{
        id: 11,
        Time: '11:30 am'
    },{
        id: 12,
        Time: '11:45 am'
    },{
        id: 13,
        Time: '12:00 pm'
    },

];

export default class TimeSlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0
    };
  }

  changeHandler = id => {
    this.setState({
      selectedId: id
    });
  };

  render() {
    return (
      <table>
        <tbody>
          {mockData.map(rowData => (
            <TimeForm
              key={rowData.id}
              selectedId={this.state.selectedId}
              rowData={rowData}
              onSelect={this.changeHandler}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
