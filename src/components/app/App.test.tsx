import React from 'react';
import { render } from '@testing-library/react';
import App from './index';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const el = getByText(/TS APP/i);
  expect(el).toBeInTheDocument();
});
