import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "./Form";

const formUserData = {
    "id": "5c093af1c6ee9117a581c7d6",
    "photo": "https://randomuser.me/api/portraits/men/40.jpg",
    "name": "Bates Washington",
    "company": "ZOLAREX",
    "email": "bates.washington@zolarex.io",
    "phone": "+1 (915) 447-2207",
    "address": "958 Brevoort Place, Ona, Maine, 2433"
};

const updateUserData = jest.fn();

describe("App <Form /> component", () => {
    test('renders items if request succeeds', async () => {
        render(<Form formUserData={formUserData} />)

        const listItemElements = await screen.findAllByTestId("name-input");
        expect(listItemElements).not.toHaveLength(0);
    });
    
    test('renders buttons', () => {
        render(<Form formUserData={formUserData} />);

        const saveButtonElement = screen.getByTestId("save-button");
        const cancelButtonElement = screen.getByTestId("cancel-button");

        expect(saveButtonElement).toBeInTheDocument();
        expect(cancelButtonElement).toBeInTheDocument();
    });

    test('updateUserData called once after save', async () => {
        render(<Form formUserData={formUserData} updateUserData={updateUserData} />);

        const saveButtonElement = screen.getByTestId("save-button");

        fireEvent.click(saveButtonElement)

        await waitFor(() => saveButtonElement)
        expect(updateUserData).toBeCalledTimes(1);
    });

    test('save button is disabled after save', async () => {
        render(<Form formUserData={formUserData} updateUserData={updateUserData} />);

        const saveButtonElement = screen.getByTestId("save-button");

        fireEvent.click(saveButtonElement)

        await waitFor(() => saveButtonElement)
        expect(saveButtonElement).toBeDisabled();
    });

    test('cancel button disappears after save', async () => {
        render(<Form formUserData={formUserData} updateUserData={updateUserData} />);

        const saveButtonElement = screen.getByTestId("save-button");
        const cancelButtonElement = screen.getByTestId("cancel-button");

        fireEvent.click(saveButtonElement)

        await waitFor(() => cancelButtonElement)
        expect(cancelButtonElement).not.toBeInTheDocument();
    });
});