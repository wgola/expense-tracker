import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Home Page', () => {
  beforeAll(() => {
    render(<Home />);
  });

  it('renders the app logo', () => {
    const logo = screen.getByAltText('App Logo');
    expect(logo).toBeDefined();
  });

  it('renders the main heading', () => {
    const heading = screen.getByText('Expense Tracker');
    expect(heading).toBeDefined();
  });

  it('renders the description', () => {
    const description = screen.getByText('Track your expenses effortlessly and save more!');
    expect(description).toBeDefined();
  });

  it('renders the login button', () => {
    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeDefined();
  });

  it('renders the sign up button', () => {
    const signUpButton = screen.getByText('Sign Up');
    expect(signUpButton).toBeDefined();
  });

  it('renders the divider', () => {
    const divider = screen.getByText('OR');
    expect(divider).toBeDefined();
  });
});
