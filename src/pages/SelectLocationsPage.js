/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'emotion'
import { H1, theme, mediaQuery, visuallyhidden } from '../styles'
import Layout from '../components/Layout'
//import SelectProvince from '../components/SelectProvince'
import Title, { matchPropTypes } from '../components/Title'
import { SelectLocationFields, getFieldNames } from '../validation'
import { Trans } from '@lingui/react'
import { provinceNames, provinceNamesFr } from '../utils/linguiUtils'
import { Radio } from '../components/forms/MultipleChoice'

// import styled from '@emotion/styled'
//import { H1, theme, mediaQuery , arrow } from '../styles'
//import { buttonStyles } from '../components/forms/Button'
//import rightArrow from '../assets/rightArrow.svg'


import Language from '../components/Language'
//import Button from '../components/forms/Button'
import { FaExternalLinkAlt, FaBuilding, FaClock } from 'react-icons/fa'


/* eslint-disable no-console */

const contentClass = css`
  p {
    margin-bottom: ${theme.spacing.sm};

    ${mediaQuery.md(css`
      margin-bottom: ${theme.spacing.lg};
    `)};
  }
`
const messageContainer = css`
  width: 80% !important;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  p {
    margin-bottom: 0;
  }
`
const govuk_select = css`
  font-family: SourceSans,Helvetica,Arial,sans-serif;
  font-size: ${theme.font.base};
  background: ${theme.colour.white};
  line-height: 1.4;
  width:100%;
  height:40px;
  option {
    background-color: ${theme.colour.white};
  }
  &:focus, &:before {
    -webkit-box-shadow: 0 0 0 4px #ffbf47;
    -moz-box-shadow: 0 0 0 4px #ffbf47;
    box-shadow: 0 0 0 4px #ffbf47;
  }
`
const govuk_label = css`
  margin-bottom: 0.17rem;
  display: block;
  font-size: ${theme.font.lg}
`
// const govuk_p = css`
//   margin-bottom: 0.37rem;
//   display: block;
//   font-size: 1.2rem 
// `
// const govuk_List = css`
//   margin: 2px 0px 5px 0px;
//   padding: 0px 8px 0px 8px;
//   background-color: ${theme.colour.greyLight}
// `
// const govuk_ListButton = css`
//   width: 275px;
//   font-size: ${theme.font.sm}; 
//   background-color: ${theme.colour.greyLight}
//   cursor: pointer;
//   padding: 0px 8px 0px 8px;
//   &:hover {
//     background-color: #00692f;
//     color: ${theme.colour.white};
//     -webkit-box-shadow: 0 0 0 4px #ffbf47;
//     -moz-box-shadow: 0 0 0 4px #ffbf47;
//     box-shadow: 0 0 0 4px #ffbf47; 
//   }
// `
// const ssssgovuk_multiple_choice = css`
//   display: block;
//   float: none;
//   clear: left;
//   position: relative;
//   padding: 0 0 0 38px;
//   margin-bottom: 10px;

//   input {
//     position: absolute;
//     cursor: pointer;
//     left: 0;
//     top: 0;
//     width: 38px;
//     height: 38px;
//     z-index: 1;
//     margin: 0;
//     zoom: 1;
//     filter: alpha(opacity=0);
//     opacity: 0;
//   }

//   label {
//     cursor: pointer;
//     padding: 8px 10px 9px 12px;
//     display: block;
//     -ms-touch-action: manipulation;
//     touch-action: manipulation;
//   }

//   input:disabled {
//     cursor: default;
//   }

//   input:disabled + label {
//     zoom: 1;
//     filter: alpha(opacity=50);
//     opacity: 0.5;
//     cursor: default;
//   }
// `

// const ssssgovuk_label_pseudo_elements = css`
//   input[type='radio'] + &::before {
//     content: '';
//     border: 2px solid;
//     background: transparent;
//     width: 34px;
//     height: 34px;
//     position: absolute;
//     top: 0;
//     left: 0;
//     -webkit-border-radius: 50%;
//     -moz-border-radius: 50%;
//     border-radius: 50%;
//   }

//   input[type='radio'] + &::after {
//     content: '';
//     border: 10px solid;
//     width: 0;
//     height: 0;
//     position: absolute;
//     top: 7px;
//     left: 7px;
//     -webkit-border-radius: 50%;
//     -moz-border-radius: 50%;
//     border-radius: 50%;
//     zoom: 1;
//     filter: alpha(opacity=0);
//     opacity: 0;
//   }

//   input[type='checkbox'] + &::before {
//     content: '';
//     border: 2px solid;
//     background: transparent;
//     width: 34px;
//     height: 34px;
//     position: absolute;
//     top: 0;
//     left: 0;
//   }

//   input[type='checkbox'] + &::after {
//     content: '';
//     border: solid;
//     border-width: 0 0 5px 5px;
//     background: transparent;
//     border-top-color: transparent;
//     width: 17px;
//     height: 7px;
//     position: absolute;
//     top: 10px;
//     left: 8px;
//     -moz-transform: rotate(-45deg);
//     -o-transform: rotate(-45deg);
//     -webkit-transform: rotate(-45deg);
//     -ms-transform: rotate(-45deg);
//     transform: rotate(-45deg);
//     zoom: 1;
//     filter: alpha(opacity=0);
//     opacity: 0;
//   }

//   input[type='radio']:focus + &::before {
//     -webkit-box-shadow: 0 0 0 4px #ffbf47;
//     -moz-box-shadow: 0 0 0 4px #ffbf47;
//     box-shadow: 0 0 0 4px #ffbf47;
//   }

//   input[type='checkbox']:focus + &::before {
//     -webkit-box-shadow: 0 0 0 3px #ffbf47;
//     -moz-box-shadow: 0 0 0 3px #ffbf47;
//     box-shadow: 0 0 0 3px #ffbf47;
//   }

//   input:checked + &::after {
//     zoom: 1;
//     filter: alpha(opacity=100);
//     opacity: 1;
//   }
// `

// const ssscds_multiple_choice = css`
//   label {
//     padding-top: 3px;
//     padding-bottom: 12px;
//     font-size: ${theme.font.lg};
//   }

//   input[type='radio'] + label::before,
//   input[type='checkbox'] + label::before {
//     border: 2px solid ${theme.colour.black};
//     background-color: ${theme.colour.white};
//   }

//   ${mediaQuery.sm(css`
//     label {
//       padding-top: 4px;
//     }
//   `)};
// `

// const sssradio = css`
//   ${govuk_multiple_choice};
//   ${cds_multiple_choice};
// `

// const LocationLabel = css`
//   width: 100%;
//   float: left; 
//   clear: none;
//   background-color: ${theme.colour.green};
//   background-color: #335075;
//   color: ${theme.colour.white};
//   box-shadow: 0 2px 0 #141414;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 2px;
//   overflow: auto;
//   &:hover {
//     background-color: ${theme.colour.greenDark};
//     background-color: #333333;
//     -webkit-box-shadow: 0 0 0 4px #ffbf47;
//     -moz-box-shadow: 0 0 0 4px #ffbf47;
//     box-shadow: 0 0 0 4px #ffbf47; 
//   }
//   a {color: inherit;}
//   }
// `
// const LocationInput = css`
//   float: left; 
//   clear: none;
//   background-color: ${theme.colour.green};
//   background-color: #335075;
//   color: ${theme.colour.white};
//   margin: 28px 10px 10px 2px;
//   box-shadow: 0 2px 0 #141414;
//   height: 34px;
//   width: 34px;
//   padding: 10px;
//   border: 2px solid;
//   &:hover {
//     background-color: ${theme.colour.greenDark};
//     background-color: #333333;
//     -webkit-box-shadow: 0 0 0 4px #ffbf47;
//     -moz-box-shadow: 0 0 0 4px #ffbf47;
//     box-shadow: 0 0 0 4px #ffbf47; 
//   }
//   a {color: inherit;}
//   }
// `
// const listLocations = css`
//   text-align: left;
//   padding: 0 0 0 45px;
// `
const clearFix = css`
  content:''; clear: both; display: table;
`
//const landingArrow = css`
//  ${arrow};
//  margin-left: 4px;
//`


class SelectlocationsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      provinceName: null,
      cityName: null, 
      provLocations: [],
      cityLocations:[],
    }

    this.getProvinceLocations = this.getProvinceLocations.bind(this);
    this.getCityLocations = this.getCityLocations.bind(this)
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
    this.validate = SelectlocationsPage.validate
    this.fields = SelectlocationsPage.fields
  }

  static errStrings = {}

  static get fields() {
    return getFieldNames(SelectLocationFields)
  }

  static validate(values, submitted) {
    return SelectlocationsPage.errStrings
  }


  async handleLocation ( selectedLocation,  locationAddress ) {
    // eslint-disable-next-line no-console
    console.log(this.props) 

    let values = { 'locationCity' : this.state.cityName ,'locationId' : selectedLocation, 'locationAddress': locationAddress }
    console.log(values)
    // eslint-disable-next-line no-unused-vars
    let justValidate = this.validate( values, true) 

    await this.props.context.setStore('selectProvince', values)

    // eslint-disable-next-line no-console
    console.log(this.props.context.store )
    await this.props.history.push('/calendar')
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
      .then( (data) => data.json() )
      .then( (locs) => locs )
      .catch( (error) => {
        console.warn(error)
        return [{'locationCity' : 'Aucun service en ce moment, réessayez plus tard / No service at this moment try again later'}]
      } );
  }
   

  getProvinceLocations(selectedProvince) {
    this.setState({
      loading: true,
    })
    this.fetchLocations( selectedProvince )
      .then((locs) => {

        locs.splice(0,0, 
          { 'id':'null', 
            'locationCity': (
              this.props.context.store.language === 'en' 
              ? 'Select a City' 
              : 'Sélectionnez une ville') } 
        )

        //console.log('Data in getProvince is : ' + JSON.stringify(locs)) 
        this.setState ({
            provLocations: locs,
            cityLocations: [],
            cityName: null,
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
        this.setState ({
            cityLocations: locs,
            loading: false,
        })
      })
  }

  handleProvinceChange(event) {
    this.setState({ provinceName : event.target.value });
    this.getProvinceLocations( event.target.value )
  }

  handleCityChange(event) {
    console.log ('city is :' + event.target.value)
    this.setState({ cityName : event.target.value });
    this.getCityLocations( this.state.provinceName,  event.target.value )
  }

  render() {

    // eslint-disable-next-line no-unused-vars
    let { context: { store: { selectProvince = {} } = {} } = {} } = this.props
     
    const locationsData = this.state.provLocations;
    const cityLocations = this.state.cityLocations;

    //console.log('State Data in Province is : ' + JSON.stringify(locationsData)) 
    //console.log('State Data in Cities is : ' + JSON.stringify(cityLocations)) 

    return (
      <Layout
        contentClass={contentClass}
        header={
          <H1>
            <Trans>Start by selecting a province</Trans>
          </H1>
        }
      >
        <Title path={this.props.match.path} />
        <div className={messageContainer}>
          <section>
            <div>

              <label className={govuk_label} htmlFor="ProvinceList">
                <Trans>Select a province:</Trans>
              </label>
              <Language
                render={language => (
                  <React.Fragment>
                    {language === 'en' ? (
                      <select className={govuk_select} name="ProvinceList" id="ProvEng" onChange={this.handleProvinceChange} >
                        {provinceNames.map(({ _id, name }) => (
                          <option key={_id} value={name}>
                            {name}
                          </option>
                        ))} 
                      </select>
                    ) : (
                      <select className={govuk_select}  name="ProvinceList" id="ProvFr" onChange={this.handleProvinceChange} >
                        {provinceNamesFr.map(({ name, namefr }) => (
                          <option key={name} value={name}>
                            {namefr}
                          </option>
                        ))} 
                      </select>
                    )}
                  </React.Fragment>
                )}
              />

              <p> <br /> </p>
                
              {/* Display the cities where an office is available */}

              {this.state.provinceName === null ? ( 
                null
              ) : (
                (this.state.loading === true && this.state.cityName === null ) ? (
                  null 
                ) : (
                  <React.Fragment>
                    {/* <p>&nbsp;</p> */}
                    {/* <p className={govuk_p}> <Trans>Selected province</Trans> : {this.state.provinceName} </p> */}
                    <hr /> 

                    <select className={govuk_select} name="CityList" id="Cities" onChange={this.handleCityChange} >
                      {locationsData.map(({ locationCity }) => (
                          <option key={locationCity} value={locationCity}>
                              {/* <button className={govuk_ListButton} onClick={() => this.handleCity(locationCity)}>&nbsp;{locationCity}&nbsp;</button> */}
                              {locationCity}
                          </option>
                      ))}
                    </select>

                  </React.Fragment>
                )
              )}

              
              {/* Display the results below only when user has selected a city */}

              {this.state.cityName === null ? ( 
                null
              ) : (
                <React.Fragment>
                  <p> <br /> </p>
                  <p> <Trans>Locations in:</Trans> {this.state.cityName} <br /> </p> 
                  <hr /> 
                </React.Fragment>
              )}

              {/* Display the city locations found for the selected city */}

              {/* {cityLocations.map(( {_id, locationId, locationAddress, hours} ) => (
                <div className={radio} key={_id}> 
                <label htmlFor={_id} className={govuk_label_pseudo_elements}>
                <input type="radio" name='selectcity' id={_id} value={locationAddress} />

                <ul key={_id} id={_id} onClick={() => {this.handleLocation(locationId, locationAddress)}}> 
                    <li>
                      <FaExternalLinkAlt color='#ffbf47' size='18' /> 
                      <Language
                        render={language =>
                          language === 'fr' ? (
                            <a href={`http://www.servicecanada.gc.ca/tbsc-fsco/sc-dsp.jsp?lang=fra&rc=${locationId}`} 
                              rel="noopener noreferrer" target='_blank' > 
                              <span className={visuallyhidden}><Trans>Opens a new window</Trans></span>
                              <span> ServiceCanada.gc.ca</span> 
                            </a>
                          ) : (
                            <a href={`http://www.servicecanada.gc.ca/tbsc-fsco/sc-dsp.jsp?rc=${locationId}&lang=eng`} 
                              rel="noopener noreferrer" target='_blank' > 
                              <span className={visuallyhidden}><Trans>Opens a new window</Trans></span>
                              <span> ServiceCanada.gc.ca</span>
                            </a>  
                            )
                        }
                      />
                    </li>
                    <li> <FaBuilding color='#ffbf47' size='18' /> {locationAddress}</li>
                    <li> <FaClock color='#ffbf47' size='18' /> {hours}</li>
                  </ul>

                </label>  
                </div>
              ))}  */}

              {cityLocations.map(( {_id, locationId, locationAddress, hours} ) => (
                <div key={locationId}>
                  <Radio 
                    type="radio"
                    name='selectcity'
                    value={locationId}
                    id={locationId}
                    label = {
                      <ul key={_id} id={_id} onClick={() => {this.handleLocation(locationId, locationAddress)}}> 
                        <li>
                          <FaExternalLinkAlt color='#ffbf47' size='18' /> 
                          <Language
                            render={language =>
                              language === 'fr' ? (
                                <a href={`http://www.servicecanada.gc.ca/tbsc-fsco/sc-dsp.jsp?lang=fra&rc=${locationId}`} 
                                  rel="noopener noreferrer" target='_blank' > 
                                  <span className={visuallyhidden}><Trans>Opens a new window</Trans></span>
                                  <span> ServiceCanada.gc.ca</span> 
                                </a>
                              ) : (
                                <a href={`http://www.servicecanada.gc.ca/tbsc-fsco/sc-dsp.jsp?rc=${locationId}&lang=eng`} 
                                  rel="noopener noreferrer" target='_blank' > 
                                  <span className={visuallyhidden}><Trans>Opens a new window</Trans></span>
                                  <span> ServiceCanada.gc.ca</span>
                                </a>  
                                )
                            }
                          />
                        </li>
                        <li> <FaBuilding color='#ffbf47' size='18' /> {locationAddress}</li>
                        <li> <FaClock color='#ffbf47' size='18' /> {hours}</li>
                      </ul>
                    }
                  />
                </div>
              ))} 


              <div className={clearFix}>&nbsp;</div>

              {/* <Button type="submit" value="Submit" onClick={this.handleProvince} > Submit </Button> */}

            </div>
          </section>
        </div>
      </Layout>          
    )
  }
}

SelectlocationsPage.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
  history: PropTypes.any,
}

export default withContext(SelectlocationsPage)
