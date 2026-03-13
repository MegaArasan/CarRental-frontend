import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const ErrorModal = ({ open, title = 'Something went wrong', message, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, color: '#c62828' }}>{title}</DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ color: '#4b5563' }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#c62828',
            textTransform: 'none',
            borderRadius: '999px',
            '&:hover': { backgroundColor: '#b71c1c' },
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
