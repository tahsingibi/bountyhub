"use client";
import React from "react";
import ErrorView from "@/views/Communities/Error/Error";
import { notFound } from "next/navigation";
import PropTypes from "prop-types";

export default function ErrorPage({ error }) {
  if (error?.toString()?.includes("NEXT_NOT_FOUND")) return notFound();

  return <ErrorView error={error} />;
}

ErrorPage.propTypes = {
  error: PropTypes.any,
};
