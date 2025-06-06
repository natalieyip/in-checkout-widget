import type { Peril } from './Peril.model';
import type { Underwriter } from './Underwriter.model';
import type { Link } from './Link.model';
import type { WidgetVerbiage } from './WidgetVerbiage.model';

export type WidgetData = {
    currency: string;
    symbol: string;
    quote_literal: string;
    underwriter: Underwriter;
    perils: Peril[];
    links: Link[];
    text: WidgetVerbiage
};
