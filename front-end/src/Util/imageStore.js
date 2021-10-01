import firebase from 'firebase'
import { app } from '../firebase'

const db = app.firestore()
const storage = app.storage()

const storeProfilePictureOnFirebase = async (file, email) => {
  const storageRef = storage.ref()
  const fileRef = storageRef.child(file.name)
  await fileRef.put(file)

  return db
    .collection('UsersProfiles')
    .doc(email)
    .update({
      images: firebase.firestore.FieldValue.arrayUnion({
        name: file.name,
        url: await fileRef.getDownloadURL(),
        album: email
      })
    })
}

export const firestoreThisImage = async (file, email, userAlbum) => {
  file && (await storeProfilePictureOnFirebase(file, email))
  return true
}
