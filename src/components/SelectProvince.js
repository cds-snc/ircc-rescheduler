/* eslint-disable no-console */
import React, { Component } from 'react'
import { Trans } from '@lingui/react'
import Language from './Language'
//import { connect } from 'react-redux';
//import PropTypes from 'prop-types'


class SelectProvince extends Component {
  constructor(props) {
    super(props);

    this.state = {
      provinces : [
              { _id:"Default", name:"Select a Province", namefr:"Sélectionnez une province" },
              { _id:"Alberta", name:"Alberta", namefr:"Alberta" },
              { _id:"British Columbia", name:"British Columbia", namefr:"Colombie-Britannique" },
              { _id:"Manitoba", name:"Manitoba", namefr:"Manitoba" },
              { _id:"New Brunswick", name:"New Brunswick", namefr:"Nouveau-Brunswick" },
              { _id:"Newfoundland and Labrador", name:"Newfoundland and Labrador", namefr:"Terre-Neuve-et-Labrador" },
              { _id:"Northwest Territories", name:"Northwest Territories", namefr:"Territoires du Nord-Ouest" },
              { _id:"Nova Scotia", name:"Nova Scotia", namefr:"Nouvelle-Écosse" },
              { _id:"Nunavut", name:"Nunavut", namefr:"Nunavut" },
              { _id:"Ontario", name:"Ontario", namefr:"Ontario" },
              { _id:"Prince Edward Island", name:"Prince Edward Island", namefr:"Île-du-Prince-Édouard" },
              { _id:"Quebec", name:"Quebec", namefr:"Québec" },
              { _id:"Saskatchewan", name:"Saskatchewan", namefr:"Saskatchewan" },
              { _id:"Yukon", name:"Yukon", namefr:"Yukon" },
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

    console.log( "url: " + encodedURI )
    // eslint-disable-next-line no-undef
    return fetch(encodedURI)
      .then((data) => data.json())
      .then((locs) => locs  )
      .catch((error) => {
        console.warn(error)
        return [{'locationCity' : 'Aucun service en ce moment, réessayez plus tard / No service at this moment try again later'}]
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

      console.log('State Data in Province is : ' + JSON.stringify(locationsData)) 
      console.log('State Data in Cities is : ' + JSON.stringify(cityLocations)) 

      return (
        <div>

          <p> <br /> </p>
          <Language
            render={language => (
              <React.Fragment>
                {language === 'en' ? (
                  <select id="ProvEng" onChange={this.handleChange} >
                    {provinceNames.map(({ _id, name }) => (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    ))} 
                  </select>
                ) : (
                  <select id="ProvFr" value={this.state.provinceName} onChange={this.handleChange} >
                    {provinceNames.map(({ _id, namefr }) => (
                      <option key={_id} value={_id}>
                        {namefr}
                      </option>
                    ))} 
                  </select>
                )}
              </React.Fragment>
            )}
          />

          <p> <Trans>Selected province</Trans> : {this.state.provinceName} </p>
            
          <button type="submit" value="Submit" onClick={this.handleProvince} > Submit </button>

          <p> <br /> </p>

          <ul>
            {locationsData.map(({ locationCity }) => (
                <li key={locationCity} id={locationCity}>
                    <button onClick={() => this.handleCity(locationCity)}>&nbsp;{locationCity}&nbsp;</button>
                </li>
            ))}
          </ul>
          <p> <br /> </p>
          <hr /> 
          <p> <Trans>Locations in:</Trans> {this.state.cityName} <br /> </p>

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
