import React from "react";
import styles from "./selectbox.module.scss";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import Icon from "../icon/icon";
import PropTypes from "prop-types";

export const useableElements = [
  { key: "select", element: Select },
  { key: "async", element: AsyncSelect },
  { key: "creatable", element: CreatableSelect },
];

function whichElement(element) {
  const findElement = useableElements.find((item) => item.key == element);

  if (findElement) return findElement?.element;

  throw new Error(
    'You can only use valid elements: "select, async, creatable."'
  );
}

const Control = ({ children, selectProps, ...props }) => {
  const { icon } = selectProps;

  return (
    <components.Control {...props}>
      {!!icon && <Icon type={icon} />}
      {children}
    </components.Control>
  );
};

/**
 * The Selectbox component is derived from the "react-select" library. In addition to the specified props, it can take all the props that the "react-select" component can accept.
 */

export default function Selectbox({
  placeholder = "",
  icon = null,
  options = [],
  ...props
}) {
  const Element = whichElement("select");
  const getPlaceholder = placeholder || "Select your options";

  return (
    <div className={styles.wrap}>
      <Element
        options={options}
        {...props}
        className={styles.selectbox}
        placeholder={getPlaceholder}
        components={{ Control }}
        name="icon"
        icon={icon}
        classNamePrefix="appSelectbox"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "var(--surface-secondary-color)",
            primary: "var(--surface-secondary-color)",
          },
        })}
      />
    </div>
  );
}

Control.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.any,
};

Selectbox.propTypes = {
  /**
   * Placeholder text for selectbox
   */
  placeholder: PropTypes.string,
  /**
   * The "options" parameter takes an array where the value to be displayed is sent with the "label" label, and the value to be processed is sent with the "options" label.
   */
  options: PropTypes.array,
  /**
   * Icon for selectbox
   */
  icon: PropTypes.string,
};
