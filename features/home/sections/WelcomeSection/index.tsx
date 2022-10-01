import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const WelcomeSection = () => {
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
        Welcome to The Mining Game
      </Typography>

      <Typography align="center" width="100%" gutterBottom>
        A competition game where the contract that sends the best deadline wins
        a TMG token.
      </Typography>

      <Link href="/faq" passHref>
        <Typography align="center" width="100%" component="a">
          <u>¿How it works? See quick guide</u>
        </Typography>
      </Link>
    </Box>
  );
};
