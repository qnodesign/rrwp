import React from 'react';
import Test from './Test';
import { shallow } from 'enzyme';

jest.mock('../../services/Matcher');
jest.mock('../../services/TranslationManager');
jest.mock('../../services/RoutingManager');

describe('Test', () => {
  test('render', () => {
    const wrapper = shallow(<Test />);
    expect(wrapper).toMatchSnapshot();
  });
});
