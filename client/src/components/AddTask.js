import React from 'react';
import { Button, Card, CardHeader, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './FormComponents/Input';

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
    cancelBtn: {
        color: 'gray'
    }
}));

const AddTaskForm = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader className={classes.cardHeader}>Create Task</CardHeader>
            <CardContent>
                <Formik
                    initialValues={{ title: '', description: '', timeLeft: '' }}
                    validationSchema={Yup.object({
                        title: Yup.string()
                            .max(100, 'Must be 100 characters or less')
                            .required('Required'),
                        description: Yup.string()
                            .required('Required'),
                        timeLeft: Yup.string().required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form>
                        <Input
                            label="Title"
                            name="title"
                            type="text"
                            className={classes.input}
                        />
                        <Input
                            label="Description"
                            name="description"
                            type="textarea"
                            className={classes.input}
                            multiline
                            rows={4}
                        />
                        {/* <Input
                        id="timeLeft"
                        label="Time Required"
                        type="datetime-local"
                        defaultValue={new Date()}
                        className={classes.input}
                        InputLabelProps={{
                          shrink: true,
                        }}
                    /> */}
                        <div className={classes.btnGroup}>
                            <Button
                                variant="outlined"
                                type="cancel"
                                className={classes.cancelBtn}
                                onClick={() => {    }}
                            >Cancel</Button>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >Submit</Button>
                        </div>
                    </Form>
                </Formik>
            </CardContent>
        </Card>
    );
}

export default AddTaskForm;