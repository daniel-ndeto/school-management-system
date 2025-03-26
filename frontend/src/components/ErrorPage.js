import React from 'react';
import styled from 'styled-components';

// ErrorPage component to display an error message
const ErrorPage = () => {
    return (
        <Container>
            <Content>
                <Heading>Oops, something went wrong</Heading> {/* Main heading */}
                <Text>
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please check back later.
                </Text> {/* Error description */}
            </Content>
        </Container>
    );
};

// Styled container for centering content and applying background
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Josefin Sans", sans-serif;
  color: white;
  background-image: url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
`;

// Styled content wrapper with padding and centered text
const Content = styled.div`
  max-width: 800px;
  padding: 20px;
  text-align: center;
`;

// Styled heading with custom font size and color
const Heading = styled.h1`
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: bold;
  color: rgb(77, 9, 9);
`;

// Styled paragraph for error description
const Text = styled.p`
  font-size: 18px;
  line-height: 1.5;
`;

export default ErrorPage;
