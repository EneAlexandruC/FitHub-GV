import React from 'react';
import { Container, Typography } from '@mui/material';

const Community: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Community
      </Typography>
      <Typography>
        Join our fitness community and connect with others on their fitness journey.
      </Typography>
    </Container>
  );
};

export default Community; 