import React, {Component} from  'react';
import PrimarySearchAppBar from './appBar';
import axios from 'axios';
import MediaCard from "./card"
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class MainPage extends Component{
    constructor(props){
        super(props)
        this.state= {
            products: undefined,
            cartQuantity:0,
            cart:[]
        }
    }
    async  componentDidMount(){
        const { data}  = await axios.get("https://baby-spock.herokuapp.com/products");
         data.forEach(d => {
            this.setState({[d.id]: d.quantity})
         })
        this.setState({products : data})
    }
    updateCart =  async (item) => {
        const id = item.id
        const { data}  = await axios.put(`https://baby-spock.herokuapp.com/products/${item.id}`, {quantity :   this.state[item.id] - 1 });
        this.setState({cart: this.state.cart.concat(id), cartQuantity: this.state.cartQuantity + 1, [id]: data.quantity})
      }
    completePurchase = ()=>{
        this.setState({cartQuantity : 0})
    }
    cancelPurchase = async (cartItems) => {
        cartItems.forEach(async item => {
            const originalItem = this.state.products.find(p => p.id === item)
            const { data }  = await axios.put(`https://baby-spock.herokuapp.com/products/${item}`, {quantity :   originalItem.quantity});
            this.setState({[item]: data.quantity})
        })
        this.setState({cartQuantity : 0, cart: []})
    }

    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <div>
                        <PrimarySearchAppBar 
                            cartCount={this.state.cartQuantity} 
                            products={this.state.products} 
                            cart={this.state.cart} 
                            completePurchase={this.completePurchase}
                            cancelPurchase={this.cancelPurchase}
                        />
                        <Grid container spacing={3} style={{marginTop:"5%", justifyContent:"center"}}>
                            {!this.state.products ? 
                            <h1>Loading..</h1>
                            :
                            this.state.products.map(m => {return <MediaCard product={m} key={m.id} updateCart={this.updateCart} quantity={this.state[m.id]}/>})
                            }
                        </Grid>
                    </div>
                 </Container>
            </React.Fragment>
        )
    }
}