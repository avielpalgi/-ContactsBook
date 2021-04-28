import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBar from "material-ui-search-bar";
import { Dropdown} from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import './myStyle.css';
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    Search: {
        margin: '10px',
        width: '60%'
    },
   
}));



export default function SearchAndDropdown(props) {
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState([{label:"All Genders",value:""},{label:"Male",value:"male"},{label:"Female",value:"female"}])
    const [selected, setSelected] = useState({label:"All Genders",value:""})
    const [gender, setGender] = useState(props.gender);

  
    function handleChange(value) {
        // Here, we invoke the callback with the new value
        props.onChange(value);
    }
    function handleSelect(value) {
        props.onSelect(value);
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Contact Book
                     </Typography>
                    <SearchBar
                        className={classes.Search}
                        value={search}
                        onChange={(newValue) => setSearch(newValue)}
                        onRequestSearch={() => props.doSomethingWith(search)}
                    />
                    <Dropdown
                        placeholder={options[0].label}
                        className="DropDownClass"
                        options={options}
                        onChange={handleChange}
                        onSelect={handleSelect} // always fires once a selection happens even if there is no change
                    />

                  
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}