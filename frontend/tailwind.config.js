/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indigo': {  
          DEFAULT: '#69ACDF',  
          50: '#FFFFFF',  
          100: '#F0F6FC',  
          200: '#CEE4F5',  
          300: '#ACD1ED',  
          400: '#8BBFE6',  
          500: '#69ACDF',  
          600: '#3B92D5',  
          700: '#2675B2',  
          800: '#1C5784',  
          900: '#123855',  
          950: '#0D293E',
        },
    },
  },
},
plugins: [
  require('@tailwindcss/forms'),
  ],
}

