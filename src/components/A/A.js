
// External Modules
import React, {Component} from 'react';
import {Box, Button, Heading} from 'grommet';

import {subscribe, unsubscribe, getValue, setValue} from '../../store/store'; 

class A extends Component {
    state = {value: 0};

    componentDidMount() {subscribe(this.trigger);}
    componentWillUnmount() {unsubscribe(this.trigger);}

    trigger = () => {
        this.setState({value: getValue()});
    }

    render() {
        return <Box width="small" align="center">
            <Heading>{this.state.value}</Heading>
            <Button margin="small" label="increment" onClick={() => setValue(getValue() + 1)} />
            <Button margin="small" label="decrement" onClick={() => setValue(getValue() - 1)} />
        </Box>;
    }
}

export default A;