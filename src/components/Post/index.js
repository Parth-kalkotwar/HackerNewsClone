import React from 'react'
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    postRoot: {

        // border:'2px solid black',
        color:'#828282',
        display:'flex',
        alignItems:'flex-start',
        flexDirection:'column',
        fontSize:'16px',
        padding:'3px 16px',
        // minHeight:'70px !important',
        flexWrap: 'wrap'
    },
    secondLine: {
        display:'flex',
        alignItems:'center',
        margin: '4px 0px'
    },
    heading: {
        color:'#000',
        padding: '2px 4px',
        fontWeight:'600',
        cursor:'pointer'
    },
    seperator: {
        padding: '0px 5px',
        color: '#696969', 
        fontSize:'14px'
    },
    info: {
        backgroundColor: 'inherit',
        border:'none',
        padding:'4px 0px',
        "&:hover": {
            textDecoration:'underline !important',
            cursor:'pointer',
        }
    },
    url: {
        "&:hover": {
            textDecoration:'underline !important',
            cursor:'pointer',
        }
    },
    firstLine: {
        display:'flex',
        marginBottom:'4px'
    }
  }));


  export default function Post(props) {
    const classes = useStyles();
    if(!props.post.title && !props.post.url && !props.post.comment_text) {
        return null
    }
    if(!props.post.title) {
        return (
            <div className={classes.postRoot}>
                <div className={classes.secondLine}>
                    {props.post.points ? <span>
                        <button onClick={() => console.log("clicked")} style={{textDecoration:'none', color:'#696969', fontSize:'8px'}} className={classes.info}>
                            {props.post.points}
                        </button>
                        <span className={classes.seperator}>
                            |
                        </span>
                    </span> : null}
                    
                    <span>
                        <button onClick={() => console.log("clicked")} style={{textDecoration:'none', color:'#696969', fontSize:'8px'}} className={classes.info}>
                            {props.post.author}
                        </button>
                        <span className={classes.seperator}>
                            |
                        </span>
                    </span>
                    <span>
                        <button onClick={() => console.log("clicked")} style={{textDecoration:'none', color:'#696969', fontSize:'8px'}} className={classes.info}>
                            <Moment fromNow>{props.post.created_at}</Moment>
                        </button>
                        <span className={classes.seperator}>
                            |
                        </span>
                    </span>
                    <span>
                        <button onClick={() => console.log("clicked")} style={{textDecoration:'none', color:'#696969', fontSize:'8px'}} className={classes.info}>
                            parent
                        </button>
                        <span className={classes.seperator}>
                            |
                        </span>
                    </span>
                    <span>
                        <button onClick={() => console.log("clicked")} style={{textDecoration:'none', color:'#696969', fontSize:'8px'}} className={classes.info}>
                            on: {props.post.story_title}
                        </button>
                    </span>
                </div>
                <div className={`${classes.firstLine} htmlContent`}>
                    <div dangerouslySetInnerHTML={{__html:props.post.comment_text}}></div>
                </div>
            </div>
        )
    }
    return (
      <div className={classes.postRoot}>
          <div className={classes.firstLine}>
                <div  className={classes.heading}>{props.post.title}</div>
                {props.post.url ? <button className={classes.info} style={{textDecoration:'none', color:'#696969'}} onClick={() => console.log("clicked")}>({props.post.url})</button> : null}
                
          </div>
          <div className={classes.secondLine}>
              {props.post.points ? <span>
                <button onClick={() => console.log("clicked")} style={{textDecoration:'none', color:'#696969'}} className={classes.info}>
                    {props.post.points}
                </button>
                <span className={classes.seperator}>
                    |
                </span>
            </span> : null}
            
            <span>
                <button onClick={() => console.log("clicked")} style={{textDecoration:'none', color:'#696969'}} className={classes.info}>
                    {props.post.author}
                </button>
                <span className={classes.seperator}>
                    |
                </span>
            </span>
            <span>
                <button onClick={() => console.log("clicked")} style={{textDecoration:'none', color:'#696969'}} className={classes.info}>
                    <Moment fromNow>{props.post.created_at}</Moment>
                </button>
                <span className={classes.seperator}>
                    |
                </span>
            </span>
            <span>
                <button onClick={() => console.log("clicked")} style={{textDecoration:'none', color:'#696969'}} className={classes.info}>
                    {props.post.num_comments}
                </button>
            </span>
          </div>
          {props.post.story_text ? <div className={`htmlContent`}>
                    <div dangerouslySetInnerHTML={{__html:props.post.story_text}}></div>
                </div> : 
            null }
        
      </div>
    );
  }
  