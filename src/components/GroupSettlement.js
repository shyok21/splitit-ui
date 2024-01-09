import { useEffect, useState } from 'react';
import { addExpenses, getExpensesByGroupId } from '../utils/api';
import { Fab, Dialog, DialogTitle, DialogContent, Grid, TextField, Button, CircularProgress, Checkbox } from '@mui/material';
import { IconFactory } from './IconFactory';
import { groupMembersSectionStyle } from '../styles/components/GroupExchange';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { ShowDate } from '../styles/components/common';

const AddSettlementForm = ({ open, handleClose, groupId, members }) => {

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
		setLoading(false);
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

const GroupSettlement = ({ members, groupId }) => {
	const [settles, setSettles] = useState([]);
	const [showAddDialog, setShowAddDialog] = useState(false);

    useEffect(() => {
        getExpensesByGroupId(groupId)
            .then((data) => setSettles(data))
            .catch((error) => console.log(error));
    }, [groupId])

    console.log(settles)

	return (
		<div style={groupMembersSectionStyle}>

            {
                settles.map(settle => <div style={{
                    width: '100vw',
                    height: '16vw',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <ShowDate date={settle.date} width='14vw' height='14vw' />
                </div>)
            }

			<AddSettlementForm
				open={showAddDialog}
                members={members}
				handleClose={() => setShowAddDialog(false)}
				// addToExpenseGroupList={addGroupMembers}
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