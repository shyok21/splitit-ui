import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Page = (props) => {
  const theme = useTheme();
  console.log(theme);
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

export { CenteredDivContainer, Page };
