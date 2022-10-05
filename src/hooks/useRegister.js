import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { auth, storage, db } from '../firebase'
import { 
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

export const useRegister = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const register = async (email, password, displayName, photo) => {
    setError(null)
    setIsPending(true)
  
    try {
        // register
        const res = await createUserWithEmailAndPassword(auth, email, password)

        if (!res) {
            throw new Error('Could not complete register')
        }

        let photoURL = auth.currentUser.photoURL
        
        if (photo) {
            const fileRef = ref(storage, `photos/${auth.currentUser.email}/${photo.name}`)
            try {
                const uploadResult = await uploadBytes(fileRef, photo)

                photoURL = await getDownloadURL(uploadResult.ref)

                console.log("Photo uploaded successfully, download url is:", photoURL)
            } catch (e) {
                console.log("Upload failed", e)
                setError("Photo failed to upload!")
            }
        }	

        updateProfile(auth.currentUser, {
            displayName,
            photoURL,
        })

        const docRef = doc(db, 'users', auth.currentUser.uid)
		await setDoc(docRef, {
			displayName,
			email,
			photoURL,
			admin: false,
		})

        // dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user })

        if (!isCancelled) {
            setIsPending(false)
            setError(null)
        }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { register, error, isPending }
}