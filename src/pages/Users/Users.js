
// External Modules
import React, { Component } from 'react';
import {Box, Text, Heading} from 'grommet';

// Store
import {subscribe, unsubscribe, getAllUsers} from '../../store/store';

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount() {subscribe(this.trigger);}
    componentWillUnmount() {unsubscribe(this.trigger);}

    trigger = () => {
        let Users = getAllUsers();
        let users = [];
        for (let user in Users) {
            users.push({
                name: user,
                description: Users[user]
            });
        }
        this.setState({users});
    }

    render() {
        return <Box align="center">
            {this.state.users.map(user => {
                return <Box 
                    style={{cursor: "pointer"}}
                    width="500px" 
                    background={{color: "#EBE7F3"}} 
                    key={user.name} 
                    round
                    pad="medium"
                    margin="medium"
                    onClick={() => this.props.history.push("/users/" + user.name)}>
                    <Heading margin={{top: "xsmall", left: "xsmall", right: "xsmall", bottom: "xsmall"}}>{user.name}</Heading>
                    <Text>{user.description}</Text>
                </Box>
            })}
        </Box>;
    }
}

export default Users;
