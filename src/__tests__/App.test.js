import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("check div", () => {
    const {container} = render(<App />);
    const appContainer = container.querySelector('div');
    expect(appContainer).toBeInTheDocument();
  });

  it("check if element from navbar can be rendered", () => {
    const {container} = render(<App />);
    const navbarContainer = container.querySelector('.navbar');
    expect(navbarContainer).toBeInTheDocument();
  });


});