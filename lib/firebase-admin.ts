import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined,
};

export function getAdminAuth() {
  if (getApps().length === 0) {
    try {
      initializeApp({
        credential: cert(firebaseAdminConfig),
      });
    } catch (error) {
      console.error('Firebase admin initialization failed:', error);
    }
  }
  return getAuth();
}
