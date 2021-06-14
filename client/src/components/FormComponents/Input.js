import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useField } from 'formik';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    error: {
        color: 'red'
    }
}));

const CustomInput = ({ label, ...props }) => {
    const classes = useStyles();
    const [field, meta] = useField(props);

    return (
        <div>
            <TextField
                label={label}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className={classes.error}>{meta.error}</div>
            ) : null}
        </div>
    );
}

export default CustomInput;