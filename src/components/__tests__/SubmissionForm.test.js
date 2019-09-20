import React from 'react'
import { render, mount } from 'enzyme'
import SubmissionForm from '../SubmissionForm'
import PropTypes from 'prop-types'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sending: false }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.setState({ sending: true })
    this.props.onSubmit()
  }

  render() {
    const { sending } = this.state
    return <SubmissionForm sending={sending} onSubmit={this.handleSubmit} />
  }
}

Wrapper.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

describe('<SubmissionForm />', () => {
  it('renders submission form with disabled submit button', () => {
    const form = render(<SubmissionForm sending={true} onSubmit={() => {}} />)
    expect(form.find('button').length).toBe(1)
    expect(form.find('button').text()).toEqual('Send request ')
    expect(form.find('button').attr('disabled')).toEqual('disabled')
  })

  it('renders submission form with submit button not disabled', () => {
    const form = render(<SubmissionForm sending={false} onSubmit={() => {}} />)
    expect(form.find('button').attr('disabled')).toEqual(undefined)
  })

  it('handles submission & disables button', () => {
    const mockSubmit = jest.fn()
    const form = mount(<Wrapper onSubmit={mockSubmit} />)
    const btn = form.find('button').instance()
    expect(btn.disabled).toBe(false)
    form.find('button').simulate('submit')
    expect(btn.disabled).toBe(true)
    expect(mockSubmit.mock.calls.length).toBe(1)
  })
})
