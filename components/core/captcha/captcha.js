"use client";
import ReCAPTCHA from "react-google-recaptcha";
import PropTypes from "prop-types";
import styles from "./captcha.module.scss";
import Text from "../text/text";

/**
 * All reCAPTCHA throughout the application should be generated from this component.
 */
export default function Captcha({
  isShowLegalText = false,
  theme = "dark",
  onChange = (val) => val,
  onExpired = (val) => val,
}) {
  return (
    <div className={styles.captcha}>
      <ReCAPTCHA
        sitekey={process.env.CAPTCHA_KEY}
        onChange={onChange}
        theme={theme}
        onExpired={onExpired}
      />
      {isShowLegalText && (
        <>
          <Text size="small">
            This helps us fight harmful behavior, detect and prevent spam, and
            protect the integrity of our Products.
          </Text>
          <Text size="small">
            We used Google&apos;s reCAPTCHA Enterprise to provide this security
            check. Your use of reCAPTCHA Enterprise is subject to Google&apos;s
            Privacy Policy and Terms of Use.
          </Text>

          <Text size="small">
            reCAPTCHA Enterprise collects hardware and software information,
            such as device and application data, and sends it to Google for the
            purpose of delivering, protecting, improving reCAPTCHA Enterprise,
            and for general security purposes. This information is not used by
            Google for personalized advertisements.
          </Text>
        </>
      )}
    </div>
  );
}

Captcha.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]),
  /**
   * reCAPTCHA theme.
   */
  onChange: PropTypes.func,
  /**
   * When reCAPTCHA verifies an expired user, the function to be executed.
   */
  onExpired: PropTypes.func,
  /**
   * Will the information text related to reCAPTCHA be displayed?
   */
  isShowLegalText: PropTypes.bool,
};
