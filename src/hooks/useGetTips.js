import useStreamCollection from "./useStreamCollection"

const useGetAllTips = () => {
	return useStreamCollection('tips')
}

export default useGetAllTips