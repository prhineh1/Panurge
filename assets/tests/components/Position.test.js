import React from 'react';
import Position from '../../components/Position';
import { shallow } from 'enzyme';

test("should render a blank space", () => {
    let wrapper = shallow(<Position coords={[0,0]} content={1} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render a red piece", () => {
    let selected = jest.fn();
    let wrapper = shallow(<Position coord={[0,0]} content={'r'} selected={selected} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render a black piece", () => {
    let selected = jest.fn();
    let wrapper = shallow(<Position coord={[0,0]} content={'b'} selected={selected} />);
    expect(wrapper).toMatchSnapshot();
});

test("should call 'selected' prop", () => {
    let selected = jest.fn();
    let wrapper = shallow(<Position coord={[0,0]} content={'r'} selected={selected} />);
    wrapper.find('img').simulate('click');
    expect(selected).toHaveBeenCalledWith([0,0], 'r');
});