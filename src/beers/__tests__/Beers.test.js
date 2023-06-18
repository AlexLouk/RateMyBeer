import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AppContext } from '../../AppContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Beers from '../Beers';

describe('Beers Component', () => {
  const mockLoginInfo = {
    user_id: 1,
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
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  afterEach(() => {
    window.fetch.mockRestore();
    window.confirm.mockRestore();
  });

  it('should display loading message while fetching beers', () => {
    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <Beers />
      </AppContext.Provider>
    );

    expect(screen.getByText('Loading beers...')).toBeInTheDocument();
  });

  it('should display error message if fetching beers fails', async () => {
    const errorResponse = { error: 'Error message' };

    window.fetch.mockReturnValueOnce(mockFetchResponse(500, errorResponse));

    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <Beers />
      </AppContext.Provider>
    );

    await waitFor(() => {
      //expect(console.error).toHaveBeenCalledWith('Error:', errorResponse);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  it('should display table with beers if fetching beers is successful', async () => {
    const beersResponse = [
      { beer_id: 1, beer_name: 'Beer 1', is_approved: true, beer_image: 'image1.jpg' },
      { beer_id: 2, beer_name: 'Beer 2', is_approved: false, beer_image: 'image2.jpg' },
    ];

    window.fetch.mockReturnValueOnce(mockFetchResponse(200, beersResponse));

    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <Router>
          <Beers />
        </Router>
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Beer 1')).toBeInTheDocument();
      expect(screen.getByText('Beer 2')).toBeInTheDocument();
      //expect(screen.getByText('Approved')).toBeInTheDocument();
      expect(screen.getByText('Pending approval')).toBeInTheDocument();
    });
  });

  it('should call deleteBeer function when "Delete" button is clicked', async () => {
    const beersResponse = [
      { beer_id: 1, beer_name: 'Beer 1', is_approved: true, beer_image: 'image1.jpg' },
    ];

    window.fetch.mockReturnValueOnce(mockFetchResponse(200, beersResponse));

    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <Router>
          <Beers />
        </Router>
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Beer 1')).toBeInTheDocument();
    });

    window.fetch.mockReturnValueOnce(mockFetchResponse(200, {}));

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/beers/delete', expect.anything());
      //expect(screen.getByText('Beer was deleted successfully.')).toBeInTheDocument();
      expect(screen.getByText('Loading beers...')).toBeInTheDocument();
    });
  });

  it('should call loadBeers function when Add Beer form is submitted', async () => {
    const beersResponse = [
      { beer_id: 1, beer_name: 'Beer 1', is_approved: true, beer_image: 'image1.jpg' },
    ];

    window.fetch.mockReturnValueOnce(mockFetchResponse(200, beersResponse));

    render(
      <AppContext.Provider value={{ loginInfo: mockLoginInfo }}>
        <Router>
          <Beers />
        </Router>
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Beer 1')).toBeInTheDocument();
    });

    window.fetch.mockReturnValueOnce(mockFetchResponse(200, {}));

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'New Beer' } });
    fireEvent.change(screen.getByPlaceholderText('Image URL'), { target: { value: 'newbeer.jpg' } });
    fireEvent.click(screen.getByText('Add Beer'));

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/beers/add', expect.anything());
      //expect(screen.getByText('Beer added. Your beer "New Beer" is now pending for approval.')).toBeInTheDocument();
      expect(screen.getByText('Loading beers...')).toBeInTheDocument();
    });
  });
});