import { memo } from "react";
import Searchbar from "./searchbar";
import styles from "./header.module.scss";

import LoggedRight from "./loggedRight";
import DefaultRight from "./defaultRight";
import PropTypes from "prop-types";

function HeaderRight({ user }) {
  return (
    <div className={styles.right}>
      <Searchbar />
      <DefaultRight user={user} />
      <LoggedRight user={user} />
    </div>
  );
}
export default memo(HeaderRight);

HeaderRight.propTypes = {
  user: PropTypes.object,
};
