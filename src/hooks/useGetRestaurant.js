import useStreamDocument from './useStreamDocument'

// get document with specific id from collection 'restaurants'
const useGetRestaurant = (id) => {
	return useStreamDocument('restaurants', id)
}

export default useGetRestaurant