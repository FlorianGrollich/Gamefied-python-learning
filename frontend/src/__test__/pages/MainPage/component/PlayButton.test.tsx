import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlayButton from '../../../../pages/MainPage/components/PlayButton';
import '@testing-library/jest-dom';

describe('PlayButton', () => {
    it('renders correctly', () => {
        const onClick = jest.fn();
        const { getByText } = render(<PlayButton onClick={onClick} />);

        expect(getByText('Play')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const onClick = jest.fn();
        const { getByText } = render(<PlayButton onClick={onClick} />);

        fireEvent.click(getByText('Play'));

        expect(onClick).toHaveBeenCalled();
    });
});