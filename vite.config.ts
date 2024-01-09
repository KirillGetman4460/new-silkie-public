import { defineConfig,loadEnv  } from 'vite'
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react-swc'
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) =>{
  const env = loadEnv(mode, process.cwd(), '');
  return{
    server: {
      cors: true
    },
    define: {
      'process.env': env
    },
    plugins: [react(),svgr({
      include: "**/*.svg?react",
    })],
  }

})
