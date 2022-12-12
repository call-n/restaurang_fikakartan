import useGetUsers from "../hooks/useGetUsers"
import {useMemo} from 'react'
import SortableTable from '../components/SortableTable'
import  Container  from "react-bootstrap/Container"

const AdminPage = () => {
    const {data: users, error, isError, isLoading} = useGetUsers('users')

    const columns = useMemo(() => {
        return[
            {
                Header: 'ProfilePic',
                accessor: 'imageURL',
                Cell: tableProps => (
                    <img 
                        src={tableProps.row.original.imageURL}
                        width={60}
                    />
                )
            },
            {
                Header: 'name',
                accessor:'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                id: 'admin',
                Header: 'Admin',
                accessor: d => d.admin.toString(),
            }
        ]
    }, [])

    return(
        <>
            <Container className="my-3">
                <h1>Admins</h1>

                {isLoading && (<p>Loading....</p>)}

                {isError && (<p>{error.message}</p>)}

                {users && <SortableTable columns={columns} data={users} />}

            </Container>
        </>
    )
}

export default AdminPage
