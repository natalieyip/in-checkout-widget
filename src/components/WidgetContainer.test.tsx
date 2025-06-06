import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WidgetContainer } from '../components/WidgetContainer';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../services/widget.service', () => ({
    getWidgetData: vi.fn().mockResolvedValue({
        perils: [
            { icon: 'carcrash', name: 'Car' },
            { icon: 'weather', name: 'Weather' },
        ],
        links: [
            { url: 'www.google.com', type: 'T&C' },
            { url: 'www.fake.com', type: 'Privacy' },
            { url: 'www.fake.com', type: 'faq' },
        ],
        underwriter: { name: 'FRANKENSTEIN', id: '12345' },
        quote_literal: '$9.99',
        theme_override: {
            text: {
            title: 'Title of Sick Widget',
            intro_paragraph: 'Here Lies Intro Paragraph',
            fee_descriptor: 'This is the fee.',
            no_default: 'No thanks',
            yes_default: 'Yes, protect me',
            },
        },
    }),
}));

describe('WidgetContainer', () => {
  it('renders widget data from API', async () => {
    render(<WidgetContainer clientKey=""/>);

    const title = screen.getByTestId('header');
    const intro = screen.getByTestId('intro');
    const underwriter = screen.getByTestId('underwriter');


    await waitFor(() => {
        const perils = screen.getAllByTestId('peril-name');
        const links = screen.getAllByTestId('link-type');
        expect(title).toHaveTextContent('Title of Sick Widget');
        expect(intro).toHaveTextContent('Here Lies Intro Paragraph');
        expect(underwriter).toHaveTextContent('FRANKENSTEIN');
        expect(perils[0]).toHaveTextContent('Car');
        expect(perils[1]).toHaveTextContent('Weather');
        expect(links[0]).toHaveTextContent('Terms of Service');
        expect(links[1]).toHaveTextContent('Privacy Policy');
        expect(links[2]).toHaveTextContent('FAQ');
    });
  });
});
