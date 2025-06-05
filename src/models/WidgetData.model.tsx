import type { Peril } from "./Peril.model";
import type { Underwriter } from "./Underwriter.model";
import type { Link } from "./Link.model";


export type WidgetData = {
    currency?: string;
    symbol?: string;
    quote_literal?: string;
    underwriter?: Underwriter;
    perils: Peril[];
    links?: Link[];
}