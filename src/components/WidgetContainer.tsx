import { useState, useEffect } from 'react';
import { Icon } from '@mui/material';
import '../styles/style.css'; // Adjust the path as necessary
import { getWidgetData } from '../services/widget.service';
import type { WidgetData } from '../models/WidgetData.model';

interface WidgetContainerProps {
    clientKey: string;
    dataReceived?: any;
}

export function WidgetContainer({ clientKey }: WidgetContainerProps) {
    const [widgetData, setWidgetData] = useState<WidgetData>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                getWidgetData().then((res) => {
                    console.log(res);
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
                            intro_paragraph: res.theme_override.text.intro_paragraph,
                            fee_descriptor: res.theme_override.text.fee_descriptor,
                            no_default: res.theme_override.text.no_default,
                            yes_default: res.theme_override.text.yes_default
                        }
                    });


                });
            } catch (err) {
                console.error('Error fetching widget data:', err);
            } finally {
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

    return (
        <div className="container">
            <div className="header">{widgetData?.text.title}</div>
            <div>
                {widgetData?.text.intro_paragraph}
            </div>
            <div className="perils-container">
                {widgetData?.perils.map((peril, index) => (
                    <div key={index} className="peril">
                        <Icon fontSize="small">{peril.icon}</Icon>
                        <div>{peril.name}</div>
                    </div>
                ))}
            </div>
            <div>This is where the toggles will go</div>
            <div className="links-container">
                {widgetData?.links && widgetData.links.map((link, index) => (
                    <div key={index}>
                        <a
                            href={link.url}
                            target="_blank"
                        >
                            <span>{link.type}</span>
                        </a>
                    </div>
                ))}
            </div>
            <div className="underwriter-info">
                {widgetData?.underwriter && `Underwriter: ${widgetData.underwriter.name}`}
            </div>
        </div>
    );
}
