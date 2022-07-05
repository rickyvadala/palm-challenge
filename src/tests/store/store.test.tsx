import { createTestStore } from '../utils/store';
import {usersSlice} from "../../store/slices/users";

describe('testSlice redux state tests', () => {
    let store: any;

    beforeEach(() => {
        store = createTestStore();
    });

    it('Should initially set test to an empty string', () => {
        const state = store.getState().users;
        expect(state.currentUser).toEqual({});
    })

    it('Should switch test value to the provided one', () => {
        store.dispatch(usersSlice.actions.login({username: 'ricky', password: 'ricky'}));
        const state = store.getState().users;
        expect(state.currentUser).toEqual({id: 1, username: 'ricky', password: 'ricky'});
    })
})