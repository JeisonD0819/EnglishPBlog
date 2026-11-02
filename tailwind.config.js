/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Core Machine Palette
        machine: {
          black: '#0D0D0D',
          white: '#FAFAF9',
        },
        steel: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        brass: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FDE047',
          300: '#FACC15',
          400: '#EAB308',
          500: '#C9A84C',  // Primary accent - precision brass
          600: '#A1873A',
          700: '#856D2E',
          800: '#6B5627',
          900: '#574421',
          950: '#2E2210',
        },
        aluminum: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#9CA3AF',  // Machined aluminum
          600: '#71717A',
          700: '#52525B',
          800: '#3F3F46',
          900: '#27272A',
          950: '#18181B',
        },
        safety: {
          orange: '#E85D04',  // Reserved for critical actions only
          orangeHover: '#D94D00',
        },
        coolant: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#00B4D8',  // Cutting fluid blue - info/links
          600: '#0096B8',
          700: '#007893',
          800: '#005D70',
          900: '#004654',
        },
        oxidized: {
          50: '#FDF8F5',
          100: '#FAF0E8',
          200: '#F5E0D0',
          300: '#ECC8A8',
          400: '#E0A87A',
          500: '#D48B5A',
          600: '#C47042',
          700: '#A85A33',
          800: '#8B4A2C',
          900: '#733E26',
        },

        // Semantic mappings
        bg: {
          primary: '#FAFAF9',
          surface: '#F5F5F4',
          elevated: '#FFFFFF',
        },
        text: {
          primary: '#0D0D0D',
          secondary: '#64748B',
          muted: '#9CA3AF',
          inverse: '#FAFAF9',
        },
        accent: {
          primary: '#C9A84C',      // Brass - primary actions, active states
          critical: '#E85D04',     // Safety orange - critical only
          info: '#00B4D8',         // Coolant blue - links, measurements
        },
        border: {
          subtle: '#E7E5E4',       // Stone 200 - technical drawing lines
          strong: '#D6D3D1',       // Stone 300 - visible edges
          focus: '#C9A84C',        // Brass focus ring
        },
      },
      fontSize: {
        // Fluid type scale using clamp()
        'step--1': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'step-0': ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.6', letterSpacing: '0' }],
        'step-1': ['clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'step-2': ['clamp(1.5rem, 1.3rem + 1vw, 2rem)', { lineHeight: '1.35', letterSpacing: '-0.02em' }],
        'step-3': ['clamp(2rem, 1.6rem + 2vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'step-4': ['clamp(3rem, 2.2rem + 4vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      borderWidth: {
        'hairline': '0.5px',
        'technical': '1px',
      },
      boxShadow: {
        'technical': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.03)',
        'elevated': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.03)',
        'modal': '0 25px 50px -12px rgb(0 0 0 / 0.15)',
      },
      transitionDuration: {
        'fast': '120ms',
        'normal': '200ms',
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'technical': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      animation: {
        'progress-fill': 'progressFill 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in': 'fadeIn 200ms ease-out forwards',
        'slide-up': 'slideUp 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'modal-enter': 'modalEnter 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
      keyframes: {
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalEnter: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}