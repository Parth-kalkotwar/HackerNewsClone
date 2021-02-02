import React, { Component } from 'react'
import Post from '../Post';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';


const styles = makeStyles((theme) => ({
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
            color:'aqua',
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
        },
        pagination: {
            display:'flex',
            justifyContent:'center',
            padding:'15px 0px'
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        buttons: {
            alignItems: 'center',
            fontSize: '14px',
            textAlign: 'left',
            padding: '0 4px 0 8px',
            margin:' 0 8px 0 2px',
            border: '1px solid #c3c3c3',
            borderRadius: '2px',
            cursor: 'pointer',
            color:'#5c5c5c',
        },
        inputFields: {
            display:'flex',
            margin:'4px 0px 4px 5px',
            alignItems:'center',
        },
        rootInput: {
            display:'flex',
            flexDirection:'column',
        },
        userNameText: {
            fontSize: '2rem',
            
            padding: '2px 6px'
        }
}))

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = { name: localStorage.getItem('name'), posts: null, tags: '', time: '', by: '',query:props.search,pages:'',qAdded:false,page:0};
        // tags:props.search, time:props.time, by:props.by, query:props.query,
        console.log("Here",this.props)
    }

    fetchData = async () => {
        let main = 'https://hn.algolia.com/api/v1/search'
        let query = '';
        if(this.state.by==='Date') {
            query += '_by_date';
        }
        query += '?query=' + this.state.query
        if(this.state.tags) {
            query += '&tags=' + this.state.tags;
            
        }
        if(this.state.time) {
            let pre,cur;
            switch (this.state.time) {
                case "last24h":
                    pre = Math.round((new Date().getTime() - (24 * 60 * 60 * 1000))/1000).toString();
                    cur = Math.round((new Date().getTime()/1000)).toString();
                    query += `&numericFilters=created_at_i>${pre},created_at_i<${cur}`
                    break;
                case "pastWeek":
                    pre = Math.round((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))/1000).toString();
                    cur = Math.round((new Date().getTime()/1000)).toString();
                    query += `&numericFilters=created_at_i>${pre},created_at_i<${cur}`
                    break;
                case "pastMonth":
                    pre = Math.round((new Date().getTime() - (31 * 24 * 60 * 60 * 1000))/1000).toString();
                    cur = Math.round((new Date().getTime()/1000)).toString();
                    query += `&numericFilters=created_at_i>${pre},created_at_i<${cur}`
                    break;
                case "pastYear":
                    pre = Math.round((new Date().getTime() - (365 * 24 * 60 * 60 * 1000))/1000).toString();
                    cur = Math.round((new Date().getTime()/1000)).toString();
                    query += `&numericFilters=created_at_i>${pre},created_at_i<${cur}`
                    break;
                default:
                    break;
            }
        }
        query += '&page=' + this.state.page
        console.log(main+query)
        const response = await fetch(main+query);
        const data = await response.json();
        console.log(this.props.location.pathname)
        await this.setState({posts:data.hits, pages:data.nbPages,qAdded:false})
        this.props.history.push({
            pathname: query,
        })
        
    }

    async componentDidMount() {
        await this.fetchData();
    }

    handleChange = async (event) => {
        const name = event.target.name;
        //console.log(event)
        await this.setState({
          ...this.state,
          [name]: event.target.value,
          page:0
        });
        await this.fetchData();
    };

    pageChange = async (event,value) => {
        await this.setState({
            page:value
        })
        await this.fetchData()
    }

      render() {
        const { classes } = this.props;
        //console.log("her",this.state,classes)
        return (
            <div style={{width:'85%', backgroundColor:'#f6f6ef', margin:'auto'}}>
                <AppBar position="static" style={{backgroundColor:'#ff742b', fontSize: '20px !important'}}>
                    <Toolbar style={{minHeight:'45px !important', display: 'flex'}}>
                    <div className={classes.userNameText} style={{fontSize: '20px', padding: '2px 16px'}}>{this.state.name}</div>
                    <div className={classes.search} style={{display:'flex', alignItems:'center', width:'80%',backgroundColor:'white'}}>
                        <div className={classes.searchIcon}>
                            <SearchIcon style={{paddingRight:'5px', fontSize:'3rem',color:'ff742b', padding:'2px 8px'}} />
                        </div>
                        <InputBase
                        placeholder="Search stories by title, url or author"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        style={{width:'100%', fontSize:'16px'}}
                        name = "query"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={this.handleChange}
                        value={this.state.query}
                        />
                    </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.rootInput} style={{display:'flex', alignItems:'center', padding: '10px' }}>
                    <div className={classes.inputFields} style={{margin:'4px 5px 4px 5px',display:'flex',alignItems:'center'}}>
                        
                        <span>Search</span> 
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                            value={this.state.tags}
                            onChange={this.handleChange}
                            name="tags"
                            className={`${classes.selectEmpty} ${classes.buttons}`}
                            style={{border:'1px solid #c3c3c3', padding: '0 4px 0 8px',margin: '0 8px 0 2px',color:'#5c5c5c'}}
                            inputProps={{ 'aria-label': 'tags' }}
                            >
                            <option value="">All</option>
                            <option value="story">Stories</option>
                            <option value="comment">Comments</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                    <div className={classes.inputFields} style={{margin:'4px 0px 4px 5px',display:'flex',alignItems:'center'}}>
                        <span>By</span> 
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                            value={this.state.by}
                            onChange={this.handleChange}
                            name="by"
                            className={`${classes.selectEmpty} ${classes.buttons}`}
                            style={{border:'1px solid #c3c3c3', padding: '0 4px 0 8px',margin: '0 8px 0 2px',color:'#5c5c5c'}}
                            inputProps={{ 'aria-label': 'by' }}
                            >
                            <option value="Popularity">Popularity</option>
                            <option value="Date">Date</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                    <div className={classes.inputFields} style={{margin:'4px 0px 4px 5px',display:'flex',alignItems:'center'}}>
                        <span>For</span> 
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                            value={this.state.time}
                            onChange={this.handleChange}
                            name="time"
                            className={`${classes.selectEmpty} ${classes.buttons}`}
                            style={{border:'1px solid #c3c3c3', padding: '0 4px 0 8px',margin: '0 8px 0 2px',color:'#5c5c5c'}}
                            inputProps={{ 'aria-label': 'time' }}
                            >
                            <option value="">All Time</option>
                            <option value="last24h">Last 24h</option>
                            <option value="pastWeek">Past Week</option>
                            <option value="pastMonth">Past Month</option>
                            <option value="pastYear">Past Year</option>
                            {/* <option value="pastWeek">Custom Range</option> */}
                            </NativeSelect>
                        </FormControl>
                    </div>  
                </div>
                {!this.state.posts ?
                    (<div>Loading...</div>) : 
                    (
                        <div>
                            {this.state.posts.map((post) => <Post key = {post.objectID} post = {post} />)}
                            <Pagination onChange={this.pageChange} style={{display:'flex', justifyContent:'center', padding:'15px 0px'}} variant="outlined" shape="rounded" page={this.state.page} count={this.state.pages} />
                        </div>
                    )
                }
            </div>
        );
      };
}

const mapStateToProps = (state) => {
    return {
      search:state.search,
      loggedIn:state.loggedIn
    }
}


  export default withRouter(connect(mapStateToProps)(withStyles(styles,{withTheme:true})(PostList)));
  