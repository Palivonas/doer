import React from 'react';
import styled from 'styled-components';
import BackgroundImage from '../../resources/welcome-background.jpg';
import RippleButton from '../../components/Welcome/RippleButton/RippleButton';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  background: 
  linear-gradient(
    rgba(0, 0, 0, 0.45), 
    rgba(0, 0, 0, 0.45)
  ),
  url(${BackgroundImage});
  position: absolute;
`;

const StyledSlogan = styled.div`
  font-size: 20px;
  color: white;
  display:inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
`;

const StyledTitle = styled.div`
  position: relative;
  margin-left: -200px;
`;

const Content = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 40%;
  left: 50%;
  width: 400px;
  margin-left: -200px;
`;

const StyledLink = styled(Link)`
  position: fixed;
  bottom: 10%;
  left: 50%;
  margin-left: -85px;
`;

const Description = styled.div`
  color: white;
  width: 300px;
  left: 50%;
  margin: 50px 0 0 -150px;
  position:relative;
`;

const DescriptionList = styled.ul`
  text-align: left;
  margin-top: 50px
`;

const welcome = () =>
  <div>
    <StyledBackground>
      <Content>
        <StyledTitle>
          <img src={logo} className="App-logo" alt="logo" />
          <StyledSlogan>Doer - make hobbies great again</StyledSlogan>
        </StyledTitle>
        <Description>
          <DescriptionList>
            <li>
              Point explaining why this is great
            </li>
            <li>
              Another great thing
            </li>
            <li>
              This is great
            </li>
          </DescriptionList>
          </Description>
      </Content>
      <StyledLink to="/activities">
        <RippleButton
          title="Continue"
          width="190px"
          >
          <div
            style={{
              fontSize: "16px",
              marginBottom: "15px"
            }}
          >
            Find out more
          </div>
          <i
            className="fas fa-arrow-down"
            style={{
              fontSize: "27px"
            }}
            ></i>
        </RippleButton>
      </StyledLink>
    </StyledBackground>

  </div>

export default welcome;