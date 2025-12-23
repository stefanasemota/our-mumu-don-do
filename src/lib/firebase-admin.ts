import * as admin from 'firebase-admin';
import { config } from 'dotenv';

// Load environment variables from .env file for local development
config();

function initializeAdminApp() {
  // If the app is already initialized, return it.
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  }

  // When deployed to App Hosting, the Admin SDK can be initialized without any arguments.
  // It automatically uses Application Default Credentials.
  if (process.env.NODE_ENV === 'production' && process.env.FIREBASE_APP_HOSTING_URL) {
    try {
      const app = admin.initializeApp();
      return app;
    } catch (error: any) {
      console.error('Failed to initialize Firebase Admin SDK in production:', error);
      throw new Error(`Failed to initialize Firebase Admin SDK in production. Raw error: ${error.message}`);
    }
  } else {
    // For local development, we use a service account from a .env file.
    const serviceAccount = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // The private key needs to have its newlines correctly formatted.
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
      const errorMessage = `Firebase admin environment variables are not set for local development. Check your .env file.
        - NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${!!serviceAccount.projectId}
        - FIREBASE_CLIENT_EMAIL: ${!!serviceAccount.clientEmail}
        - FIREBASE_PRIVATE_KEY: ${!!serviceAccount.privateKey}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    try {
      const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
      });
      return app;
    } catch (error: any) {
      console.error('Error initializing Firebase Admin SDK for local development:', error);
      throw new Error(`Failed to initialize Firebase Admin SDK locally. Raw error: ${error.message}`);
    }
  }
}

export function getAdminDB() {
  const app = initializeAdminApp();
  return app.firestore();
}

export function getAdminAuth() {
  const app = initializeAdminApp();
  return app.auth();
}
