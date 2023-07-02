import { useEffect, useState, useMemo } from "react";
import { useAccount } from "@/app/hooks/useAccount";
import { useLedger } from "@/app/hooks/useLedger";
import { DescriptorData } from "@signumjs/standards";

// @ts-ignore
import hashicon from "hashicon";
import useSWR from "swr";
import styles from "./AccountAvatar.module.css";

export const AccountAvatar = () => {
  const { accountId } = useAccount();
  const ledger = useLedger();

  const [imageSrcUrl, setImageSrcUrl] = useState("");

  const { data: ipfsUrl } = useSWR(
    ledger && accountId ? `account/avatar/${accountId}` : null,
    async () => {
      try {
        if (!ledger || !accountId) return null;

        const account = await ledger.account.getAccount({
          accountId,
        });

        const description = account.description;

        if (!description) return null;

        const descriptor = DescriptorData.parse(description, false);
        if (descriptor.avatar) {
          return `https://ipfs.io/ipfs/${descriptor.avatar.ipfsCid}`;
        }
      } catch (e: any) {
        return null;
      }
    }
  );

  const accountHashIcon = useMemo(
    () => hashicon(accountId, { size: 24 }).toDataURL(),
    [accountId]
  );

  const loadAccountHashIcon = () => setImageSrcUrl(accountHashIcon);

  useEffect(() => {
    if (!accountId) return;
    loadAccountHashIcon();
  }, [accountId]);

  useEffect(() => {
    if (!ipfsUrl) return;
    setImageSrcUrl(ipfsUrl);
  }, [ipfsUrl]);

  return (
    <div className={styles.avatarContainer}>
      <picture>
        <img
          className={styles.avatarImage}
          src={imageSrcUrl}
          alt="account-avatar"
          onError={loadAccountHashIcon}
        />
      </picture>
    </div>
  );
};
