import { AUTH, TOGGLE, UPDATE, CREATE } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

export const gsignup = (result, navigate) => async (dispatch) => {
    try {
        const { data } = await api.gsignUp(result);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
        console.log(error);
    }
};

export const fetchuser = (user) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(user);

        dispatch({ type: AUTH, data });
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, user);
  
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
  }

export const updateToggle = (toggle) => async (dispatch) => {
    try {
        dispatch({ type: TOGGLE, payload: toggle});
    } catch (error) {
        console.log(error);
    }
}

export const createMessage = (message) => async (dispatch) => {
    try {
        //dispatch({ type: START_LOADING });

        const { data } = await api.createMessage(message);


        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}
  