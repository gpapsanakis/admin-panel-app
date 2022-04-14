import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App <App /> component", () => {
  test("should render app correctly", () => {
    render(<App />)
    expect(screen.getByTestId("app-section")).toBeInTheDocument();
  });
});
