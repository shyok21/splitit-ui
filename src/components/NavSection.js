import { Section } from "../styles/components/Section"
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Constant } from "../utils/constant";

const iconStyle = { 
    fontSize: "2.2em", 
    width: '20vw', 
    cursor: 'pointer', 
    textAlign: 'center' 
}

const linkStyle = { 
    width: '100%', 
    height: '50px', 
    display: 'flex', 
    flexDirection: 'row',
    border: `solid ${Constant.darkBackgroundColor} 1px`,
    color: 'white',
    alignItems: 'center',
    textDecoration: 'none'
}

const sections = [
    { id: 'group', title: 'Group' },
    { id: 'friends', title: 'Friends' },
    { id: 'activity', title: 'Activity' },
    { id: 'account', title: 'Account' }
]

export const IconFactory = ({ id, style, onClick }) => {
    if(id === 'group') {
        return (
            <GroupIcon style={style} onClick={onClick} />
        )
    } else if(id === 'friends') {
        return (
            <PersonIcon style={style} onClick={onClick} /> 
        )
    } else if(id === 'activity') {
        return (
            <ShowChartIcon style={style} onClick={onClick} />
        )
    } else {
        return (
            <AccountCircleIcon style={style} onClick={onClick} />
        )
    }
}

const NavSection = (props) => {
    return (
        <Section>
            {
                sections.map(({ id, title }) => 
                    <a href={`/${id}`} style={{
                        ...linkStyle,
                        backgroundColor: `${id === props.section ? 
                            Constant.selectedOptionBackgroundColor : 
                            Constant.selectableOptionBackgroundColor }`
                    }} >
                        <IconFactory id={id} style={iconStyle} />
                        <h3>{ title }</h3>
                    </a>
                )
            }
        </Section>
    )
}

export default NavSection;