import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from "formik";
import * as Yup from "yup";


import { useRouter } from 'src/routes/hooks';
import { registerAdminUser } from 'src/store/auth/register/actions';

import { Iconify } from 'src/components/iconify';

import { Button, Form } from 'reactstrap';
import { FormControl, InputLabel } from '@mui/material';



// ----------------------------------------------------------------------
interface SignUpData {
  email: string;
  password: string;
  countryCode: string;
  mobile_number: string;
  role: string;
  firstName: string;
  gender: string;
}

export function SignUpView() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading]  = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleRedirect = useCallback(() => {
    router.push('/sign-in');
  }, [router]);

  const validation:any = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
      countryCode: "",
      mobile_number: "",
      role: "",
      firstName: "",
      gender: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Please Enter Admin User Email'),
      password: Yup.string().required("Please Enter the Password"),
      countryCode: Yup.string().required('Country Code is required'),
      mobile_number: Yup.string().required('Mobile number is required'),
      role: Yup.string().required('Role is required'),
      firstName: Yup.string().required('First name is required'),
      gender: Yup.string().required('Gender is required'),
    }),

    onSubmit: (values) => {
      const userData: SignUpData = {
        email: values.email,
        password: values.password,
        countryCode: values.countryCode,
        mobile_number: values.mobile_number,
        role: values.role,
        firstName: values.firstName,
        gender: values.gender
      };
      
      setIsLoading(true);
      dispatch(
          registerAdminUser({userData, handleSuccess, key: "createAdminUser", setIsLoading})
      );
      }
  });
  const handleSuccess = (data:any, key:any) => {
    switch (key) {
      case "createAdminUser":
        handleRedirect();
        break;
      default:
        break;
    }
  };

  const renderForm = (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        {/* First Name */}
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

        <TextField
          fullWidth
          name="password"
          label="Password"
          placeholder="password"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.password || ""}
          InputLabelProps={{ shrink: true }}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
          size="small"
          error={!!(validation.touched.password && validation?.errors?.password)}          
          helperText={(validation.touched.password && validation?.errors?.password) ? validation?.errors?.password : ""} 
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

        {/* Role */}
        <FormControl fullWidth size="small" sx={{ mb: 2 }} error={!!(validation.touched.gender && validation.errors.gender)}>
          <InputLabel shrink>Role</InputLabel>
          <Select
            name="role"
            label="Role"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.role || 'placeholder'}  // Default value to "Select Gender"
          >
            <MenuItem value="placeholder" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="doctor">Doctor</MenuItem>
            <MenuItem value="patient">patient</MenuItem>
          </Select>
          {validation.touched.role && validation.errors.role && (
            <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
              {validation.errors.role}
            </Typography>
          )}
        </FormControl>

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

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          // onClick={handleSignIn}
          disabled={isLoading}
        >
          Sign Up
        </LoadingButton>
      </Box>
    </Form>
  );

  return (
    <>
      <Box gap={1} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5">Sign Up</Typography>
        <Typography variant="body2" color="text.secondary">
          Already have an account?
          <Link onClick={() => router.push('/sign-in')} variant="subtitle2" sx={{ ml: 0.5 }}>
            Login
          </Link>
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}
