import Constants from 'expo-constants';

import { observable, action, computed, toJS } from 'mobx';
import axios from 'axios';

export default class ProfileStore {
    httpClient = null;

    @observable data = null;

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    @action.bound async load() {
        const loading = true;
        this.httpClient
            .get(`${Constants.manifest.extra.apiUrl}/api/users/me/`)
            .then(response => {
                this.loading = false;
                this.data = response.data.data;
            })
            .catch(error => {
                this.loading = false;
                this.error = error;
            });
    }

    @action.bound async save() {
        this.loading = true;
        this.httpClient
            .patch(`${Constants.manifest.extra.apiUrl}/api/users/${this.data.id}/`, {
                data: toJS(this.data),
            })
            .then(response => {
                this.loading = false;
                this.data = response.data.data;
            })
            .catch(error => {
                this.loading = false;
                this.error = error;
            });
    }
}
