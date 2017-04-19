
import * as types from './actionTypes';
import * as api from '../../tools/apiConfig';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
//action for new user registration
export function registerUser(signup) {
    return function (dispatch, getState) {
        var companyData = { 'email': signup.email, 'companyName': signup.company, 'firstname': signup.firstname, 'lastname': signup.lastname };
        $.ajax({
            type: 'POST',
            url: api.ADD_COMPANY,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(companyData)
        }).success(function (response) {
            if (response.code == 200) {
                var userEmail = { 'email': signup.email };
                $.ajax({
                    type: 'POST',
                    url: api.GetWebToken,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(userEmail)
                }).success(function (response) {
                    if (response.code == 200) {
                        //dispatches type and data to signup reducer 
                        return dispatch({ type: types.REGISTER_USER, signup: response.data })
                    }
                    else {
                        toastr.error(response.message);
                    }
                    //dipatches type and data to reducers                 
                    return dispatch({ type: types.SIGNIN_USER, signin: response.data })
                }).error(function (response) {
                });
            }
            else {
                toastr.error(response.message);
            }
            //dipatches type and data to reducers                 
            return dispatch({ type: types.SIGNIN_USER, signin: response.data })
        }).error(function (response) {
        });
        return result;
    }
}