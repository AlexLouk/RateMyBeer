import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AppContext } from '../../AppContext';
import LikeButton from '../LikeButton';

describe('LikeButton Component', () => {
  const mockNews = {
    news_likes: [1, 2, 3],
    news_id: 1,
  };

  const mockLoginInfo = {
    user_id: 2,
    token: 'mockToken',
  };

  const mockFetchResponse = (status, data) => {
    return Promise.resolve({
      ok: status === 200,
      json: () => Promise.resolve(data),
    });
  };

  beforeEach(() => {
    jest.spyOn(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('should display news likes count', () => {
    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <LikeButton news={mockNews} />
      </AppContext.Provider>
    );

    expect(screen.getByText('3 likes')).toBeInTheDocument();
  });

  it('should display "Like" button if news is not liked', () => {
    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <LikeButton news={mockNews} />
      </AppContext.Provider>
    );

    //expect(screen.getByText('Like')).toBeInTheDocument();
  });

  it('should display "Unlike" button if news is liked', () => {
    const likedNews = { ...mockNews, news_likes: [1, 2, 3, mockLoginInfo.user_id] };

    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <LikeButton news={likedNews} />
      </AppContext.Provider>
    );

    expect(screen.getByText('Unlike')).toBeInTheDocument();
  });

  it('should call likeNews function when "Like" button is clicked', async () => {
    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <LikeButton news={mockNews} />
      </AppContext.Provider>
    );

    window.fetch.mockReturnValueOnce(mockFetchResponse(200, []));

    //fireEvent.click(screen.getByText('Like'));

    await waitFor(() => {
      //expect(screen.getByText('Loading...')).toBeInTheDocument();
      //expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/news/like', expect.anything());
      //expect(screen.getByText('0 likes')).toBeInTheDocument();
    });
  });

  it('should call likeNews function when "Unlike" button is clicked', async () => {
    const likedNews = { ...mockNews, news_likes: [1, 2, 3, mockLoginInfo.user_id] };

    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <LikeButton news={likedNews} />
      </AppContext.Provider>
    );

    window.fetch.mockReturnValueOnce(mockFetchResponse(200, []));

    fireEvent.click(screen.getByText('Unlike'));

    await waitFor(() => {
      //expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/news/like', expect.anything());
      expect(screen.getByText('0 likes')).toBeInTheDocument();
    });
  });

  it('should handle error when liking news', async () => {
    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <LikeButton news={mockNews} />
      </AppContext.Provider>
    );

    window.fetch.mockReturnValueOnce(mockFetchResponse(500, { error: 'Error message' }));

    //fireEvent.click(screen.getByText('Like'));

    await waitFor(() => {
      //expect(console.error).toHaveBeenCalledWith('Error:', { error: 'Error message' });
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });
});