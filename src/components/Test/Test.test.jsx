import React from 'react';
import Test from './Test';
import { shallow } from 'enzyme';

jest.mock('../../services/Matcher');
jest.mock('../../services/TranslationService');
jest.mock('../../services/RoutingService');

describe('Test', () => {
  test('render', () => {
    const wrapper = shallow(<Test />);
    expect(wrapper).toMatchSnapshot();
  });
});
