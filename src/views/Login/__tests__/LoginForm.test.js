import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('<LoginForm /> should render correctly', () => {
    test.skip('login form should render', () => {
        render(<LoginForm />);

        expect(screen.getByTestId('login-form-wrapper')).toBeTruthy();
    });

    test.skip("Invalid should show if user didn't fill username and password", async () => {
        const { getByText } = render(<LoginForm />);

        const loginButton = getByText('SIGN IN');
        fireEvent.click(loginButton);
        const usernameError = await screen.getByText('Please enter the username');
        const passwordError = await screen.getByText('Please enter the password');

        expect(usernameError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
    });

    test.skip('After valid form submit, props handle submit should hit', async () => {
        const handleSubmit = jest.fn();

        const { getByText, getByTestId } = render(<LoginForm
            handleSubmit={handleSubmit}
        />);

        const loginButton = getByText('SIGN IN');
        const emailTextField = getByTestId('text-field-username');
        const passwordTextField = getByTestId('text-field-password');

        fireEvent.change(emailTextField, { target: { value: 'test@gmail.com' } });
        fireEvent.change(passwordTextField, { target: { value: 'password' } });

        fireEvent.click(loginButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
});
