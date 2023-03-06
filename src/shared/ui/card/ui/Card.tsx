import MuiCard, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

const Card = ({
  title,
  children,
  cardProps,
}: {
  title: string;
  children: ReactNode;
  cardProps?: CardProps;
}) => {
  const defaultCardProps: CardProps = {
    variant: "outlined",
    ...cardProps,
  };

  return (
    <MuiCard {...defaultCardProps}>
      <CardContent>
        <Typography variant="subtitle1" component="h3" sx={{ mb: 1.5 }}>
          {title}
        </Typography>

        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;
