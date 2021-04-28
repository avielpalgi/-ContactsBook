import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import * as ReactBootstrap from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { faMars, faVenus, faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './user.css';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      width:340,
      margin:20
    },
    root2: {
      maxWidth: 345,
      width:340,
      margin:20,
      backgroundColor:'yellow'
    },
    media: {
      height: 140,
      margin:10,
    width:140,
    display:'inline-flex',
     borderRadius:'50%'
    },
  });

function User(props) {
    const classes = useStyles();
    const [Name, setName] = useState("");
    const [Pic, setPic] = useState("")
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Gender, setGender] = useState("");
    const [searchRes, setSearchRes] = useState("");
    useEffect(() => {
      console.log('GenderSelected',props.GenderSelect);
    }, [props.GenderSelect])
    useEffect(() => {
      console.log('Gender',props.Gender);
    }, [props.Gender])
    return (
        <div>{props.Name.toLowerCase().includes(props.SearchRes.toLowerCase()) && props.SearchRes !== "" ? <div>{ props.GenderSelect == props.Gender || props.GenderSelect == "" ? 
        <ReactBootstrap.Col lg="4" md="6">
        <Card className={classes.root2}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.Pic}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
             {props.Name} {props.Gender == "Male".toLowerCase() ? <FontAwesomeIcon icon={faMars} /> : <FontAwesomeIcon icon={faVenus} />}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            <FontAwesomeIcon icon={faEnvelope} /> {props.Email}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            <FontAwesomeIcon icon={faPhoneAlt} /> {props.Phone}
             </Typography>
          </CardContent>
        </CardActionArea>
      </Card> </ReactBootstrap.Col>:null}
      </div>:<div>{ props.GenderSelect == props.Gender || props.GenderSelect == "" ? 
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.Pic}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
             {props.Name} {props.Gender == "Male".toLowerCase() ? <FontAwesomeIcon icon={faMars} /> : <FontAwesomeIcon icon={faVenus} />}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            <FontAwesomeIcon icon={faEnvelope} /> {props.Email}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            <FontAwesomeIcon icon={faPhoneAlt} /> {props.Phone}
             </Typography>
          </CardContent>
        </CardActionArea>
      </Card> :null}
      </div>}</div>
    )
}

export default User
