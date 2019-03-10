
# phaes-buworks

Central State management in React has always been a tricky thing, most of us rely on solutions like redux or mobx for sharing state across components scattered across multiple corners of the planet. But coming from the world of Android Development, I contemplated the idea of having a simple solution like Android's Application class. 

Please Note. This is not a solution to true central state management or atleast I'm not sure it is. This is nothing more than a little experiment I conducted which yielded positive results. I've used this pattern on multiple web projects and so far it hasn't really failed yet which is surprising since I feel like its a little too simple to be true. But anyway, back to my story:

So again coming from Android's general Application class implementation, I decided to try something just to see if it would work. I created a new web project using create-react-app with the help of grommet for UI and react-router to help test the pattern across multiple pages. 

The site itself is pretty basic, All it does is allow you to create user objects comprising of a name and a description, then view and update them (They aren't stored on the cloud or anything, this is all within the confines of internal state), there is also a calculator page were two seperate components provide functionality to increment and decrement a value. But enough of that:

The first thing I did was a create a store folder and a store.js file inside of it that looks something like this at first:

````javascript
// State
let state = {
    users: {},
    value: 0
};

let triggers = [];

// Subscription Methods
export const subscribe = trigger => {
    triggers.push(trigger);
    trigger();
}

export const unsubscribe = trigger => {
    let pos = -1;
    for (let i in triggers) {
        if (triggers[i]===trigger) {
            pos = i;
            break;
        }
    }
    if (pos!==-1) {
        triggers.splice(pos, 1);
    }
}

// Trigger Methods
let triggerAll = () => {
    for (let trigger of triggers) {
        trigger();
    }
}
````

The state variable is self-explanatory but the triggers and the subscriptions part might need a little explaining. So generally speaking, anyone could just create a central class, put variables in it, initialize the class at the start of the website and import, use and update the variables when necessary, the reason why we use redux or mobx however is so that changes can be observed such that when a change occurs, components update automatically and accordingly. 

To achieve this effect, I am using an array which stores references to functions in components and it triggers these functions whenever there is a change to the state values (this is what the triggerAll function does). The subscribe and the unsubscribe is how a component can push and remove a custom trigger function (We would want to remove a custom trigger function whenever a component unmounts so that there are no stray reference calls):

````javascript
componentDidMount() {
    subscribe(this.onCentralStateChange);
}

componentWillUnmount() {
    unsubscribe(this.onCentralStateChange);
}

onCentralStateChange = () => {
    console.log("Central State has changed");
}
````

Of course, the next thing to do would be to add custom state interaction functions in the store.js file

````javascript

// State
let state = {
    users: {},
    value: 0
};

let triggers = [];

// Subscriptions
export const subscribe = trigger => {
    triggers.push(trigger);
    trigger();
}

export const unsubscribe = trigger => {
    let pos = -1;
    for (let i in triggers) {
        if (triggers[i]===trigger) {
            pos = i;
            break;
        }
    }
    if (pos!==-1) {
        triggers.splice(pos, 1);
    }
}

// Trigger Methods
let triggerAll = () => {
    for (let trigger of triggers) {
        trigger();
    }
}

// State Interaction Methods
export const setUser = (name, description) => {
    state.users[name] = description;
    triggerAll();
}

export const removeUser = name => {
    if (name in state.users) {
        delete state.users[name];
    }
    triggerAll();
}

export const getAllUsers = () => {
    return state.users;
}

export const getUser = name => {
    if (!(name in state.users)) {
        return null;
    }
    return state.users[name];
}

export const getValue = () => {
    return state.value;
}

export const setValue = value => {
    state.value = value;
    triggerAll();
}
````

With those functions we can now manipulate the state (Notice how the triggerAll functions are present only when we are setting the state, this is essentially to inform components that the state has changed, on that note, we would essentially have to put triggerAll() at the end of any function that changes state), then we can simply import these functions into any state that uses them:

````javascript
// External Modules
import React, { Component } from 'react';
import {Box, Text, Heading} from 'grommet';

// Store
import {subscribe, unsubscribe, getAllUsers} from '../../store/store';

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        subscribe(this.trigger); // push the trigger when the component mounts
    }
    componentWillUnmount() {
        unsubscribe(this.trigger); // remove the trigger when the component is about to unmount
    }

    // function that gets triggered whenever state in store.js changes
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
````

Feel free to look at the other pages to see other implementations of the same. With this pattern, we have now established a simple central state management system, needless to say a few improvements could be made, for example the patterns triggers all functions even when only one of the state variables changes. For example: if value in state (store.js) changes, then even components that use only the users object in state are updated, this can be adjusted to ensure only specific components are updated. Aside from that I'm sure experienced js developers might have a few words to say regarding, all the same feel free to leave an explanation by opening an issue. And aside from that, feel free to check out the [demo](https://phaes-buworks.netlify.com) website for a live implementation of this.