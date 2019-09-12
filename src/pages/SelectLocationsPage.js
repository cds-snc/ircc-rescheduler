/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import { contextPropTypes } from '../context'
import withContext from '../withContext'
import { css } from 'emotion'
import { theme, mediaQuery, visuallyhidden, contentClass, arrow } from '../styles'
import Layout from '../components/Layout'
import Title, { matchPropTypes } from '../components/Title'
import { SelectLocationFields, getFieldNames } from '../validation'
import { ValidationMessage } from '../components/ErrorMessage'
import { Trans } from '@lingui/react'
import { provinceNames, provinceNamesFr } from '../utils/linguiUtils'
import { Radio } from '../components/forms/MultipleChoice'
import Button from '../components/forms/Button'
import { FaExternalLinkAlt, FaBuilding, FaClock } from 'react-icons/fa'
import Loading from '../components/Loading'
import SelectDropDown from '../components/forms/Select'
import { ApiFetch } from '../components/ApiFetch'
import FocusedH1 from '../components/FocusedH1'
import rightArrow from '../assets/rightArrow.svg'

// import styled from '@emotion/styled'
//import { buttonStyles } from '../components/forms/Button'

/* eslint-disable no-console */

const locationsContentClass = css`
  ${contentClass};
  p {
    margin-bottom: ${theme.spacing.sm};

    ${mediaQuery.md(css`
      margin-bottom: ${theme.spacing.lg};
    `)};
  }
  fieldset {
    border: none;
  }
`
const messageContainer = css`
  width: 95% !important;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  p {
    margin-bottom: 0;
  }
`
const govuk_label = css`
  margin-bottom: 0.17rem;
  display: block;
  font-size: ${theme.font.lg};
`

const clearFix = css`
  content: '';
  clear: both;
  display: table;
`
const landingArrow = css`
  ${arrow};
  margin-left: 4px;
`

const dbHost = 'http://localhost:4011'

class SelectlocationsPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      provinceName: '0',
      cityName: null,
      locationNumber: null,
      locationAddress: null,
      locationHours: null,
      biokitNumber: null,
      provLocations: [],
      cityLocations: [],
      loading: false,
      pageError: false,
    }

    this.getProvinceLocations = this.getProvinceLocations.bind(this)
    this.getCityLocations = this.getCityLocations.bind(this)
    this.handleProvinceChange = this.handleProvinceChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.submit = this.submit.bind(this)
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

  // Submit the location, saves in store & cookie and redircets to the calendar page if no errors
  async submit() {
    // eslint-disable-next-line no-console
    console.log(this.props)

    let values = {
      locationCity: this.state.cityName,
      locationId: this.state.locationNumber,
      locationAddress: this.state.locationAddress,
      locationHours: this.state.locationHours,
      locationBiokitNumber: this.state.biokitNumber,
    }

    if (this.state.locationNumber === null) {
      this.setState({ pageError: 2 })
      this.selectOfficeError.focus()
      return {}
    } else {
      this.setState({ pageError: 0 })
      await this.props.context.setStore('selectProvince', values)
      // eslint-disable-next-line no-console
      console.log(values)
      // eslint-disable-next-line no-console
      console.log(this.props.context.store)
      await this.props.history.push('/calendar')
    }
  }

  // Get the cities within a province
  getProvinceLocations(selectedProvince) {
    if (selectedProvince === '0') {
      // Ignore Default Value
      return
    }

    this.setState({
      loading: true,
    })
    console.log(this.props.context.store)

    ApiFetch(encodeURI(dbHost + `/locationsbyprov/${selectedProvince}`)).then(
      locs => {
        //console.log('Data in getProvince is : ' + JSON.stringify(locs))
        if (locs) {
          this.setState({
            provLocations: locs,
            cityLocations: [],
            cityName: null,
            locationNumber: null,
            locationAddress: null,
            locationHours: null,
            biokitNumber: null,
            pageError: 0,
            loading: false,
          })
        } else {
          this.setState({ pageError: 1 })
          this.selectProvinceError.focus()
        }
      },
    )
  }

  // Get the locations within a city
  getCityLocations(selectedProvince, selectedCity) {
    this.setState({
      loading: true,
    })
    ApiFetch(
      encodeURI(
        dbHost + `/locationsbyprov/${selectedProvince}/${selectedCity}`,
      ),
    ).then(locs => {
      this.setState({
        cityLocations: locs,
        locationNumber: null,
        locationAddress: null,
        locationHours: null,
        biokitNumber: null,
        pageError: 0,
        loading: false,
      })
    })
  }

  // Save in State the current Province selected & gets the cities within the province
  handleProvinceChange(event) {
    event.preventDefault()
    this.setState({ provinceName: event.target.value })
    this.getProvinceLocations(event.target.value)
  }

  // Save in State the current city then gets the locations in the city
  handleCityChange(event) {
    if (
      event.target.value === 'Sélectionnez une ville' ||
      event.target.value === 'Select a City'
    ) {
      this.setState({
        cityName: null,
        locationNumber: null,
        locationAddress: null,
        locationHours: null,
        biokitNumber: null,
      })
    } else {
      this.setState({ cityName: event.target.value })
      this.getCityLocations(this.state.provinceName, event.target.value)
    }
  }

  // Save in State the selected location to be validated in the submit
  handleLocation(locId, locAddress, locHours, locBiokits) {
    this.setState({
      locationNumber: locId,
      locationAddress: locAddress,
      locationHours: locHours,
      biokitNumber: locBiokits,
    })
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    let { context: { store: { selectProvince = {} } = {} } = {} } = this.props

    const locationsData = this.state.provLocations
    const cityLocations = this.state.cityLocations

    //console.log('State Data in Province is : ' + JSON.stringify(locationsData))
    //console.log('State Data in Cities is : ' + JSON.stringify(cityLocations))

    return (
      <Layout contentClass={locationsContentClass}>
        <Title path={this.props.match.path} />
        <FocusedH1 className={visuallyhidden}>
          <Trans>Start by selecting a province</Trans>
        </FocusedH1>
        {/* <Trans>Start by selecting a province</Trans> */}
        <div className={messageContainer}>
          <section>
            <div>
              {/* Next line check for Server errors to display a message */}
              <ValidationMessage
                id="selectProvinceError"
                message={
                  this.state.pageError === 1 ? (
                    <Trans>
                      No service at this moment, please try again later
                    </Trans>
                  ) : (
                    ''
                  )
                }
              />
              <div
                id="selectProvince"
                ref={selectProvinceError => {
                  this.selectProvinceError = selectProvinceError
                }}
              >
                <label className={govuk_label} htmlFor="ProvinceList">
                  <Trans>Select a province:</Trans>
                </label>

                {this.props.context.store.language === 'en' ? (
                  <SelectDropDown
                    selName="ProvinceList"
                    selId="ProvinceList"
                    optName1="Select a Province"
                    selOnChange={this.handleProvinceChange}
                    optData={provinceNames}
                  />
                ) : (
                  <SelectDropDown
                    selName="ProvinceList"
                    selId="ProvinceList"
                    optName1="Sélectionnez une province"
                    selOnChange={this.handleProvinceChange}
                    optData={provinceNamesFr}
                  />
                )}
              </div>

              {/* Next line display a Loading animation while getting data from the DB */}
              {this.state.loading === true ? <Loading /> : null}

              {/* Display the cities where an office is available */}

              {this.state.provinceName === '0' ? null : this.state.loading ===
                  true && this.state.cityName === null ? null : (
                <React.Fragment>
                  <hr />
                  <label className={govuk_label} htmlFor="CitiesList">
                    <Trans>Select a city:</Trans>
                  </label>

                  <SelectDropDown
                    selName="CitiesList"
                    selId="CitiesList"
                    selOnChange={this.handleCityChange}
                    optData={locationsData}
                    optName1={
                      this.props.context.store.language === 'en'
                        ? 'Select a city'
                        : 'Sélectionnez une ville'
                    }
                  />
                </React.Fragment>
              )}

              {/* Display the results below only when user has selected a city */}

              {this.state.cityName === null ? null : (
                <React.Fragment>
                  <hr />
                  <label className={govuk_label} htmlFor="OfficeList">
                    <Trans>Locations in:</Trans> {this.state.cityName}
                  </label>

                  {/* Display the offices for the selected city */}
                  {/* Next line check for any error messages to be displayed */}
                  <ValidationMessage
                    id="selectOfficeError"
                    message={
                      this.state.pageError === 2 ? (
                        <Trans>Please Select an Office. Please pick one.</Trans>
                      ) : (
                        ''
                      )
                    }
                  />
                  <div
                    id="OfficeList"
                    ref={selectOfficeError => {
                      this.selectOfficeError = selectOfficeError
                    }}
                  >
                    <fieldset id="SetListOffices">
                      <legend className={visuallyhidden}>
                        List of offices
                      </legend>
                      {cityLocations.map(
                        ({
                          locationId,
                          locationAddress,
                          hours,
                          biokitAmount,
                        }) => (
                          <div
                            key={locationId}
                            id={`${locationId}-div`}
                            name="locations"
                            onClick={() => {
                              this.handleLocation(
                                locationId,
                                locationAddress,
                                hours,
                                biokitAmount,
                              )
                            }}
                          >
                            <Radio
                              type="radio"
                              name="OfficeList"
                              value={locationId}
                              id={locationId}
                              aria-labelledby="OfficeList"
                              label={
                                <div
                                  id={`${locationId}-data`}
                                  onClick={() => {
                                    this.handleLocation(
                                      locationId,
                                      locationAddress,
                                      hours,
                                      biokitAmount,
                                    )
                                  }}
                                >
                                  <span id={`${locationId}-off`}>
                                    <FaExternalLinkAlt
                                      color="#ffbf47"
                                      size="18"
                                    />
                                    <a
                                      id={`${locationId}-href`}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                      href={
                                        this.props.context.store.language ===
                                        'en'
                                          ? `http://www.servicecanada.gc.ca/tbsc-fsco/sc-dsp.jsp?rc=${locationId}&lang=eng`
                                          : `http://www.servicecanada.gc.ca/tbsc-fsco/sc-dsp.jsp?lang=fra&rc=${locationId}`
                                      }
                                    >
                                      <span className={visuallyhidden}>
                                        <Trans>Opens a new window</Trans>
                                      </span>
                                      <span> ServiceCanada.gc.ca</span>
                                    </a>
                                  </span>{' '}
                                  <br />
                                  <span id={`${locationId}-addr`}>
                                    {' '}
                                    <FaBuilding
                                      color="#ffbf47"
                                      size="18"
                                    />{' '}
                                    {locationAddress}
                                  </span>{' '}
                                  <br />
                                  <span id={`${locationId}-time`}>
                                    {' '}
                                    <FaClock color="#ffbf47" size="18" />{' '}
                                    {hours}
                                  </span>
                                </div>
                              }
                            />
                          </div>
                        ),
                      )}
                    </fieldset>
                  </div>

                  <Button type="submit" value="Submit" onClick={this.submit}>
                    {' '}
                    Next{' '}
                    <img src={rightArrow} className={landingArrow} alt="" />
                  </Button>
                </React.Fragment>
              )}

              <div className={clearFix}>&nbsp;</div>
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
