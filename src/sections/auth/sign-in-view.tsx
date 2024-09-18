import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from "formik";
import * as Yup from "yup";


import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { loginAdminUser } from 'src/store/actions';
import { Button, Form } from 'reactstrap';


// ----------------------------------------------------------------------
interface  loginData {
  email: string;
  password: string;
}
export function SignInView() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading]  = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleRedirect = useCallback(() => {
    router.push('/');
  }, [router]);

  const validation:any = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
        email: Yup.string()
          .email('Invalid email format') // Validates email format
          .required('Please Enter Admin User Email'), // Required field
        password: Yup.string().required("Please Enter the Password"),
    }),

    onSubmit: (values) => {
      const userData: loginData = {
        email: values.email,
        password: values.password,
      };
      
      setIsLoading(true);
      dispatch(
          loginAdminUser({userData, handleSuccess, key: "loginAdminUser", setIsLoading})
      );
      }
  });
  const handleSuccess = (data:any, key:any) => {
    switch (key) {
      case "loginAdminUser":
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
        <TextField
          fullWidth
          name="email"
          label="Email address"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          type="email"
          placeholder="hello@gmail.com"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.email || ""}
          error={!!(validation.touched.email && validation?.errors?.email)}          // Assuming you have an error state (true if there's an error)
          helperText={(validation.touched.email && validation?.errors?.email) ? validation?.errors?.email : ""}  // Display an error message if invalid
        />

        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          Forgot password?
        </Link>

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
          sx={{ mb: 3 }}
          error={!!(validation.touched.password && validation?.errors?.password)}          
          helperText={(validation.touched.password && validation?.errors?.password) ? validation?.errors?.password : ""} 
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          // onClick={handleSignIn}
          disabled={isLoading}
        >
          Sign in
        </LoadingButton>
      </Box>
    </Form>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don&apos;t have an account?
          <Link onClick={() => router.push('/sign-up')} variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}

      {/* <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider> */}

      {/* <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box> */}
    </>
  );
}
