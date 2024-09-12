import { defineConfig } from '@playwright/test';

export default defineConfig({
    // Give failing test 3 retry attempts
    retries: 3,
});