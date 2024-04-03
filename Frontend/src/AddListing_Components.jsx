import React from 'react';
import styled from 'styled-components';

export const Select = styled.select`
 background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 15%;

  .react-select__control {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  .react-select__value-container {
    padding: 0;
  }

  .react-select__single-value {
    color: #333;
  }
`

export const header = styled.div`
  background-color: #4caf50;
  color: #f6f6f6;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
`;

export const Container = styled.div`

background-color: #fff;
border-radius: 10px;
position: relative;
overflow-y: auto;
overflow-x: hidden;
width: 700px;
max-width: 100%;
max-height: calc(100vh - 100px);
margin-top: 100px;
justify-content: center;
/* Add margin to space out the containers */
`;

export const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  top-margin: 10px;
`;

export const DoubleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & > div {
    flex: 1;
    margin-right: 10px;  // Adjust the margin as needed
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;

`;

export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: left;
justify-content: left;
flex-direction: column;
padding: 0 0px;
height: 100%;
width: 100%;
margin-left: 90px;
`;

export const Title = styled.h3`
font-weight: bold;
margin: 0.5;
`;



export const AddressInput = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 74%;
`;

export const TitleInput = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 74%;
`;

export const ZipCodeInput = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 14%;
`;

export const CityInput = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 50%;
`;

export const DateInput = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 50%;
`;

export const TimeInput = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 50%;
`;

export const Input = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 70%;
`;

export const DescriptionInput = styled.textarea`
background-color: #eee;
border: none;
padding: 15px; /* Adjust the padding for your desired appearance */
margin: 8px 0;
width: 74%;
height: 100px; /* Set the desired height for your textarea */
resize: vertical; /* Allow vertical resizing, but not horizontal */
`;

export const Button = styled.button`
border-radius: 20px;
border: 1px solid #25E970;
background-color: #25E970;
color: #ffffff;
font-size: 18px;
font-weight: bold;
padding: 12px 45px;
margin: 8px auto;
margin-left: 150px;
letter-spacing: 1px;
text-transform: uppercase;
transition: transform 80ms ease-in;
&:active{
    transform: scale(0.95);
}
&:focus {
    outline: none;
}
`;

export const Tag = styled.div`
  background-color: #25E970;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  margin: 4px;
  padding: 6px 12px;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a945b;
  }
`;

export const ScrollableContent = styled.div`
  max-height: 1000px; /* Set a fixed height for the scrollable content */
  overflow-y: auto; /* Enable vertical scrolling if content exceeds the fixed height */

`;