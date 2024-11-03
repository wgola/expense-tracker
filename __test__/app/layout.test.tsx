import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout, { metadata } from '../../src/app/layout';

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const { getByText, unmount } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(getByText('Test Child')).toBeDefined();
    unmount();
  });

  it('sets the correct metadata', () => {
    expect(metadata.title).toBe('Expense Tracker');
    expect(metadata.description).toBe('Track your expenses with ease.');
  });
});
