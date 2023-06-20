import renderer from 'react-test-renderer';
import { useContext } from 'react';
import Admin from '../Admin';

jest.mock('../Admin.css');
jest.mock('react-bootstrap/Table');
jest.mock('react-bootstrap/Button');

// Mocken des useContext-Aufrufs
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const renderTree = (tree) => renderer.create(tree);

describe('<Admin>', () => {
  it('should render component', () => {
    // Mocken des Rückgabewerts von useContext
    useContext.mockReturnValue({});

    expect(renderTree(<Admin />).toJSON()).toMatchSnapshot();
  });
});
