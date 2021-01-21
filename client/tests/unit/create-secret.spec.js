import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import CreateSecret from '@/views/CreateSecret.vue';

describe('CreateSecret.vue', () => {
  it('renders props.message when mounted', () => {
    const message = 'Got A Secret On Mind?';
    const wrapper = shallowMount(CreateSecret, {
      propsData: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
  it('renders props.expireAfterViews as 0', () => {
    const expireAfterViews = 0;
    const wrapper = shallowMount(CreateSecret, {
      propsData: { expireAfterViews },
    });
    expect(wrapper.text()).to.include(expireAfterViews);
  });
  it('renders props.expireAfter as 0', () => {
    const expireAfter = 0;
    const wrapper = shallowMount(CreateSecret, {
      propsData: { expireAfter },
    });
    expect(wrapper.text()).to.include(expireAfter);
  });
  it('renders props.secret as ""', () => {
    const secret = '';
    const wrapper = shallowMount(CreateSecret, {
      propsData: { secret },
    });
    expect(wrapper.text()).to.include(secret);
  });
});
