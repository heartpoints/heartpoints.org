import { drawerWidth } from "../../style/drawerWidth";

export const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    backgroundColor: "red",
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});
