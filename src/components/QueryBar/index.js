import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
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
  }
}));

export default function QueryBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    tags: '',
    time: '',
    by: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  console.log(state)
  return (
    <div className={classes.rootInput}>
        <div className={classes.inputFields}>
            <span>Search</span> 
            <FormControl className={classes.formControl}>
                <NativeSelect
                value={state.tags}
                onChange={handleChange}
                name="tags"
                className={[classes.selectEmpty, classes.buttons]}
                // style={{border:'1px solid #c3c3c3', padding: '0 4px 0 8px',margin: '0 8px 0 2px',color:'#5c5c5c'}}
                inputProps={{ 'aria-label': 'tags' }}
                >
                <option value="">All</option>
                <option value="story">Stories</option>
                <option value="comment">Comments</option>
                </NativeSelect>
            </FormControl>
        </div>
        <div className={classes.inputFields}>
            <span>By</span> 
            <FormControl className={classes.formControl}>
                <NativeSelect
                value={state.by}
                onChange={handleChange}
                name="by"
                className={[classes.selectEmpty, classes.buttons]}
                // style={{border:'1px solid #c3c3c3', padding: '0 4px 0 8px',margin: '0 8px 0 2px',color:'#5c5c5c'}}
                inputProps={{ 'aria-label': 'by' }}
                >
                <option value="Popularity">Popularity</option>
                <option value="Date">Date</option>
                </NativeSelect>
            </FormControl>
        </div>
        <div className={classes.inputFields}>
            <span>For</span> 
            <FormControl className={classes.formControl}>
                <NativeSelect
                value={state.time}
                onChange={handleChange}
                name="time"
                className={[classes.selectEmpty, classes.buttons]}
                // style={{border:'1px solid #c3c3c3', padding: '0 4px 0 8px',margin: '0 8px 0 2px',color:'#5c5c5c'}}
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
  );
}
