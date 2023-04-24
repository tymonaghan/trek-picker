//use react-testing-library to check that the App component renders "hello world"
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

//wrap this test in a describe block for "App"
describe("the App component", () => {
  test("renders hello world text", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/hello world/i);
    expect(linkElement).toBeInTheDocument();
  });
}); //end describe
