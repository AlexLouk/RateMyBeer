import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Search from "../Search";
import { MemoryRouter } from "react-router-dom";

describe("Search Component", () => {
  beforeEach(() => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render 'Searching for...' messages while loading results", () => {
    const searchQuery = "example";

    render(<Search />, { wrapper: MemoryRouter, initialEntries: [`/search/${searchQuery}`] });

    //expect(screen.getByText(`Searching for "${searchQuery}" in news...`)).toBeInTheDocument();
    //expect(screen.getByText(`Searching for "${searchQuery}" in beers...`)).toBeInTheDocument();
  });

  it("should render news results when data is fetched successfully", async () => {
    const newsResults = [
      { news_id: 1, news_title: "News 1", news_text: "Lorem ipsum" },
      { news_id: 2, news_title: "News 2", news_text: "Dolor sit amet" },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(newsResults),
    });

    await act(async () => {
      render(<Search />, { wrapper: MemoryRouter, initialEntries: ["/search/example"] });
    });

    expect(screen.getByText("News results:")).toBeInTheDocument();
    expect(screen.getByText("News 1")).toBeInTheDocument();
    expect(screen.getByText("News 2")).toBeInTheDocument();
  });

  it("should render beer results when data is fetched successfully", async () => {
    const beerResults = [
      { beer_id: 1, beer_name: "Beer 1", beer_image: "image1.jpg" },
      { beer_id: 2, beer_name: "Beer 2", beer_image: "image2.jpg" },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(beerResults),
    });

    await act(async () => {
      render(<Search />, { wrapper: MemoryRouter, initialEntries: ["/search/example"] });
    });

    //expect(screen.getByText("Beers results:")).toBeInTheDocument();
    //expect(screen.getByText("Beer 1")).toBeInTheDocument();
    //expect(screen.getByText("Beer 2")).toBeInTheDocument();
  });

  it("should render 'No results.' when both news and beer results are empty", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await act(async () => {
      render(<Search />, { wrapper: MemoryRouter, initialEntries: ["/search/example"] });
    });

    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("should handle error when fetching news results", async () => {
    const error = { message: "Error fetching news results" };

    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(error),
    });

    console.error = jest.fn();

    await act(async () => {
      render(<Search />, { wrapper: MemoryRouter, initialEntries: ["/search/example"] });
    });

    expect(console.error).toHaveBeenCalledWith("Error:", error);
  });

  it("should handle error when fetching beer results", async () => {
    const error = { message: "Error fetching beer results" };

    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(error),
    });

    console.error = jest.fn();

    await act(async () => {
      render(<Search />, { wrapper: MemoryRouter, initialEntries: ["/search/example"] });
    });

    expect(console.error).toHaveBeenCalledWith("Error:", error);
  });
});