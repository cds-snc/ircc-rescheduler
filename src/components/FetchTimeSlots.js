import React from "react";

export default class FetchTimeSlots extends React.Component {

  state = {
    loading: true,
    appointments: [],
  };

  async componentDidMount() {
    const url = "http://localhost:4011/appointmentsByLocId/3747";
    // eslint-disable-next-line no-undef
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ appointments: data, loading: true });
    // eslint-disable-next-line no-console
    this.removePeople()

  }


  removePeople(e){
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
  const dbTimeSlots = this.state.appointments;
  const TimeSlotArray = mockData;
// eslint-disable-next-line no-console
  console.log(TimeSlotArray[1].Time)
// eslint-disable-next-line no-console
  console.log(dbTimeSlots)



  for (var i = 0; i < TimeSlotArray.length; i++) {
    for (var j = 0; j < dbTimeSlots.length; j++) {
   // eslint-disable-next-line security/detect-object-injection
   if (dbTimeSlots[j].time.toString() ===
     // eslint-disable-next-line security/detect-object-injection
     TimeSlotArray[i].Time.toString()
   ) {
     // eslint-disable-next-line no-console
     console.log('its true');
     TimeSlotArray.splice(i, 1);
     
   }
   // eslint-disable-next-line no-console
   console.log('its false');
  }

  }


  const NewTimeSlotArray = TimeSlotArray
// eslint-disable-next-line no-console
  console.log(NewTimeSlotArray)


  }

  
  render() {
    if (this.state.loading) {
    
      return <div>loading...</div>;
    }

    if (!this.state.appointments) {
      return <div>didnt get a appointments</div>;
    }
    return (
      <div>
        <div>{this.state.appointments.appointmentId}</div>
      </div>
    );
  }
}