
import { useEffect, useState, useRef } from "react"
import { db } from "../firebase"
import { collection, onSnapshot } from 'firebase/firestore'

export const useCollection = (collectionid, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = collection(db, collectionid)

        if (query) {
            ref = ref.where(...query)
        }
        if (orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({ id: doc.id , ...doc.data()})
        })
        
        setDocuments(results)
        setError(null)
        }, error => {
        console.log(error)
        setError('could not fetch the data')
        })

        return () => unsubscribe()

    }, [collection, query])

    return { documents, error }
}