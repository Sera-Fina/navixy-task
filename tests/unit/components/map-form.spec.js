import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import vuetify from '../../../src/plugins/vuetify';
import MapForm from '../../../src/components/map/MapForm.vue';
import store from '../mocks/store';

describe('MapView.vue', () => {
  let wrapper;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  beforeEach(() => {
    const createdStore = new Vuex.Store({ ...store });
    wrapper = mount(MapForm, {
      localVue,
      vuetify,
      store: createdStore,
      mocks: {
        $t: () => {},
      },
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy();
  });

  it('Should be mounted', (done) => {
    localVue.config.errorHandler = done;
    expect(wrapper)
      .toBeTruthy();
    done();
  });

  it('Should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Should change value on onFormChanged method', () => {
    const storeDispatch = jest.spyOn(wrapper.vm.$store, 'dispatch');
    wrapper.vm.onFormChanged('name', 'New name');
    expect(storeDispatch)
      .toBeCalledWith('map/markers/setEditingFormFields',
        { name: 'New name' });
  });

  it('Should compose right value in getCoordinatesString method', () => {
    const coordinates = wrapper.vm.getCoordinatesString({
      lat: '1',
      lng: '1',
    });
    expect(coordinates)
      .toBe('1, 1');
  });

  it('Should not submits invalid a form', async () => {
    const spy = jest.spyOn(wrapper.vm.$store, 'dispatch');
    await wrapper.vm.submit();
    expect(wrapper.vm.$refs.markerForm.validate()).toBeFalsy();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should submits valid a form', async () => {
    const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');
    wrapper.vm.$refs.markerForm.validate = jest.fn().mockResolvedValue(true);
    await wrapper.vm.submit();
    expect(dispatchSpy).toBeCalled();
  });

  it('Should clear store on before destroy', () => {
    const dispatchSpy = jest.spyOn(wrapper.vm.$store, 'dispatch');
    wrapper.vm.$destroy();
    expect(dispatchSpy).toHaveBeenCalledWith('map/markers/setEditingFormFields', {
      name: '',
      coordinates: '',
    });
  });
});
