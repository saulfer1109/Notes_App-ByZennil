import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

const frontend_source = resolve(__dirname,'src') 
const outDir = resolve(__dirname,'../../dist/views/')
const root = resolve(__dirname, 'src', 'views')


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: root,
  build: {
    manifest: true,
    emptyOutDir: true,
    outDir: outDir,
    rollupOptions: {
      input: {
          main: resolve(__dirname,'src','views','index.html'),
          login: resolve(__dirname,'src','views','login','index.html'),
      }
    }
  }
  
})
