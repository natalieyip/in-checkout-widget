import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { WidgetContainer } from './widget/components/widget-container';

const scriptTag = document.currentScript as HTMLScriptElement;
const clientKey = scriptTag?.getAttribute('data-client-key') || '';
const dataConfig = scriptTag?.getAttribute('data-config');
const dataReceived = dataConfig ? JSON.parse(dataConfig) : {};

const container = document.getElementById('ny-container')!;
createRoot(container).render(
  <StrictMode>
    <WidgetContainer clientKey={clientKey} dataReceived={dataReceived} />
  </StrictMode>
);
