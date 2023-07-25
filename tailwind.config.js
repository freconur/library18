/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xsm: '420px',
      xm: '480px',
      xs: '500px',
      sm: '640px',
      cz: '664px',
      md: '768px',
      cs: '953px',
      lg: '1024px',
      xl: '1200px'
    },
    extend: {
      height: {
        'altura':'calc(100vh - 60px)'
      },
      margin: {
        'centrar-contenido': 'auto'
      },
      colors: {
        'principal': '#121f3d',
        'secundary':'rgb(12 24 50)',
        'modal':'rgba(0,0,0,.24)',
        'background':'#1b1f44',
        'background-flashcards':'#0f253b',
        'blue-slate':'bg-slate-800',
        
        // 'fisrt-color': ''
      },
      gridTemplateRows: {
        // Complex site-specific row configuration
        'layoutGlobal': 'auto 1fr auto',
        '8': 'repeat(8, minmax(0, 1fr))',
        'gridSideBar': 'auto calc(100vh - 194px) auto',
        'flashcardWelcome': 'auto auto',
        // Complex site-specific row configuration
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      gridTemplateColumns: {
        // 'layoutDecks': '75% 25%',
        'layoutDecks': '80% minmax(40px, 50px)',
        // 'layoutDecks': '90% 10%',
        'gridCardProduct': '40% 60%',
        'gridSidebar': '18% 82%',
        'gridSidebarMd': '20% auto',
        'gridPageSlider': '400px 400px',
      }
    },
    variants: {
      extend: {
        // ...
        display: ['hover', 'focus', 'group-hover'],
      }
    }

  },
  plugins: [],
}

