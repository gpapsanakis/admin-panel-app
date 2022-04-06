import { render } from "@testing-library/react";
import DashboardLayout from "./DashboardLayout";

const renderContent = () => {
  return render(<DashboardLayout />);
};

describe("App <DashboardLayout /> component", () => {
  it("should render DashboardLayout correctly", () => {
    const { getByTestId } = renderContent();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("content-section")).toBeInTheDocument();
  });
});