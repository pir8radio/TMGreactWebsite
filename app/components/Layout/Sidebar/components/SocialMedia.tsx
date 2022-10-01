import { openExternalUrl } from "@/app/utils/openExternalUrl";
import { ListRender } from "./ListRender";

import copy from "copy-to-clipboard";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PublicIcon from "@mui/icons-material/Public";
import TelegramIcon from "@mui/icons-material/Telegram";

export const SocialMedia = () => {
  const currentWindows = window.location.href;

  const phrase = "Checkout this site";

  const fbShare = () =>
    openExternalUrl(
      `https://www.facebook.com/sharer/sharer.php?u=${currentWindows}`
    );

  const telegramShare = () =>
    openExternalUrl(
      `https://t.me/share/url?url=${currentWindows}&text=${phrase} 🔥`
    );

  const twitterShare = () =>
    openExternalUrl(
      `https://twitter.com/intent/tweet?url=${currentWindows}&text=${phrase} 🔥`
    );

  const whatsAppShare = () =>
    openExternalUrl(`https://wa.me/?text=${phrase} ${window.location.href}`);

  const copyUrl = () => {
    copy(currentWindows);
    return alert("Link Copied");
  };

  return (
    <Grid container>
      <Typography align="center" sx={{ my: 2 }} width="100%" variant="h6">
        Share it with your community!
      </Typography>

      <List sx={{ width: "100%" }}>
        <ListRender
          label="Telegram"
          icon={<TelegramIcon />}
          onClick={telegramShare}
        />

        <ListRender
          label="Twitter"
          icon={<TwitterIcon />}
          onClick={twitterShare}
        />

        <ListRender
          label="Facebook"
          icon={<FacebookIcon />}
          onClick={fbShare}
        />

        <ListRender
          label="WhatsApp"
          icon={<WhatsAppIcon />}
          onClick={whatsAppShare}
        />

        <ListRender label="Copy URL" icon={<PublicIcon />} onClick={copyUrl} />
      </List>
    </Grid>
  );
};
