import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 340,
    marginLef: "5%"
    // maxHeight: 340
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const image= props.product.image[1]
  return (
    <Grid item xs={4}>
        <Card className={classes.root} style={{marginLeft:"1vw"}}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={`${image.url}`}
            title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {props.product.title} - ${props.product.price}
            </Typography>
            <Typography className={`${props.product.id}desc`}variant="body2" color="textSecondary" component="p">
            There are {props.quantity} items left of this product
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            {props.quantity? 
                <Button size="small" color="primary" className={`${props.product.id}Button`}onClick={() => props.updateCart(props.product)}>
                Add to cart
                </Button>
            :
            <h3 className="soldOut">Sold Out</h3>
            }
      
        </CardActions>
        </Card>
    </Grid>
  );
}