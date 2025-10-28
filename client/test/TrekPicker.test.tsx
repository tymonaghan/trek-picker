import React from "react";
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TrekPicker from '../src/TrekPicker';
import { act } from 'react';

describe('TrekPicker component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders the Trek Picker heading', async () => {
    await act(async () => {
      renderWithRouter(<TrekPicker />);
    });
    
    const heading = screen.getByRole('heading', { name: /trek picker/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the placeholder text', async () => {
    await act(async () => {
      renderWithRouter(<TrekPicker />);
    });
    
    expect(screen.getByText('Trek Picker will go here!')).toBeInTheDocument();
  });

  it('does not render navigation buttons (no duplicate links)', async () => {
    await act(async () => {
      renderWithRouter(<TrekPicker />);
    });
    
    // Should NOT have Home button
    expect(screen.queryByRole('button', { name: /home/i })).not.toBeInTheDocument();
    // Should NOT have Series & Episode Guide button
    expect(screen.queryByRole('button', { name: /series.*episode.*guide/i })).not.toBeInTheDocument();
  });

  it('renders content in a card', async () => {
    await act(async () => {
      renderWithRouter(<TrekPicker />);
    });
    
    const card = screen.getByText('Trek Picker will go here!').closest('.chakra-card');
    expect(card).toBeInTheDocument();
  });
});
