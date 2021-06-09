import styled from 'styled-components';

export const Container = styled.div`
  width: 100;
  max-width: 580px;
  margin: 0 auto;
  padding: 10px;

  h1 {
    text-align: center;
    padding: 20px;
  }

  ul li {
    padding: 50px;
    margin-top: 30px;
    list-style: none;
  }

  ul li a {
    padding: 10px;
    text-decoration: none;
    color: #312E38;
  }

  div {
    top: 10px;
    border: 2px solid #ff9000;
    border-radius: 10px;
  }

  & + div {
    margin-top: 10px;
  }

  Button {
    width: 33%;
    height: 100%;
    text-align: center;
  }

`;
