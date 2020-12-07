import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  description: {
    paddingTop: 10
  }
}));

const StoreItem = ({ title, price, onItemClick, images }) => {
  const classes = useStyles();

  return (
    <Box onClick={onItemClick}>
      {/* <Box height={250} width={250} bgcolor="grey.200" /> */}
      {images ? <img height={250} width={250} src={images[0].src} /> : null}
      <Box className={classes.description}>
        <Typography variant="body1" component="p">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ${Math.round(price * 100) / 100}
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
