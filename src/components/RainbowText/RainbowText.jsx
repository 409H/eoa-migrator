import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const aniRainbowText = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(-360deg);
  }
`
const Text = styled.span`
  background-image: -webkit-linear-gradient(
    120deg,
    rgb(220, 64, 48),
    rgb(255, 206, 51),
    rgb(112, 183, 76)
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: 5s linear 0s infinite normal none running ${aniRainbowText};
`

function RainbowText({ text }) {
  return(
    <Text>
      {text}
    </Text>
  )
}

RainbowText.propTypes = {
  text: PropTypes.string.isRequired
};

export default RainbowText;