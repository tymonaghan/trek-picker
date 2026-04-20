import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EpisodeGuide from '../src/EpisodeGuide';
import { act } from 'react';

const mockSeriesList = [
  {
    id: 1,
    name: "Star Trek: Strange New Worlds",
    abbreviation: "SNW",
    description: "Follows Captain Pike and the crew of the USS Enterprise",
    releaseYear: 2022,
    seasons: [
      { id: 1, seasonNumber: 1 },
      { id: 2, seasonNumber: 2 }
    ]
  },
  {
    id: 2,
    name: "Star Trek: The Original Series",
    abbreviation: "TOS",
    description: "The original Star Trek series",
    releaseYear: 1966,
    seasons: [
      { id: 3, seasonNumber: 1 },
      { id: 4, seasonNumber: 2 },
      { id: 5, seasonNumber: 3 }
    ]
  }
];

const mockSeriesDetail = {
  id: 1,
  name: "Star Trek: Strange New Worlds",
  abbreviation: "SNW",
  description: "Follows Captain Pike and the crew of the USS Enterprise",
  releaseYear: 2022,
  seasons: [
    {
      id: 1,
      seasonNumber: 1,
      episodes: [
        {
          id: 1,
          title: "Strange New Worlds",
          episodeNumber: 1,
          airDate: "2022-05-05",
          description: "Captain Pike takes command of the USS Enterprise"
        },
        {
          id: 2,
          title: "Children of the Comet",
          episodeNumber: 2,
          airDate: "2022-05-12",
          description: "The Enterprise encounters a mysterious comet"
        }
      ]
    },
    {
      id: 2,
      seasonNumber: 2,
      episodes: [
        {
          id: 3,
          title: "The Broken Circle",
          episodeNumber: 1,
          airDate: "2023-06-15",
          description: "Season 2 premiere"
        }
      ]
    }
  ]
};

describe('EpisodeGuide', () => {
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};
    global.localStorage = {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        localStorageMock = {};
      }),
      length: 0,
      key: vi.fn()
    } as Storage;

    // Mock fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Series selection view', () => {
    it('renders series list when no series is selected', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSeriesList
      });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('Star Trek Episode Guide')).toBeInTheDocument();
      });

      expect(screen.getByText('Select a series to browse episodes')).toBeInTheDocument();
      expect(screen.getByText('Star Trek: Strange New Worlds')).toBeInTheDocument();
      expect(screen.getByText('Star Trek: The Original Series')).toBeInTheDocument();
    });

    it('displays series information correctly', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSeriesList
      });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('SNW')).toBeInTheDocument();
      });

      expect(screen.getByText('TOS')).toBeInTheDocument();
      expect(screen.getByText('2022')).toBeInTheDocument();
      expect(screen.getByText('1966')).toBeInTheDocument();
      expect(screen.getByText('2 seasons')).toBeInTheDocument();
      expect(screen.getByText('3 seasons')).toBeInTheDocument();
    });

    it('allows selecting a series', async () => {
      const user = userEvent.setup();
      
      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockSeriesList
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockSeriesDetail
        });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('Star Trek: Strange New Worlds')).toBeInTheDocument();
      });

      const card = screen.getByText('Star Trek: Strange New Worlds').closest('.chakra-card');
      await user.click(card!);

      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('selectedSeriesId', '1');
      });

      await waitFor(() => {
        expect(screen.getByText('Change Series')).toBeInTheDocument();
      });
    });
  });

  describe('Episode tree view', () => {
    it('renders episode tree when series is selected', async () => {
      localStorageMock['selectedSeriesId'] = '1';

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSeriesDetail
      });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('Star Trek: Strange New Worlds')).toBeInTheDocument();
      });

      expect(screen.getByText('Change Series')).toBeInTheDocument();
      expect(screen.getByText('Season 1')).toBeInTheDocument();
      expect(screen.getByText('Season 2')).toBeInTheDocument();
      expect(screen.getByText('2 episodes')).toBeInTheDocument();
      expect(screen.getByText('1 episodes')).toBeInTheDocument();
    });

    it('displays series badges in header', async () => {
      localStorageMock['selectedSeriesId'] = '1';

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSeriesDetail
      });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('SNW')).toBeInTheDocument();
      });

      expect(screen.getByText('2022')).toBeInTheDocument();
    });

    it('expands and collapses seasons', async () => {
      const user = userEvent.setup();
      localStorageMock['selectedSeriesId'] = '1';

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSeriesDetail
      });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('Season 1')).toBeInTheDocument();
        expect(screen.getByText('Season 2')).toBeInTheDocument();
      });

      // Click to expand season 1
      const season1 = screen.getByText('Season 1');
      await user.click(season1);

      // After expanding, episodes should be visible
      await waitFor(() => {
        expect(screen.getByText('Children of the Comet')).toBeInTheDocument();
        expect(screen.getByText(/^Strange New Worlds$/)).toBeInTheDocument();
      });

      // Expand season 2 as well
      const season2 = screen.getByText('Season 2');
      await user.click(season2);

      await waitFor(() => {
        expect(screen.getByText('The Broken Circle')).toBeInTheDocument();
      });

      // Both seasons should now show their episodes
      expect(screen.getByText('Children of the Comet')).toBeInTheDocument();
      expect(screen.getByText('The Broken Circle')).toBeInTheDocument();
    });

    it('displays episode details correctly', async () => {
      const user = userEvent.setup();
      localStorageMock['selectedSeriesId'] = '1';

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSeriesDetail
      });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('Season 1')).toBeInTheDocument();
      });

      const season1 = screen.getByText('Season 1');
      await user.click(season1);

      await waitFor(() => {
        expect(screen.getByText(/^Strange New Worlds$/)).toBeInTheDocument();
      });

      // Check for episode badges and titles
      expect(screen.getAllByText(/Episode \d+/).length).toBeGreaterThan(0);
      expect(screen.getByText('Children of the Comet')).toBeInTheDocument();
      expect(screen.getByText('Captain Pike takes command of the USS Enterprise')).toBeInTheDocument();
      expect(screen.getByText('5/5/2022')).toBeInTheDocument();
    });

    it('allows changing series selection', async () => {
      const user = userEvent.setup();
      localStorageMock['selectedSeriesId'] = '1';

      (global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockSeriesDetail
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockSeriesList
        });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('Change Series')).toBeInTheDocument();
      });

      const changeButton = screen.getByText('Change Series');
      await user.click(changeButton);

      await waitFor(() => {
        expect(localStorage.removeItem).toHaveBeenCalledWith('selectedSeriesId');
      });

      await waitFor(() => {
        expect(screen.getByText('Select a series to browse episodes')).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Loading and error states', () => {
    it('shows loading spinner while fetching', async () => {
      (global.fetch as any).mockImplementation(() => new Promise(() => {}));

      await act(async () => {
        render(<EpisodeGuide />);
      });

      expect(screen.getByText('Loading Star Trek series...')).toBeInTheDocument();
    });

    it('shows error message when fetch fails', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('Error loading series')).toBeInTheDocument();
      });

      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    it('shows info message when no series are available', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(screen.getByText('No series found')).toBeInTheDocument();
      });
    });
  });

  describe('localStorage persistence', () => {
    it('loads selected series from localStorage on mount', async () => {
      localStorageMock['selectedSeriesId'] = '1';

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockSeriesDetail
      });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/series/1');
      });
    });

    it('clears localStorage and shows series list if selected series fetch fails', async () => {
      localStorageMock['selectedSeriesId'] = '1';

      (global.fetch as any)
        .mockRejectedValueOnce(new Error('Not found'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockSeriesList
        });

      await act(async () => {
        render(<EpisodeGuide />);
      });

      await waitFor(() => {
        expect(localStorage.removeItem).toHaveBeenCalledWith('selectedSeriesId');
      });

      await waitFor(() => {
        expect(screen.getByText('Select a series to browse episodes')).toBeInTheDocument();
      });
    });
  });
});
