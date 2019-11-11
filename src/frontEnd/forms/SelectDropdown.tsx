import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {Select, Theme, FormControlLabel} from '@material-ui/core';

  const classes = makeStyles((theme:Theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "50%",
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
}))

  export const SelectDropdown = (props) => {
    const [title, setTitle] = React.useState('');
    const {optionsToBeDisplayed, selectedData} = props;
    const menuItems = optionsToBeDisplayed.map(option => 
                <MenuItem key={option} value={option}>{option}</MenuItem> );

    const changeHandler = (event) => {
        setTitle(event.target.value);
        selectedData(event.target.value);
    };

    return (
        <FormControl className={classes().formControl}>
            <Select value={title} onChange={changeHandler} displayEmpty={true} className={classes().selectEmpty}>
                {menuItems}
            </Select>
      </FormControl>
    )

}