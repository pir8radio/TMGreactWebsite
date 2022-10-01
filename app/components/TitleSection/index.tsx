import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
}

export const TitleSection = ({ title }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={5}
      sx={{
        color: "white",
        transition: "top 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backdropFilter: "blur(20px)",
        backgroundImage: "url(/assets/banner.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography component="h1" variant="h3" align="center" width="100%">
        {title}
      </Typography>
    </Box>
  );
};
