/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-app': 'var(--bg-app)',
                'bg-surface': 'var(--bg-surface)',
                'bg-surface-active': 'var(--bg-surface-active)',
                primary: 'var(--primary)',
                'primary-press': 'var(--primary-press)',
                danger: 'var(--danger)',
                success: 'var(--success)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-tertiary': 'var(--text-tertiary)',
                border: 'var(--border)',
            },
            fontFamily: {
                sans: 'var(--font-sans)',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
            },
            transitionTimingFunction: {
                spring: 'var(--ease-spring)',
            }
        },
    },
    plugins: [],
}
