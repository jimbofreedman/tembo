import { observable, action, toJS } from 'mobx';
import { AxiosInstance } from 'axios';

import config from '../config';

export default class FlightStore {
    @observable flightNumber = "BA15";
    @observable origin = "London Heathrow";
    @observable departDateTime = "2020-09-22 09:30";
    @observable arriveDateTime = "2020-09-22 17:15";
}
