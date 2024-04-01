import styled from 'styled-components'

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
margin-left: 100px;
max-height: calc(100vh - 100px);
margin-top: 170px;
justify-content: center;
/* Add margin to space out the containers */
`;

export const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  top-margin: 50px;
`;

export const ScrollableContent = styled.div`
  max-height: 800px; /* Set a fixed height for the scrollable content */
  overflow-y: auto; /* Enable vertical scrolling if content exceeds the fixed height */

`;

export const Title = styled.h2`
margin-left: 20px;
font-weight: bold;
margin: 0.5;
`;

export const Info = styled.h3`
margin-left: 20px;
font-weight: normal;
margin: 0.5;
`;

export const Map = styled.div`
width: 800px;
margin-top:-521px;
margin-left: 900px;
border-radius: 10px;
overflow: hidden;
`;