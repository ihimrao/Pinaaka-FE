import { render, screen } from '@testing-library/react';
import App from './App';

describe('Render App', () => {
    test('renders app-container', () => {
        render(<App />);
        const appContainer = screen.getByTestId('app-container');
        expect(appContainer).toBeInTheDocument();
    });
});
