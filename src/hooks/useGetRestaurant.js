import useStreamDocument from './useStreamDocument'

const useGetRestaurant = (id) => {
	return useStreamDocument('restaurants', id)
}

export default useGetRestaurant