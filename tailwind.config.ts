/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
  	extend: {
  		fontFamily: {
  			inter: ["Inter", "sans-serif"]
  		},
  		colors: {
  			'black-100': '#2B2C35',
  			'primary-blue': {
  				'100': '#F5F8FF',
  				DEFAULT: '#2B59FF'
  			},
  			'secondary-orange': '#f79761',
  			'light-white': {
  				'100': 'rgba(59,60,152,0.02)',
  				DEFAULT: 'rgba(59,60,152,0.03)'
  			},
  			grey: '#747A88',
			  green: {
				'500': '#24AE7C',
				'600': '#0D2A1F'
			},
			blue: {
				'500': '#79B5EC',
				'600': '#152432'
			},
			red: {
				'500': '#F37877',
				'600': '#3E1716',
				'700': '#F24E43'
			},
			light: {
				'200': '#E8E9E9'
			},
		  gold:{
			  '100': '#F9E6BF',
				'200': '#EDD4A1',
			  '300': 'rgb(145, 103, 12, 0.6)',
			  '400': '#91670c',
			  '600': '#D4AF37',
				'700': '#C29529',
		  },
			dark: {
				'200': '#F8F9FA',  // Very light gray (almost white)
				'300': '#E9ECEF',  // Light gray
				'400': '#DEE2E6',  // Gray with a bit more depth
				'500': '#CED4DA',  // Medium-light gray
				'600': '#ADB5BD',  // Soft gray for background elements or borders
				'700': '#6C757D',  // Gray used for text and UI elements (similar to secondary)
			},
			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		  keyframes: {
			'accordion-down': {
				from: {
					height: '0'
				},
				to: {
					height: 'var(--radix-accordion-content-height)'
				}
			},
			'accordion-up': {
				from: {
					height: 'var(--radix-accordion-content-height)'
				},
				to: {
					height: '0'
				}
			},
			'caret-blink': {
				'0%,70%,100%': {
					opacity: '1'
				},
				'20%,50%': {
					opacity: '0'
				}
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'caret-blink': 'caret-blink 1.25s ease-out infinite'
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
  		backgroundImage: {
  			pattern: "url('/pattern.png'),",
  			'hero-bg': "url('/hero-bg.png')",
			  appointments: 'url(/assets/images/appointments-bg.png)',
  			pending: 'url(/assets/images/pending-bg.png)',
  			cancelled: 'url(/assets/images/cancelled-bg.png)'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};