/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    (require('daisyui')),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          'text': 'black',
          'background': 'F6FAB9',
          'primary': '8E3E63',
          'secondary': 'CAE6B2',
          'accent': '#c9f0f8',
          'neutral': '#333333',  // You can set this or remove if not needed
          'base-100': 'F6FAB9', 
          'base-200': 'f3f8ad',  // Use background as base color
          'info': '#00b2d6',      // Optional - use primary color for info
          'success': '#8fe1ef',   // Optional - use secondary color for success
          'warning': '#FFC107',   // Optional - you can set custom or use default
          'error': '#F44336',
        }
      }
    ]
  }
}
