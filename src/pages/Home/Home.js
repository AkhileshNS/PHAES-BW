
// External Modules
import React, { Component } from 'react';
import {Box, Form, FormField, Button} from 'grommet';
import {getUser, setUser} from '../../store/store';

// Internal CSS and Components
import './Home.css';

class Home extends Component {
    state = {
        value: {
            name: "",
            description: ""
        }
    }

    onSubmit = ({value}) => {
        if (getUser(value.name)===null) {
            setUser(value.name, value.description);
        } else {
            alert("User already exists");
        }
        this.setState({
            value: {
                name: "",
                description: ""
            } 
        });
    }

    render() {
        return <Box align="center" justify="center">
            <Box 
                width="medium" 
                border={{color: 'brand', size: 'small'}} 
                pad="medium">
                <Form 
                    value={this.state.value}
                    onSubmit={this.onSubmit}>
                    <FormField name="name" label="Name" />
                    <FormField name="description" label="Description" />
                    <Box margin={{top: "medium"}} align="center">
                        <Button type="submit" primary label="Submit" />
                    </Box>
                </Form>
            </Box>
        </Box>;
    }
}

export default Home;
