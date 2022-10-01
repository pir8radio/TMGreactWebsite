import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  value: string;
  isLoading?: boolean;
  secondaryValue?: string;
}

export const KpiCard = ({ title, value, isLoading, secondaryValue }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 2, boxShadow: 6, height: "100%", p: 2 }}
    >
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={75}
          sx={{ borderRadius: 2 }}
        />
      )}

      {!isLoading && (
        <Stack direction="column">
          <Typography color="textSecondary" fontWeight={500}>
            {title}
          </Typography>

          <Typography fontWeight={700}>{value}</Typography>

          {secondaryValue && (
            <Typography variant="body2">{secondaryValue}</Typography>
          )}
        </Stack>
      )}
    </Card>
  );
};
