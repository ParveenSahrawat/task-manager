import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { Button, Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Input from './FormComponents/Input';

import constants from '../config/dev';

const useStyles = makeStyles((theme) => ({
    card: {
        // padding: theme.spacing(1.5)
    },
    cardHeader: {
        background: 'red',
        color: '#fff'
    },
    input: {
        width: '100%',
        marginBottom: theme.spacing(1)
    },
    btnGroup: {
        marginTop: theme.spacing(1.5),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnSignup: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
    footer: {
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    signinLink: {

    }
}));

const Login = () => {
    const history = useHistory();
    const classes = useStyles();

    const login = async (data, setSubmitting) => {
        try {
            const res = await axios.post(`${constants.apiUrl}/users/login`, data);
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res.data));
            history.push('/tasks');
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    }

    return (
        <Card className={classes.card}>
            <CardHeader className={classes.cardHeader}>Create Task</CardHeader>
            <CardContent>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required'),
                        password: Yup.string().required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        login(values, setSubmitting)
                    }}
                >
                    <Form>
                        <Input
                            label="Email"
                            name="email"
                            type="text"
                            className={classes.input}
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="text"
                            className={classes.input}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            // disabled={isSubmitting}
                            className={classes.btnSignup}
                        >Login</Button>
                    </Form>
                </Formik>
                <Typography className={classes.footer}>Don't have an account.<Button>
                    <Link className={classes.signinLink} to="/">Signup</Link>
                </Button>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Login;