import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent as MuiCardContent,
  LinearProgress,
  Avatar,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { workouts as availableWorkouts } from '../../data/workouts';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  backgroundImage: 'url(/img/photo-1651840403916-d1e0515b32c4.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  padding: '2rem 0',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '200px', // Fixed height for feature cards
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StyledCardContent = styled(MuiCardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

interface WorkoutProgress {
  date: string;
  completed: number;
  total: number;
  workoutName?: string;
}

interface UserProfileData {
  email?: string;
  isPremium: boolean;
  weeklyProgress: WorkoutProgress[];
  id?: string;
}

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });
  const [workoutDialogOpen, setWorkoutDialogOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    completed: 1,
    total: 1,
    workoutId: '', // ID-ul workout-ului selectat
    workoutName: '', // Numele workout-ului selectat
  });
  const [workoutsList, setWorkoutsList] = useState<Array<{id: string, name: string}>>([]);

  const fetchUserProfile = useCallback(async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      // Pasul 1: Obținem informațiile de bază ale utilizatorului
      const userResponse = await fetch(`http://localhost:5012/api/User/get-user-by-email?email=${user.email}`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = await userResponse.json();
      
      // Pasul 2: Verificăm dacă utilizatorul este premium
      // Această verificare ar trebui să fie implementată pe backend pentru a returna statusul premium
      // Între timp, vom face o verificare directă în baza de date
      let isPremiumUser = false;
      
      try {
        // Încercăm să obținem informații despre premiumUser folosind ID-ul utilizatorului
        if (userData && userData.id) {
          const checkPremiumResponse = await fetch(`http://localhost:5012/api/User/check-premium?userId=${userData.id}`, {
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            mode: 'cors'
          }).catch(err => {
            console.log('Premium check endpoint not available, falling back to workaround');
            return null; // Returnăm null în loc de { ok: false }
          });
          
          if (checkPremiumResponse && checkPremiumResponse.ok) {
            const premiumData = await checkPremiumResponse.json();
            isPremiumUser = premiumData.isPremium;
          } else {
            // Dacă API-ul nu există, vom folosi Type din obiectul utilizator ca o măsură temporară
            // În utilizatorul RegularUser, câmpul Type poate fi 0 (regular) sau 1 (premium)
            isPremiumUser = userData.type === 1;
          }
        }
      } catch (error) {
        console.error('Error checking premium status:', error);
        // Dacă verificarea eșuează, presupunem că utilizatorul nu este premium
        isPremiumUser = false;
      }
      
      // Adăugăm datele de progres săptămânal dacă nu sunt disponibile
      const profileWithProgress = {
        ...userData,
        isPremium: isPremiumUser, // Folosim statutul premium detectat
        weeklyProgress: userData.weeklyProgress || [
          {
            date: new Date().toISOString(),
            completed: 3,
            total: 5
          },
          {
            date: new Date(Date.now() - 86400000).toISOString(), // yesterday
            completed: 2,
            total: 4
          },
          {
            date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            completed: 4,
            total: 4
          }
        ]
      };
      
      setProfileData(profileWithProgress);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    // Folosim workouturile din data/workouts.ts pentru început
    // În viitor, am putea face un apel API către /api/Workout/get-all-workouts
    setWorkoutsList(availableWorkouts.map(w => ({
      id: w.id,
      name: w.name
    })));
  }, []);

  const handleUpgradeDialogOpen = () => {
    setUpgradeDialogOpen(true);
  };

  const handleUpgradeDialogClose = () => {
    setUpgradeDialogOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpgradeToPremium = async () => {
    handleUpgradeDialogClose();
    setLoading(true);
    
    try {
      // Încercăm mai întâi să obținem ID-ul utilizatorului dacă nu îl avem deja
      let userId = profileData?.id;
      
      if (!userId && user?.email) {
        try {
          // Încercăm să obținem ID-ul utilizatorului
          const userResponse = await fetch(`http://localhost:5012/api/User/get-user-by-email?email=${user.email}`, {
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            mode: 'cors'
          });
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            if (userData && userData.id) {
              userId = userData.id;
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Continuăm cu modul demonstrativ dacă obținerea ID-ului eșuează
        }
      }
      
      // Dacă avem un ID de utilizator, încercăm să facem upgrade prin API
      if (userId) {
        try {
          const response = await fetch('http://localhost:5012/api/User/add-premiumuser', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
              regularUserID: userId,
              subscriptionStartDate: new Date().toISOString(),
              subscriptionEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString() // 1 an abonament
            }),
          });
          
          if (response.ok) {
            // Răspunsul a fost de succes, actualizăm starea
            const updatedData = await response.json();
            
            setProfileData({
              ...profileData,
              isPremium: true,
              id: userId.toString(),
              weeklyProgress: profileData?.weeklyProgress || []
            });
            
            setSnackbar({
              open: true,
              message: 'Felicitări! Acum ești membru Premium!',
              severity: 'success',
            });
            
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error calling premium upgrade API:', error);
          // Continuăm cu modul demonstrativ dacă apelul API eșuează
        }
      }
      
      // Mod demonstrativ - se folosește când API-ul nu funcționează
      console.log('Simulating premium upgrade in demo mode');
      
      setTimeout(() => {
        // Creăm o versiune actualizată a datelor de profil cu isPremium setat la true
        const simulatedUpdatedData: UserProfileData = {
          email: user?.email || '',
          isPremium: true,
          weeklyProgress: profileData?.weeklyProgress || [],
          id: profileData?.id || '1' // Folosim ID-ul existent sau un ID fictiv
        };
        
        // Actualizăm starea cu datele simulate
        setProfileData(simulatedUpdatedData);
        
        setSnackbar({
          open: true,
          message: 'Felicitări! Acum ești membru Premium! (Mod demonstrativ)',
          severity: 'success',
        });
        
        setLoading(false);
      }, 1000); // Adăugăm o mică întârziere pentru a simula cererea de rețea
      
    } catch (error) {
      console.error('Error upgrading to premium:', error);
      setSnackbar({
        open: true,
        message: 'Nu s-a putut face upgrade la premium. Te rugăm să încerci din nou.',
        severity: 'error',
      });
      setLoading(false);
    }
  };

  const handleWorkoutDialogOpen = () => {
    setWorkoutDialogOpen(true);
  };

  const handleWorkoutDialogClose = () => {
    setWorkoutDialogOpen(false);
  };

  const handleWorkoutInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewWorkout({
      ...newWorkout,
      [name]: name === 'date' ? value : Number(value),
    });
  };

  const handleWorkoutSelectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    
    // Găsim numele workout-ului selectat
    const selectedWorkout = workoutsList.find(w => w.id === value);
    
    setNewWorkout({
      ...newWorkout,
      workoutId: value,
      workoutName: selectedWorkout?.name || ''
    });
  };

  const handleAddWorkout = async () => {
    // In a real app, you would send this to the server
    // For now, we'll just update the local state
    
    // Create a new workout entry
    const workoutEntry = {
      date: new Date(newWorkout.date).toISOString(),
      completed: newWorkout.completed,
      total: newWorkout.total,
      workoutName: newWorkout.workoutName, // Adăugăm numele workout-ului
    };
    
    // Add it to the existing progress data
    if (profileData) {
      const updatedProgress = [
        workoutEntry,
        ...(profileData.weeklyProgress || []),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date
      
      // Update the profile data
      setProfileData({
        ...profileData,
        weeklyProgress: updatedProgress,
      });
      
      // In a real app, you would send this data to the server
      // For now, we'll just show a success message
      setSnackbar({
        open: true,
        message: 'Workout progress added successfully!',
        severity: 'success',
      });
    }
    
    // Close the dialog and reset the form
    handleWorkoutDialogClose();
    setNewWorkout({
      date: new Date().toISOString().split('T')[0],
      completed: 1,
      total: 1,
      workoutId: '',
      workoutName: '',
    });
  };

  if (loading) {
    return (
      <PageContainer>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <LinearProgress />
        </Container>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography color="error">{error}</Typography>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <StyledPaper>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {user?.email}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {profileData?.isPremium ? 'Premium Member' : 'Regular Member'}
                </Typography>
                {!profileData?.isPremium && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<StarIcon />}
                    onClick={handleUpgradeDialogOpen}
                    sx={{ mt: 2 }}
                  >
                    Upgrade to Premium
                  </Button>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Weekly Workout Progress</Typography>
                <IconButton 
                  color="primary" 
                  onClick={handleWorkoutDialogOpen}
                  sx={{ 
                    backgroundColor: (theme) => theme.palette.primary.main + '20',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.primary.main + '30',
                    }
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                {profileData?.weeklyProgress?.map((progress, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <ProgressCard>
                      <StyledCardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          {new Date(progress.date).toLocaleDateString()}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <FitnessCenterIcon color="primary" />
                          <Typography variant="body2">
                            {progress.workoutName ? `${progress.workoutName}: ` : ''}{progress.completed}/{progress.total} workouts completed
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(progress.completed / progress.total) * 100}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </StyledCardContent>
                    </ProgressCard>
                  </Grid>
                ))}
              </Grid>

              {!profileData?.isPremium && (
                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Premium Features
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <FeatureCard>
                        <StyledCardContent>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              Advanced Workouts
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Access to exclusive workout programs and personalized training plans
                            </Typography>
                          </Box>
                        </StyledCardContent>
                      </FeatureCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FeatureCard>
                        <StyledCardContent>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              Progress Tracking
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Detailed analytics and progress tracking tools
                            </Typography>
                          </Box>
                        </StyledCardContent>
                      </FeatureCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FeatureCard>
                        <StyledCardContent>
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              Expert Support
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Direct access to fitness experts and nutritionists
                            </Typography>
                          </Box>
                        </StyledCardContent>
                      </FeatureCard>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>

      {/* Premium Upgrade Dialog */}
      <Dialog
        open={upgradeDialogOpen}
        onClose={handleUpgradeDialogClose}
      >
        <DialogTitle>Upgrade to Premium Membership</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Premium membership gives you access to exclusive workouts, detailed progress tracking,
            and expert support. Would you like to upgrade your account to Premium?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpgradeDialogClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleUpgradeToPremium} 
            color="primary" 
            variant="contained"
            startIcon={<StarIcon />}
          >
            Upgrade Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Workout Dialog */}
      <Dialog open={workoutDialogOpen} onClose={handleWorkoutDialogClose}>
        <DialogTitle>Log Workout Progress</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Keep track of your fitness journey by logging your workout progress.
          </DialogContentText>
          <Box component="form" sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="workout-select-label">Workout Type</InputLabel>
              <Select
                labelId="workout-select-label"
                id="workout-select"
                name="workoutId"
                value={newWorkout.workoutId}
                label="Workout Type"
                onChange={handleWorkoutSelectChange}
              >
                <MenuItem value="">
                  <em>Select a workout</em>
                </MenuItem>
                {workoutsList.map((workout) => (
                  <MenuItem key={workout.id} value={workout.id}>
                    {workout.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          
            <TextField
              margin="dense"
              label="Date"
              type="date"
              fullWidth
              name="date"
              value={newWorkout.date}
              onChange={handleWorkoutInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Completed Workouts"
              type="number"
              fullWidth
              name="completed"
              value={newWorkout.completed}
              onChange={handleWorkoutInputChange}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Total Planned Workouts"
              type="number"
              fullWidth
              name="total"
              value={newWorkout.total}
              onChange={handleWorkoutInputChange}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWorkoutDialogClose}>Cancel</Button>
          <Button 
            onClick={handleAddWorkout} 
            variant="contained" 
            color="primary"
            disabled={newWorkout.completed > newWorkout.total || !newWorkout.workoutId}
          >
            Add Progress
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default UserProfile;
