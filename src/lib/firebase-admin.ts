import * as admin from 'firebase-admin';

// This is the service account for the Firebase project.
// It's safe to expose this in server-side code, but it should never be
// exposed to the client.
const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

function initializeAdminApp() {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App;
  }

  // Check if necessary environment variables are set
  if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
    console.error('Firebase admin environment variables are not set. projectId:', !!serviceAccount.projectId, 'clientEmail:', !!serviceAccount.clientEmail, 'privateKey:', !!serviceAccount.privateKey);
    throw new Error('Firebase admin environment variables are not set.');
  }

  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.projectId}.firebaseio.com`,
  });

  return app;
}

export function getAdminDB() {
  const app = initializeAdminApp();
  return app.firestore();
}

export function getAdminAuth() {
  const app = initializeAdminApp();
  return app.auth();
}
