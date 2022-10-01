import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import AppsIcon from "@mui/icons-material/Apps";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

interface LinkProps {
  label: string;
  url: string;
  icon: any;
  newWindow?: boolean;
}

export const Links: LinkProps[] = [
  { label: "Home", url: "/", icon: <HomeRoundedIcon /> },
  {
    label: "(Guide) FAQ",
    url: "/faq",
    icon: <DnsRoundedIcon />,
  },
  {
    label: "Recent Deadlines",
    url: "/recent-deadlines",
    icon: <ManageSearchIcon />,
  },
  {
    label: "TMG Ecosystem",
    url: "/tmg-ecosystem",
    icon: <AppsIcon />,
  },
  {
    label: "Discord",
    url: "https://discord.gg/TSy8PbhkVQ",
    icon: <QuestionAnswerIcon />,
    newWindow: true,
  },
];
