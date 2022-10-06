import useGetTips from '../hooks/useGetTips'
import {useMemo} from 'react'
import {Container, Button} from 'react-bootstrap'
import SortableTable from '../components/SortableTable'
import {Link} from 'react-router-dom'

const TipsPage = () => {
    const {data: tips, error, isError, isLoading} = useGetTips('tips')

    const columns = useMemo(() => {
        return[
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Address',
                accessor: 'address'
            },
            {
                Header: 'Description',
                accessor: 'description'
            },
            {
                Header: 'Show tip',
                Cell: ({row: {original: tip}}) =>
                <Button as={Link} to={`/tip/${tip.id}`}>
                    Show tip
                </Button>
            }
        ]
    }, [])

    return (
        <>
            <Container className="my-3">
                <h1>Alla tips:</h1>

                {isLoading && (<p>Loading....</p>)}

                {isError && (<p>{error.message}</p>)}

                {tips && <SortableTable columns={columns} data={tips} />}
                
            </Container>
        </>
	)
}

export default TipsPage