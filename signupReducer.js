import * as types from '../actions/actionTypes';
//reducer for signup container component
export default function signupReducer(state = [], action) {
    switch (action.type) {
        case types.REGISTER_USER:

            return [...state,
            Object.assign({}, action.signup)
            ];
        default:
            return state;
    }
}