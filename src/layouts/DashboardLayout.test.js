import { render, screen } from "@testing-library/react";
import DashboardLayout from "./DashboardLayout";



describe("App <DashboardLayout /> component", () => {
  test("should render DashboardLayout correctly", () => {
    render(<DashboardLayout />)
    expect(screen.getByTestId("content-section")).toBeInTheDocument();
  });

  test('renders list items if request succeeds', async () => {
    render(<DashboardLayout />)

    const listItemElements = await screen.findAllByTestId("list-item");
    expect(listItemElements).not.toHaveLength(0);
  });
});