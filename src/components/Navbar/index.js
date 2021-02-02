import React, {Component} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { connect } from "react-redux";

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    display:'flex',
    flexDirection:'column',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white', 
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '80%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    color:'#ff742b',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
  },
}));


class Navbar extends Component {
  handleChange = (e) => {
    this.props.handleChange(e.target.value);
  }
  render() {
    const {classes,search} = this.props
    console.log("redux",this.props)
    return (
      <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:'#ff742b'}}>
        <Toolbar style={{minHeight:'45px'}}>
          <div className={classes.search} style={{display:'flex', alignItems:'center'}}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{paddingRight:'5px'}} />
            </div>
            <InputBase
              placeholder="Search stories by title, url or author"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={this.handleChange}
              value={search}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search:state.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (text) => { dispatch({type:'ChangeSearchField', text:text})}
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles,{withTheme:true})(Navbar));
