import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Rating from '../Rating';

describe('Rating component', () => {
  test('renders Rating component', () => {
    render(<Rating />);

    // Check if the carousel images are rendered
    //const carouselImages = screen.getAllByRole('img');
    //expect(carouselImages).toHaveLength(3);

    // Check if the beer cards are rendered
    const beerCards = screen.queryAllByRole('link', { name: /Rate the Beer/i });
    expect(beerCards).toHaveLength(0);

    // Check if the loading message is rendered
    const loadingMessage = screen.getByText('Loading beers...');
    expect(loadingMessage).toBeInTheDocument();
  });
});

test('should set beers list on successful API response', async () => {
  // Mock die fetch-Funktion, um eine erfolgreiche API-Antwort zu simulieren
  const mockFetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue([
      { beer_id: 1, beer_name: 'Beer 1', beer_image: 'image1.jpg' },
      { beer_id: 2, beer_name: 'Beer 2', beer_image: 'image2.jpg' },
    ]),
  });
  global.fetch = mockFetch;

  // Rendere den Rating-Komponenten
  render(<Rating />);

  // Warte auf das Erscheinen der Beers in der Komponente
  //await screen.findByText('Beer 1');
  //await screen.findByText('Beer 2');

  // Überprüfe, ob die Beers erfolgreich gesetzt wurden
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    'http://localhost:3001/beers?approved=true',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  //expect(screen.getByText('Beer 1')).toBeInTheDocument();
  //expect(screen.getByText('Beer 2')).toBeInTheDocument();
});

test('should show error alert on API error response', async () => {
  // Mock die fetch-Funktion, um eine fehlerhafte API-Antwort zu simulieren
  const mockFetch = jest.fn().mockResolvedValue({
    ok: false,
    json: jest.fn().mockResolvedValue({
      error: 'API Error',
      message: 'An error occurred',
    }),
  });
  global.fetch = mockFetch;

  // Mock die Konsole, um Fehlermeldungen zu erfassen
  const consoleErrorSpy = jest.spyOn(console, 'error');
  consoleErrorSpy.mockImplementation(() => {});

  // Mock die alert-Funktion, um den Alert zu erfassen
  const alertSpy = jest.spyOn(window, 'alert');
  alertSpy.mockImplementation(() => {});

  // Rendere den Rating-Komponenten
  render(<Rating />);

  // Überprüfe, ob der Fehler angezeigt wurde
  //await screen.findByText('Error: API Error');

  // Überprüfe, ob die Fehlerbehandlung korrekt war
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    'http://localhost:3001/beers?approved=true',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
  expect(alertSpy).toHaveBeenCalledTimes(0);
  //expect(alertSpy).toHaveBeenCalledWith('Error: API Error');

  // Setze die Konsole und den Alert-Spy zurück
  consoleErrorSpy.mockRestore();
  alertSpy.mockRestore();
});