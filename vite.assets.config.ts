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

// Log environment variables for debugging
console.log("🔍 Environment Debug:");
console.log("  SHOPIFY_APP_URL:", process.env.SHOPIFY_APP_URL);
console.log("  NODE_ENV:", process.env.NODE_ENV);

const HOST_PROD = "https://ngr-app2.herokuapp.com";
const isProduction = process.env.NODE_ENV === "production";
const HOST = isProduction ? HOST_PROD : (process.env.SHOPIFY_APP_URL || getApplicationUrl());

console.log("🎯 Plugin Debug:");
console.log("  isProduction:", isProduction);
console.log("  HOST_PROD:", HOST_PROD);
console.log("  Final HOST:", HOST);

// Safe custom plugin to handle SCSS compilation and string replacement
const publicAssetsPlugin = () => {
  // Configuration and validation
  const CONFIG = {
    MAX_FILE_SIZE: 1024 * 1024 * 5, // 5MB limit for SCSS files
    MAX_OUTPUT_SIZE: 1024 * 1024 * 2, // 2MB limit for CSS output
    ALLOWED_SCSS_FILES: ['index.scss', 'index-markets.scss'],
    OUTPUT_DIR: 'extensions/ngr-widget/assets',
    SOURCE_DIR: 'public_assets'
  };

  // Secure path validation
  const validatePath = (filePath: string, allowedDir: string): boolean => {
    const resolvedPath = resolve(__dirname, filePath);
    const allowedPath = resolve(__dirname, allowedDir);
    return resolvedPath.startsWith(allowedPath);
  };

  // File size validation
  const validateFileSize = (content: string, maxSize: number): boolean => {
    const sizeInBytes = Buffer.byteLength(content, 'utf8');
    return sizeInBytes <= maxSize;
  };

  // Safe CSS minification function with input validation
  const minifyCSS = (css: string): string => {
    if (!css || typeof css !== 'string') {
      throw new Error('Invalid CSS input for minification');
    }

    if (!validateFileSize(css, CONFIG.MAX_OUTPUT_SIZE)) {
      throw new Error(`CSS output too large (>${CONFIG.MAX_OUTPUT_SIZE} bytes)`);
    }

    if (!isProduction) return css;
    
    try {
      return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/\s*{\s*/g, '{') // Remove spaces around braces
        .replace(/\s*}\s*/g, '}') // Remove spaces around braces
        .replace(/\s*:\s*/g, ':') // Remove spaces around colons
        .replace(/\s*;\s*/g, ';') // Remove spaces around semicolons
        .replace(/\s*,\s*/g, ',') // Remove spaces around commas
        .replace(/\s*>\s*/g, '>') // Remove spaces around >
        .replace(/\s*\+\s*/g, '+') // Remove spaces around +
        .replace(/\s*~\s*/g, '~') // Remove spaces around ~
        .trim();
    } catch (error) {
      console.error('CSS minification failed:', error);
      return css; // Return original CSS if minification fails
    }
  };

  // Safe file reading with validation
  const safeReadFile = (fileName: string): string => {
    if (!CONFIG.ALLOWED_SCSS_FILES.includes(fileName)) {
      throw new Error(`File ${fileName} not in allowed list`);
    }

    const filePath = `${CONFIG.SOURCE_DIR}/${fileName}`;
    if (!validatePath(filePath, CONFIG.SOURCE_DIR)) {
      throw new Error(`Path traversal attempt detected: ${filePath}`);
    }

    const resolvedPath = resolve(__dirname, filePath);
    const content = readFileSync(resolvedPath, 'utf-8');
    
    if (!validateFileSize(content, CONFIG.MAX_FILE_SIZE)) {
      throw new Error(`File ${fileName} too large (>${CONFIG.MAX_FILE_SIZE} bytes)`);
    }

    return content;
  };

  // Safe file writing with validation
  const safeWriteFile = (fileName: string, content: string): void => {
    const outputPath = `${CONFIG.OUTPUT_DIR}/${fileName}`;
    if (!validatePath(outputPath, CONFIG.OUTPUT_DIR)) {
      throw new Error(`Invalid output path: ${outputPath}`);
    }

    if (!validateFileSize(content, CONFIG.MAX_OUTPUT_SIZE)) {
      throw new Error(`Output file ${fileName} too large`);
    }

    const resolvedPath = resolve(__dirname, outputPath);
    writeFileSync(resolvedPath, content, 'utf-8');
  };

  return {
    name: 'public-assets-compiler',
    async buildStart() {
      try {
        console.log('🔄 Building public assets for extensions...');
        
        // Read SCSS files with safety checks
        const indexScss = safeReadFile('index.scss');
        const indexMarketsScss = safeReadFile('index-markets.scss');
        
        // Compile SCSS files with error handling
        const sassOptions = {
          loadPaths: [resolve(__dirname, CONFIG.SOURCE_DIR)],
          style: 'compressed' as const,
          sourceMap: false, // Disable source maps for security
          quietDeps: true,  // Suppress deprecation warnings
          verbose: false    // Reduce log verbosity
        };

        let indexCss, indexMarketsCss;
        try {
          indexCss = sass.compileString(indexScss, sassOptions);
          indexMarketsCss = sass.compileString(indexMarketsScss, sassOptions);
        } catch (sassError) {
          console.error('❌ SCSS compilation failed:', sassError);
          throw new Error(`SCSS compilation failed: ${sassError.message}`);
        }

        // Validate Sass output
        if (!indexCss?.css || !indexMarketsCss?.css) {
          throw new Error('SCSS compilation produced empty output');
        }
        
        // Apply additional CSS minification with safety checks
        const minifiedIndexCss = minifyCSS(indexCss.css);
        const minifiedIndexMarketsCss = minifyCSS(indexMarketsCss.css);
        
        // Write compiled CSS files with safety checks
        safeWriteFile('native-geo-redirects.min.css', minifiedIndexCss);
        safeWriteFile('native-geo-markets.min.css', minifiedIndexMarketsCss);
        
        console.log('✅ Compiled and minified SCSS files for extensions');
        console.log(`   - Redirects CSS: ${minifiedIndexCss.length} chars`);
        console.log(`   - Markets CSS: ${minifiedIndexMarketsCss.length} chars`);
        
      } catch (error) {
        console.error('❌ Error compiling SCSS files:', error);
        // Don't throw to prevent build failure - log and continue
        console.warn('⚠️ Continuing build without SCSS compilation');
      }
    },
    transform(code: string, id: string) {
      try {
        // Validate inputs
        if (!code || typeof code !== 'string' || !id || typeof id !== 'string') {
          return code;
        }

        // Security: Only transform files in the allowed directory
        if (!id.includes(CONFIG.SOURCE_DIR) || !code.includes('__HOST__')) {
          return code;
        }

        // Validate HOST value before replacement
        if (!HOST || typeof HOST !== 'string' || HOST.length > 100) {
          console.warn('⚠️ Invalid HOST value, skipping replacement');
          return code;
        }

        console.log(`🔄 Replacing __HOST__ with "${HOST}" in ${id}`);
        return code.replace(/__HOST__/g, JSON.stringify(HOST));
      } catch (error) {
        console.error('❌ Error in transform:', error);
        return code; // Return original code if transformation fails
      }
    },
  };
};

export default defineConfig({
  plugins: [publicAssetsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'public_assets/index.js'),
      formats: ['iife'],
      name: 'PublicAssets',
    },
    outDir: resolve(__dirname, 'extensions/ngr-widget/assets'),
    emptyOutDir: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        entryFileNames: 'native-geo-redirects.min.js',
        chunkFileNames: '[name]-[hash].js',
      },
    },
  },
}); 