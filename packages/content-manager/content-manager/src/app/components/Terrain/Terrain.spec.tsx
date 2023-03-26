import { render } from '@testing-library/react';

import Terrain from './Terrain';

describe('Terrain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Terrain />);
    expect(baseElement).toBeTruthy();
  });
});
