import { useParams } from 'react-router-dom';
import { HomepageBody } from '../styles/components/GroupPage';
import CommonAppBar from '../utils/Appbar';

const GroupExpense = () => {

    const { id } = useParams();

    return (
        <HomepageBody>
            <CommonAppBar section='group' expense={-1000} />
            <h1>Group Id: {id}</h1>
        </HomepageBody>
    )
}

export default GroupExpense;