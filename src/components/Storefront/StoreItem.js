import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  description: {
    paddingTop: 10
  },
  clickable: {
    '&:hover': {
        cursor: "pointer"
    }
  }
}));

// A single product listing on the storefront page

const StoreItem = ({ title, price, onItemClick, images }) => {
  const classes = useStyles();

  return (
    <Box onClick={onItemClick} className={classes.clickable}>
      {/* <Box height={250} width={250} bgcolor="grey.200" /> */}
      {images ? <img height={250} width={250} src={images[0].src} alt={`${title} product shot`} border={1}/> : null}
      <Box className={classes.description} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="body2" component="p">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ${price}
        </Typography>
      </Box>
    </Box>
  );
};

StoreItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default StoreItem;
