import React, { useEffect, useState } from 'react';
import './Orders.scss';
import { db } from "./firebase";
import { useStateValue } from './StateProvider';
import Order from './Order';

function Orders() {
    // eslint-disable-next-line no-unused-vars
    const [{cart, user}, dispatch] =useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        if(user) {
             // eslint-disable-next-line no-undef
            db.collection("users").doc(user?.uid).collection("orders").orderBy("created", "desc").onSnapshot(snapshot => { setOrders(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))) })
        } else {
            setOrders([])
        }
    }, [user])

    return (
        <div className="orders">

            <h1>Your Orders</h1>

            <div className="orders_order">
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders;