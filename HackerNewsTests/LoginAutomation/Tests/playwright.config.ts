import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Alternatively, read from "../my.env" file.
dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

export default defineConfig({
  use: {
    baseURL: process.env.STAGING === '1' ? 'http://staging.example.test/' : 'http://example.test/',

    // Run browser in headless mode.
    headless: false,
  },

  // expect: {
  //   timeout: 10000,
  // },


});


