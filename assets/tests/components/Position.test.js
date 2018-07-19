import React from 'react';
import Position from '../../components/Position';
import { shallow } from 'enzyme';

test("should render a blank space", () => {
    let wrapper = shallow(<Position coords={[0,0]} content={1} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render a red piece", () => {
    let wrapper = shallow(<Position coords={[0,0]} content={'r'} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render a black piece", () => {
    let wrapper = shallow(<Position coords={[0,0]} content={'b'} />);
    expect(wrapper).toMatchSnapshot();
});