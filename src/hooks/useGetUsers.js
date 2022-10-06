import useStreamCollection from "./useStreamCollection"

const useGetUsers = () => {
	return useStreamCollection('users')
}

export default useGetUsers