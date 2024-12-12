import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
    plugins: [react()],
    optimizeDeps: {
        include: ['msw'],
        force: true,
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
                configure: (proxy) => {
                    proxy.on('proxyReq', (proxyReq) => {
                        proxyReq.setHeader(
                            'x-api-key',
                            '738c6b9d-24cf-47c3-b688-f4f4c5747662'
                        );
                    });
                },
            },
        },
    },
}));
