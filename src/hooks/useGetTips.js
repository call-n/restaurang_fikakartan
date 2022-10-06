import useStreamCollection from "./useStreamCollection"

// get tips collection
const useGetAllTips = () => {
	return useStreamCollection('tips')
}

export default useGetAllTips