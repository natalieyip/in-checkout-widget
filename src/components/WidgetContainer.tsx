import { useState, useEffect } from 'react';
import { Icon } from '@mui/material';
import '../styles/WidgetContainer.style.css';

import type { WidgetData } from '../models/WidgetData.model';
import { getWidgetData } from '../services/widget.service';


export function WidgetContainer() {
    const [widgetData, setWidgetData] = useState<WidgetData>();
    const [isProtected, setIsProtected] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                getWidgetData().then((res) => {
                    const modifiedPerils = res.perils.map((peril: any) => ({
                        ...peril,
                        icon: peril.icon.toLowerCase(),
                    }));

                    const modifiedLinks = res.links.map((link: any) => ({
                        ...link,
                        type: mapLinkTypes(link.type),
                    }));

                    setWidgetData({
                        ...res,
                        perils: modifiedPerils,
                        links: modifiedLinks,
                        underwriter: res.underwriter,
                        quote_literal: res.quote_literal,
                        text: {
                            title: res.theme_override.text.title,
                            intro_paragraph:
                                res.theme_override.text.intro_paragraph,
                            fee_descriptor:
                                res.theme_override.text.fee_descriptor,
                            no_default: res.theme_override.text.no_default,
                            yes_default: res.theme_override.text.yes_default,
                        },
                    });
                });
            } catch (err) {
                console.error('Error fetching widget data:', err);
            }
        };

        fetchData();
    }, []);

    function mapLinkTypes(linkType: string): string {
        switch (linkType) {
            case 'T&C':
                return 'Terms of Service';
            case 'Privacy':
                return 'Privacy Policy';
            case 'faq':
                return 'FAQ';
            case 'help_center':
                return 'Help Center';
            case 'customer_support':
                return 'Email Support';
            case 'RefundTerms':
                return 'Refund Terms';
            default:
                return 'Learn More';
        }
    }

    function handleCheckboxChange() {
        setIsProtected((prev) => !prev);
    }

    return (
        <div className="container">
            <div data-testid="header" className="header">
                {widgetData?.text.title}
            </div>
            <div data-testid="intro">
                By enrolling in this coverage, your total purchase of{' '}
                {widgetData?.quote_literal} will be protected.
                <br />
                {widgetData?.text.intro_paragraph}
            </div>
            <div className="perils-container">
                {widgetData?.perils.map((peril, index) => (
                    <div key={index} className="peril">
                        <Icon fontSize="small">
                            {peril.icon === 'carcrash'
                                ? 'car_crash'
                                : peril.icon}
                        </Icon>
                        <div data-testid="peril-name">{peril.name}</div>
                    </div>
                ))}
            </div>
            <div className="toggle-container">
                <div>
                    <input
                        type="radio"
                        name="protection"
                        value="yes"
                        checked={isProtected}
                        onChange={handleCheckboxChange}
                    />
                    <span>{widgetData?.text.yes_default}</span>
                </div>
                <div>
                    <input
                        type="radio"
                        name="protection"
                        value="no"
                        onChange={handleCheckboxChange}
                    />
                    <span>{widgetData?.text.no_default}</span>
                </div>
            </div>
            <div className="links-container">
                {widgetData?.links &&
                    widgetData.links.map((link, index) => (
                        <div key={index}>
                            <a href={link.url} target="_blank">
                                <span data-testid="link-type">{link.type}</span>
                            </a>
                        </div>
                    ))}
            </div>
            <div data-testid="underwriter" className="underwriter-info">
                {widgetData?.underwriter &&
                    `Underwriter: ${widgetData.underwriter.name}`}
            </div>
        </div>
    );
}
