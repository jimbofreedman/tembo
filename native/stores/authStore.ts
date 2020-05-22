import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

import { observable, action, computed } from 'mobx';
import axios from 'axios';

export default class AuthStore {
    httpClient = null;

    @observable apiToken:string = null;

    @computed get isLoggedIn() {
        return this.apiToken !== null;
    }

    constructor() {
        this.httpClient = axios.create({
            baseURL: `${Constants.manifest.extra.apiUrl}`,
        });

        // if (__DEV__) {
        //   this.httpClient.interceptors.request.use(request => {
        //     console.log('AuthStore HTTP Request:', request);
        //     return request;
        //   });
        // }
    }

    @action.bound async checkLoggedIn() {
        return this.httpClient
            .get(`${Constants.manifest.extra.apiUrl}/api/users/me/`, {
                headers: {
                    authorization: `Token ${this.apiToken}`,
                },
            })
            .then(() => {
                console.log('Logged in');
                return true;
            })
            .catch(() => {
                console.log('Not logged in');
                return false;
            });
    }

    @action.bound
    async loginEmailPassword(email, password) {
        this.httpClient
            .post(`${Constants.manifest.extra.apiUrl}/auth-token/`, { username: email, password: password})
            .then((response) => {
                console.log("Login success");
                this.apiToken = response.data.token;
                SecureStore.setItemAsync('apiToken', this.apiToken);
            })
            .catch((error) => {
                console.log("Login failure", error.response.status, error)
                switch (error.response.status) {
                    case 400:
                        throw new Error('Incorrect e-mail address or password');
                    default:
                        throw new Error('Unknown login error');
                }
            });
    }

    @action.bound async logout() {
        await SecureStore.deleteItemAsync('apiToken');
        this.apiToken = null;
    }
}
