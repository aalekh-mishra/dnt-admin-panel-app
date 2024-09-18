import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const CommonDeleteConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm, title, message }) =>{ 
    console.log("Delete open: ", open);
    return(
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
    >
        <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <Typography id="confirm-dialog-description">{message}</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button
                onClick={() => {
                    onConfirm();
                    onClose();
                }}
                color="secondary"
                variant="contained"
            >
                Confirm
            </Button>
        </DialogActions>
    </Dialog>
);
}

export default CommonDeleteConfirmDialog;
