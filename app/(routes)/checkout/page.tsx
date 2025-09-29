"use client";
// API
import Api, { CartItemsListInterface, User } from "@/app/_utils/Api";

// UI COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";

// NEXT
import { useRouter } from "next/navigation";

// REACT & REDUX
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// OTHERS
import { ItemsInCartContext } from "@/app/_contexts/ItemsInCartContext";
import CartItemsList from "@/app/_components/CartItemsList";
import { NumberItemsInCartContext } from "@/app/_contexts/NumberItemsInCartContext";
import Loader from "@/app/_components/Loader";

interface BillingDetailsInterface {
  username: string;
  email: string;
  phone: number | string;
  zip: number | string;
  address: string;
}

function Checkout() {
  const router = useRouter();
  const storedJwt = localStorage.getItem("jwt");
  const jwt = storedJwt ? JSON.parse(storedJwt) : null;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { itemsCartList } = useContext(ItemsInCartContext);
  const { itemsInCart, setItemsInCart } = useContext(NumberItemsInCartContext);
  const [billingDetails, setBillingDetails] = useState<BillingDetailsInterface>(
    {
      username: "Malaz",
      email: "mlazassaf@gmail.com",
      phone: "0561791503",
      zip: "12345",
      address: "Saudi Arabia",
    }
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!jwt) {
      // If the user not logged in, router him to the login page!
      router.push("/sign-in");
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    setItemsInCart(itemsCartList.length);
  }, [itemsCartList]);

  const allFilled = Object.values(billingDetails).every(
    (value) => value.toString().trim() !== ""
  );

  let subtotal: number = 0.0;
  itemsCartList.forEach((element: CartItemsListInterface) => {
    subtotal += element.amount;
  });
  const tax: number = Math.round(subtotal * 0.15);
  const delivery: number = 10;
  const total: number = tax + subtotal + delivery;

  const data = {
    data: {
      username: billingDetails.username,
      email: billingDetails.email,
      phone: billingDetails.phone,
      zip: billingDetails.zip,
      address: billingDetails.address,
      totalOrderAmount: total,
      userId: user?.id,
      orderItemList: itemsCartList.map((item: CartItemsListInterface) => {
        const product = item.products[0];
        const image = product.image[0];
        return {
          quantity: item.quantity,
          amount: Math.round(item.amount),
          product: {
            id: product.id,
            name: product.name,
            description: product.description,
            realPrice: product.realPrice,
            sellingPrice: product.sellingPrice,
            productType: product.productType,
            image: {
              url: image.url,
            },
          },
        };
      }),
    },
  };

  const handlePayment = async () => {
    if (!allFilled) {
      toast.error("Please fill all the billing feilds!");
      return;
    } else {
      try {
        setLoading(true);
        await Api.createOrder(data, jwt);
        toast.success("The order is placed successfully!");
        router.push("/");
      } catch (error) {
        console.log("Error ", error);
        toast.error("Error while placing order!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mb-20 my-5 p-4">
      <div className="bg-amber-400 p-3 capitalize font-bold text-center">
        <h2>checkout</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 md:px-20 mt-5">
        <div>
          <h2 className="font-bold text-xl capitalize mb-2 text-center">
            Billing details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Name"
              value={billingDetails.username}
              onChange={(e) => {
                setBillingDetails({
                  ...billingDetails,
                  username: e.target.value,
                });
              }}
            ></Input>
            <Input
              placeholder="Email"
              value={billingDetails.email}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, email: e.target.value });
              }}
            ></Input>
            <Input
              placeholder="Phone"
              value={billingDetails.phone}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, phone: e.target.value });
              }}
            ></Input>
            <Input
              placeholder="Zip"
              value={billingDetails.zip}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, zip: e.target.value });
              }}
            ></Input>
            <Input
              placeholder="Address"
              value={billingDetails.address}
              onChange={(e) => {
                setBillingDetails({
                  ...billingDetails,
                  address: e.target.value,
                });
              }}
            ></Input>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="bg-blue-100 p-2 text-center font-bold">
            Total cart({itemsInCart})
          </h2>
          {/* Show the Items in the Cart */}
          <CartItemsList />
          <div className="flex justify-between mt-5 text-gray-500">
            <h2>Delivery:</h2>
            <h2>${delivery}</h2>
          </div>
          <div className="flex justify-between mb-5 text-gray-500">
            <h2>Tax(15%):</h2>
            <h2>${tax}</h2>
          </div>
          <div className="flex justify-between font-bold">
            <h2>Total</h2>
            <h2>${total}</h2>
          </div>
          <Button onClick={() => handlePayment()} disabled={loading}>
            {loading ? <Loader /> : <ArrowBigRight />}
            {loading ? "Wait..." : "Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
