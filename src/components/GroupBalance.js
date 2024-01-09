import { useEffect, useState } from "react";
import { getBalancesByGroupId } from "../utils/api";
import { useParams } from 'react-router-dom';

const GroupBalance = () => {
    const { id } = useParams();
    const [ balance, setBalance ] = useState(null);

    useEffect(() => {
        getBalancesByGroupId(id)
            .then((data) => setBalance(data))
            .catch(error => console.log(error))
    }, [id])

    console.log(balance);

    return (
        <div>Hello Balance</div>
    )
}

export default GroupBalance;