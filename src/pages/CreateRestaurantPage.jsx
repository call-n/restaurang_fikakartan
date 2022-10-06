import CreateRestaurantForm from "../components/CreateRestuarant"
import TipForm from '../components/RestaurantsTipForm'
import UpdateRestaurantForm from "../components/UpdateRestaurantForm"
import UpdateRestaurantPage from "../components/UpdateRestaurantForm"

const CreateRestaurantPage = () => {
    return( 
        <>
            <CreateRestaurantForm/>
            <TipForm/>
            <UpdateRestaurantForm/>
        </>
    )
}

export default CreateRestaurantPage
