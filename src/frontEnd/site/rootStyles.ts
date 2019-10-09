import { drawerWidth } from "./drawerWidth";
import { inDevMode } from "../developers/inDevMode";

export const rootStyles = theme => ({
  content: {
    palette: {
      primary: "red",
      secondary: "green"
    },
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: inDevMode() ? drawerWidth : 0,
  },
});
