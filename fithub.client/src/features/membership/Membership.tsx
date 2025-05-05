import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Box, 
  Chip, 
  Paper, 
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface PlanDetails {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

const Membership: React.FC = () => {
  // State pentru dialog-uri
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // State pentru dialogul de premium
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
  
  // State pentru pagina de produse
  const [productsDialogOpen, setProductsDialogOpen] = useState(false);
  
  // Datele pentru planuri
  const plans: PlanDetails[] = [
    {
      name: 'Basic',
      price: '$9.99',
      period: 'per month',
      features: [
        'Access to basic workouts',
        'Community support',
        'Progress tracking'
      ]
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: 'per month',
      features: [
        'Access to all workouts',
        'Personalized plans',
        'Priority support',
        'Exclusive content'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$29.99',
      period: 'per month',
      features: [
        'All Premium benefits',
        '1-on-1 coaching',
        'Advanced analytics',
        'Custom workout builder'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      features: [
        'All Pro benefits',
        'Team accounts',
        'Corporate wellness programs',
        'Dedicated support'
      ]
    }
  ];
  
  // Pașii procesului de checkout
  const steps = ['Selectează planul', 'Detalii plată', 'Confirmare'];
  
  // Handler pentru deschiderea dialog-ului de checkout
  const handlePlanSelect = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setCheckoutOpen(true);
    setActiveStep(0);
    setPaymentComplete(false);
  };
  
  // Handler pentru închiderea dialog-ului de checkout
  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
    // Resetăm starea doar după ce dialog-ul s-a închis complet
    setTimeout(() => {
      setSelectedPlan(null);
      setActiveStep(0);
      setIsProcessing(false);
      setPaymentComplete(false);
    }, 300);
  };
  
  // Handler pentru navigarea între pași
  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      // Simulăm procesarea plății
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentComplete(true);
        setActiveStep(activeStep + 1);
      }, 2000);
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  // Handler pentru deschiderea dialogului de premium
  const handlePremiumDialogOpen = () => {
    setPremiumDialogOpen(true);
  };
  
  // Handler pentru închiderea dialogului de premium
  const handlePremiumDialogClose = () => {
    setPremiumDialogOpen(false);
  };
  
  // Handler pentru deschiderea dialogului de produse
  const handleProductsDialogOpen = () => {
    setProductsDialogOpen(true);
  };
  
  // Handler pentru închiderea dialogului de produse
  const handleProductsDialogClose = () => {
    setProductsDialogOpen(false);
  };
  
  // Listă de produse pentru pagina de oferte
  const fitnessProducts = [
    { id: 1, name: 'Ganteri 10kg (set)', price: '$49.99', discount: '20%', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Bandă elastică de rezistență', price: '$19.99', discount: '15%', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Covorăș yoga premium', price: '$29.99', discount: '25%', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Sticlă de apă izolată termic', price: '$24.99', discount: '10%', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Supliment proteic (1kg)', price: '$39.99', discount: '30%', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Geantă sport', price: '$34.99', discount: '15%', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Membership Plans
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Choose the plan that best fits your fitness goals.
        </Typography>
      </Box>
      
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={3} key={plan.name}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              transition: 'transform 0.3s, box-shadow 0.3s', 
              '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
              position: 'relative',
              ...(plan.popular ? {
                boxShadow: '0 0 0 2px #1976d2, 0 4px 20px rgba(0,0,0,0.1)'
              } : {})
            }}>
              {plan.popular && (
                <Box sx={{ 
                  position: 'absolute', 
                  top: -12, 
                  left: 0, 
                  right: 0, 
                  display: 'flex', 
                  justifyContent: 'center' 
                }}>
                  <Chip 
                    icon={<StarIcon />} 
                    label="POPULAR" 
                    color="primary" 
                    sx={{ 
                      fontWeight: 'bold',
                      backgroundColor: '#f50057',
                      color: 'white',
                      fontSize: '0.85rem',
                      py: 0.5,
                      px: 0.5
                    }} 
                  />
                </Box>
              )}
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                ...(plan.popular ? { pt: 4 } : {})
              }}>
                <Typography variant="h5" component="div" fontWeight="medium" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
                  {plan.price}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {plan.period}
                </Typography>
                <Divider sx={{ width: '80%', my: 2 }} />
                <Box sx={{ width: '100%', my: 2 }}>
                  {plan.features.map((feature, idx) => (
                    <Typography key={idx} variant="body1" sx={{ py: 0.5 }}>
                      - {feature}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', p: 3 }}>
                <Button 
                  variant={plan.popular ? "contained" : "outlined"} 
                  color="primary" 
                  size="large" 
                  fullWidth
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.name === 'Enterprise' ? 'CONTACT US' : 'SELECT PLAN'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Why Choose FitHub Section */}
      <Box sx={{ mt: 10, mb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          De ce să alegi FitHub?
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
          Descoperă beneficiile care ne diferențiază de alte platforme de fitness.
        </Typography>
        
        <Grid container spacing={4}>
          {/* Card 1: Why Work with Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ 
              p: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-8px)' }
            }}>
              <Box sx={{ 
                bgcolor: 'primary.main', 
                color: 'white', 
                borderRadius: '50%', 
                width: 64, 
                height: 64, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 2 
              }}>
                <FitnessCenterIcon fontSize="large" />
              </Box>
              <Typography variant="h6" gutterBottom>
                De ce să lucrezi cu noi?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                Oferim antrenamente personalizate, sfaturi de nutriție și o comunitate de suport pentru a-ți atinge obiectivele de fitness.
              </Typography>
            </Paper>
          </Grid>
          
          {/* Card 2: Why Go Premium */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ 
              p: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-8px)' }
            }}>
              <Box sx={{ 
                bgcolor: 'warning.main', 
                color: 'white', 
                borderRadius: '50%', 
                width: 64, 
                height: 64, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 2 
              }}>
                <StarIcon fontSize="large" />
              </Box>
              <Typography variant="h6" gutterBottom>
                De ce să devii Premium?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                Acces la conținut exclusiv, antrenamente avansate, planuri de masă detaliate și sesiuni live cu antrenori profesioniști.
              </Typography>
              <Button 
                variant="contained" 
                color="warning" 
                sx={{ mt: 2 }}
                onClick={handlePremiumDialogOpen}
              >
                Devino Premium
              </Button>
            </Paper>
          </Grid>
          
          {/* Card 3: Why Stay with Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ 
              p: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-8px)' }
            }}>
              <Box sx={{ 
                bgcolor: 'success.main', 
                color: 'white', 
                borderRadius: '50%', 
                width: 64, 
                height: 64, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 2 
              }}>
                <GroupIcon fontSize="large" />
              </Box>
              <Typography variant="h6" gutterBottom>
                De ce să rămâi cu noi?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                Comunitatea noastră în creștere, actualizările constante și suportul dedicat te vor menține motivat pe termen lung.
              </Typography>
            </Paper>
          </Grid>
          
          {/* Card 4: Discounts on Fitness Products */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ 
              p: 3, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-8px)' }
            }}>
              <Box sx={{ 
                bgcolor: 'error.main', 
                color: 'white', 
                borderRadius: '50%', 
                width: 64, 
                height: 64, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 2 
              }}>
                <LocalOfferIcon fontSize="large" />
              </Box>
              <Typography variant="h6" gutterBottom>
                Reduceri la produse de fitness
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                Beneficiezi de reduceri exclusive la echipamente de fitness, suplimente și îmbrăcăminte sportivă de la partenerii noștri.
              </Typography>
              <Button 
                variant="contained" 
                color="error" 
                sx={{ mt: 2 }}
                onClick={handleProductsDialogOpen}
              >
                Vezi Ofertele
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      {/* Call to Action */}
      <Box sx={{ 
        mt: 8, 
        textAlign: 'center', 
        p: 6, 
        bgcolor: 'primary.light', 
        borderRadius: 2,
        color: 'white'
      }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Pregătit să îți transformi viața?
        </Typography>
        <Typography variant="h6" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 4, opacity: 0.9 }}>
          Alătură-te comunității FitHub astăzi și începe călătoria spre cea mai bună versiune a ta.
        </Typography>
        <Button variant="contained" color="secondary" size="large" sx={{ px: 4, py: 1.5 }}>
          ÎNSCRIE-TE ACUM
        </Button>
      </Box>
      
      {/* Dialog de Checkout */}
      <Dialog open={checkoutOpen} onClose={handleCheckoutClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          {activeStep === steps.length - 1 ? 'Plată finalizată' : `Checkout - ${selectedPlan?.name || ''} Plan`}
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ py: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === 0 && selectedPlan && (
            <Box>
              <DialogContentText paragraph>
                Ai selectat planul <strong>{selectedPlan.name}</strong>. Te rugăm să confirmi selecția pentru a continua.
              </DialogContentText>
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Detalii plan:</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1"><strong>Plan:</strong> {selectedPlan.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1"><strong>Preț:</strong> {selectedPlan.price} {selectedPlan.period}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ mt: 1 }}><strong>Beneficii:</strong></Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {selectedPlan.features.map((feature, index) => (
                        <Typography component="li" key={index} variant="body2" sx={{ py: 0.5 }}>
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}
          
          {activeStep === 1 && (
            <Box sx={{ py: 2 }}>
              <DialogContentText paragraph>
                Te rugăm să introduci detaliile tale de plată:
              </DialogContentText>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Nume"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Prenume"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Număr card"
                    fullWidth
                    variant="outlined"
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Data expirării"
                    fullWidth
                    variant="outlined"
                    placeholder="MM/YY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="CVV"
                    fullWidth
                    variant="outlined"
                    placeholder="123"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          
          {activeStep === 2 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              {isProcessing ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CircularProgress size={60} sx={{ mb: 2 }} />
                  <Typography variant="h6">Procesăm plata ta...</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
                  <Typography variant="h5" gutterBottom>Plată finalizată cu succes!</Typography>
                  <Typography variant="body1" paragraph>
                    Felicitări! Ai achiziționat cu succes planul {selectedPlan?.name}.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Un email de confirmare a fost trimis la adresa ta de email.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleCheckoutClose} variant="contained" color="primary">
              Închide
            </Button>
          ) : (
            <>
              {activeStep > 0 && (
                <Button onClick={handleBack} disabled={isProcessing}>
                  Înapoi
                </Button>
              )}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleNext}
                disabled={isProcessing}
              >
                {activeStep === steps.length - 2 ? 'Finalizează plata' : 'Continuă'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Dialog Premium */}
      <Dialog open={premiumDialogOpen} onClose={handlePremiumDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'warning.main', color: 'white', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Devino Premium Acum!</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            Beneficii Premium
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>Acces la conținut exclusiv</strong> - Antrenamente avansate, planuri de masă detaliate și ghiduri video premium.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>Sesiuni live cu antrenori profesioniști</strong> - 2 sesiuni online personalizate în fiecare lună.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>Suport prioritar</strong> - Răspunsuri rapide la întrebări și asistență personalizată.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Doar $19.99 / lună
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Anulează oricând. Fără obligații pe termen lung.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handlePremiumDialogClose}>
            Mai târziu
          </Button>
          <Button 
            variant="contained" 
            color="warning" 
            startIcon={<StarIcon />}
            onClick={() => {
              handlePremiumDialogClose();
              // Simulăm selectarea planului Premium
              handlePlanSelect(plans[1]);
            }}
          >
            Devino Premium Acum
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog Produse */}
      <Dialog open={productsDialogOpen} onClose={handleProductsDialogClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'error.main', color: 'white', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalOfferIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Oferte Speciale la Produse Fitness</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography variant="subtitle1" paragraph align="center" sx={{ mb: 3 }}>
            Beneficiezi de reduceri exclusive la echipamente de fitness, suplimente și îmbrăcăminte sportivă de la partenerii noștri.
          </Typography>
          
          <Grid container spacing={3}>
            {fitnessProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.03)' }
                }}>
                  <Box sx={{ position: 'relative' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <Chip 
                      label={`-${product.discount}`} 
                      color="error" 
                      sx={{ 
                        position: 'absolute', 
                        top: 10, 
                        right: 10,
                        fontWeight: 'bold'
                      }} 
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="error.main" sx={{ fontWeight: 'bold', mr: 1 }}>
                        {product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                        {Math.round(parseFloat(product.price.replace('$', '')) / (1 - parseInt(product.discount) / 100) * 100) / 100}$
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button variant="outlined" color="error" fullWidth>
                      Adaugă în coș
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleProductsDialogClose}>
            Închide
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<ShoppingCartIcon />}
          >
            Vezi toate produsele
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Membership;