import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Page = (props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
      }}
    >
      {props.children}
    </Box>
  );
};

const CenteredDivContainer = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {props.children}
    </Box>
  );
};

const ShowDate = (props) => {
  const date = new Date(props.date);
  return (
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: props.width,
          height: props.height,
          alignItems: 'center',
          justifyContent: 'center'
      }}>
          <div style={{height: '25%', fontSize: '5vw'}}>{date.toLocaleString('default', { month: 'short' })}</div>
          <div style={{height: '75%', fontSize: '9vw', fontWeight: 'bold'}}>{date.toLocaleString('en-US', { day: '2-digit' })}</div>
      </div>
  )
}

export { CenteredDivContainer, Page, ShowDate };
