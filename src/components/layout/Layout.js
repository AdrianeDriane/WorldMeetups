import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
