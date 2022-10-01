import { useMemo, useState } from "react";
import { Amount } from "@signumjs/util";
import { useLedger } from "@/app/hooks/useLedger";
import { useContractData } from "@/app/hooks/useContractData";
import { useAccountContracts } from "@/app/hooks/useAccountContracts";
import { useAppContext } from "@/app/hooks/useAppContext";
import { formatAmount } from "@/app/utils/formatAmount";

import useSWR from "swr";
import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StarIcon from "@mui/icons-material/Star";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

export const DeadlinesSection = () => {
  const {
    Ledger: { Explorer },
  } = useAppContext();
  const { currentHeight, forgedTokenCurrentBlock } = useContractData();
  const accountMinerContract = useAccountContracts();
  const ledger = useLedger();

  const [showAllRecentDeadlines, setShowAllRecentDeadlines] = useState(false);
  const showDeadlines = () => setShowAllRecentDeadlines(true);

  const { data } = useSWR(
    "recentDeadlines",
    async () => {
      if (!ledger) return undefined;

      const contractTransactions = await ledger.account.getAccountTransactions({
        accountId: "18339269626061634110",
      });

      return contractTransactions.transactions;
    },
    {
      dedupingInterval: 10_000,
      refreshInterval: 30_000,
    }
  );

  const mappedTransactions = useMemo(() => {
    if (!data) return [];

    let currentTMGHeight = Number(currentHeight);
    let lastHeightFromTMG = Number(forgedTokenCurrentBlock);
    let greyRow = false;
    let updateHeight = false;

    return data
      .map((transaction) => {
        const {
          height,
          sender,
          senderRS,
          recipient,
          amountNQT,
          type,
          subtype,
        } = transaction;

        if (updateHeight && height < Number(lastHeightFromTMG)) {
          currentTMGHeight--;
          updateHeight = false;
          greyRow = !greyRow;
        }

        const tmgHeight = currentTMGHeight;

        const txId = transaction.transaction;

        const intensity = Number(
          Amount.fromPlanck(amountNQT || "0").getSigna()
        );

        const deadline = Math.log2(
          ((Number(txId) / 2) * 0.32) / intensity
        ).toFixed(2);

        const isDeadlineOwner = sender === accountMinerContract?.at;

        if (type === 2 && subtype === 1) {
          lastHeightFromTMG = height;
          updateHeight = true;
        }

        if (recipient === "18339269626061634110") {
          return {
            height,
            tmgHeight,
            txId,
            sender,
            senderRS,
            intensity,
            deadline,
            isDeadlineOwner,
            greyRow,
          };
        }
      })
      .filter((mappedTransaction) => !!mappedTransaction);
  }, [data, currentHeight, forgedTokenCurrentBlock, accountMinerContract]);

  const headCellStyling = { color: "white" };

  const isLoadingData = !mappedTransactions?.length;

  return (
    <Paper
      elevation={10}
      sx={{
        mt: 2,
        mb: 4,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {isLoadingData && <LoadingPlaceHolder />}

      {!isLoadingData && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={headCellStyling}>Block Height</TableCell>
                <TableCell sx={headCellStyling}>TMG Height</TableCell>
                <TableCell sx={headCellStyling}>Transaction</TableCell>
                <TableCell sx={headCellStyling}>Sender</TableCell>
                <TableCell sx={headCellStyling}>Intensity</TableCell>
                <TableCell sx={headCellStyling}>Deadline</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {mappedTransactions.map((transaction, index) => {
                if (!transaction) return null;
                if (!showAllRecentDeadlines && index > 25) return null;

                const {
                  height,
                  tmgHeight,
                  txId,
                  sender,
                  senderRS,
                  intensity,
                  deadline,
                  isDeadlineOwner,
                  greyRow,
                } = transaction;

                return (
                  <TableRow
                    key={transaction.txId}
                    sx={{
                      backgroundColor: greyRow
                        ? "rgba(0,0,0,0.1)"
                        : "rgba(255,255,255,1)",
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Link href={Explorer + "/block/" + height} passHref>
                        <Typography
                          component="a"
                          target="_blank"
                          fontWeight={700}
                          variant="body2"
                        >
                          {formatAmount(height)}
                        </Typography>
                      </Link>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Typography fontWeight={700} variant="body2">
                        {formatAmount(tmgHeight)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Link href={Explorer + "/tx/" + txId} passHref>
                        <Typography
                          component="a"
                          target="_blank"
                          fontWeight={700}
                          variant="body2"
                        >
                          {txId}
                        </Typography>
                      </Link>
                    </TableCell>

                    <TableCell sx={{ minWidth: 250 }}>
                      <Link href={Explorer + "/at/" + sender} passHref>
                        <Tooltip
                          title={isDeadlineOwner ? "This is your miner" : ""}
                          arrow
                          placement="top"
                        >
                          <Typography
                            component="a"
                            target="_blank"
                            fontWeight={700}
                            variant="body2"
                            color={
                              isDeadlineOwner ? "error.main" : "textPrimary"
                            }
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            {isDeadlineOwner && (
                              <StarIcon fontSize="small" sx={{ mr: 0.5 }} />
                            )}
                            {senderRS}
                          </Typography>
                        </Tooltip>
                      </Link>
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={700} variant="body2">
                        {intensity.toFixed(2)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={700} variant="body2">
                        {deadline}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!!(!showAllRecentDeadlines && !isLoadingData) && (
        <Box p={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={showDeadlines}
            startIcon={<ExpandCircleDownIcon />}
          >
            Show all recent deadlines
          </Button>
        </Box>
      )}
    </Paper>
  );
};

const LoadingPlaceHolder = () => {
  const skeletonStyling = { borderRadius: 2, height: 50 };

  return (
    <Stack direction="column" spacing={1} p={2}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        sx={skeletonStyling}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        sx={skeletonStyling}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        sx={skeletonStyling}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        sx={skeletonStyling}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        sx={skeletonStyling}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        sx={skeletonStyling}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        sx={skeletonStyling}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        sx={skeletonStyling}
      />
    </Stack>
  );
};
