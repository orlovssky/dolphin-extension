import CardContent from "@mui/material/CardContent";
import MuiCard, { CardProps } from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

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
        <Typography gutterBottom variant="subtitle1" component="h3">
          {t(titleNode)}
        </Typography>

        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
