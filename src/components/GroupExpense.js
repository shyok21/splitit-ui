import { useParams } from 'react-router-dom';
import { HomepageBody } from '../styles/components/GroupPage';
import CommonAppBar from '../utils/Appbar';
import { useState, useEffect } from 'react';
import { getGroupById } from '../utils/api';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Tabs, Tab } from '@mui/material';
import { IconFactory } from './IconFactory';
import { groupExpenseStyle, navIconStyle } from '../styles/components/GroupExchange';

import GroupSectionFactory from './GroupSectionFactory';

const tabSections = [
	{ id: 'settle-up', title: 'Settle Up' },
	{ id: 'members', title: 'Members' },
	{ id: 'balance', title: 'Balance' },
	{ id: 'total', title: 'Total' },
]

const GroupExpense = () => {

	const { id } = useParams();
	const [groupDetails, setGroupDetails] = useState(null);
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	const handleChange = (event, newValue) => {
		setSelectedTabIndex(newValue);
	};

	useEffect(() => {
		getGroupById(id)
			.then(data => setGroupDetails(data))
			.catch(error => console.log('Error in fetching data', error));
	}, [id]);

	if (groupDetails)
		return (
			<HomepageBody>
				<CommonAppBar section='group' expense={-1000} />
				<div style={groupExpenseStyle}>
					<FormatListBulletedIcon style={navIconStyle} />
					<h1>{groupDetails?.name}</h1>

				</div>

				<Tabs
					value={selectedTabIndex}
					onChange={handleChange}
					indicatorColor="secondary"
					textColor="inherit"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					{
						tabSections.map(({ id }) => <Tab label={<IconFactory id={id} style={{ fontSize: '2.5em' }} />} />)
					}
				</Tabs>
				<GroupSectionFactory id={selectedTabIndex} members={groupDetails?.members} groupId={id} />
			</HomepageBody>
		)
	else
		return (<h1>Loading</h1>)
}

export default GroupExpense;