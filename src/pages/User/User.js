
// External Modules
import React, { Component } from 'react';
import {Box, Form, FormField, Button, Heading} from 'grommet';

// Store
import {subscribe, unsubscribe, getUser, setUser} from '../../store/store';

class User extends Component {
    state = {
        value: {
            description: "User Description"
        }
    }

    componentDidMount() {subscribe(this.trigger);}
    componentWillUnmount() {unsubscribe(this.trigger);}

    trigger = () => {
        let userValue = getUser(this.props.match.params.user);
        this.setState({
            value: {
                description: userValue
            }
        });
    }

    onSubmit = ({value}) => {
        setUser(this.props.match.params.user, value.description);
        alert("Updated Description");
    }

    render() {
        return <Box align="center" justify="center">
            <Box
                width="medium" 
                border={{color: 'brand', size: 'small'}} 
                pad="medium">
                <Form value={this.state.value} onSubmit={this.onSubmit}>
                    <Box margin="small" align="center">
                        <Heading>{this.props.match.params.user}</Heading>
                    </Box>
                    <FormField name="description" label="Description" />
                    <Box margin={{top: "medium"}} align="center">
                        <Button type="submit" primary label="Update" />
                    </Box>
                </Form>
            </Box>
        </Box>;
    }
}

export default User;