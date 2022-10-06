import {useState, useEffect} from 'react'
import {db} from '../firebase'
import {collection, onSnapshot, query} from 'firebase/firestore'


const useStreamCollection = (col, ...queryConstraints) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const colRef = collection(db, col)
        const queryRef = query(colRef, ...queryConstraints)

        const unSubscribe = onSnapshot(queryRef,(snapshot) =>{
            const docs = snapshot.docs.map((doc) =>{
                return {
                    id:doc.id,
                    ...doc.data(),
                }
            })

            setData(docs)
            setLoading(false)

        })
        return unSubscribe

    },[])
  return {
      data,
      loading,
  }
}

export default useStreamCollection