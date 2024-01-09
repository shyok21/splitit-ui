import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BalanceIcon from '@mui/icons-material/Balance';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import FaceIcon from '@mui/icons-material/Face';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Add } from '@mui/icons-material';

export const IconFactory = ({ id, style, onClick }) => {
    const iconById = {
        'group': <GroupIcon style={style} onClick={onClick} />,
        'friends': <PersonIcon style={style} onClick={onClick} />,
        'activity': <ShowChartIcon style={style} onClick={onClick} />,
        'account': <AccountCircleIcon style={style} onClick={onClick} />,
        'members': <GroupsIcon style={style} onClick={onClick} />,
        'settle-up': <HandshakeIcon style={style} onClick={onClick} />,
        'balance': <BalanceIcon style={style} onClick={onClick} />,
        'total': <IntegrationInstructionsIcon style={style} onClick={onClick} />,
        'add': <Add style={style} onClick={onClick} />,
        'face': <FaceIcon style={style} onClick={onClick} />,
        'receipt': <ReceiptIcon style={style} onClick={onClick} />,
      };
      
      return iconById[id] || <div></div>;
}