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
    this.setState({ appointments: data, loading: false });
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