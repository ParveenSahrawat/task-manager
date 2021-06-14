import React, { useState, useEffect } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: '100%',
    background: '#00695f'
  },
  loginBtn: {
    textDecoration: 'none',
    color: '#fff'
  },
  title: {
    flexGrow: 1,
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const [name, setName] = useState();

  useEffect(() => {
    try {
      const data = localStorage.getItem("user");
      if (data === null) return undefined;
      data = JSON.parse(data);
      console.log(data);
      setName(data.user.name);
    } catch (e) {
      console.warn(e);
    }
  });

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Task Manager
          </Typography>
        <Typography>{name ? `Hi, ${name}` : ''}</Typography>
        <Button>
          <Link to="/login" className={classes.loginBtn}>Login</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;