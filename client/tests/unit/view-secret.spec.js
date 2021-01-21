import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ViewSecret from '@/views/ViewSecret.vue';

describe('ViewSecret.vue', () => {
  it('renders props.message when mounted', () => {
    const message = 'Looking for Something?';
    const wrapper = shallowMount(ViewSecret, {
      propsData: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
  it('renders props.secretText when mounted', () => {
    const secretText = 'Looking for Something?';
    const wrapper = shallowMount(ViewSecret, {
      propsData: { secretText },
    });
    expect(wrapper.text()).to.include(secretText);
  });
  it('renders props.hash when mounted', () => {
    const hash = 'Looking for Something?';
    const wrapper = shallowMount(ViewSecret, {
      propsData: { hash },
    });
    expect(wrapper.text()).to.include(hash);
  });
});
