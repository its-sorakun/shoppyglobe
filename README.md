# ShoppyGlobe

ShoppyGlobe is a frontend React-based e-commerce application built with Vite. It features product listings, dynamic routing, a fully functional shopping cart using Redux, and performance optimizations like code splitting and lazy loading.

**Repository:** [https://github.com/its-sorakun/shoppyglobe](https://github.com/its-sorakun/shoppyglobe)

## Features
- **Product List & Details**: Browse products and view detailed information dynamically using React Router.
- **Shopping Cart**: Add items, update quantities, and remove items with global state managed by Redux.
- **Checkout Form**: A checkout process with an order summary and simulated order placement popup.
- **Performance Optimized**: Uses `React.lazy` and `Suspense` for component-level code splitting, along with native lazy loading for product images.
- **Styling**: Modern, flat UI designed quickly and cleanly with Tailwind CSS.

## Tech Stack
- React 18
- Vite
- Redux Toolkit & React-Redux
- React Router v6
- Tailwind CSS

## Setup Instructions

Follow these steps to run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/its-sorakun/shoppyglobe.git
   cd shoppyglobe
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run the following command to install all required packages:
   ```bash
   npm install
   ```
   *(Note: This project relies on `react-router-dom`, `@reduxjs/toolkit`, and `react-redux`. Ensure they are installed if you encounter any missing module errors).*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in Browser:**
   Open your browser and navigate to the local URL provided in your terminal (usually `http://localhost:5173/`).
