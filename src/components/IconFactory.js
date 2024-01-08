import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BalanceIcon from '@mui/icons-material/Balance';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import FaceIcon from '@mui/icons-material/Face';
import { Add } from '@mui/icons-material';

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
    } else if(id === 'account') {
        return (
            <AccountCircleIcon style={style} onClick={onClick} />
        )
    } else if(id === 'members') {
        return (
            <GroupsIcon style={style} onClick={onClick} />
        )
    } else if(id === 'settle-up') {
        return (
            <HandshakeIcon style={style} onClick={onClick} />
        )
    } else if(id === 'balance') {
        return (
            <BalanceIcon style={style} onClick={onClick} />
        )
    } else if(id === 'total') {
        return (
            <IntegrationInstructionsIcon style={style} onClick={onClick} />
        )
    } else if(id === 'add') {
        return (
            <Add style={style} onClick={onClick} />
        )
    } else if(id === 'face') {
        return (
            <FaceIcon style={style} onClick={onClick} />
        )
    }
    
    else {
        return (<div></div>)
    }
}