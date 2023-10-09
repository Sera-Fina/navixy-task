import Api from './Api.interface';
import { createUUID } from '../../utils';
import SuccessResponse from '../responce/SuccessResponse.class';
import ErrorResponse from '../responce/ErrorResponse.class';

export default class MarkersApi extends Api {
  constructor() {
    super();
  }

  getMarkersFromStorage = () => {
    const markers = localStorage.getItem('markers');
    return markers ? JSON.parse(markers).data : null;
  }

  setMarkersToStorage = (markers) => {
    localStorage.setItem('markers', JSON.stringify({ data: markers }));
  }

  getData() {
    const markers = this.getMarkersFromStorage();
    if (markers) {
      return new SuccessResponse(markers);
    }
    return new ErrorResponse(null);
  }

  updateData() {
    return new ErrorResponse(null, 'Method Not Allowed', 405);
  }

  deleteData(id) {
    const markers = this.getMarkersFromStorage();
    if (markers && markers.length) {
      const filteredMarkers = markers.filter((marker) => marker.id !== id);
      this.setMarkersToStorage(filteredMarkers);
      return new SuccessResponse(null);
    }
    return new ErrorResponse(null);
  }

  postData(payload) {
    const markers = this.getMarkersFromStorage() || [];
    const newMarker = {
      ...payload,
      id: createUUID(),
    };
    markers.unshift(newMarker);
    this.setMarkersToStorage(markers);
    return new SuccessResponse(newMarker);
  }
}
