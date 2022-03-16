import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";

import OrderItem from "../../components/OrderItem";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { listMyOrder } from "../../actions/orderActions";

export const UserPurchase = () => {
  const dispatch = useDispatch();

  const [userInfo, handleSetTitle] = useOutletContext();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, totalOrders, orders } = orderListMy;
  console.log(orders);

  useEffect(() => {
    dispatch(listMyOrder());
  }, [])

  useEffect(() => {
    handleSetTitle("Your purchases", "Review your purchases and orders");
  }, []);

  return (
    <div className="mt-4 px-4">
      {loading ? (
        <Loader />
      ) : (
        error ? (
          <Message variant="danger">{error}</Message>
        ) : ( orders && orders.length > 0 ? (
          orders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))
          ): (
            <Message variant="warning">You don't have any order yet. Let's go shopping now!</Message>
          )
        )
      )}
    </div>
  )
}

