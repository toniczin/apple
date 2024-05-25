import { defineConfig } from 'vite';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import injectHTML from 'vite-plugin-html-inject';
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/assets'),
      '@public': path.resolve(__dirname, './src/public/assets'),
    }
  },
  plugins: [
    injectHTML({
      tagName: 'loader',
    }),
    ViteMinifyPlugin({}),
    ViteImageOptimizer({
			png: {
				quality: 90,
			},
			jpg: {
				quality: 90,
			},
		}),
  ],
});
