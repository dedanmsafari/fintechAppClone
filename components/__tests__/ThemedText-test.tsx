import * as React from 'react';
import { Text } from 'react-native';

import renderer from 'react-test-renderer';

describe('Index Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Text>Hello World!</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
