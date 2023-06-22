import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import ViewBeer from '../ViewBeer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('ViewBeer Component', () => {
  test('should render beer information when available', async () => {
    const mockBeer = {
      beer_id: 'beerId',
      beer_name: 'Mock Beer',
      beer_image: 'mock_image_url',
      is_approved: true,
    };

    const mockRatings = [
      {
        rating_id: 'ratingId1',
        user_name: 'John Doe',
        rating_title: 'Great Beer',
        rating_text: 'I really enjoyed this beer!',
        rating_rate: 5,
      },
      {
        rating_id: 'ratingId2',
        user_name: 'Jane Smith',
        rating_title: 'Good Beer',
        rating_text: 'Nice flavor and aroma.',
        rating_rate: 4,
      },
    ];

    useParams.mockReturnValue({ beerId: 'beerId' });

    const mockAppContextValue = {
      loginInfo: { token: 'token' },
      // Hier weitere Eigenschaften oder Funktionen hinzufügen, die im Test benötigt werden
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <ViewBeer />
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Füge deine Testüberprüfungen hier hinzu
  });
});

  test('should render "Loading..." when beer information is being fetched', async () => {
    useParams.mockReturnValue({ beerId: 'beerId' });

    const mockAppContextValue = {
      loginInfo: { token: 'token' },
      // Hier weitere Eigenschaften oder Funktionen hinzufügen, die im Test benötigt werden
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <ViewBeer />
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Überprüfe, ob die "Loading..."-Nachricht gerendert wird, während die Bierinformationen abgerufen werden
    //expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should render "Loading..." when beer information is being fetched', async () => {
    useParams.mockReturnValue({ beerId: 'beerId' });

    const mockAppContextValue = {
      loginInfo: { token: 'token' },
      // Hier weitere Eigenschaften oder Funktionen hinzufügen, die im Test benötigt werden
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <ViewBeer />
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Überprüfe, ob die "Loading..."-Nachricht gerendert wird, während die Bierinformationen abgerufen werden
    //expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Füge weitere Tests hinzu, um verschiedene Szenarien abzudecken

  test('should render beer information when available', async () => {
    useParams.mockReturnValue({ beerId: 'beerId' });

    const mockBeer = {
      id: 'beerId',
      name: 'Mock Beer',
      description: 'This is a mock beer.',
      // Weitere Eigenschaften des Biers hier hinzufügen
    };

    const mockAppContextValue = {
      loginInfo: { token: 'token' },
      // Hier weitere Eigenschaften oder Funktionen hinzufügen, die im Test benötigt werden
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <ViewBeer />
        </AppContext.Provider>
      </MemoryRouter>
    );

  });

  // Weitere Tests hinzufügen

  test('should display an error message when beer information is not available', async () => {
    useParams.mockReturnValue({ beerId: 'beerId' });

    const mockAppContextValue = {
      loginInfo: { token: 'token' },
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <ViewBeer />
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Warte, bis die Fehlermeldung gerendert wurde
    
  });

  // Weitere Tests hinzufügen

  test('should render beer information when available', async () => {
    const mockBeer = {
      beer_id: 'beerId',
      name: 'Beer Name',
      description: 'This is a beer description',
      // Weitere Eigenschaften des Biers
    };

    const mockAppContextValue = {
      loginInfo: { token: 'token' },
    };

    useParams.mockReturnValue({ beerId: 'beerId' });

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <ViewBeer />
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Warte, bis das Bier erfolgreich gerendert wurde
    
  });

  test('should load beer information and render ratings if beer is approved', async () => {
    const mockBeerId = 'beerId';
    const mockBeer = {
      beer_id: mockBeerId,
      beer_name: 'Beer Name',
      is_approved: true,
      // Weitere Bierinformationen
    };
    const mockRatings = [
      {
        rating_id: 'ratingId1',
        user_name: 'User 1',
        rating_rate: 4,
        // Weitere Bewertungsinformationen
      },
      {
        rating_id: 'ratingId2',
        user_name: 'User 2',
        rating_rate: 3,
        // Weitere Bewertungsinformationen
      },
    ];

    const mockAppContextValue = {
      loginInfo: { token: 'token', user_id: 'userId' },
    };

    useParams.mockReturnValue({ beerId: mockBeerId });

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <ViewBeer />
        </AppContext.Provider>
      </MemoryRouter>
    );

    // Warte, bis die Bierinformationen und Bewertungen erfolgreich geladen wurden
    await waitFor(() => {
     // expect(screen.getByText('Beer Name')).toBeInTheDocument();
      // Weitere Überprüfungen der geladenen Bierinformationen

      //expect(screen.getByText('Ratings')).toBeInTheDocument();
      //expect(screen.getByText('User 1')).toBeInTheDocument();
      //expect(screen.getByText('User 2')).toBeInTheDocument();
      // Weitere Überprüfungen der gerenderten Bewertungen
    });
  });

  // Weitere Tests hinzufügen
