import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

interface Props {
  imgUrl: string;
  title: string;
  description: string;
  siteUrl: string;
}

export const MediaCard = ({ imgUrl, title, description, siteUrl }: Props) => (
  <Card sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}>
    <CardMedia component="img" height="140" image={imgUrl} alt={title} />

    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {title}
      </Typography>

      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </CardContent>

    <Box width="100%" p={2} pt={0}>
      <Link href={siteUrl} passHref>
        <a target="_blank">
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Learn More
          </Button>
        </a>
      </Link>
    </Box>
  </Card>
);
