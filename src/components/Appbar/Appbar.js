
// External Modules
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Box, Button} from 'grommet';

// Internal CSS and Components
import './Appbar.css';

class Appbar extends Component {
    render() {
        return <Box direction="row" justify="center" margin="small">
            <Button 
                margin="small" 
                label="Create New User"
                onClick={() => this.props.history.push("/")}
                primary={this.props.location.pathname==="/"}
            />
            <Button 
                margin="small" 
                label="All Users" 
                onClick={() => this.props.history.push("/users")}
                primary={this.props.location.pathname==="/users"}
            />
            <Button 
                margin="small" 
                label="Calculator" 
                onClick={() => this.props.history.push("/calc")}
                primary={this.props.location.pathname==="/calc"}
            />
        </Box>;
    }
}

export default withRouter(Appbar);
