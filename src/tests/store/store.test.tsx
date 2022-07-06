import {createTestStore} from '../utils/store';
import {usersSlice} from "../../store/slices/users";
import {IUser} from "../../model";

describe('redux state tests', () => {
    let store: any;

    beforeEach(() => {
        store = createTestStore();
    });

    it('Should initially set currentUser to an empty object', () => {
        const state = store.getState().users;
        expect(state.currentUser).toEqual({});
    })

    it('Should switch currentUser to the provided one', () => {
        store.dispatch(usersSlice.actions.login({username: 'ricky', password: 'ricky'}));
        const state = store.getState().users;
        expect(state.currentUser).toEqual({id: 1, username: 'ricky', password: 'ricky'});
    })

    it('Should clear the currentUser state', () => {
        store.dispatch(usersSlice.actions.logout());
        const state = store.getState().users;
        expect(state.currentUser).toEqual({});
    })

    it('Should create a new user with id = 3', () => {
        const test = "test"
        store.dispatch(usersSlice.actions.createUser({username: test, password: test}));
        const state = store.getState().users;
        expect(state.allUsers.find((u: IUser) => u.username === test).id).toEqual(3);
    })

    it('Should not create a new user with an existing username', () => {
        const test = "test"
        store.dispatch(usersSlice.actions.createUser({username: test, password: test}));
        const state = store.getState().users;
        expect(state.allUsers.filter((u: IUser) => u.username === test).length).toEqual(1);
    })
})