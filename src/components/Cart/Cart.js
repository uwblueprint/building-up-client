import React, { useEffect } from 'react';

import { useShopify } from '../../data/reducers/index';
import LineItem from './LineItem';

function Cart() {
    const {
        cartStatus,
        closeCart,
        openCart,
        checkoutState,
        setCount,
    } = useShopify();

    function handleOpen( event ) {
        event.preventDefault();
        openCart();
    }

    function handleClose( event ) {
        event.preventDefault();
        closeCart();
    }

    function openCheckout( event ) {
        event.preventDefault();
        // window.open(checkoutState.webUrl) // opens checkout in a new window
		window.location.replace(checkoutState.webUrl) // opens checkout in same window
    }

    useEffect(() => {
        const button = document.querySelector( "button.App_view-cart" );

        if ( cartStatus === true ) {
            button.classList.add( "hide" );
        } else {
            button.classList.remove( "hide" );
        }

        function getCount() {
            let lineItems =
                checkoutState.lineItems && checkoutState.lineItems.length > 0
                ? checkoutState.lineItems
                : [];

            let count = 0;

            lineItems.forEach(( item ) => {
                count += item.quantity
                return count;
            });

            setCount( count );
        }

        getCount();

    }, [ cartStatus, checkoutState ]);

    return (
        <div>
            <button onClick={( event ) => handleOpen( event ) }> handleOpen </button>
            <button onClick={( event ) => handleClose( event ) }> handleClose </button>
            <LineItem />
            $ { checkoutState.subtotalPrice } <br />
            $ { checkoutState.totalTax } <br />
            $ { checkoutState.totalPrice } <br />
            <button onClick={( event ) => openCheckout( event ) } > Checkout </button>
        </div>
    );
}

export default Cart;