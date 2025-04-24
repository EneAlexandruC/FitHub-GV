import React from 'react';
import { Container, Typography } from '@mui/material';

const Membership: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Membership Plans
      </Typography>
      <Typography>
        Choose the plan that best fits your fitness goals.
      </Typography>
    </Container>
  );
};

export default Membership; 