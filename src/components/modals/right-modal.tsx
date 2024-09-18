import { Slide, Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import React from "react";

interface RightSideModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
  
const RightSideModal : React.FC<RightSideModalProps> = ({ open, onClose, children }) => (
    <>
        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}
        >
            <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 400,
                        height: '100%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                    }}
                >
                    {/* Close button positioned at the top-right corner */}
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'red', // Set button color to red
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {children}
                </Box>
            </Slide>
        </Modal>
    </>
)
export default RightSideModal;