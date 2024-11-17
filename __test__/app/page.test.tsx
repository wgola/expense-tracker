import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';
import { beforeAll, describe, it, expect } from 'vitest';

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

  // it('login button has correct class', () => {
  //   const loginButton = screen.getByText('Login');
  //   expect(loginButton).toHaveClass('btn btn-primary w-full');
  // });

  // it('sign up button has correct class', () => {
  //   const signUpButton = screen.getByText('Sign Up');
  //   expect(signUpButton).toHaveClass('btn btn-secondary w-full');
  // });

  // it('renders the container with correct classes', () => {
  //   const container = screen.getByRole('main');
  //   expect(container).toHaveClass('flex flex-col items-center justify-center min-h-screen p-4');
  // });

  // it('renders the heading with correct class', () => {
  //   const heading = screen.getByText('Expense Tracker');
  //   expect(heading).toHaveClass('text-3xl font-bold mb-2 text-center');
  // });

  // it('renders the description with correct class', () => {
  //   const description = screen.getByText('Track your expenses effortlessly and save more!');
  //   expect(description).toHaveClass('text-center text-gray-600 mb-6');
  // });
});
