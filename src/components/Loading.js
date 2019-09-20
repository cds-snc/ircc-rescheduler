import React from 'react'
import { css, keyframes } from 'emotion'
import { visuallyhidden } from '../styles'

// Based on: Zero Element Loading Animations by Mike Riethmuller

const animation = keyframes`
  0% { transform: translate(-72.5px,-7.5px); }
  100% { transform: translate(58.5px,-7.5px); }
`

const loading = css`
  position: relative;

&:before{
  content:'';
  position: absolute;
  top: 50%;
  left: 150px;
  z-index: 999;
  width: 150px;
  border-radius: 10px;
  border: solid 10px #658ab7;
  transform: translate(-50%, -50%);
}

&:after{
    content:'';
    position: absolute;
    top: 50%;
    left: 150px;
    width: 15px;
    height: 15px;
    z-index: 999;
    border-radius: 50%;
    background: #27374a;
    animation-name: ${animation};
    animation-duration: 2s;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;    
    animation-iteration-count: infinite;
}
`

class Loading extends React.Component {
  render () {
    return (
      <div className={loading}>
        <span className={visuallyhidden}>Loading...</span>
      </div>
    )
  }    
}

export default Loading;
