import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FAQs from '../FAQs';

describe('FAQs Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads and displays FAQs', async () => {
    const mockFaqs = [
      {
        faq_id: 1,
        faq_title: 'FAQ 1',
        faq_text: 'FAQ 1 text',
      },
      {
        faq_id: 2,
        faq_title: 'FAQ 2',
        faq_text: 'FAQ 2 text',
      },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockFaqs),
    });

    const { getByText } = render(<FAQs />);

    expect(getByText('Loading FAQs')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText('FAQ 1')).toBeInTheDocument();
      expect(getByText('FAQ 1 text')).toBeInTheDocument();
      expect(getByText('FAQ 2')).toBeInTheDocument();
      expect(getByText('FAQ 2 text')).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ error: 'API Error' }),
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { getByText } = render(<FAQs />);

    await waitFor(() => {
      expect(getByText('Loading FAQs')).toBeInTheDocument();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', { error: 'API Error' });
    });

    consoleErrorSpy.mockRestore();
  });
});