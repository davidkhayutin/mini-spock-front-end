import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CheckOutModal({cartCount, products, cart, completePurchase, cancelPurchase}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const completePurchaseCloseModal = () => {
    completePurchase()
    setOpen(false);

  }
  const cancelPurchaseCloseModal = (cart) => {
    cancelPurchase(cart)
    setOpen(false);

  }

  const set = new Set(cart)
  const values = [...set]
  let total = 0;
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Your Items</h2>
      {values.map(item => {
          const amount = cart.filter(i => i === item)
          const iteminProduct = products.find(i => i.id === item)
          total = total + iteminProduct.price * amount.length
          return <h6 key={item} className="modalTitle">{`${iteminProduct.title} x ${amount.length} : $${iteminProduct.price * amount.length}` }</h6>
      })}
      <p id="simple-modal-description">
        {`Total : $${total}`}
      </p>
      <button className="completePurchaseButton"onClick={() => completePurchaseCloseModal ()}>
         Complete Purchase 
      </button>
      <button className="cancelPurchaseButton" onClick={() =>  cancelPurchaseCloseModal(cart)}>
         Cancel Purchase 
      </button>
    </div>
  );

  return (

    <div className="modalButton">
      <IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleOpen}>
          <Badge badgeContent={cartCount} color="secondary">
          <ShoppingCartIcon />
          </Badge>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}