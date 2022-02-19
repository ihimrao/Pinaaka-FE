import React from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ButtonWrapper = withStyles(() => ({
    root: {
        padding: '10px',
    },
}))(MaterialButton);

const Button = (props) => {
    const { children, ...otherProps } = props;

    return (
        <ButtonWrapper {...otherProps}>
            {children}
        </ButtonWrapper>
    );
};

export default Button;
