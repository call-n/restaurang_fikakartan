import useStreamDocument from "./useStreamDocument"

const useGetTip = (id) => {
	return useStreamDocument('tips', id)
}

export default useGetTip