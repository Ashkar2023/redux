import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    
    // server: { // if not usig cors, temporarily you can use server proxy for development.
    //     proxy: {
    //         "/api": { 
    //             target:"http://localhost:3000",
    //             changeOrigin:true,
    //             rewrite:(path)=> path.replace(/^\/api/,"")
    //         }
    //     }
    // }
})
