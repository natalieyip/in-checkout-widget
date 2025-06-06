# In Checkout Widget
This repository contains my submission for Protecht's Frontend Engineering Exercise.

## 🚀 Features

- ⚛️ Built with **React + TypeScript**
- 🎨 Fully styled and responsive using **CSS Grid/Flexbox**
- 🧪 Unit tested using **Vitest**
- 🏗️ Bundled with **Vite** and deployed with **Vercel**

## Running Project Locally

To get started, follow these steps:

1. Clone this repository to your local machine.
2. Install the dependencies by running `npm install`
3. Run the development server by running `npm run dev`
4. Open your browser and navigate to your localhost. 

## Running Tests 

To run the tests in the widget, simply run 

```bash
npx vitest
```

## Embedding Widget

If everything goes dandy, then you should be able to add the script like so. 

```html
  <script 
    type="module"
    src="https://in-checkout-widget.vercel.app/assets/widget.js" 
    data-client-key="YOUR_API_KEY">
  </script>
```
