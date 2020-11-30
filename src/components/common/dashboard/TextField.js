import React from 'react';
import BaseTextField from '@material-ui/core/TextField';

const TextField = (props) => {
    return (<BaseTextField variant="outlined" color="secondary" {...props}>{props.children}</BaseTextField>)
}

export default TextField