import React from 'react';
import Game from '../../components/Game';
import { shallow } from 'enzyme';

test('should render Game', () => {
    let wrapper = shallow(<Game />)
    expect(wrapper).toMatchSnapshot();
});
