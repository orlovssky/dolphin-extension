import MuiCard, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const Card = ({
  titleNode,
  cardProps = {},
  children,
}: {
  titleNode: string;
  cardProps?: CardProps;
  children: ReactNode;
}) => {
  const { t } = useTranslation();

  return (
    <MuiCard {...cardProps} variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" component="h3" sx={{ mb: 1.5 }}>
          {t(titleNode)}
        </Typography>

        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
