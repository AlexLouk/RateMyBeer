import { render, screen } from '@testing-library/react';
import FAQs from '../FAQs';

describe('FAQs Component', () => {
    it('contains the faqs-container', () => {
      const {container} = render(<FAQs/>);
      expect( container.firstChild ).toHaveClass('faqs-container');
    });

    it('should render the "How can I rate a beer?" question', () => {
      render(<FAQs />);
      const question = screen.getByRole('heading', { level: 2, name: 'How can I rate a beer?' });
      expect(question).toBeInTheDocument();
    });
  
    it('should render the "How can I add a new beer to the database?" question', () => {
      render(<FAQs />);
      const question = screen.getByRole('heading', { level: 2, name: 'How can I add a new beer to the database?' });
      expect(question).toBeInTheDocument();
    });
  
    it('should render the "How can I edit my profile?" question', () => {
      render(<FAQs />);
      const question = screen.getByRole('heading', { level: 2, name: 'How can I edit my profile?' });
      expect(question).toBeInTheDocument();
    });
  
    it('should render the "How can I log out?" question', () => {
      render(<FAQs />);
      const question = screen.getByRole('heading', { level: 2, name: 'How can I log out?' });
      expect(question).toBeInTheDocument();
    });
  });

