import {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { errorHandler } from '../utils/errorHandler';

import axios from 'axios';

const SignIn = () => {

    const [formType, setFormType] = useState(false);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { email: 'test@abc.com', password: '1Q#welcome'},
        validationSchema: Yup.object({
            email: Yup.string()
            .required('Email is required.')
            .email('Invalid email address. Please re-enter.'),

            password: Yup.string()
            .required('Password is required')
            .min(7, 'Password must be between 7 to 15 characters')
            .max(15, 'Password must be between 7 to 15 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
                "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),

            confirmPassword: Yup.string()
            .required('Please re-enter password')
            .oneOf([Yup.ref('password')], 'Your passwords do not match.')

        }),
        onSubmit: (values) => {
            submitForm(values);
        }
    })

    const submitForm = (values) => {
        if (formType){
            // register
            axios.post('/api/auth', values)
            .then(response => {
                console.log(response.data);
            })
        } else {
            // sign-in
        }
    }

    const handleFormType = () => {
        setFormType(!formType);
    }

    return(
        <div>
            <h1>{formType ? 'Register' : 'Sign in'}</h1>

            {
                loading ?
                    <h4>...loading</h4>
                    :
                    <form className='mt-3' onSubmit={formik.handleSubmit}>
                        <div className='form-group mb-3'>
                            <TextField 
                                style={{width: '50%'}}
                                name="email"
                                label="Enter Email"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHandler(formik, 'email')}
                            />

                        </div>

                        <div className='form-group mb-3'>
                            <TextField 
                                style={{width: '50%'}}
                                name="password"
                                label="Enter Your Password"
                                type="password"
                                variant="outlined"
                                {...formik.getFieldProps('password')}
                                {...errorHandler(formik, 'password')}
                            />
                        </div>

                        <div className='form-group'>
                            <TextField 
                                style={{width: '50%'}}
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                {...formik.getFieldProps('confirmPassword')}
                                {...errorHandler(formik, 'confirmPassword')}
                            />
                        </div>

                        <div className='mt-3 mb-2'>
                            <Button 
                                variant='contained'
                                color='primary'
                                type='submit'
                                size='small'>
                                {formType ? 'Register' : 'Login'}
                            </Button>
                        </div>

                        <div className='mt-3 mb-2'>
                            <Button                             
                                color='secondary'
                                variant='text'
                                onClick={handleFormType}
                                size='small'
                                >
                                {formType ? 'Need to sign in?' : 'New User - Need to register?'}
                            </Button>
                        </div>                                   
                    </form>
            }
        </div>
    )
}

export default SignIn;