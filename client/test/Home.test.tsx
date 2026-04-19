import React from "react";
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import { act } from 'react';

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { username: "Picard", rank: "Captain" } })),
  },
}));

describe('Home component via App', () => {
  it('renders the captain image with sizing constraints', async () => {
    await act(async () => {
      render(<App />);
    });
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/picard.jpg');
    
    // Check that sizing attributes are present
    expect(image).toHaveStyle({ maxWidth: '400px' });
    expect(image).toHaveStyle({ maxHeight: '400px' });
  });

  it('switches captain image when Kirk button is clicked', async () => {
    const user = userEvent.setup();
    
    await act(async () => {
      render(<App />);
    });
    
    const kirkButton = screen.getByRole('button', { name: /kirk/i });
    await user.click(kirkButton);
    
    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/kirk.jpg');
    });
  });

  it('switches captain image back to Picard', async () => {
    const user = userEvent.setup();
    
    await act(async () => {
      render(<App />);
    });
    
    // Click Kirk first
    const kirkButton = screen.getByRole('button', { name: /kirk/i });
    await user.click(kirkButton);
    
    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/kirk.jpg');
    });
    
    // Then click Picard
    const picardButton = screen.getByRole('button', { name: /picard/i });
    await user.click(picardButton);
    
    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/picard.jpg');
    });
  });

  it('image has alt text for accessibility', async () => {
    await act(async () => {
      render(<App />);
    });
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt');
    expect(image.getAttribute('alt')).toContain('picard');
  });

  it('both captain images maintain consistent size', async () => {
    const user = userEvent.setup();
    
    await act(async () => {
      render(<App />);
    });
    
    // Check Picard first
    let image = screen.getByRole('img');
    expect(image).toHaveStyle({ maxWidth: '400px' });
    expect(image).toHaveStyle({ maxHeight: '400px' });
    
    // Switch to Kirk
    const kirkButton = screen.getByRole('button', { name: /kirk/i });
    await user.click(kirkButton);
    
    await waitFor(() => {
      image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/kirk.jpg');
    });
    
    // Kirk should have same sizing constraints
    expect(image).toHaveStyle({ maxWidth: '400px' });
    expect(image).toHaveStyle({ maxHeight: '400px' });
  });
});
