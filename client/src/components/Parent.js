import React from 'react';
import { Container } from '@material-ui/core';

const Parent = (props) => {
    return(
        <Container>
            {props.children}
        </Container>
    );
}

export default Parent;