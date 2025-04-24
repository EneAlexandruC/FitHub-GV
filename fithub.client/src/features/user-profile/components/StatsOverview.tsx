import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { UserStats } from '../types/UserStats';

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

interface StatsOverviewProps {
  stats: UserStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard>
          <FitnessCenterIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4" component="div" gutterBottom>
            {stats.totalWorkouts}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Total Antrenamente
          </Typography>
        </StatsCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard>
          <WhatshotIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4" component="div" gutterBottom>
            {stats.currentStreak}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Streak Actual
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Record: {stats.bestStreak} zile
          </Typography>
        </StatsCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard>
          <EmojiEventsIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4" component="div" gutterBottom>
            {stats.completionRate}%
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Rată Completare
          </Typography>
        </StatsCard>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <StatsCard>
          <TrendingUpIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4" component="div" gutterBottom>
            {stats.averageWorkoutsPerWeek}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Media/Săptămână
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Luna aceasta: {stats.totalWorkoutsThisMonth}
          </Typography>
        </StatsCard>
      </Grid>
    </Grid>
  );
};

export default StatsOverview;
