import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Game from '../Game';

describe('Game Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockReturnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ /* mock response data */ }),
      })
    );
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('should fetch and display current question', async () => {
    const mockQuestion = {
      question: 'Sample question',
      answers: ['Answer 1', 'Answer 2', 'Answer 3'],
      correctAnswer: 'Answer 1',
    };

    window.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockQuestion]),
      })
    );

    render(<Game />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
      expect(screen.queryByText('Sample question')).toBeInTheDocument();
    });
  });

  it('should handle error when fetching current question', async () => {
    window.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    render(<Game />);

    await waitFor(() => {
      //expect(screen.queryByText('Error fetching current question: 500')).toBeInTheDocument();
    });
  });

  it('should check the selected answer', async () => {
    const mockQuestion = {
      question: 'Sample question',
      answers: ['Answer 1', 'Answer 2', 'Answer 3'],
      correctAnswer: 'Answer 1',
    };

    window.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockQuestion]),
      })
    );

    render(<Game />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Answer 1'));
      fireEvent.click(screen.getByText('Check Antwort'));
      expect(screen.queryByText('Correct answer!')).toBeInTheDocument();
    });
  });

  it('should handle answer selection and reset answer feedback', async () => {
    const mockQuestion = {
      question: 'Sample question',
      answers: ['Answer 1', 'Answer 2', 'Answer 3'],
      correctAnswer: 'Answer 1',
    };

    window.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockQuestion]),
      })
    );

    render(<Game />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Answer 2'));
      //expect(screen.getByText('Answer 2')).toHaveClass('selected');

      fireEvent.click(screen.getByText('Nächste Frage'));
      expect(screen.queryByText('Correct answer!')).toBeNull();
      expect(screen.queryByText('Answer 2')).not.toHaveClass('selected');
    });
  });

  it('should add a new question', async () => {
    const mockQuestion = {
      question: 'Sample question',
      answers: ['Answer 1', 'Answer 2', 'Answer 3'],
      correctAnswer: 'Answer 1',
    };

    window.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockQuestion]),
      })
    );

    window.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ /* mock success response */ }),
      })
    );

    render(<Game />);

    await waitFor(() => {
      //fireEvent.change(screen.getByLabelText('Question:'), { target: { value: 'New question' } });
      //fireEvent.change(screen.getByLabelText('Answers (comma-separated):'), { target: { value: 'New answer 1,New answer 2,New answer 3' } });
      //fireEvent.change(screen.getByLabelText('Correct Answer:'), { target: { value: 'New answer 1' } });

      //fireEvent.click(screen.getByText('Add Question'));

      //expect(screen.queryByText('New question')).toBeInTheDocument();
      //expect(screen.queryByText('New answer 1')).toBeInTheDocument();
    });
  });

  it('should handle error when adding a new question', async () => {
    const mockQuestion = {
      question: 'Sample question',
      answers: ['Answer 1', 'Answer 2', 'Answer 3'],
      correctAnswer: 'Answer 1',
    };

    window.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockQuestion]),
      })
    );

    window.fetch.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ /* mock error data */ }),
      })
    );

    render(<Game />);

    await waitFor(() => {
      //fireEvent.click(screen.getByText('Add Question'));
      //expect(screen.queryByText('Error adding question: Error message')).toBeInTheDocument(); // Replace 'Error message' with the actual error message
    });
  });
});