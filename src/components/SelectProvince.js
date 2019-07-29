import React, { Component } from 'react'
//import { connect } from 'react-redux';
//import PropTypes from 'prop-types'


class SelectProvince extends Component {
  constructor(props) {
    super(props);

    this.state = {
      provinces : [
              { _id:"Alberta", name:"Alberta" },
              { _id:"British Columbia", name:"British Columbia" },
              { _id:"Manitoba", name:"Manitoba" },
              { _id:"New Brunswick", name:"New Brunswick" },
              { _id:"Newfoundland and Labrador", name:"Newfoundland and Labrador" },
              { _id:"Northwest Territories", name:"Northwest Territories" },
              { _id:"Nova Scotia", name:"Nova Scotia" },
              { _id:"Nunavut", name:"Nunavut" },
              { _id:"Ontario", name:"Ontario" },
              { _id:"Prince Edward Island", name:"Prince Edward Island" },
              { _id:"Quebec", name:"Quebec" },
              { _id:"Saskatchewan", name:"Saskatchewan" },
              { _id:"Yukon", name:"Yukon" },
            ],
      dropdownOpen : true,
      loading: true,
      provinceName: '',
      cityName: '', 
      provLocations: [],
      cityLocations:[],
    }

    this.getProvinceLocations = this.getProvinceLocations.bind(this);
    this.getCityLocations = this.getCityLocations.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleProvince = this.handleProvince.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
  }


  fetchLocations(province, city) {
    
    var encodedURI

    if ( city != null )
      {encodedURI = encodeURI(`http://localhost:4011/locationsbyprov/${province}/${city}`)}
    else 
      {encodedURI = encodeURI(`http://localhost:4011/locationsbyprov/${province}`)}

    //console.log( "url: " + encodedURI )
    // eslint-disable-next-line no-undef
    return fetch(encodedURI)
      .then((data) => data.json())
      .then((locs) => locs  )
      .catch((error) => {
        //console.warn(error)
        return null
      });
  }
   

  getProvinceLocations(selectedProvince) {
    this.setState({
      loading: true,
    })
    this.fetchLocations( selectedProvince )
      .then((locs) => {
        //console.log('Data in getProvince is : ' + JSON.stringify(locs)) 
        this.setState ({
            provLocations: locs,
            cityLocations: [],
            cityName: '',
            loading: false,
        })
      })
  }

  getCityLocations(selectedProvince, selectedCity) {
    this.setState({
      loading: true,
    })
    this.fetchLocations( selectedProvince, selectedCity )
      .then((locs) => {
        //console.log('Data in getCities is : ' + JSON.stringify(locs)) 
        this.setState ({
            cityLocations: locs,
            loading: false,
        })
      })
  }
  
  handleChange(event) {
    this.setState({ provinceName : event.target.value });
  }

  handleProvince(event) {
    event.preventDefault();
    this.getProvinceLocations( this.state.provinceName )
  }
  
  handleCity(selectedCity) {
    this.setState({ cityName : selectedCity });
    this.getCityLocations( this.state.provinceName, selectedCity )
  }

  render() {
      const provinceNames = this.state.provinces;
      const locationsData = this.state.provLocations;
      const cityLocations = this.state.cityLocations;

      return (
        <div>

          <p> <br /> </p>
              
          <select id="something" value={this.state.provinceName} onChange={this.handleChange} >
                
            {provinceNames.map(({ _id, name }) => (
                <option key={_id} id={_id}>
                    {name}
                </option>
            ))}
              
          </select>

          <p> Selected province : {this.state.provinceName} </p>
            
          <button type="submit" value="Submit" onClick={this.handleProvince} > Submit </button>

          <p> <br /> </p>

          <ul>
            {locationsData.map(({ locationCity }) => (
                //console.log ( 'key = '+ locationCity),
                <li key={locationCity} id={locationCity}>
                    <span>{locationCity}</span>&nbsp;&nbsp; <button onClick={() => this.handleCity(locationCity)}>Select {locationCity}</button>
                </li>
            ))}
          </ul>
          <p> <br /> </p>
          <hr /> 
          <p> Locations in: {this.state.cityName} <br /> </p>

          <ul>
            {cityLocations.map(( {_id, locationId, locationAddress, hours} ) => (
              <li key={_id} id={_id} >
                {locationId}<br />
                {locationAddress}<br />
                {hours}<br /> &nbsp; <br /> 
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

export default SelectProvince;
