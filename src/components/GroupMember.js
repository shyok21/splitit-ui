import { useState, useEffect } from 'react';
import { addMemberToGroup, getAllUsers } from '../utils/api';
import { Fab, Dialog, DialogTitle, DialogContent, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { IconFactory } from './IconFactory';
import { groupMembersSectionStyle, groupMembersStyle, userOptionStyle } from '../styles/components/GroupExchange';


const AddMemberForm = ({ open, handleClose, addToExpenseGroupList, groupId }) => {
	const [users, setUsers] = useState([]);
	const [options, setOptions] = useState([]);

	const [textValue, setTextValue] = useState("");

	useEffect(() => {
		getAllUsers()
			.then(data => setUsers(data))
			.catch(error => console.log('Error in fetching data', error));
	}, []);


	const [formData, setFormData] = useState({
		user_id: ""
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { value } = e.target;
		setTextValue(value);

		if (value.length > 2) {
			setOptions(users.filter(({ name, email }) => name.indexOf(value) >= 0 || email.indexOf(value) >= 0))
		} else {
			setOptions([]);
		}
	};

	const selectOption = ({ email, id }) => {
		setTextValue(email);
		setFormData({ user_id: id })
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await addMemberToGroup(formData, groupId);

		// addToExpenseGroupList(expenseGroup);
		setFormData({
			user_id: ""
		});
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
				{"Add new members in the group"}
			</DialogTitle>
			<DialogContent style={{
				height: '90vw',
				background: "secondary"
			}}>
				<form onSubmit={handleSubmit}>
					<Grid container direction="column" alignItems="center">
						<TextField
							required
							label="Name"
							name="name"
							value={textValue}
							onChange={handleChange}
							variant="outlined"
						/>
						{
							options.slice(0, 5).map(({ email, name, id }) => <div style={userOptionStyle}
								onClick={() => selectOption({ email, id })}
							>
								<div>{name}</div>
								<div>{email}</div>
							</div>)
						}
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

const GroupMembers = ({ members, groupId }) => {
	const [groupMembers, setGroupMembers] = useState(members);
	const [showAddDialog, setShowAddDialog] = useState(false);

    console.log(groupMembers)

	const addGroupMembers = (newExpenseGroup) => {
		setGroupMembers((prevState) => {
			if (prevState.length) {
				return [...prevState, newExpenseGroup];
			} else {
				return [newExpenseGroup];
			}
		});
	};

	return (
		<div style={groupMembersSectionStyle}>
			{
				groupMembers.map(({ user_name }) =>
					<div style={groupMembersStyle}>
						<IconFactory id='face' style={{ fontSize: '10vw' }} />
						<h3 style={{ marginLeft: '10px' }}>{user_name}</h3>
					</div>
				)
			}


			<AddMemberForm
				open={showAddDialog}
				handleClose={() => setShowAddDialog(false)}
				addToExpenseGroupList={addGroupMembers}
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
				<IconFactory id='add' style={{ fontSize: '2em' }} />
			</Fab>
		</div>
	)
}

export default GroupMembers;