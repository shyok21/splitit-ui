import { useSelector } from "react-redux";
import { CenteredDivContainer, Page } from "../styles/components/common";
import AllExpenseGroups from "./AllExpenseGroups";
import { LoginPage } from "./LoginPage";

export default function HomePage() {
  const user = useSelector((state) => state.user.value);

  return (
    <Page
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <CenteredDivContainer>
        {user ? <AllExpenseGroups /> : <LoginPage />}
      </CenteredDivContainer>
    </Page>
  );
}
