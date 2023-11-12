import React from 'react';
import styled from 'styled-components';

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
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
width: 700px;
max-width: 100%;
min-height: 100px;
margin-top: 100px;
margin-bottom: 10px:
justify-content: center;
/* Add margin to space out the containers */
`;

export const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto;
`;

export const TinyContainer = styled.div`
background-color: #fff;
border-radius: 10px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
width: 300px;
max-width: 100%;
min-height: 100px;
margin: 10px ;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto;
`;

export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 100%;
text-align: center;
`;

export const Title = styled.h3`
font-weight: bold;
margin: 1;
`;

export const Input = styled.input`
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 100%;
`;

export const DescriptionInput = styled.textarea`
background-color: #eee;
border: none;
padding: 15px; /* Adjust the padding for your desired appearance */
margin: 8px 0;
width: 100%;
height: 100px; /* Set the desired height for your textarea */
resize: vertical; /* Allow vertical resizing, but not horizontal */
`;

export const Button = styled.button`
border-radius: 20px;
border: 1px solid #25E970;
background-color: #25E970;
color: #ffffff;
font-size: 12px;
font-weight: bold;
padding: 12px 45px;
letter-spacing: 1px;
margin: -10px auto;
margin-left: 805px;
text-transform: uppercase;
transition: transform 80ms ease-in;
&:active{
    transform: scale(0.95);
}
&:focus {
    outline: none;
}
`;