declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
      GOOGLE_PRIVATE_KEY: string;
      GOOGLE_SHEET_ID: string;
      DATOCMS_API_TOKEN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
