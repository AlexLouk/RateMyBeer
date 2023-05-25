import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About Component', () => {
    it('contains the about-container', () => {
      const {container} = render(<About/>);
      expect( container.firstChild ).toHaveClass('about-container');
    });

    it('contains the logo with src and alt', () => {
      render(<About/>);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('src', 'Logo2.png');
      expect(logo).toHaveAttribute('alt', 'RateMyBeer logo');
    });

    it('should render the About header', () => {
      render(<About />);
      const header = screen.getByRole('heading', { level: 1, name: 'About RateMyBeer' });
      expect(header).toBeInTheDocument();
    });
  
    it('should render Our Team', () => {
      render(<About />);
      const question = screen.getByRole('heading', { level: 2, name: 'Our Team' });
      expect(question).toBeInTheDocument();
    });
  
    it('should render the ul', () => {
      render(<About />);
      const question = screen.getByRole('list', { name: ''});
      expect(question).toBeInTheDocument();
    });
  });

