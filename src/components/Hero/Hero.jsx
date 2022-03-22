import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  margin: 0;
  background: #FFF;
  color: #000;
`
const HeadingContainer = styled.div`
  padding: 25% 5%;
`
const Heading = styled.h1`
  padding: 10% 2%;
  font-weight: 400;
`
const Icons = styled.div`
  display: block;
  font-size: 36pt;
`

const Hero = () => (
  <Container>
    <HeadingContainer>
      <Heading>
        <Icons>&#9632; &#9679; &#9652;</Icons>Migration<br />Tool
      </Heading>
    </HeadingContainer>
  </Container>
);

export default Hero;
