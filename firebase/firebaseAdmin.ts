import * as firebaseAdmin from 'firebase-admin'

// get this JSON from the Firebase board
// you can also store the values in environment variables

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n')
        : undefined,
      clientEmail:
        'firebase-adminsdk-mrx83@cop4808-g15.iam.gserviceaccount.com',
      projectId: 'cop4808-g15',
    }),
  })
}

export { firebaseAdmin }
