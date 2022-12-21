import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import { THEME_MODES } from "services/constants/app/theme.constants";

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "300px",
  marginTop: "48px",
  boxSizing: "border-box",
  ...(theme.palette.mode === THEME_MODES.DARK && {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey["900"],
  }),
  ...(theme.palette.mode === THEME_MODES.LIGHT && {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.grey["100"],
  }),
}));

const StyledMain = ({ children }: { children: ReactNode }) => (
  <StyledContainer sx={{ py: 2 }}>{children}</StyledContainer>
);

export default StyledMain;
