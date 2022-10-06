import UpdateRestaurantForm from "../components/UpdateRestaurantForm";
import { useParams } from "react-router-dom";
import useGetRestaurant from "../hooks/useGetRestaurant";

const UpdateRestaurantPage = () => {
    const {id} = useParams()
    const {data: restaurant, error, isError, isLoading} = useGetRestaurant(id)
    return(
        <>
            <UpdateRestaurantForm restaurant={restaurant}/>
        </>
    )
}

export default UpdateRestaurantPage