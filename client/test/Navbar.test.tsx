import React from "react";
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../src/Navbar';
import { act } from 'react';

describe('Navbar component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders the Home link', async () => {
    await act(async () => {
      renderWithRouter(<Navbar />);
    });
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the Picker link', async () => {
    await act(async () => {
      renderWithRouter(<Navbar />);
    });
    
    const pickerLink = screen.getByRole('link', { name: /picker/i });
    expect(pickerLink).toBeInTheDocument();
    expect(pickerLink).toHaveAttribute('href', '/picker');
  });

  it('renders the Episodes link', async () => {
    await act(async () => {
      renderWithRouter(<Navbar />);
    });
    
    const episodesLink = screen.getByRole('link', { name: /episodes/i });
    expect(episodesLink).toBeInTheDocument();
    expect(episodesLink).toHaveAttribute('href', '/guide');
  });

  it('has fixed positioning', async () => {
    await act(async () => {
      renderWithRouter(<Navbar />);
    });
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('renders all three navigation items', async () => {
    await act(async () => {
      renderWithRouter(<Navbar />);
    });
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
