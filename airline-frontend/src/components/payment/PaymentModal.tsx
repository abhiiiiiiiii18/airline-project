import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import QrCodeIcon from "@mui/icons-material/QrCode";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  bookingDetails: {
    totalAmount: number;
    passengerName?: string;
    flightNumber?: string;
    seats?: string[];
    from?: string;
    to?: string;
  };
  onPaymentSuccess: (paymentData: any) => void;
}

export default function PaymentModal({
  open,
  onClose,
  bookingDetails,
  onPaymentSuccess
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | null>(null);
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // In production, this would integrate with actual Razorpay
      const paymentData = {
        orderId: `ORD${Date.now()}`,
        paymentId: `PAY${Date.now()}`,
        amount: bookingDetails.totalAmount,
        method: paymentMethod,
        status: "success",
        timestamp: new Date().toISOString()
      };

      setProcessing(false);
      setPaymentComplete(true);

      // Call success callback after 2 seconds
      setTimeout(() => {
        onPaymentSuccess(paymentData);
        handleClose();
      }, 2000);
    }, 2500);
  };

  const handleClose = () => {
    setPaymentMethod(null);
    setProcessing(false);
    setPaymentComplete(false);
    onClose();
  };

  // This function would integrate with actual Razorpay in production
  const loadRazorpay = async () => {
    // For demo purposes, we're using simulated payment
    // In production, you'd use:
    /*
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: bookingDetails.totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "SkyWings Airlines",
      description: `Flight Booking - ${bookingDetails.flightNumber}`,
      image: "/logo.png",
      handler: function (response) {
        onPaymentSuccess(response);
      },
      prefill: {
        name: bookingDetails.passengerName,
        email: "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#1976d2"
      }
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    */
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden"
        }
      }}
    >
      <DialogTitle sx={{ 
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
        color: "white",
        pb: 2
      }}>
        <Typography variant="h5" fontWeight="bold">
          Complete Your Payment
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
          Secure payment gateway powered by Razorpay
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {/* Payment Complete Animation */}
        <AnimatePresence>
          {paymentComplete && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CheckCircleIcon 
                  sx={{ fontSize: 80, color: "success.main", mb: 2 }} 
                />
                <Typography variant="h5" fontWeight="bold" color="success.main">
                  Payment Successful!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Your booking has been confirmed
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {!paymentComplete && (
          <>
            {/* Booking Summary */}
            <Card sx={{ mb: 3, bgcolor: "grey.50" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Booking Summary
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                
                {bookingDetails.flightNumber && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Flight
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {bookingDetails.flightNumber}
                    </Typography>
                  </Box>
                )}

                {bookingDetails.from && bookingDetails.to && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Route
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {bookingDetails.from} → {bookingDetails.to}
                    </Typography>
                  </Box>
                )}

                {bookingDetails.seats && bookingDetails.seats.length > 0 && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Seats
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {bookingDetails.seats.join(", ")}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 1.5 }} />
                
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total Amount
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    ₹{bookingDetails.totalAmount.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            {!paymentMethod && !processing && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Select Payment Method
                </Typography>
                
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      onClick={() => setPaymentMethod("card")}
                      sx={{
                        cursor: "pointer",
                        border: "2px solid",
                        borderColor: "transparent",
                        transition: "all 0.3s",
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: 3
                        }
                      }}
                    >
                      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          bgcolor: "primary.light",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <CreditCardIcon sx={{ color: "primary.main", fontSize: 28 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Credit / Debit Card
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Visa, Mastercard, RuPay, Amex
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      onClick={() => setPaymentMethod("upi")}
                      sx={{
                        cursor: "pointer",
                        border: "2px solid",
                        borderColor: "transparent",
                        transition: "all 0.3s",
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: 3
                        }
                      }}
                    >
                      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          bgcolor: "success.light",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <QrCodeIcon sx={{ color: "success.main", fontSize: 28 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            UPI Payment
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Google Pay, PhonePe, Paytm, BHIM UPI
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Box>

                <Alert severity="info" sx={{ mt: 3 }}>
                  This is a demo payment gateway. No actual payment will be processed.
                </Alert>
              </Box>
            )}

            {/* Processing Animation */}
            {processing && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CircularProgress size={60} sx={{ mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Processing Payment...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please wait while we confirm your payment
                </Typography>
              </Box>
            )}
          </>
        )}
      </DialogContent>

      {!paymentComplete && !processing && paymentMethod && (
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={() => setPaymentMethod(null)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Back
          </Button>
          <Button
            onClick={handlePayment}
            variant="contained"
            sx={{
              flex: 1,
              py: 1.5,
              borderRadius: 2,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)"
            }}
          >
            Pay ₹{bookingDetails.totalAmount.toLocaleString()}
          </Button>
        </DialogActions>
      )}

      {!paymentComplete && !processing && !paymentMethod && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            fullWidth
            sx={{ borderRadius: 2, py: 1.5 }}
          >
            Cancel
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
