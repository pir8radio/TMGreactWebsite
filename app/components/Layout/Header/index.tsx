import { useRouter } from "next/router";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useAccount } from "@/app/hooks/useAccount";
import {
  requestWalletConnection,
  requestWalletDisconnection,
} from "@/app/utils/requestWalletConnection";
import { openExternalUrl } from "@/app/utils/openExternalUrl";
import { actions, selectIsWalletConnected } from "@/app/states/appState";
import { asRSAddress } from "@/app/utils/asRSAddress";
import { Links } from "../links";

import Link from "next/link";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

// @ts-ignore
import hashicon from "hashicon";
import styles from "./header.module.css";

export const Header = () => {
  const { setIsOpenSidebar } = actions;
  const { asPath, push } = useRouter();
  const { accountId, publicKey } = useAccount();
  const dispatch = useAppDispatch();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  const openSideDrawer = () => dispatch(setIsOpenSidebar(true));

  const iconUrl = useMemo(() => {
    if (!accountId) return "";
    return hashicon(accountId, { size: 24 }).toDataURL();
  }, [accountId]);

  const shownContentDesktop = {
    width: "auto",
    display: { xs: "none", lg: "flex" },
  };

  const shownContentMobile = {
    width: "auto",
    display: { xs: "flex", lg: "none" },
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        transition: "top 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backdropFilter: "blur(20px)",
        backgroundImage: "url(/assets/banner.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        zIndex: 100,
      }}
    >
      <Toolbar
        sx={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "1600px",
          mx: "auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Link href="/" passHref>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ cursor: "pointer" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/TMGlogo.png"
                alt="TMG Logo"
                width={32}
                height={32}
              />

              <Typography variant="h6">The Mining Game</Typography>
            </Stack>
          </Link>

          <Stack direction="row" alignItems="center" sx={shownContentDesktop}>
            {Links.map((link) => {
              const visitPage = () => {
                if (link.newWindow) {
                  return openExternalUrl(link.url);
                }

                push(link.url);
              };

              const isActiveLink = asPath == link.url;

              return (
                <Grid item key={link.url}>
                  <Button
                    onClick={visitPage}
                    color={!isActiveLink ? "inherit" : undefined}
                    className={isActiveLink ? styles.activeLink : undefined}
                    sx={{
                      textTransform: "none",
                      px: 2,
                      fontSize: 15,
                      border: 1,
                      borderColor: !isActiveLink ? "transparent" : undefined,
                      borderRadius: 2,
                    }}
                  >
                    {link.label}
                  </Button>
                </Grid>
              );
            })}
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" sx={shownContentDesktop}>
          {!!(isWalletConnected && accountId) && (
            <Grid item>
              <Stack
                direction="row"
                alignItems="center"
                p={1}
                sx={{
                  border: 1,
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconUrl} alt="avatar-icon" width={24} height={24} />

                <Typography
                  fontWeight={500}
                  variant="body2"
                  sx={{ display: { xs: "none", md: "flex" }, ml: 1, mr: 3 }}
                >
                  {asRSAddress(accountId)}
                </Typography>

                <Chip
                  color="secondary"
                  label="Unlink"
                  variant="filled"
                  onClick={requestWalletDisconnection}
                  onDelete={requestWalletDisconnection}
                />
              </Stack>
            </Grid>
          )}

          {!!(isWalletConnected && !publicKey) && (
            <Tooltip
              title="This account is not yet fully registered on the blockchain. Please activate your account to ensure its security and make it fully usable for all services, including exchanges."
              arrow
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  border: 1,
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  py: 1,
                  px: 2,
                  ml: 1,
                }}
              >
                <ReportProblemIcon color="warning" />

                <Typography
                  fontWeight={500}
                  variant="body2"
                  color="warning.main"
                >
                  Inactive account
                </Typography>
              </Stack>
            </Tooltip>
          )}

          {!isWalletConnected && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                color: "white",
                textTransform: "none",
              }}
              onClick={requestWalletConnection}
              startIcon={<AccountBalanceWalletIcon />}
            >
              Connect Wallet
            </Button>
          )}
        </Stack>

        <Stack sx={shownContentMobile}>
          <IconButton
            onClick={openSideDrawer}
            edge="start"
            sx={{ border: 1, borderColor: "divider", my: 1, color: "white" }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
