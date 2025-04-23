import React from 'react';
import { Container, Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About FitHub
      </Typography>
      <Typography>
        FitHub is your all-in-one fitness platform designed to help you achieve your fitness goals.
      </Typography>
    </Container>
  );
};

export default About; 