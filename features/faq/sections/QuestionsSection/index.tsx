import { useAppContext } from "@/app/hooks/useAppContext";

import Box from "@mui/material/Box";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const QuestionsSection = () => {
  const {
    Ledger: { Explorer },
  } = useAppContext();

  return (
    <Box
      maxWidth={800}
      py={5}
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>What is TMG?</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            TMG is a native token on the Signum Blockchain with the following
            asset ID:{" "}
            <Link href={Explorer + "/asset/11955007191311588286"} passHref>
              <Typography
                component="a"
                target="_blank"
                color="primary"
                fontWeight={700}
              >
                <u>11955007191311588286</u>
              </Typography>
            </Link>{" "}
            and it is controlled by the Picker Smart Contract{" "}
            <Link href={Explorer + "/address/18339269626061634110"} passHref>
              <Typography
                component="a"
                target="_blank"
                color="primary"
                fontWeight={700}
              >
                <u>18339269626061634110</u>
              </Typography>
            </Link>{" "}
            . The token support in Signum is native and it does not depend on
            smart contract after the block was forged.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>How is the mining process?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            The Picker contract will collect the deadlines from the miners for 1
            hour. It will then mint one TMG token, pick the miner that sent the
            best deadline, and send the token to the account that created the
            contract responsible for the best deadline.
          </Typography>

          <Typography gutterBottom>
            The process repeats while there are miners submitting deadlines.
          </Typography>

          <Typography>
            Every 24 hours the Picker contract will check the balance and, if
            the accumulated amount is greater than 250 Signa, 98% will be
            distributed to TMG holders and the remaining will the distributed to
            SmartC NFT holders.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>
            Is the TMG actually a mining process?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            It looks like mining, but there is no block with transactions to be
            forged. It is a competition to get the best deadline every one hour.
            The winner takes one token.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>
            Do I need to change the intensity of my miner?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            No. By default the miner will start with the least mining intensity
            avaliable (0.32). But check the overall mining intensity, because
            the chance to win a token is proportional to these values.
          </Typography>

          <Typography>
            Check <b>How high is the chance to get one TMG token?</b>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>
            What happens to the Signa I add to the miner?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            If your miner is mining with the least amount possible (0.32 Signa),
            most of the balance will be spent in the activation fees of the
            contracts.
          </Typography>

          <Typography>
            This amount needed to run smart contracts is burned by default in
            Signum. If the mining intensity is bigger, the excess balance will
            build up in the Picker contract to be distributed every 24 hours.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>
            Is it possible to get my Signa back?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            Yes, you can get recover your miner current balance. If you changed
            your mind and want to stop playing, use <b>My miner</b> actions
            buttons and click on <b>Stop</b>.
          </Typography>

          <Typography>
            The refund can take up to one hour, no new deadline is submitted and
            all miner balance will be returned. A manual alternative is use your
            wallet program to send at least 0.5 Signa to your contract with a
            text message stop as attachment.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>
            How high is the chance to get one TMG token?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography gutterBottom>
            It depends on your miner mining intensity and the overall mining
            intensity. If your miner contributed with .32 Signa and the block
            had the overall mining intensity of 32 signa.
          </Typography>

          <Typography>
            This mean that the chance to win was 0.32/32 {"->"} 0,01 or 1%.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>
            How the deadline is calculated?
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <ol>
            <Typography component="li">
              Get the transaction ID from your miner to the picker and divide by
              two. This is the base deadline. Division is needed to avoid
              negative values internally.
            </Typography>

            <Typography component="li">
              Get the transaction amount (mining intensity) and divide by the
              minimum amount (0.32 Signa). This factor (always greater or equal
              one) is called mining factor.
            </Typography>

            <Typography component="li">
              The final deadline is the base deadline divided by the mining
              factor. So the greater the mining factor, lower the deadline. In
              this way, users can adjust the mining intensity to increase change
              to win a token
            </Typography>

            <Typography component="li">
              The id values are big, so in this page the log2 of this value is
              shown. In theory the worst deadline is 63 bits (integer
              9223372036854775807) and the best is 0 bit (integer 1), lower is
              better. To decrease one bit of your deadline you must multiply by
              2 the mining intensity.
            </Typography>
          </ol>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>How can I see other players?</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            The individual transactions can be checked at the Picker contract
            page on the{" "}
            <Link href={Explorer + "/address/18339269626061634110"} passHref>
              <Typography
                component="a"
                target="_blank"
                color="primary"
                fontWeight={700}
              >
                <u>Block Explorer</u>
              </Typography>
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>Can I buy/sell TMG tokens?</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography gutterBottom>
            You can buy or sell just like other tokens with Signum order book or
            use the{" "}
            <Link href="https://deleterium.info/tmg-pool/" passHref>
              <Typography
                component="a"
                target="_blank"
                color="primary"
                fontWeight={700}
              >
                <u>TMG liquidity pool</u>
              </Typography>
            </Link>
          </Typography>

          <Typography>
            All the TMG tokens must be <b>forged</b> by the smart contract
            mining process. NO PRE-MINE, NO ICO!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={700}>Where is the source code?</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            To inspect the source and get more info,{" "}
            <Link
              href="https://github.com/deleterium/SmartC/blob/main/docs/commemorative/v2.0_The_Mining_Game.md"
              passHref
            >
              <Typography
                component="a"
                target="_blank"
                color="primary"
                fontWeight={700}
              >
                <u>TMG</u>
              </Typography>
            </Link>{" "}
            is the commemorative contract for SmartC version 2.0.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
