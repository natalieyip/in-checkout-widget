import { hydrateRoot } from 'react-dom/client';
import './styles/WidgetContainer.style.css';
import { WidgetContainer } from './components/WidgetContainer';

function initializeWidget() {
    if (document.readyState !== 'loading') {
        onReady();
    } else {
        document.addEventListener('DOMContentLoaded', onReady);
    }
}

function onReady() {
    try {
        const element = document.createElement('div');
        const shadow = element.attachShadow({ mode: 'open' });
        const shadowRoot = document.createElement('div');
        const clientKey = getClientKey();
        const dataConfig = getDataConfig();
        console.log('Widget data config:', dataConfig);

        shadowRoot.id = 'widget-root';

        const component = (
            <WidgetContainer clientKey={clientKey}/>
        );

        shadow.appendChild(shadowRoot);
        injectStyle(shadowRoot);
        hydrateRoot(shadowRoot, component);

        document.body.appendChild(element);
    } catch (error) {
        console.warn('Widget initialization failed:', error);
    }
}

function injectStyle(shadowRoot: HTMLElement) {
    // const link = document.createElement('link');
    // link.rel = 'stylesheet';
    // const fileName = process.env.WIDGET_NAME || 'widget';
    // link.href = 'https://in-checkout-widget.vercel.app/assets/widget-B-PDStqM.css';
    // shadowRoot.appendChild(link);
    // console.log(shadowRoot, 'Shadow root for widget styles');

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://in-checkout-widget.vercel.app/assets/widget-B-PDStqM.css');
    
    shadowRoot.appendChild(link);
    console.log(shadowRoot, 'Shadow root for widget styles');
}

function getClientKey() {
    console.log('Getting client key');
    const script = document.getElementById('my-icw-widget-script') as HTMLScriptElement;
    const clientKey = script?.getAttribute('data-client-key');

    if (!clientKey) {
        throw new Error('Missing data-client-key attribute');
    }

    return clientKey;
}

function getDataConfig() {
    const script = document.getElementById('my-icw-widget-script') as HTMLScriptElement;
    const clientKey = script?.getAttribute('data-config');

    if (!clientKey) {
        throw new Error('Missing data-config attribute');
    }

    return clientKey;
}

initializeWidget();
