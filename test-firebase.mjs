import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import admin from 'firebase-admin';

async function run() {
  console.log('--- TEST FIREBASE ---');
  let clientAuthFailed = false;
  let adminAuthFailed = false;

  console.log('1. Testing Client SDK...');
  try {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log('Client SDK initialized. Testing sign-in with dummy credentials...');
    
    await signInWithEmailAndPassword(auth, 'admin@onetire.sa', 'dummy_password');
  } catch (err) {
    console.log('Client SDK threw error:', err.name, err.code, err.message);
    if (err.code === 'auth/invalid-credential') {
      console.log('=> SUCCESS: Found auth/invalid-credential in Client SDK.');
      clientAuthFailed = true;
    }
  }

  console.log('\n2. Testing Admin SDK...');
  try {
    const firebaseAdminConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined,
    };
    admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
    });
    console.log('Admin SDK initialized successfully.');
  } catch (err) {
    console.log('Admin SDK threw error:', err.name, err.code, err.message);
    if (err.code === 'app/invalid-credential') {
      console.log('=> SUCCESS: Found auth/invalid-credential in Admin SDK.');
      adminAuthFailed = true;
    }
  }

  console.log('\n--- DIAGNOSIS ---');
  if (clientAuthFailed && !adminAuthFailed) {
    console.log('The auth/invalid-credential error comes from the Client SDK during sign in, meaning the credentials (email/password) provided do not match any user in the Firebase project, or the API Key points to a Firebase project where this user does not exist.');
  } else if (!clientAuthFailed && adminAuthFailed) {
    console.log('The auth/invalid-credential error comes from the Admin SDK during initialization due to invalid admin credentials.');
  } else {
    console.log('Check the logs above for the exact root cause.');
  }
}

run();
