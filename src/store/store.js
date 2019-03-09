
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