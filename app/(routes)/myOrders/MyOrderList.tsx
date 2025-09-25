import React from "react";
import Image from "next/image";
import { OrderItemList } from "@/app/_utils/Api";
function MyOrderList({ orderItem }: { orderItem: OrderItemList }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 capitalize shadow-md">
      <Image
        src={`http://localhost:1337${orderItem?.product?.image[0].url}`}
        width={70}
        height={70}
        alt="product icon"
        className="mt-3 mb-3"
        style={{ borderRadius: "50%" }}
      />
      <div className="col-span-1">
        <h2 className="font-bold mb-3 mt-3">
          name:
          <span className="text-slate-400 ">{orderItem?.product?.name}</span>
        </h2>
        <h2 className="font-bold mb-3 mt-3">
          Selling Price:
          <span className="text-slate-400">
            {orderItem?.product?.sellingPrice}$
          </span>
        </h2>
      </div>
      <div className="col-span-1">
        <h2 className="font-bold mb-3  mt-3">
          quantity:
          <span className="text-slate-400">{orderItem?.quantity}</span>
        </h2>
        <h2 className="font-bold mb-3  mt-3">
          Amount:
          <span className="text-slate-400">{orderItem?.amount}$</span>
        </h2>
      </div>
    </div>
  );
}

export default MyOrderList;
