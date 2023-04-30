import React from 'react';
import { render } from '@testing-library/react';
import FAQs from './FAQs';

describe('FAQs Component', () => {
  it('renders the FAQs section', () => {
    const { getByTestId } = render(<FAQs />);
    expect(getByTestId('faq-section')).toBeInTheDocument();
  });

  it('renders all the FAQs questions', () => {
    const { getAllByTestId } = render(<FAQs />);
    const faqQuestions = getAllByTestId('faq-question');
    expect(faqQuestions.length).toBe(3);
  });
});
