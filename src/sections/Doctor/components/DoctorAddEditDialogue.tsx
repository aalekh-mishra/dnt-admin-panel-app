import { Form } from 'reactstrap';
import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";

// import Toastar from "../../../helpers/toaster";
// import { getDropdownItems } from '../../../store/Admin/MailSettings/actions';
import RightSideModal from 'src/components/modals/right-modal';

// import { IBroker } from "./Index";
// import { addBroker, updateBroker } from "../../../store/Master/Broker/actions";
  
export interface DoctorAddEditDialogueProps { 
    open: boolean; 
    onClose: () => void; 
    isEdit: boolean; 
}

const DoctorAddEditDialogue : React.FC<DoctorAddEditDialogueProps> = ({ open, onClose, isEdit }) => {
    const dispatch = useDispatch();
    console.log("DoctorAddEditDialogue isEdit", isEdit);
    const [isLoading, setIsLoading]  = useState(false);

    const validation:any = useFormik({
        enableReinitialize: true,
        initialValues: {
          email: "",
          password: "",
          countryCode: "+1",
          mobile_number: "",
          firstName: "",
          gender: "",
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email format'),
          countryCode: Yup.string().required('Country Code is required'),
          mobile_number: Yup.string().required('Mobile number is required'),
          firstName: Yup.string().required('First name is required'),
          gender: Yup.string().required('Gender is required'),
        }),
    
        onSubmit: (values) => {
          const userData: any = {
            email: values.email,
            password: values.password,
            countryCode: values.countryCode,
            mobile_number: values.mobile_number,
            role: "doctor",
            firstName: values.firstName,
            gender: values.gender
          };
          
          setIsLoading(true);
        //   dispatch(
        //       registerAdminUser({userData, handleSuccess, key: "createAdminUser", setIsLoading})
        //   );
          }
    });
    return (
        <>
        <RightSideModal open={open} onClose={onClose}>
                <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                    {/*  */}
                    <Typography variant='h4'>{isEdit ? "Edit Doctor" : "Add Doctor"} </Typography>
                </Box>
                <Box sx={{ py: 2, px: 1, flex: 1, overflowY: 'auto' }}>
                    {/* Content goes here */}
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // validation.handleSubmit();
                            return false;
                        }}
                    >
                        <TextField
                            fullWidth
                            name="firstName"
                            label="First Name"
                            placeholder="John"
                            InputLabelProps={{ shrink: true }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.firstName}
                            sx={{ mb: 2 }}
                            size="small"
                            error={!!(validation.touched.firstName && validation.errors.firstName)}
                            helperText={validation.touched.firstName && validation.errors.firstName ? validation.errors.firstName : ""}
                        />
                         {/* Email */}
                        <TextField
                            fullWidth
                            name="email"
                            label="Email address"
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                            size="small"
                            type="email"
                            placeholder="hello@gmail.com"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            error={!!(validation.touched.email && validation?.errors?.email)}          // Assuming you have an error state (true if there's an error)
                            helperText={(validation.touched.email && validation?.errors?.email) ? validation?.errors?.email : ""}  // Display an error message if invalid
                        />

                        {/* Country Code */}
                        <TextField
                            fullWidth
                            name="countryCode"
                            label="Country Code"
                            placeholder="+1"
                            InputLabelProps={{ shrink: true }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.countryCode}
                            sx={{ mb: 2 }}
                            size="small"
                            error={!!(validation.touched.countryCode && validation.errors.countryCode)}
                            helperText={validation.touched.countryCode && validation.errors.countryCode ? validation.errors.countryCode : ""}
                        />

                        {/* Mobile Number */}
                        <TextField
                            fullWidth
                            name="mobile_number"
                            label="Mobile Number"
                            placeholder="123456789"
                            InputLabelProps={{ shrink: true }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.mobile_number}
                            sx={{ mb: 2 }}
                            size="small"
                            error={!!(validation.touched.mobile_number && validation.errors.mobile_number)}
                            helperText={validation.touched.mobile_number && validation.errors.mobile_number ? validation.errors.mobile_number : ""}
                        />

                    {/* Gender */}
                        <FormControl fullWidth size="small" sx={{ mb: 2 }} error={!!(validation.touched.gender && validation.errors.gender)}>
                            <InputLabel shrink>Gender</InputLabel>
                            <Select
                                name="gender"
                                label="Gender"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.gender || 'placeholder'}  // Default value to "Select Gender"
                            >
                                <MenuItem value="placeholder" disabled>
                                Select Gender
                                </MenuItem>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                            {validation.touched.gender && validation.errors.gender && (
                                <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                                {validation.errors.gender}
                                </Typography>
                            )}
                        </FormControl>

                        
                    </Form>
                </Box>
                <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
                    <Button onClick={onClose} variant="contained" size="small">Close</Button>
                    <LoadingButton
                        
                        size="small"
                        type="submit"
                        color="inherit"
                        variant="contained"
                        // onClick={handleSignIn}
                        disabled={isLoading}
                        sx={{ml: 2}}
                        >
                         {isEdit ? "Edit Doctor" : "Add Doctor"}
                    </LoadingButton>
                </Box>
            </RightSideModal>
        </>
    )

}
export default DoctorAddEditDialogue;