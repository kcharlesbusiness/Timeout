import { mount } from '@vue/test-utils';
import Vue from 'vue';
import App from '../src/App';

describe('App Component', () => {
    test('Team Component renders', () => {
        const wrapper = mount(App);
        expect(wrapper.isVueInstance()).toBeTruthy()
    });

    it('check init state of "members" from data', () => {
        const vm = new Vue(App).$mount()
        expect(vm.members).toStrictEqual([])
    })

    it('check init state of "venues" from data', () => {
        const vm = new Vue(App).$mount()
        expect(vm.members).toStrictEqual([])
    })
});