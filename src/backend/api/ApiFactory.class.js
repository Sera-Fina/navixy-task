import MarkersApi from './MarkersApi.class';

export default class ApiFactory {
  #api = null;

  constructor(urlName) {
    this.urls = {
      markers: MarkersApi,
    };
    if (this.urls[urlName]) {
      this.api = new this.urls[urlName]();
    }
  }

  getApi() {
    return this.api;
  }
}
