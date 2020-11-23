const initialState = {
    id: null,
    username: '',
    picture: ''
}

const GET_USER_DATA = 'GET_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA'

export const getUserData = (id, username, picture) => {
    return{
        type: GET_USER_DATA,
        payload: {id, username, picture}
    }
}
export const updateUserData = (username, picture) => {
    return {
        type: UPDATE_USER_DATA,
        payload: {username, picture}
    }
}
export default function(state = initialState, action){
    switch(action.type){
        case GET_USER_DATA:
            return {
                id: action.payload.id,
                username: action.payload.username,
                picture: action.payload.picture
            }
            case UPDATE_USER_DATA:
                return{
                    username: action.payload.username,
                    picture: action.payload.picture
                }
            default:
                return state;
    }
}








// import axios from 'axios';

// const initialState = {
//     user: {},
//     isLoggedIn: false
// }

// const LOGIN_USER = "LOGIN_USER";
// const LOGOUT_USER = "LOGOUT_USER";
// const GET_USER = "GET_USER";

// export function loginUser(user){
//     return {
//         type: LOGIN_USER,
//         payload: user
//     }
// }
// export function logoutUser(){
//     return{
//         type: LOGOUT_USER,
//         payload: initialState
//     }
// }

// export function getUser() {
//     const user = axios.get('/api/user').then(res => res.data)
//     return {
//         type: GET_USER,
//         payload: user
//     }
// }

// export default function(state = initialState, action){
//     switch(action.type){
//         case LOGIN_USER:
//         return {...state, user: action.payload, isLoggedIn: true}
//         case LOGOUT_USER:
//             return {...state, ...action.payload}
//             case GET_USER + "_PENDING":
//                 return state
//             case GET_USER + "_FULFILLED":
//                 return {...state, user: action.payload, isLoggedIn: true}
//             case GET_USER + "_REJECTED":
//             return initialState
//         default:
//             return state
//     }
// }