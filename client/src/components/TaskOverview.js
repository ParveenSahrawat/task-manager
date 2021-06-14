import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import TruncateMarkup from 'react-truncate-markup';
import { withStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    taskContainer: {
        background: 'lightblue',
        marginBottom: theme.spacing(1)
    },
    taskCard: {
        padding: theme.spacing(1.5),
        // paddingRight: theme.spacing(1.5),
        marginBottom: theme.spacing(1.2)
    },
    taskHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(1)
    },
    rightHeader: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    formControl: {
        width: 16,
        height: 16,
    },
    timeLeft: {
        fontSize: '0.8rem',
        color: '#757575',
        marginLeft: 8,
        marginRight: 8,
    },
    title: {
        fontSize: '1.2rem',
    },
    description: {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        fontSize: '0.9rem',
        lineClamp: 2,
        overflow: 'hidden',
        marginBottom: theme.spacing(1)
    },
    created: {
        fontSize: '0.8rem',
        color: '#757575',
    },
    moreBtn: {
        fontSize: '0.9rem',
    },
    link: {
        color: "blue",
        textDecoration: "underline",
        cursor: "pointer"
    },
    taskFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

const GreenCheckbox = withStyles({
    root: {
        color: grey[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox size={'small'} color="default" {...props} />);

const Task = () => {
    const classes = useStyles();
    const [completed, setCompleted] = useState(false);

    const readMoreEllipsis = (
        <span>
            ...{' '}
            <span onClick={() => { }} style={classes.link}>
                read more
          </span>
        </span>
    );

    return (
        // <Container className={classes.taskContainer}>
        // <Link to={``}>Goto</Link>
        <Card elevation={2} className={classes.taskCard}>
            <div className={classes.taskHeader}>
                <TruncateMarkup lines={1}>
                    <Typography className={classes.title}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}</Typography>
                </TruncateMarkup>
                <div className={classes.rightHeader}>
                    <Typography className={classes.timeLeft}>Time left - 4 minutes</Typography>

                </div>
            </div>
            <TruncateMarkup lines={2} ellipsis={readMoreEllipsis}>
                <Typography className={classes.description}>
                    {`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker including
                        versions of Lorem Ipsum.`}</Typography>
            </TruncateMarkup>
            <div className={classes.taskFooter}>
                <FormControlLabel
                    className={classes.formControl}
                    control={<GreenCheckbox
                        checked={completed}
                        onChange={() => setCompleted(!completed)}
                        name="checkedG"
                    />}
                />
                <Typography className={classes.created}>Created 24 Mar, 2012 | 2:32 PM</Typography>
            </div>
        </Card>
        // {/* // </Container> */ }
    );
}

export default Task;