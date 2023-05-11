import { render, screen } from '@testing-library/react';
import Rating from '../Rating';

describe('Home Component', () => {
    it('contains the home-container', () => {
      const {container} = render(<Home/>);
      expect( container.firstChild ).toHaveClass('home-container');
    });

    it('contains news-boxes', () => {
        const {container} = render(<Home/>);
        const newsBoxes = container.querySelector('.news-boxes');
        expect(newsBoxes).toBeInTheDocument();
    });

    it('contains links (<a>) to the news articles and headline h2', () => {
        const {container} = render(<Home/>);
        const newsLinks = container.querySelector('a');
        const headline = container.querySelector('h2');

        expect(newsLinks).toBeInTheDocument();
        expect(newsLinks).toHaveAttribute('href');
        expect(headline).toBeInTheDocument();
    });
    
      
  });

