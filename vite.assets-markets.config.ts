import { defineConfig } from "vite";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import * as sass from "sass";

// Function to read application_url from shopify.app.toml
function getApplicationUrl(): string {
  try {
    const tomlContent = readFileSync(resolve(__dirname, 'shopify.app.toml'), 'utf-8');
    const match = tomlContent.match(/application_url\s*=\s*"([^"]+)"/);
    if (match) {
      return match[1];
    }
  } catch (error) {
    console.warn('⚠️ Could not read shopify.app.toml:', error);
  }
  return "http://localhost";
}

// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176
// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the remix server. The CLI will eventually
// stop passing in HOST, so we can remove this workaround after the next major release.
if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL ||
    process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

// Log environment variables for debugging
console.log("🔍 Environment Debug (Markets):");
console.log("  SHOPIFY_APP_URL:", process.env.SHOPIFY_APP_URL);
console.log("  NODE_ENV:", process.env.NODE_ENV);
console.log("  HOST:", process.env.HOST);

// Custom plugin to handle SCSS compilation and string replacement
const publicAssetsPlugin = () => {
  const HOST_PROD = "https://ngr-app2.herokuapp.com";
  const isProduction = process.env.NODE_ENV === "production";
  const HOST = isProduction ? HOST_PROD : (process.env.SHOPIFY_APP_URL || getApplicationUrl());

  console.log("🎯 Plugin Debug (Markets):");
  console.log("  isProduction:", isProduction);
  console.log("  HOST_PROD:", HOST_PROD);
  console.log("  Final HOST:", HOST);

  return {
    name: 'public-assets-compiler',
    buildStart() {
      try {
        console.log('🔄 Building public assets for extensions...');
        
        // Compile SCSS files
        const indexScss = readFileSync(resolve(__dirname, 'public_assets/index.scss'), 'utf-8');
        const indexMarketsScss = readFileSync(resolve(__dirname, 'public_assets/index-markets.scss'), 'utf-8');
        
        const indexCss = sass.compileString(indexScss, {
          loadPaths: [resolve(__dirname, 'public_assets')],
          style: isProduction ? 'compressed' : 'expanded',
        });
        
        const indexMarketsCss = sass.compileString(indexMarketsScss, {
          loadPaths: [resolve(__dirname, 'public_assets')],
          style: isProduction ? 'compressed' : 'expanded',
        });
        
        // Write compiled CSS to extensions folder
        writeFileSync(resolve(__dirname, 'extensions/ngr-widget/assets/native-geo-redirects.min.css'), indexCss.css);
        writeFileSync(resolve(__dirname, 'extensions/ngr-widget/assets/native-geo-markets.min.css'), indexMarketsCss.css);
        
        console.log('✅ Compiled SCSS files for extensions');
      } catch (error) {
        console.error('❌ Error compiling SCSS files:', error);
      }
    },
    transform(code: string, id: string) {
      // Replace __HOST__ placeholder with actual host
      if (id.includes('public_assets') && code.includes('__HOST__')) {
        console.log(`🔄 Replacing __HOST__ with "${HOST}" in ${id}`);
        return code.replace(/__HOST__/g, JSON.stringify(HOST));
      }
      return code;
    },
  };
};

export default defineConfig({
  plugins: [publicAssetsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'public_assets/index-markets.js'),
      formats: ['iife'],
      name: 'PublicAssetsMarkets',
    },
    outDir: resolve(__dirname, 'extensions/ngr-widget/assets'),
    emptyOutDir: false,
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        entryFileNames: 'native-geo-markets.min.js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name].min.css',
      },
    },
  },
}); 