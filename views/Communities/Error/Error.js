"use client";
import Button from "@/components/core/button/button";
import Heading from "@/components/core/heading/heading";
import { useRouter } from "next/navigation";
import styles from "../communities.module.scss";
import PropTypes from "prop-types";

export default function ErrorView({ error }) {
  const router = useRouter();
  const handleRouter = () => router.push("/");

  return (
    <div className={styles.error}>
      <Heading size="large" text={error?.message} />
      <Button text="Return to homepage" onClick={handleRouter} />
    </div>
  );
}

ErrorView.propTypes = {
  error: PropTypes.any,
};
