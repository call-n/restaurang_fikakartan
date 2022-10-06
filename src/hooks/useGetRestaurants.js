import useStreamCollection from './useStreamCollection'

// get 'restaurants' collection
const useGetRestaurants = () => {
	return useStreamCollection('restaurants')
}

export default useGetRestaurants