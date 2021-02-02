import React, {Component} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const styles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email:'',password:'',name:'' };
    }
    handleChange = async (event) => {
        const name = event.target.name;
        await this.setState({
          ...this.state,
          [name]: event.target.value,
        });
    };

    handleClick = async () => {
        console.log(this.state.email,this.state.password);
        localStorage.setItem('name', this.state.name)
        localStorage.setItem('email',this.state.email)
        localStorage.setItem('loggedIn',true)
        await this.props.logIn()
    }
    render() {
        if(this.props.loggedIn) {
            this.props.history.push({
                pathname: '/',
            })
        }
        return (
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',height:'100vh',width:'100%'}} >
                <Typography  variant="h2" color="primary">Login</Typography>
                <form autoComplete="off">
                    <div style={{width:'50vw', margin: '15px 0px'}}>
                        <TextField fullWidth value={this.state.name} name="name" id="outlined-basic" label="Name" variant="outlined" onChange={this.handleChange}/>
                    </div>
                    <div style={{width:'50vw', margin: '15px 0px'}}>
                        <TextField fullWidth value={this.state.email} name="email" id="outlined-basic" label="Email" type="email" variant="outlined" onChange={this.handleChange}/>
                    </div>
                    <div style={{width:'50vw', margin: '15px 0px'}}>
                        <TextField fullWidth value={this.state.password} name="password" id="outlined-basic" label="Password" type="password" variant="outlined"  onChange={this.handleChange}/>
                    </div>
                    <Button variant="outlined" color="primary" fullWidth style={{width:'50vw', margin: "10px 0px"}} onClick={this.handleClick}>Login</Button>
                </form>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn:state.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn : () => { dispatch({type:'logIn'})}
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles,{withTheme:true})(Login)));


