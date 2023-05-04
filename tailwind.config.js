/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        light: 'var(--shadow-light)'
      },
      colors: {
        'c-lb': 'var(--c-lb)',
        'c-db': 'var(--c-db)',
        'c-gr': 'var(--c-gr)'
      },
      gridTemplateColumns: {
        'message-teaser': '1.25rem 4fr minmax(4rem, 4fr)'
      },
      minWidth: {
        '3/5': '3.5rem'
      },
      maxWidth: {
        'filter-pill': '5rem'
      },
      padding: {
        '002': '2px'
      }
    }
  },
  plugins: []
}
