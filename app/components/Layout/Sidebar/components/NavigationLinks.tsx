import { useRouter } from "next/router";
import { useAppDispatch } from "@/states/hooks";
import { actions } from "@/app/states/appState";
import { openExternalUrl } from "@/app/utils/openExternalUrl";
import { Links } from "../../links";
import { ListRender } from "./ListRender";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

export const NavigationLinks = () => {
  const { push } = useRouter();
  const { setIsOpenSidebar } = actions;
  const dispatch = useAppDispatch();

  const visitPage = (link: any, newWindow: boolean = false) => {
    closeSideDrawer();

    if (link.newWindow || newWindow) {
      return openExternalUrl(link.url);
    }

    push(link.url);
  };

  const defaultLinks = Links.map((link) => ({
    icon: link.icon,
    label: link.label,
    onClick: () => {
      visitPage(link);
    },
  }));

  const closeSideDrawer = () => dispatch(setIsOpenSidebar(false));

  return (
    <Grid container>
      <List sx={{ width: "100%" }}>
        {defaultLinks.map((link, key) => (
          <ListRender
            key={key}
            label={link.label}
            icon={link.icon}
            onClick={link.onClick}
          />
        ))}
      </List>
    </Grid>
  );
};
