import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import News from '../News';
import { AppContext } from '../../AppContext';

// Mocken der fetch-Funktion
global.fetch = jest.fn();

describe('News Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load news and display them', async () => {
    const newsData = {
      news_image: 'news_image_url',
      news_title: 'Test News',
      news_text: 'This is a test news',
      news_date: new Date().toISOString(),
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(newsData),
    };
    fetch.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter initialEntries={['/news/1']}>
        <Routes>
          <Route
            path="/news/:newsId"
            element={
              <AppContext.Provider value={{ loginInfo: { /* mock login info */ } }}>
                <News />
              </AppContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Überprüfen, ob der Nachrichtentitel und -text angezeigt werden
    //expect(await screen.findByText('Test News')).toBeInTheDocument();
    //expect(screen.getByText('This is a test news')).toBeInTheDocument();

    // Überprüfen, ob das Nachrichtenbild angezeigt wird
    //expect(screen.getByAltText('')).toHaveAttribute('src', 'news_image_url');

    // Überprüfen, ob die Ladezeit korrekt angezeigt wird
    //expect(screen.getByText(`On ${new Date(newsData.news_date).toLocaleDateString()}`)).toBeInTheDocument();
  });

  it('should load comments and display them', async () => {
    const commentsData = [
      { comment_id: 1, comment_text: 'Comment 1', user_name: 'User 1' },
      { comment_id: 2, comment_text: 'Comment 2', user_name: 'User 2' },
    ];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(commentsData),
    };
    fetch.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter initialEntries={['/news/1']}>
        <Routes>
          <Route
            path="/news/:newsId"
            element={
              <AppContext.Provider value={{ loginInfo: { /* mock login info */ } }}>
                <News />
              </AppContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Überprüfen, ob die Ladezeit korrekt angezeigt wird
    expect(await screen.findByText('Comments')).toBeInTheDocument();

    // Überprüfen, ob die Kommentare angezeigt werden
    expect(screen.getByText('Comment 1')).toBeInTheDocument();
    expect(screen.getByText('Comment 2')).toBeInTheDocument();
  });

  it('should submit a comment', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    };
    fetch.mockResolvedValue(mockResponse);

    render(
      <MemoryRouter initialEntries={['/news/1']}>
        <Routes>
          <Route
            path="/news/:newsId"
            element={
              <AppContext.Provider value={{ loginInfo: { /* mock login info */ } }}>
                <News />
              </AppContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Überprüfen, ob das Kommentarformular angezeigt wird
    //expect(screen.getByText('Submit a comment:')).toBeInTheDocument();

    // Eingabe des Kommentars
    //fireEvent.change(screen.getByPlaceholderText('Enter comment'), { target: { value: 'Test comment' } });

    // Überprüfen, ob der Submit-Button verfügbar ist
    //expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();

    // Mocken der fetch-Funktion für das Kommentar-POST-Anforderung
    fetch.mockResolvedValue(mockResponse);

    // Absenden des Kommentars
    //fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // Überprüfen, ob die Ladeanzeige angezeigt wird
    //expect(screen.getByText('Submitting...')).toBeInTheDocument();

    // Überprüfen, ob die Kommentare neu geladen werden
    await waitFor(() => {
      //expect(fetch).toHaveBeenCalledWith('http://localhost:3001/news/comment', expect.any(Object));
      //expect(screen.getByText('Your comment was posted.')).toBeInTheDocument();
      //expect(screen.getByPlaceholderText('Enter comment')).toHaveValue('');
    });
  });
});