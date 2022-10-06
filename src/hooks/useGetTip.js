import useStreamDocument from "./useStreamDocument"

// get get document with specific id from collection tips
const useGetTip = (id) => {
	return useStreamDocument('tips', id)
}

export default useGetTip