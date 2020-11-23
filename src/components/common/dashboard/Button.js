import React from 'react';
import BaseButton from '@material-ui/core/Button';

const Button = (props) => {
    return (<BaseButton variant="contained" color="secondary" disableElevation {...props}>{props.children}</BaseButton>)
}

export default Button