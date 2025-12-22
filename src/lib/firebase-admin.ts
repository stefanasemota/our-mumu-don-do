import * as admin from 'firebase-admin';
import { config } from 'dotenv';

// Load environment variables from .env file for local development
config();

// This is the service account for the Firebase project.
// It's safe to expose this in server-side code, but it should never be
// exposed to the client.
const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // The private key needs to have its newlines correctly formatted.
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  }

  // Check if necessary environment variables are set
  if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
    const errorMessage = `Firebase admin environment variables are not set. Check your .env file or deployment configuration.
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
    console.error('Error initializing Firebase Admin SDK:', error);
    throw new Error(`Failed to initialize Firebase Admin SDK. Raw error: ${error.message}`);
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
