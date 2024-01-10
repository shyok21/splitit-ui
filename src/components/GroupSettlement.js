import { useEffect, useState } from 'react';
import { addExpenses, getExpensesByGroupId } from '../utils/api';
import { Fab, Dialog, DialogTitle, DialogContent, Grid, TextField, Button, CircularProgress, Checkbox } from '@mui/material';
import { IconFactory } from './IconFactory';
import { groupMembersSectionStyle } from '../styles/components/GroupExchange';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { ShowDate } from '../styles/components/common';
import { useSelector } from 'react-redux';
import { getFormattedCost } from '../utils/utility';
import { Constant } from '../utils/constant';

const AddSettlementForm = ({ open, handleClose, groupId, members, addToSettle }) => {

	const [name, setName] = useState("");
    const [ description, setDescription ] = useState("");
    const [totalExpense, setTotalExpense] = useState(0);
    const [spenderOption, setSpenderOption] = useState(members[0]);
    const [borrowersStatus, setBorrowersStatus] = useState(Object.fromEntries(members.map(({user_id}) => [user_id, true])));

    const checkHandler = (userId) => {
        setBorrowersStatus(prevStatus => {
            const newStatus = { ...prevStatus };
            newStatus[userId] = !newStatus[userId];
            return newStatus;
        });
    }
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

        const borrowersList = Object.keys(borrowersStatus)
            .filter(borrower => borrowersStatus[borrower])

        const formData = {
            group: groupId,
            name,
            description,
            owner: members[0].user_id,
            type: 'EXPENSE',
            spenders: [{
                amount: "" + totalExpense,
                expense: totalExpense,
                owner: spenderOption
            }],
            borrowers: borrowersList.map(owner => ({
                amount: "" + totalExpense / borrowersList.length,
                expense: totalExpense / borrowersList.length,
                owner
            }))
        }

        await addExpenses(formData);
        addToSettle(formData);
		setLoading(false);

        setName("");
        setDescription("");
        setTotalExpense(0);
        setSpenderOption(members[0]);
        setBorrowersStatus(Object.fromEntries(members.map(({ user_id }) => [user_id, true])));
        
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="add-expense-title"

			style={{
				width: '100%',
				height: '100%'
			}}
		>
			<DialogTitle id="add-expense-title">
				{"Add new expenses in the group"}
			</DialogTitle>
			<DialogContent style={{
				height: '100vw',
				background: "secondary"
			}}>
				<form onSubmit={handleSubmit}>
					<Grid container direction="column" alignItems="center">
						<TextField
							required
							label="Name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							variant="outlined"
                            sx={{ margin: '10px' }}
						/>

                        <TextField
							label="Description"
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							variant="outlined"
                            sx={{ margin: '10px' }}
						/>

                        <TextField
							required
                            type="number"
							label="Expense"
							name="expense"
							value={totalExpense}
							onChange={(e) => setTotalExpense(+e.target.value)}
							variant="outlined"
                            sx={{ margin: '10px' }}
						/>
                        <InputLabel id="select-spender">Spender</InputLabel>
                        <Select
                            required
                            labelId="select-spender"
                            value={spenderOption}
                            label="Spender"
                            name="spender"
                            onChange={(e) => setSpenderOption(e.target.value)}
                            sx={{ margin: '10px', width: '80%' }}
                        >
                            {
                                members.map(({user_id, user_name}) => 
                                    <MenuItem value={user_id}>{user_name}</MenuItem>
                                )
                            }

                        </Select>
                        <p>Borrowers</p>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                            
                            {
                                members.map(({user_id, user_name}) => 
                                    <label>
                                        <Checkbox
                                            value={ borrowersStatus[user_id] }
                                            checked={ borrowersStatus[user_id]  ? true : false}
                                            onChange={() => checkHandler(user_id)}
                                        />
                                        { user_name }
                                    </label>    
                                )
                            }
                        </div>

						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={loading}
							style={{ margin: '10px' }}
						>
							Submit
							{loading && (
								<CircularProgress
									size={12}
									sx={{ marginLeft: "2px" }}
									color="inherit"
								/>
							)}
						</Button>
					</Grid>
				</form>
			</DialogContent>
		</Dialog>
	);
};

const getSettledMoney = (borrowers, isMoneyLent, userId) => {
    if(isMoneyLent) {
        return borrowers.filter(({owner}) => owner !== userId).reduce((a, b) => a + (+b.amount), 0);
    }
    return +borrowers.filter(({owner}) => owner === userId)[0]?.amount
}

const ShowLentStatus = ({ width, height, settle, user }) => {
    const isMoneyLent = user.id === settle.spenders[0].owner
    const moneyLentStatus = isMoneyLent ? 'You lent' : 'You borrowed';
    const settleMoney = getSettledMoney(settle.borrowers, isMoneyLent, user.id)

    return (
        <div style={{
            width,
            height,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: isMoneyLent ? Constant.greenTextColor : Constant.redTextColor
        }}>
            <div style={{
                height: '50%', 
                fontSize: '3vw'
            }}>
                {moneyLentStatus}
            </div>
            <div style={{height: '50%', fontSize: '4vw', fontWeight: 'bold'}}>
            {
                getFormattedCost(settleMoney)
            }
            </div>
        </div>
    )
}

const GroupSettlement = ({ members, groupId }) => {
	const [settles, setSettles] = useState(null);
	const [showAddDialog, setShowAddDialog] = useState(false);

    const addSettles = (data) => {
        const newEntry = {
            group: data.group,
            name: data.name,
            description: data.description,
            date: Date.now(),
            owner_name: data.owner,
            type: data.type,
            spenders: data.spenders,
            borrowers: data.borrowers
        }

        setSettles((prevSettles) => [...prevSettles, newEntry]);
    }

    const user = useSelector(state => state.user.value);

    useEffect(() => {
        getExpensesByGroupId(groupId)
            .then((data) => setSettles(data))
            .catch((error) => console.log(error));
    }, [groupId])

	return (
		<div style={groupMembersSectionStyle}>

            {
                settles && settles.map((settle, index) => <div key={index} style={{
                    width: '100vw',
                    height: '16vw',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ShowDate date={settle.date} width='12vw' height='14vw' />
                    <div style={{
                        width: '60vw',
                        height: '14vw',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: '2vw'
                    }}>
                        <div style={{height: '60%', fontSize: '6vw', fontWeight: 'bold'}}>{settle.name}</div>
                        <div style={{height: '40%', fontSize: '4vw', color: 'grey'}}>{
                            settle.spenders[0].owner === user.id
                                ? `You paid ${getFormattedCost(settle.spenders[0].amount)}`
                                : `Someone paid ${getFormattedCost(settle.spenders[0].amount)}`
                        }
                        </div>
                    </div>
                    <ShowLentStatus width='25vw' height='14vw' settle={settle} user={user} />
                </div>)
            }
            {
                !settles && <CircularProgress />
            }
            {
                settles && settles.length === 0 && <h3>Group Is Settled</h3>
            }

			<AddSettlementForm
				open={showAddDialog}
                members={members}
				handleClose={() => setShowAddDialog(false)}
				addToSettle={addSettles}
				groupId={groupId}
			/>

			<Fab
				size="large"
				color="secondary"
				sx={{
					position: "absolute",
					bottom: "10px",
					right: "10px",
				}}
				onClick={() => {
					setShowAddDialog(true);
				}}
			>
				<IconFactory id='receipt' style={{ fontSize: '2em' }} />
			</Fab>
		</div>
	)
}

export default GroupSettlement;