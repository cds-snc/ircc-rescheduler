/* eslint-disable no-console */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Trans } from '@lingui/react'
import Language from './Language'
import { css } from 'emotion'
import { theme, visuallyhidden } from '../styles'
import Button from '../components/forms/Button'
import { FaExternalLinkAlt, FaBuilding, FaClock } from 'react-icons/fa'
import { matchPropTypes } from '../components/Title'
import { contextPropTypes } from '../context'
import withContext from '../withContext'

const govuk_select = css`
  font-family: SourceSans, Helvetica, Arial, sans-serif;
`
const govuk_label = css`
  margin-bottom: 0.17rem;
  display: block;
  font-size: ${theme.font.lg};
`
const govuk_p = css`
  margin-bottom: 0.37rem;
  display: block;
  font-size: 1.2rem;
`
const govuk_List = css`
  margin: 2px 0px 5px 0px;
  padding: 0px 8px 0px 8px;
  background-color: ${theme.colour.greyLight};
`
const govuk_ListButton = css`
  width: 275px;
  font-size: ${theme.font.sm}; 
  background-color: ${theme.colour.greyLight}
  cursor: pointer;
  padding: 0px 8px 0px 8px;
  &:hover {
    background-color: #00692f;
    color: ${theme.colour.white};
    -webkit-box-shadow: 0 0 0 4px #ffbf47;
    -moz-box-shadow: 0 0 0 4px #ffbf47;
    box-shadow: 0 0 0 4px #ffbf47; 
  }
`
const listLocations = css`
  margin-bottom: 0.5rem;
  display: block;
  background-color: ${theme.colour.green};
  color: ${theme.colour.white};
  box-shadow: 0 2px 0 #141414;
  padding: 10px;
  border: 2px;
  &:hover {
    background-color: ${theme.colour.greenDark};
    -webkit-box-shadow: 0 0 0 4px #ffbf47;
    -moz-box-shadow: 0 0 0 4px #ffbf47;
    box-shadow: 0 0 0 4px #ffbf47;
  }
  a {
    color: inherit;
  }
`

const provinceNames = [
  {
    _id: 0,
    idfr: 0,
    name: 'Select a Province',
    namefr: 'Sélectionnez une province',
  },
  { _id: 1, idfr: 1, name: 'Alberta', namefr: 'Alberta' },
  { _id: 2, idfr: 2, name: 'British Columbia', namefr: 'Colombie-Britannique' },
  { _id: 3, idfr: 4, name: 'Manitoba', namefr: 'Manitoba' },
  { _id: 4, idfr: 5, name: 'New Brunswick', namefr: 'Nouveau-Brunswick' },
  {
    _id: 5,
    idfr: 11,
    name: 'Newfoundland and Labrador',
    namefr: 'Terre-Neuve-et-Labrador',
  },
  {
    _id: 6,
    idfr: 12,
    name: 'Northwest Territories',
    namefr: 'Territoires du Nord-Ouest',
  },
  { _id: 7, idfr: 6, name: 'Nova Scotia', namefr: 'Nouvelle-Écosse' },
  { _id: 8, idfr: 7, name: 'Nunavut', namefr: 'Nunavut' },
  { _id: 9, idfr: 8, name: 'Ontario', namefr: 'Ontario' },
  {
    _id: 10,
    idfr: 3,
    name: 'Prince Edward Island',
    namefr: 'Île-du-Prince-Édouard',
  },
  { _id: 11, idfr: 9, name: 'Quebec', namefr: 'Québec' },
  { _id: 12, idfr: 10, name: 'Saskatchewan', namefr: 'Saskatchewan' },
  { _id: 13, idfr: 13, name: 'Yukon', namefr: 'Yukon' },
]
const provinceNamesFr = provinceNames.sort((a, b) => a.idfr > b.idfr)

class SelectProvince extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: true,
      loading: true,
      provinceName: null,
      cityName: null,
      provLocations: [],
      cityLocations: [],
    }

    this.getProvinceLocations = this.getProvinceLocations.bind(this)
    this.getCityLocations = this.getCityLocations.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleProvince = this.handleProvince.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.fetchLocations = this.fetchLocations.bind(this)
  }

  async handleLocation(selectedCity) {
    // eslint-disable-next-line no-console
    console.log(this.props)
    //console.log('title: ' + this.props.match.path.slice(1))
    // eslint-disable-next-line no-console
    console.log(this.props.context.store)
    // eslint-disable-next-line no-console
    let values = { selectCity: selectedCity }
    console.log(values)

    await this.props.context.setStore('selectProvince', values)

    // eslint-disable-next-line no-console
    console.log(this.props.context.store)
    await this.props.router.push('/calendar')
  }

  fetchLocations(province, city) {
    var encodedURI

    if (city != null) {
      encodedURI = encodeURI(
        process.env.RAZZLE_CONNECTION_STRING +
          `/locationsbyprov/${province}/${city}`,
      )
    } else {
      encodedURI = encodeURI(
        process.env.RAZZLE_CONNECTION_STRING + `/1/locationsbyprov/${province}`,
      )
    }

    console.log('url: ' + encodedURI)
    // eslint-disable-next-line no-undef
    return fetch(encodedURI)
      .then(data => data.json())
      .then(locs => locs)
      .catch(error => {
        console.warn(error)
        return [
          {
            locationCity:
              'Aucun service en ce moment, réessayez plus tard / No service at this moment try again later',
          },
        ]
      })
  }

  getProvinceLocations(selectedProvince) {
    this.setState({
      loading: true,
    })
    this.fetchLocations(selectedProvince).then(locs => {
      //console.log('Data in getProvince is : ' + JSON.stringify(locs))
      this.setState({
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
    this.fetchLocations(selectedProvince, selectedCity).then(locs => {
      //console.log('Data in getCities is : ' + JSON.stringify(locs))
      this.setState({
        cityLocations: locs,
        loading: false,
      })
    })
  }

  handleChange(event) {
    this.setState({ provinceName: event.target.value })
  }

  handleProvince(event) {
    event.preventDefault()
    this.getProvinceLocations(this.state.provinceName)
  }

  handleCity(selectedCity) {
    this.setState({ cityName: selectedCity })
    this.getCityLocations(this.state.provinceName, selectedCity)
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    let { context: { store: { selectProvince = {} } = {} } = {} } = this.props

    const locationsData = this.state.provLocations
    const cityLocations = this.state.cityLocations

    //console.log('State Data in Province is : ' + JSON.stringify(locationsData))
    //console.log('State Data in Cities is : ' + JSON.stringify(cityLocations))

    return (
      <div>
        <label className={govuk_label} htmlFor="ProvinceList">
          <Trans>Select a province:</Trans>
        </label>
        <Language
          render={language => (
            <React.Fragment>
              {language === 'en' ? (
                <select
                  className={govuk_select}
                  name="ProvinceList"
                  id="ProvEng"
                  onChange={this.handleChange}
                >
                  {provinceNames.map(({ _id, name }) => (
                    <option key={_id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  className={govuk_select}
                  name="ProvinceList"
                  id="ProvFr"
                  onChange={this.handleChange}
                >
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

        <p>
          {' '}
          <br />{' '}
        </p>

        <Button type="submit" value="Submit" onClick={this.handleProvince}>
          {' '}
          Submit{' '}
        </Button>

        {this.state.provinceName === null ? null : (
          <React.Fragment>
            <p>&nbsp;</p>
            <p className={govuk_p}>
              {' '}
              <Trans>Selected province</Trans> : {this.state.provinceName}{' '}
            </p>
            <hr />
          </React.Fragment>
        )}

        <p>
          {' '}
          <br />{' '}
        </p>

        {/* Display the cities where an office is available */}

        <ul>
          {locationsData.map(({ locationCity }) => (
            <li className={govuk_List} key={locationCity} id={locationCity}>
              <button
                className={govuk_ListButton}
                onClick={() => this.handleCity(locationCity)}
              >
                &nbsp;{locationCity}&nbsp;
              </button>
            </li>
          ))}
        </ul>

        {/* Display the labels below only when user has selected a city */}

        {this.state.cityName === null ? null : (
          <React.Fragment>
            <p>
              {' '}
              <br />{' '}
            </p>
            <p>
              {' '}
              <Trans>Locations in:</Trans> {this.state.cityName} <br />{' '}
            </p>
            <hr />
          </React.Fragment>
        )}

        <ul>
          {cityLocations.map(({ _id, locationId, locationAddress, hours }) => (
            <li
              key={_id}
              id={_id}
              className={listLocations}
              onClick={() => {
                this.handleLocation(locationId)
              }}
            >
              <ul>
                <li>
                  <FaExternalLinkAlt color="#ffbf47" size="18" />
                  <Language
                    render={language =>
                      language === 'fr' ? (
                        <a
                          href={`http://www.servicecanada.gc.ca/tbsc-fsco/sc-dsp.jsp?lang=fra&rc=${locationId}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className={visuallyhidden}>
                            <Trans>Opens a new window</Trans>
                          </span>
                          <span> ServiceCanada.gc.ca</span>
                        </a>
                      ) : (
                        <a
                          href={`http://www.servicecanada.gc.ca/tbsc-fsco/sc-dsp.jsp?rc=${locationId}&lang=eng`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className={visuallyhidden}>
                            <Trans>Opens a new window</Trans>
                          </span>
                          <span> ServiceCanada.gc.ca</span>
                        </a>
                      )
                    }
                  />
                </li>
                <li>
                  {' '}
                  <FaBuilding color="#ffbf47" size="18" /> {locationAddress}
                </li>
                <li>
                  {' '}
                  <FaClock color="#ffbf47" size="18" /> {hours}
                </li>
              </ul>
            </li>
          ))}
        </ul>
        <button onClick={() => this.handleLocation(this.state.cityName)}>
          {' '}
          testing button{' '}
        </button>
      </div>
    )
  }
}

SelectProvince.propTypes = {
  ...contextPropTypes,
  ...matchPropTypes,
  history: PropTypes.any,
}

export default withContext(SelectProvince)
