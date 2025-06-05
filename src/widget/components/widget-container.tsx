import { useState, useEffect } from 'react';
import { getWidgetData } from '../../services/widget.service';
import type { Peril } from '../../models/Peril.model';
import type { Link } from '../../models/Link.model';
import type { Underwriter } from '../../models/Underwriter.model';
import { Icon } from '@mui/material';
import '../styles/style.css'; // Adjust the path as necessary

interface WidgetContainerProps {
  clientKey: string;
}

export function WidgetContainer({ clientKey } : WidgetContainerProps) {
  console.log(clientKey)
  const [perils, setPerils] = useState<Peril[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [underwriterInfo, setUnderwriterInfo] = useState<Underwriter>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        getWidgetData()
          .then((res) => {
            const modifiedPerils = res.perils.map((peril: any) => ({
              ...peril,
              icon: peril.icon.toLowerCase(),
            }));
            setPerils(modifiedPerils);
            setLinks(res.links);
            setUnderwriterInfo(res.underwriter);
        })
      } catch (err) {

      } finally {

      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="header">ENHANCED REFUND PROTECTION</div>
      <div>
        By adding FanShield, your total purchase of NUMBER can be refunded under
        the covered reasons listed in the terms including:
        <div className="perils-container">
          {perils.map((peril, index) => (
            <div key={index} className="peril">
              <Icon fontSize="small">{peril.icon}</Icon>
              <div>{peril.name}</div>
            </div>
          ))}
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
          {underwriterInfo && `${underwriterInfo.name} | ${underwriterInfo.id}`}
        </div>
      </div>
    </div>
  );
}