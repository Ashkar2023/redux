export default {
    content: [
        "./index.html",
        "./src/**/*.{jsx,js,ts,tsx}"
    ],
    theme: {
        extend: {
            textColor:{
                skin:{
                    base:"var(--text)",
                    muted:"var(--text-muted)"
                }
            },
            backgroundColor:{
                skin:{
                    fill:"var(--bg)",
                    primary:"var(--primary)"
                }
            },
            keyframes: {
                slideIn: {
                    "0%": { transform: "translateY(-100%)", height: 0, opacity: 0 },
                    "100%": { transform: "translateY(0)", height: 15, opacity: 1 },
                },
                slideUp: {
                    '0%': { "margin-bottom": 15 },
                    "100%": { "margin-bottom": 0 }
                },

            },
            animation: {
                slideIn: "slideIn 0.3s ease-in-out forwards",
                slideUp: "slideUp 0.3s ease-in-out forwards",
            }
        },
    },
    plugins: [

    ],
}

