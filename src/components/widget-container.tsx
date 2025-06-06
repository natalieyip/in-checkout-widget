import { useState, useEffect } from 'react';
import { getWidgetData } from '../services/widget.service';
import type { Peril } from '../models/Peril.model';
import type { Link } from '../models/Link.model';
import type { Underwriter } from '../models/Underwriter.model';
import { Icon } from '@mui/material';
import '../styles/style.css'; // Adjust the path as necessary

interface WidgetContainerProps {
  clientKey: string;
  dataReceived?: any;
}

export function WidgetContainer({ clientKey } : WidgetContainerProps) {
  console.log(clientKey);
  const [perils, setPerils] = useState<Peril[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [quotedPrice, setQuotedPrice] = useState<number>(0);
  const [underwriterInfo, setUnderwriterInfo] = useState<Underwriter>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        getWidgetData()
          .then((res) => {
            console.log(res);
            const modifiedPerils = res.perils.map((peril: any) => ({
              ...peril,
              icon: peril.icon.toLowerCase(),
            }));
            setPerils(modifiedPerils);

            setLinks(res.links.map((link: any) => ({
              ...link,
              type: mapLinkTypes(link.type),
            })));

            setUnderwriterInfo(res.underwriter);

            setQuotedPrice(res.quote_literal);
        })
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
      <div className="header">ENHANCED REFUND PROTECTION</div>
      <div>
        By adding FanShield, your total purchase of <span> {quotedPrice} </span>can be refunded under
        the covered reasons listed in the terms including:
        <div className="perils-container">
          {perils.map((peril, index) => (
            <div key={index} className="peril">
              <Icon fontSize="small">{peril.icon}</Icon>
              <div>{peril.name}</div>
            </div>
          ))}
        </div>
        <div> 
          This is where the toggles will go 
        </div>
        <div className="links-container">
          {links.map((link, index) => (
            <div key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <span>{link.type}</span>
              </a>
            </div>
          ))}
        </div>
        <div className="underwriter-info">
          {underwriterInfo && `Underwriter: ${underwriterInfo.name}`}
        </div>
      </div>
    </div>
  );
}