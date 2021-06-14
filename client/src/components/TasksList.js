import React from 'react';
// import Taskoverview from './TaskOverview';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const TasksList = () => {
    // let arr = [1, 2, 3, 4];
    // const elements = arr.map(item => (<Taskoverview key={item} />));
    const classes = useStyles();

    return (
      <form className={classes.container} noValidate>
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
    // return(
    //     <div>
    //         {elements}
    //     </div>
    // );
}

export default TasksList;