import React from 'react';

import { useShopify } from '../../data/reducers/index';

const LineItem = () => {
    const { checkoutState, updateQuantity, removeLineItem } = useShopify();

    function decrementQuantity( lineItemId, lineItemQuantity, event ) {
        event.preventDefault();
        const checkoutId = checkoutState.id;
        const updatedQuantity = lineItemQuantity - 1;
        updateQuantity( lineItemId, updatedQuantity, checkoutId );
    }

    function incrementQuantity( lineItemId, lineItemQuantity, event ) {
        event.preventDefault();
        const checkoutId = checkoutState.id;
        const updatedQuantity = lineItemQuantity + 1; 
        updateQuantity( lineItemId, updatedQuantity, checkoutId );
    }

    function deleteLineItem( lineItemId, event ) {
        event.preventDefault();
        const checkoutId = checkoutState.id;
        removeLineItem( checkoutId, lineItemId );
    }
    
    return (
        <li>
            { checkoutState.lineItems && checkoutState.lineItems.map(( lineItem, i ) => {
                return (
                    <div key={ i } >
                        <div>
                            { lineItem.variant.image ? <img src={ lineItem.variant.image.src } /> : null }
                        </div>
                        <div>
                            {lineItem.variant.title}
                            <button onClick={( event ) => decrementQuantity( lineItem.id, lineItem.quantity, event ) } >
                                -
                            </button>

                            <span > { lineItem.quantity } </span>

                            <button onClick={( event ) => { incrementQuantity( lineItem.id, lineItem.quantity, event ) } } >
                                +
                            </button>

                            <span > $ { ( lineItem.quantity * lineItem.variant.price ).toFixed( 2 ) } </span>

                            <button  onClick={ ( event ) => deleteLineItem( lineItem.id, event ) } >
                                ×
                            </button>
                        </div>
                    </div>
                )})
            }
        </li>
    );
}

export default LineItem;