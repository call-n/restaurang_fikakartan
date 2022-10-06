import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const useStreamDocument = (col, id) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const ref = doc(db, col, id)

		const unsubscribe = onSnapshot(ref, (snapshot) => {
			setData({
				id: snapshot.id,
				...snapshot.data(),
			})
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return {
		data,
		loading,
	}
}

export default useStreamDocument