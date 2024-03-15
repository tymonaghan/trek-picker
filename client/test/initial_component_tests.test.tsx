import React from "react";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { act } from 'react-dom/test-utils'

//  mock axios response
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { username: "Picard", rank: "Captain" } })),
  },
}));

describe('App component', () => {
  it('renders the component', async () => {
    await act(async () => { render(<App />) });
    expect(screen.getByRole('heading', { name: /trek picker/i })).toBeInTheDocument();
  });

  it("renders picard's stern yet reassuring visage", async () => {
    await act(async () => { render(<App />) });
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'picard.jpg');
  });

  it("renders a user's rank on the screen", async () => {
    await act(async () => { render(<App />) });
    const rankElement = await screen.findByText(/(commander)|(captain)|(cadet)/i);
    expect(rankElement).toBeInTheDocument();
  });
});
