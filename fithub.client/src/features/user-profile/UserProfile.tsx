import React, { useEffect, useState, useCallback, ChangeEvent, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  SelectChangeEvent
} from '@mui/material';
import { styled } from '@mui/material/styles'; 
import StarIcon from '@mui/icons-material/Star';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useAuth } from '../../contexts/AuthContext';
import { workouts as availableWorkouts } from '../../data/workouts';
import { UserStats } from './types/UserStats';
import StatsOverview from './components/StatsOverview';
import ProgressChart from './components/ProgressChart';
import WorkoutHistory from "./components/WorkoutHistory";

const PageContainer = styled(Box)({
  minHeight: '100vh',
  padding: '2rem',
  backgroundColor: '#f5f5f5',
});

const ProfileHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const ProfileImageContainer = styled(Box)({
  position: 'relative',
  width: '120px',
  height: '120px',
});

const ProfileImage = styled('img')({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '4px solid #fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const ProfileImageUploadButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  width: 32,
  height: 32,
}));

const ProfileInfo = styled(Box)({
  flex: 1,
});

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
  profilePicture?: string;
  stats?: UserStats;
  createdAt?: string;
  firstName?: string;
  lastName?: string;
}

// Calculate statistics for the user's workout progress
function calculateStats(progress: WorkoutProgress[]): UserStats {
  const totalWorkouts = progress.reduce((sum, p) => sum + p.completed, 0);
  const totalPlanned = progress.reduce((sum, p) => sum + p.total, 0);

  // Calculate streaks
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  const sortedDates = [...progress].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  for (let i = 0; i < sortedDates.length; i++) {
    const current = new Date(sortedDates[i].date);
    const prev = i > 0 ? new Date(sortedDates[i - 1].date) : null;
    if (sortedDates[i].completed > 0) {
      if (!prev || Math.abs(current.getTime() - prev.getTime()) <= 86400000) {
        tempStreak++;
        currentStreak = Math.max(currentStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
      bestStreak = Math.max(bestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // Calculate average per week
  const weeksSpan = Math.ceil(progress.length / 7);
  const averageWorkoutsPerWeek = totalWorkouts / weeksSpan;

  // Calculate this month's workouts
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const totalWorkoutsThisMonth = progress.filter(p => new Date(p.date) >= firstDayOfMonth).reduce((sum, p) => sum + p.completed, 0);

  return {
    totalWorkouts,
    currentStreak,
    bestStreak,
    completionRate: totalPlanned > 0 ? Math.round((totalWorkouts / totalPlanned) * 100) : 0,
    totalWorkoutsThisMonth,
    averageWorkoutsPerWeek: Math.round(averageWorkoutsPerWeek * 10) / 10,
  };
}


const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Încărcăm poza de profil din localStorage la pornirea componentei
  useEffect(() => {
    const savedProfilePicture = localStorage.getItem(`profilePicture_${user?.email}`);
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }
  }, [user?.email]);

  // Funcție pentru încărcarea pozei de profil
  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePicture(base64String);
        // Salvăm poza în localStorage
        if (user?.email) {
          localStorage.setItem(`profilePicture_${user.email}`, base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
          console.log(`Checking premium status for user ID: ${userData.id}`);
          const checkPremiumResponse = await fetch(`http://localhost:5012/api/User/check-premium?userId=${userData.id}`, {
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            mode: 'cors'
          }).catch((error) => {
            console.error('Error during premium status API fetch:', error);
            console.warn('Falling back to user type due to fetch error.');
            return null; // Returnăm null în loc de { ok: false }
          });
          
          if (checkPremiumResponse && checkPremiumResponse.ok) {
            const premiumData = await checkPremiumResponse.json();
            console.log('Premium check API response:', premiumData);
            isPremiumUser = premiumData.isPremium;
          } else {
            // Log non-OK response from API (e.g., 404 Not Found)
            console.warn(`Premium check API failed with status: ${checkPremiumResponse?.status}. Falling back to user type.`);
            // Fallback: Use 'type' field from user data if API fails or doesn't exist
            isPremiumUser = userData.type === 1;
          }
        } else {
          console.warn('User data or user ID missing, cannot check premium status via API. Assuming not premium.');
          isPremiumUser = false; // Default if no ID
        }

        console.log('Final isPremiumUser status:', isPremiumUser);
        // Adăugăm datele de progres săptămânal dacă nu sunt disponibile
        // Calculăm statisticile bazate pe progresul săptămânal
        const weeklyProgress = userData.weeklyProgress || [
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
            total: 4,
          },
        ];

        const profileWithProgress = {
          ...userData,
          isPremium: isPremiumUser,
          weeklyProgress,
          stats: calculateStats(weeklyProgress),
          createdAt: userData.createdAt || userData.dateCreated || userData.created || '',
          firstName: userData.firstName,
          lastName: userData.lastName,
        };

        setProfileData(profileWithProgress);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load profile data. Please try again later.');
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    // Folosim workouturile din data/workouts.ts pentru început
    // În viitor, am putea face un apel API către /api/Workout/get-all-workouts
    setWorkoutsList(availableWorkouts.map((w) => ({ id: w.id, name: w.name })));
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
            mode: 'cors',
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
              RegularUserId: userId,
              SubscriptionStartDate: new Date().toISOString(),
              SubscriptionEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(), // 1 an abonament
            }),
          });

          if (response.ok) {
            // Răspunsul a fost de succes, actualizăm starea
            await response.json();

            setProfileData({
              ...profileData,
              isPremium: true,
              id: userId.toString(),
              weeklyProgress: profileData?.weeklyProgress || [],
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
          id: profileData?.id || '1', // Folosim ID-ul existent sau un ID fictiv
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
      [name]: name === 'date' ? value : value === '' ? '' : Number(value),
    });
  };

  const handleWorkoutSelectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;

    // Găsim numele workout-ului selectat
    const selectedWorkout = workoutsList.find((w) => w.id === value);

    setNewWorkout({
      ...newWorkout,
      workoutId: value,
      workoutName: selectedWorkout?.name || '',
    });
  };

  const handleAddWorkout = async () => {
    // In a real app, you would send this to the server
    // For now, we'll just update the local state

    // Create a new workout entry
    const workoutEntry = {
      date: new Date(newWorkout.date).toISOString(),
      completed: Number(newWorkout.completed),
      total: Number(newWorkout.total),
      workoutName: newWorkout.workoutName,
    };

    if (profileData) {
      const updatedProgress = [
        workoutEntry,
        ...(profileData.weeklyProgress || []),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Recalculate stats
      const updatedStats = calculateStats(updatedProgress);

      setProfileData({
        ...profileData,
        weeklyProgress: updatedProgress,
        stats: updatedStats,
      });

      setSnackbar({
        open: true,
        message: 'Workout progress added successfully!',
        severity: 'success',
      });
    }

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
      <ProfileHeader elevation={2}>
        <ProfileImageContainer>
          <ProfileImage
            src={profilePicture || "/default-avatar.png"}
            alt="User Profile"
          />
          <ProfileImageUploadButton
            variant="contained"
            onClick={handleFileInputClick}
          >
            <AddAPhotoIcon fontSize="small" />
          </ProfileImageUploadButton>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleProfilePictureChange}
          />
        </ProfileImageContainer>
        <ProfileInfo>
          <Typography variant="h4" gutterBottom>
            {profileData?.firstName && profileData?.lastName ? `${profileData.firstName} ${profileData.lastName}` : ''}
            {profileData?.isPremium && (
              <Box component="span" sx={{ ml: 1, verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center' }}>
                <StarIcon sx={{ color: '#FFD700', fontSize: 32, mr: 0.5 }} />
                <Typography variant="subtitle1" sx={{ color: '#FFD700', fontWeight: 'bold', ml: 0.5 }}>
                  Premium Member
                </Typography>
              </Box>
            )}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.email || 'No email provided'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Member since {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'N/A'}
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
        </ProfileInfo>
      </ProfileHeader>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {profileData?.stats && <StatsOverview stats={profileData.stats} />}
        </Grid>
        <Grid item xs={12} md={8}>
          <WorkoutHistory 
            weeklyProgress={profileData?.weeklyProgress} 
            onAddWorkout={handleWorkoutDialogOpen}
          />
          <Box mt={3}>
            <ProgressChart progress={profileData?.weeklyProgress || []} />
          </Box>
        </Grid>
      </Grid>

      {/* Aici a fost eliminată secțiunea de membership, care acum există ca pagină separată */}

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
              required
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
              error={newWorkout.completed > newWorkout.total}
              helperText={
                newWorkout.completed > newWorkout.total
                  ? 'Completed workouts cannot exceed total planned.'
                  : ''
              }
              required
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
              required
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
            sx={{ minWidth: 160 }}
          >
            Add Progress
          </Button>
          {(!newWorkout.workoutId || newWorkout.completed > newWorkout.total) && (
            <Box mt={1}>
              {!newWorkout.workoutId && (
                <Typography variant="caption" color="error">
                  Please select a workout type.
                </Typography>
              )}
              {newWorkout.completed > newWorkout.total && (
                <Typography variant="caption" color="error">
                  Completed workouts cannot exceed total planned.
                </Typography>
              )}
            </Box>
          )}
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
