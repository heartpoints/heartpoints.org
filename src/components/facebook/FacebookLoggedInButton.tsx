import * as React from "react";
import { Button, Avatar, Popper, Paper, ClickAwayListener, MenuList, MenuItem, Fade, Typography } from "@material-ui/core";

const MaterialUIPopupState = require('material-ui-popup-state');
const { bindToggle, bindPopper, default: PopupState } = MaterialUIPopupState;

export const FacebookLoggedInButton = props => {
    const {facebookUserSession, onLogoutRequested } = props;
    const profilePicUrl = facebookUserSession.picture.data.url;
    const userName = facebookUserSession.name;
    return <PopupState variant="popper" popupId="demoPopper">
        {popupState => (
            <div>
                <Button color="inherit" {...bindToggle(popupState)}>
                    <Avatar src={profilePicUrl} alt={userName} />
                </Button>
                <Popper {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <ClickAwayListener onClickAway={() => popupState.close()}>
                                    <MenuList>
                                        <MenuItem onClick={() => popupState.close()}>Profile</MenuItem>
                                        <MenuItem onClick={() => popupState.close()}>My account</MenuItem>
                                        <MenuItem onClick={onLogoutRequested}>Logout {userName}</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        )}
    </PopupState>
}

// const PopperContent = ({ TransitionProps, placement }) => (
//     <Grow
//         {...TransitionProps}
//         id="menu-list-grow"
//         style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//     >
        
//     </Grow>
// )