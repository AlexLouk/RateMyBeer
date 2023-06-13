import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About Component', () => {
    it('contains the about-container', () => {
      const {container} = render(<About/>);
      expect( container.firstChild ).toHaveClass('about-container');
    });

    it('contains the upperinfo', () => {
      const {container} = render(<About/>);
        const upperinfo = container.querySelector('.upperinfo');
        expect(upperinfo).toBeInTheDocument();
    });

    it('upperinfo contains the left and right info', () => {
      const {container} = render(<About/>);
      const upperinfo = container.querySelector('.upperinfo');
      const leftinfo = upperinfo.querySelector('.infoleft'); 
      const rightinfo = upperinfo.querySelector('.inforight');
      expect(leftinfo).toBeInTheDocument();
      expect(rightinfo).toBeInTheDocument();
    });

    it('contains the member', () => {
      const {container} = render(<About/>);
      const member = container.querySelector('.member');          
      expect(member).toBeInTheDocument();
    });

    it('member contains Card', () => {
      const {container} = render(<About/>);
      const member = container.querySelector('.member');
      const card = member.querySelector('.card');
      expect(card).toBeInTheDocument();
    });

    it('contains the bottinfo', () => {
      const {container} = render(<About/>);
      const bottinfo = container.querySelector('.bottinfo');
      expect(bottinfo).toBeInTheDocument();
    });

    it('bottinfo contains', () =>{
      const {container} = render(<About/>);
      const bottinfo = container.querySelector('.bottinfo');
      const bottleft = bottinfo.querySelector('.infoleft');
      const bottright = bottinfo.querySelector('.inforightbott');
      expect(bottleft).toBeInTheDocument();
      expect(bottright).toBeInTheDocument();
    });
  });

