import { useOrder } from "./Product/OrderContext";

const UserHist = () => {
  const { orders } = useOrder();
  return (
    <div className="max-w-screen-xl m-auto px-6 py-3 ">
      {orders.map((order) => (
        <div className="bg-slate-300 p-5 text-5xl">
          {order.id}
          <ul className="my-3 px-5 bg-slate-200">
            {order.itemList.map((item) => (
              <li className="flex gap-3">
                <img src={item.thumbnail} alt="" />
                <div className="grid grid-cols-4 flex-1 items-center text-center">
                  <span className="text-xl font-bold">{item.title}</span>
                  <span className="text-xl">${item.price}</span>
                  <span className="text-xl">Quantity: {item.quantity}</span>
                  <span className="text-orange-600 text-2xl">
                    $
                    {(
                      Math.round(item.price * item.quantity * 100) / 100
                    ).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
            <div className="flex w-full py-3">
              <span className="text-3xl text-orange-600 font-bold ml-auto">
                Total: {order.totalPrice}
              </span>
            </div>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserHist;
