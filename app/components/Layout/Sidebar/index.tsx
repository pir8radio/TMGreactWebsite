import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { actions, selectIsOpenSidebar } from "@/app/states/appState";
import { NavigationLinks } from "./components/NavigationLinks";
import { SocialMedia } from "./components/SocialMedia";

import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const Sidebar = () => {
  const { setIsOpenSidebar } = actions;
  const dispatch = useAppDispatch();
  const isOpenSidebar = useAppSelector(selectIsOpenSidebar);
  const closeSideDrawer = () => dispatch(setIsOpenSidebar(false));

  const bottomStyling = {
    borderBottom: 1,
    borderColor: "divider",
  };

  return (
    <Drawer anchor="top" open={isOpenSidebar} onClose={closeSideDrawer}>
      <Grid container sx={{ height: "100%", p: 2 }} role="presentation">
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          pb={1}
          mb={2}
        >
          <IconButton
            edge="start"
            aria-label="close"
            size="medium"
            onClick={closeSideDrawer}
            sx={{ border: 1, borderColor: "divider" }}
          >
            <CloseIcon style={{ fontSize: 37 }} />
          </IconButton>
        </Grid>

        <Grid item container sx={bottomStyling}>
          <NavigationLinks />
        </Grid>

        <SocialMedia />
      </Grid>
    </Drawer>
  );
};
