import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => {
  return {
    container: {},
  };
});

export default function Index() {
  const classes = useStyles();

  return <div className={classes.container}>Landing</div>;
}
