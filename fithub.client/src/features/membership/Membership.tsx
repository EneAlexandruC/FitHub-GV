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
  // State for dialogs
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  
  // State for premium dialog
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
  
  // State for products page
  const [productsDialogOpen, setProductsDialogOpen] = useState(false);
  
  // Data for plans
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
  
  // Checkout process steps
  const steps = ['Select plan', 'Payment details', 'Confirmation'];
  
  // Handler for opening the checkout dialog
  const handlePlanSelect = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setCheckoutOpen(true);
    setActiveStep(0);
    setPaymentComplete(false);
  };
  
  // Handler for closing the checkout dialog
  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
    // Reset state only after the dialog has fully closed
    setTimeout(() => {
      setSelectedPlan(null);
      setActiveStep(0);
      setIsProcessing(false);
      setPaymentComplete(false);
    }, 300);
  };
  
  // Handler for navigating between steps
  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      // Simulate payment processing
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
  
  // Handler for opening the premium dialog
  const handlePremiumDialogOpen = () => {
    setPremiumDialogOpen(true);
  };
  
  // Handler for closing the premium dialog
  const handlePremiumDialogClose = () => {
    setPremiumDialogOpen(false);
  };
  
  // Handler for opening the products dialog
  const handleProductsDialogOpen = () => {
    setProductsDialogOpen(true);
  };
  
  // Handler for closing the products dialog
  const handleProductsDialogClose = () => {
    setProductsDialogOpen(false);
  };
  
  // List of products for the offers page
  const fitnessProducts = [
    { id: 1, name: '10kg Dumbbells (set)', price: '$49.99', discount: '20%', image: 'data:image/webp;base64,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' },
    { id: 2, name: 'Resistance Band', price: '$19.99', discount: '15%', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQr136LcVU2YJDn2twLO8SioYkbwHjkcfYTjxShGvQN0eoeGfMTgzpWZDg9kb2JHNRhcxuDdwEut2s18dLmZsM7RhzQtlw_k0jfBg4spC2R5Ra5tpFfhMByD2zzyzZq&usqp=CAc' },
    { id: 3, name: 'Premium Yoga Mat', price: '$29.99', discount: '25%', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQJyYXjGCKCD3Qq6OBDgfi6gKwWSKlPVeCZYEcPcp2OZsl1oY5OR5_GREkIEbz_8taDPneRtEWq0SghMsnk0GyJV7pHuXgtttTw1iqlJE5e0GsybgrIeEsxZ8OzOoa8Doca_x3QwWUA&usqp=CAc' },
    { id: 4, name: 'Insulated Water Bottle', price: '$24.99', discount: '10%', image: 'data:image/webp;base64,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' },
    { id: 5, name: 'Protein Supplement (1kg)', price: '$39.99', discount: '30%', image: 'data:image/webp;base64,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' },
    { id: 6, name: 'Sports Bag', price: '$34.99', discount: '15%', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQiu3V6K1hXH2UPfY5rTw-Gpd5_5v0GlJi1I_aIFMX0bh6a1UJESFu2fWTtjilSHrxwvZfxks26fTXWwFgQKcsL4Oa7Y6n-FMEylY_zyMVllI69FEbcmWTzZj4cqUB5HseVj95tf6-1j00&usqp=CAc' },
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
              {/* Card Content Here */}
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
          Why choose FitHub?
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
          Discover the benefits that set us apart from other fitness platforms.
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
                Why work with us?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                We offer personalized workouts, nutrition advice, and a supportive community to help you reach your fitness goals.
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
                Why go Premium?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                Access exclusive content, advanced workouts, detailed meal plans, and live sessions with professional trainers.
              </Typography>
              <Button 
                variant="contained" 
                color="warning" 
                sx={{ mt: 2 }}
                onClick={handlePremiumDialogOpen}
              >
                Become Premium
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
                Why stay with us?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                Our growing community, constant updates, and dedicated support will keep you motivated for the long term.
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
                Discounts on fitness products
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                Enjoy exclusive discounts on fitness equipment, supplements, and sportswear from our partners.
              </Typography>
              <Button 
                variant="contained" 
                color="error" 
                sx={{ mt: 2 }}
                onClick={handleProductsDialogOpen}
              >
                See Offers
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
          Ready to transform your life?
        </Typography>
        <Typography variant="h6" paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 4, opacity: 0.9 }}>
          Join the FitHub community today and start your journey to your best self.
        </Typography>
        <Button variant="contained" color="secondary" size="large" sx={{ px: 4, py: 1.5 }}>
          SIGN UP NOW
        </Button>
      </Box>
      
      {/* Dialog de Checkout */}
      <Dialog open={checkoutOpen} onClose={handleCheckoutClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          {activeStep === steps.length - 1 ? 'Payment complete' : `Checkout - ${selectedPlan?.name || ''} Plan`}
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
                You have selected the <strong>{selectedPlan.name}</strong> plan. Please confirm your selection to continue.
              </DialogContentText>
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Plan details:</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1"><strong>Plan:</strong> {selectedPlan.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1"><strong>Price:</strong> {selectedPlan.price} {selectedPlan.period}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ mt: 1 }}><strong>Benefits:</strong></Typography>
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
                Please enter your payment details:
              </DialogContentText>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="First Name"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Card Number"
                    fullWidth
                    variant="outlined"
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Expiration Date"
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
                  <Typography variant="h6">Processing your payment...</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
                  <Typography variant="h5" gutterBottom>Payment complete cu succes!</Typography>
                  <Typography variant="body1" paragraph>
                    Congratulations! You have successfully purchased the {selectedPlan?.name} plan.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    A confirmation email has been sent to your email address.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleCheckoutClose} variant="contained" color="primary">
              Close
            </Button>
          ) : (
            <>
              {activeStep > 0 && (
                <Button onClick={handleBack} disabled={isProcessing}>
                  Back
                </Button>
              )}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleNext}
                disabled={isProcessing}
              >
                {activeStep === steps.length - 2 ? 'Complete payment' : 'Continue'}
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
            <Typography variant="h6">Become Premium Now!</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            Premium Benefits
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>Acces la conținut exclusiv</strong> - Advanced workouts, detailed meal plans, and premium video guides.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>Live sessions with professional trainers</strong> - 2 personalized online sessions every month.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>Priority support</strong> - Fast answers to your questions and personalized assistance.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Only $19.99 / month
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cancel anytime. No long-term commitments.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handlePremiumDialogClose}>
            Later
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
            Become Premium Now
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog Produse */}
      <Dialog open={productsDialogOpen} onClose={handleProductsDialogClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'error.main', color: 'white', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalOfferIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Special Offers on Fitness Products</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography variant="subtitle1" paragraph align="center" sx={{ mb: 3 }}>
            Enjoy exclusive discounts on fitness equipment, supplements, and sportswear from our partners.
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
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleProductsDialogClose}>
            Close
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<ShoppingCartIcon />}
          >
            View all products
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Membership;