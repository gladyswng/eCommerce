import Firebase from "firebase"
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from "./config";


export const firebase = Firebase.initializeApp(firebaseConfig)

export const auth = Firebase.auth()
export const fireStore = Firebase.firestore()

// set up provider for google, twitter etc.
const GoogleProvider = new Firebase.auth.GoogleAuthProvider()
GoogleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider)

export const handleUserProfile = async (userAuth, additionalData) => {
  // check user is valid User
  const { uid } = userAuth
  if (!userAuth) return
  const userRef = fireStore.doc(`users/${uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    const timestamp = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData
      })
    } catch (err) {
      console.log(err)
    }
  }

  return userRef

} 