import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {IUser} from "../../model";

let singletonId = 1
const idGenerator = () => ++singletonId

const initialState = {
    currentUser: {} as IUser,
    allUsers: [
        {
            id: 1,
            username: "ricky",
            password: "ricky"
        }
    ] as Array<IUser>
}


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser: (state, {payload}) => {
            if (!state.allUsers.find(user => user.username === payload.username)) {
                const newUser = {
                    id: idGenerator(),
                    ...payload,
                }
                state.allUsers.push(newUser)
            } else {
                throw Error(`The username: ${payload.username} is already in use, please select another`)
            }
        },
        login: (state, {payload}) => {
            const user = state.allUsers.find(u => {
                return u.username === payload.username && u.password === payload.password
            })
            if (user) {
                state.currentUser = user
            } else {
                throw Error(`Incorrect username or password`)
            }
        },
        logout: (state) => {
            state.currentUser = {} as IUser
        }
    }
})

export const {createUser, login, logout} = usersSlice.actions
export const usersSelector = (state: RootState) => state.users.allUsers
export const isAuthSelector = (state: RootState) => !!state.users.currentUser.id
export const currentUserSelector = (state: RootState) => state.users.currentUser
