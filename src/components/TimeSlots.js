/* eslint-disable no-console */
import React, { Component } from "react";
import TimeForm from "./TimeForm";
import { contextPropTypes } from '../context'
// import PropTypes from 'prop-types'
import { matchPropTypes } from '../components/Title'
import withContext from '../withContext'
import { Form } from "react-final-form";
import moment from "moment";



function getTimeStops(start, end){
  var startTime = moment(start, 'hh:mm');
  var endTime = moment(end, 'hh:mm');
  
  if( endTime.isBefore(startTime) ){
    endTime.add(1, 'day');
  }

  var timeStops = [];

  while(startTime <= endTime){
    timeStops.push(new moment(startTime).format('hh:mm A'));
    startTime.add(15, 'minutes');
  }
  return timeStops;
}

var timeStops = getTimeStops('08:00', '16:00');
console.log('timeStops ', timeStops);


var str = '92-3',
    array = str.split('-');

(function(a, b, c) {
    a; // 1
    b; // 2
    
}).apply(null, array)

console.log(array[0])


const mockData = [
    {
        id: 1,
        Time: '9:00 am',
    },{
        id: 2,
        Time: '9:15 am',
    },{
        id: 3,
        Time: '9:30 am',
    },{
        id: 4,
        Time: '9:45 am',
    },{
        id: 5,
        Time: '10:00 am',
    },{
        id: 6,
        Time: '10:15 am',
    },{
        id: 7,
        Time: '10:30 am',
    },{
        id: 8,
        Time: '10:45 am',
    },{
        id: 9,
        Time: '11:00 am',
    },{
        id: 10,
        Time: '11:15 am',
    },{
        id: 11,
        Time: '11:30 am',
    },{
        id: 12,
        Time: '11:45 am',
    },{
        id: 13,
        Time: '12:00 pm',
    },{
        id: 14,
        Time: '12:15 pm',
    },{
        id: 15,
        Time: '12:30 pm',
    },{
        id: 16,
        Time: '12:45 pm',
    },{
        id: 17,
        Time: '01:00 pm',
    },{
        id: 18,
        Time: '01:15 pm',
    },{
        id: 19,
        Time: '01:30 pm',
    },{
        id: 20,
        Time: '01:45 pm',
    },{
        id: 21,
        Time: '02:00 pm',
    },{
        id: 22,
        Time: '02:15 pm',
    },{
        id: 23,
        Time: '02:30 pm',
    },{
        id: 24,
        Time: '02:45 pm',
    },{
        id: 25,
        Time: '03:00 pm',
    },{
        id: 26,
        Time: '03:15 pm',
    },{
        id: 27,
        Time: '03:30 pm',
    },{
        id: 28,
        Time: '03:45 pm',
    },{
        id: 29,
        Time: '04:00 pm',
    },

];

class TimeSlots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0,
      appointments: [],
      selectedDay: [],
    }
  }


  // eslint-disable-next-line react/no-deprecated
  async componentWillReceiveProps() {

    let {
      context: {
        store: {
          selectProvince: {
            locationId,
          } = {},
        } = {},
      } = {},
    } = this.props
  

    console.log ('this is the componentdidmount ')
    // console.log(this.props.selectedDay[0])

    const currentDate = this.props.selectedDay[0]


    console.log(currentDate)


    console.log(locationId)
    console.log(this.props) 
    const url = `http://localhost:4011/appointmentsByLocId/${locationId}`;
    // eslint-disable-next-line no-undef
    console.log(url)

    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ appointments: data, loading: true });
    // eslint-disable-next-line no-console
    this.removeTimeSlot()

  }

    removeTimeSlot(){

        const dbTimeSlots = this.state.appointments;
        const TimeSlotArray = mockData;
        // eslint-disable-next-line no-console
        // console.log(TimeSlotArray[1].Time)
        // eslint-disable-next-line no-console
        // console.log(dbTimeSlots)
      

        for (var i = 0; i < TimeSlotArray.length; i++) {
          for (var j = 0; j < dbTimeSlots.length; j++) {
         // eslint-disable-next-line security/detect-object-injection
         if (dbTimeSlots[j].time.toString() ===
           // eslint-disable-next-line security/detect-object-injection
           TimeSlotArray[i].Time.toString()
         ) {
           // eslint-disable-next-line no-console
          //  console.log('its true');
           TimeSlotArray.splice(i, 1);
           
         }
         // eslint-disable-next-line no-console
        //  console.log('its false');
        }
      
        }
      
      
        // const NewTimeSlotArray = TimeSlotArray
      // eslint-disable-next-line no-console
        console.log(TimeSlotArray)

              // eslint-disable-next-line no-console
  
      
      
        }

        
  changeHandler = id => {
    this.setState({
      selectedId: id,
    });
    // eslint-disable-next-line react/prop-types
    this.props.selectedTimeId(id)
    // eslint-disable-next-line no-undef
    console.log(id)
    console.log(this.props )
  };

  daySelected = selectedDay => {
    this.props.selectedDay(selectedDay)
    // eslint-disable-next-line no-console
    console.log(this.props.selectedDay)
    this.setState({
      selectedDay : selectedDay,
    })
  }


  render() {

    // const { selectedDay } = this.props;

    // console.log(selectedDay)
    
    return (
      <div>
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
      </div>
      
    );
    
  }
}

TimeSlots.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
}


export default withContext(TimeSlots)
