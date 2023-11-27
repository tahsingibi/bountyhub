"use client";
import React, { useState, useCallback, useEffect } from "react";
import Error from "./error";
import PropTypes from "prop-types";

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState("");

  const promiseRejectionHandler = useCallback((event) => {
    setError(event.reason);
  }, []);

  const resetError = useCallback(() => {
    setError("");
  }, []);

  useEffect(() => {
    window.addEventListener("unhandledrejection", promiseRejectionHandler);

    return () => {
      window.removeEventListener("unhandledrejection", promiseRejectionHandler);
    };
  }, []);

  return error ? <Error error={error} reset={resetError} /> : children;
};

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.any,
};
