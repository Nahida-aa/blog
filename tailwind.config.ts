import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background)/0.2)',
  			foreground: 'hsl(var(--foreground))',
  			appHeader: 'hsl(var(--AppHeader-bg)/0.2)',
  			card: {
  				DEFAULT: 'hsl(var(--card)/0.2)',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover)/0.3)',
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
  				DEFAULT: 'hsl(var(--muted)/0.2)',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent)/0.3)',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border)/0.8)',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background)/0.2)',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent)/0.2)',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		screens: {
  			'1.5xl': '1408px'
  		},
			animation: {
				// ui/loading/Loading.tsx
				'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
			}
  	}
  },
  // plugins: [
  //   // plugin(function ({ addUtilities }) {
  //   //   const newUtilities = {
  //   //     '.glow-cyan': '@apply glow-cyan;',
  //   //     '.glow-purple': '@apply glow-purple;',
  //   //   };

  //   //   addUtilities(newUtilities, {
  //   //     respectPrefix: false,
  //   //     respectImportant: false,
  //   //   });
	// 	// }),
	// ],
	plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp'),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-glow-cyan': {
					'color': '#f4edf7',
          'text-shadow': '0 0 2px #0e002000, 0 0 7px #00f6ff75, 0 0 5px #00f6ff75, 0 0 18px #00f6ff75',
        },
				'.text-glow-purple': {
					'color': '#f4edf7',
					'text-shadow': '0 0 2px #0e002000, 0 0 7px #780afe75, 0 0 5px #780afe75, 0 0 18px #780afe75',
				},
        
      })
    })
  ]
};
export default config;
