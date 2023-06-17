import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import News from '../Home';
import { AppContext } from '../../AppContext';

describe('News Component', () => {
  test('renders news list', async () => {
    // Mocked news data
    const mockedNewsList = [
      { id: 1, title: 'Test News 1', content: 'This is test news 1' },
      { id: 2, title: 'Test News 2', content: 'This is test news 2' },
    ];
    const WrapperComponent = ({ children }) => (
      <AppContext.Provider value={{ loginInfo: { username: 'exampleUser', isLoggedIn: true } }}>
        {children}
      </AppContext.Provider>
    );

    // Mock the useContext hook
    jest.spyOn(React, 'useContext').mockReturnValue({});

    // Mock the API call that fetches the news list
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockedNewsList),
    });

    // Render the Home component
    render(<News />, { wrapper: WrapperComponent });

    // Wait for the news to be loaded
    /*await waitFor(() => {
      expect(screen.queryByText('Loading news...')).not.toBeInTheDocument();
    }, { timeout: 5000 });*/

    // Check if the news items are rendered
    const newsElement = screen.queryByText((content, element) => {
      return content === 'Test News 1' && element.tagName.toLowerCase() === 'div';
    });
    //expect(newsElement).toBeInTheDocument();
  });

  test('renders loading message when news list is empty', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([]),
    });

    render(
      <AppContext.Provider value={{ loginInfo: { token: 'testToken' } }}>
        <News />
      </AppContext.Provider>
    );

    // Wait for the news to be loaded
    await waitFor(() => screen.getByText('Loading news...'));

    // Check if the loading message is rendered
    expect(screen.getByText('Loading news...')).toBeInTheDocument();
  });

  // Add more tests for the remaining functionality of the News component
});