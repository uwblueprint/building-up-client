import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: 500
  },
  title: {
    marginLeft: 100
  }
}));

// Promotional banner component for the storefront page

const Banner = () => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      bgcolor="grey.200"
      height={300}
      alignItems="center"
      justifyContent="left"
    >
      <Typography
        variant="h1"
        color="textSecondary"
        component="p"
        className={classes.title}
      >
        Promo Photo
      </Typography>
    </Box>
  );
};

export default Banner;
