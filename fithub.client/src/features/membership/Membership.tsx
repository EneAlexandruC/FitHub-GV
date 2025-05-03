import React from 'react';
import { Container, Typography } from '@mui/material';

const Membership: React.FC = () => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ mt: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" gutterBottom>
          Membership Plans
        </Typography>
        <Typography>
          Choose the plan that best fits your fitness goals.
        </Typography>
      </Container>
    </div>
  );
};

export default Membership;