// noinspection JSUnusedGlobalSymbols

import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

import { antyManifest, dolphinManifest } from './src/shared/crx'
import { VITE_MODE } from './src/shared/vite'

const manifests = {
  [VITE_MODE.DOLPHIN]: dolphinManifest,
  [VITE_MODE.ANTY]: antyManifest,
}

export default defineConfig(({ mode }) => {
  const viteMode = mode as VITE_MODE

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      crx({
        manifest: manifests[viteMode],
      }),
    ],
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
  }
})
