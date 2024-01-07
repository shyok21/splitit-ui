import { Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import { CenteredDivContainer, Page } from "../styles/components/common";
import { getToken, signIn } from "../utils/firebase";

export default function HomePage() {
  return (
    <Page
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <CenteredDivContainer>
        <Typography variant="h3">SPLIT IT</Typography>

        <GoogleButton
          type="dark"
          onClick={async () => {
            await signIn();
            await getToken();
          }}
        />
      </CenteredDivContainer>
    </Page>
  );
}
