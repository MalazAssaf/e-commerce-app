"use client";
// API
import Api, { Order } from "@/app/_utils/Api";

// UI COMPONENTS
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// REACT & REDUX
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// OTHERS
import moment from "moment";
import MyOrderList from "../myOrders/MyOrderList";
import Loading from "./Loading";

function MyOrders() {
  const route = useRouter();
  const [ordersList, setOrderLists] = useState<Order[]>([]);

  // ✅ Parse user from localStorage
  const storedUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const storedJwt =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!storedJwt) {
      route.push("/sign-in");
      return;
    }
    getOrderList();
  }, []);

  const getOrderList = async () => {
    if (!user) return;
    const orderList = await Api.getOrders(user.id);
    setOrderLists(orderList);
  };

  return (
    <div className="mb-20 my-5 p-4">
      <h1 className="bg-amber-400 p-3 capitalize font-bold text-center">
        My Orders
      </h1>
      <div className="text-3xl font-bold text-primary mt-5">Order History</div>
      <div>
        {/* Show the loader while API request finishs */}
        {ordersList.length === 0 ? (
          <Loading />
        ) : (
          ordersList.map((order, index) => (
            <div key={index}>
              <Collapsible>
                <CollapsibleTrigger>
                  <div className="w-full border p-3 bg-blue-200 grid grid-cols-2 md:grid-cols-3 gap-10 mt-5">
                    <h2>
                      <span className="font-bold mt-3"> Order Date:</span>
                      {moment(order?.createdAt).format("DD/MM/YY")}
                    </h2>
                    <h2>
                      <span className="font-bold mt-3">Total Amount:</span>
                      {order?.totalOrderAmount}$
                    </h2>
                    <h2>
                      <span className="font-bold mt-3">Status:</span> DELIVERED
                    </h2>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {order.orderItemList.map((item, idx) => (
                    <MyOrderList key={idx} orderItem={item} />
                  ))}
                  <h2 className="text-xl font-bold mt-2">
                    Total Amount: {order.totalOrderAmount}$
                  </h2>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrders;
