import React from "react";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { act } from 'react'

//  mock axios response
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { username: "Picard", rank: "Captain" } })),
  },
}));

describe('App component', () => {
  it('renders the component', async () => {
    await act(async () => { render(<App />) });
    expect(screen.getByRole('link', { name: /picker/i })).toBeInTheDocument();
  });

  it("renders picard's stern yet reassuring visage", async () => {
    await act(async () => { render(<App />) });
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/picard.jpg');
  });

  it("renders the recently viewed placeholder section", async () => {
    await act(async () => { render(<App />) });
    const heading = await screen.findByRole('heading', { name: /recently viewed/i });
    expect(heading).toBeInTheDocument();
  });
});
