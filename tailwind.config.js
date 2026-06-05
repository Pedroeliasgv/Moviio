export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-dark': '#1D4ED8',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        sidebar: '#0F172A',
        dark: '#111827',
        card: '#FFFFFF',
        border: '#E5E7EB',
        muted: '#64748B',
        accent: '#EFF6FF',
      },
      boxShadow: {
        soft: '0 22px 70px rgba(15, 23, 42, 0.10)',
        panel: '0 30px 90px rgba(15, 23, 42, 0.12)',
        card: '0 18px 40px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 28%), radial-gradient(circle at bottom right, rgba(96, 165, 250, 0.10), transparent 30%)',
      },
    },
  },
  plugins: [],
}
