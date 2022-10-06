import useStreamCollection from "./useStreamCollection"

// get all users from users collection
const useGetUsers = () => {
	return useStreamCollection('users')
}

export default useGetUsers