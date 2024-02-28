import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { setLoading } from 'redux/slices/backdrop'
import APIService from 'service'
import { mutate } from 'swr'
import toast from 'react-hot-toast'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { setAuth } from 'redux/slices/profile'
import { setProfile } from 'redux/slices/profile'
import { useNavigate } from 'react-router-dom'

export default function UpdateProfileForm ({ setOpen, data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCode, setShowCode] = React.useState(false)
  // const {  bio } = data

  console.log('PROFD :: ', data)

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().nullable()
  })

  const formik = useFormik({
    initialValues: {
      firstname: data?.firstName ?? "",
      lastname: data?.lastName ?? "",
      phone: data?.phoneNumber.replaceAll('+234', '0'),
      password: ''
    },
    validationSchema,
    onSubmit: async values => {
      dispatch(setLoading(true))
      try {
        const payload = {
          ...data,
          firstName: values.firstname,
          lastName: values.lastname,
          phoneNumber: values.phone,
          password: values.password
        }

        console.log('PAYLOAD HERE:: ', payload)

        const res = await APIService.update(
          '/admin/profile/update',
          '',
          payload
        )

        console.log('RESP HERE >>> ', `${res}`)
        mutate('/admin/profile')
        setOpen(false)

        toast.success(`${res.data?.message || 'Successfully updated profile'}`)

        // Log me out now
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        dispatch(setLoading(false))
        dispatch(setAuth(false))
        dispatch(setProfile(null))

        //Now route to login
        navigate('/login', {
          replace: true
        })
      } catch (error) {
        dispatch(setLoading(false))
      }
    }
  })

  const { errors, getFieldProps, handleSubmit, touched } = formik

  return (
    <Box
      p={2}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'center'}
    >
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            fullWidth
            {...getFieldProps('firstname')}
            label='First Name'
            placeholder='Enter the firstname'
            required
            size='medium'
            error={Boolean(touched.firstname && errors.firstname)}
            helperText={errors.firstname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            fullWidth
            {...getFieldProps('lastname')}
            label='Last Name'
            placeholder='Enter the lastname'
            required
            size='medium'
            error={Boolean(touched.lastname && errors.lastname)}
            helperText={errors.lastname}
          />
        </Grid>
      </Grid>

      <br />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            fullWidth
            {...getFieldProps('phone')}
            label='Phone Number'
            placeholder='Enter the phone number'
            required
            type='number'
            size='medium'
            error={Boolean(touched.phone && errors.phone)}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            fullWidth
            {...getFieldProps('password')}
            label='New Password'
            placeholder='Enter the new password'
            size='medium'
            type={showCode ? 'text' : 'password'}
            error={Boolean(touched.password && errors.password)}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle code'
                    onClick={() => setShowCode(!showCode)}
                    onMouseDown={() => setShowCode(!showCode)}
                    edge='end'
                  >
                    {showCode ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      <br />
      <br />
      <Button
        variant='contained'
        fullWidth
        sx={{ textTransform: 'capitalize' }}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </Box>
  )
}
