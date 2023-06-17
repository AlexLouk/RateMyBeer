import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import News from '../News';

describe('News Component', () => {
  it('renders loading state while news is being loaded', () => {
    const loginInfo = {
      loggedIn: true,
      username: 'testuser',
    };

    const { getByText } = render(
      <AppContext.Provider value={{ loginInfo }}>
        <MemoryRouter initialEntries={['/news/1']}>
          <Routes>
            <Route path="/news/:newsId" element={<News />} />
          </Routes>
        </MemoryRouter>
      </AppContext.Provider>
    );

    // Test implementation
  });

  // Rest of the tests
});


