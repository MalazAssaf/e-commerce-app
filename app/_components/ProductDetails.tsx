"use client";
// API
import Api, { Product, User } from "../_utils/Api";

// UI COMPONENTS
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

// NEXT
import Image from "next/image";
import { useRouter } from "next/navigation";

// REACT & REDUX
import { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { CartContext } from "../_contexts/CartContext";
import Loader from "./Loader";

export function ProductDetails({ product }: { product: Product }) {
  const [totalSellingPrice] = useState(
    product.sellingPrice ? product.sellingPrice : product.realPrice
  );
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const { updateCart, setUpdateCart } = useContext(CartContext)!;
  const router = useRouter();
  const storedJwt = localStorage.getItem("jwt");
  const jwt = storedJwt ? JSON.parse(storedJwt) : null;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleAddToCart = async () => {
    if (!jwt) {
      router.push("/sign-in");
      return;
    }
    if (!user) {
      toast.error("User not found. Please log in again.");
      return;
    }

    const data = {
      data: {
        quantity,
        amount: quantity * totalSellingPrice,
        products: {
          connect: [product.id],
        },
        users_permissions_user: {
          connect: [user.id],
        },
        userId: user.id,
      },
    };

    try {
      setLoading(true);
      await Api.addToCart(data, jwt);
      toast("Added to cart!");
      setUpdateCart(!updateCart);
    } catch (error) {
      toast("Error while adding to cart");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center">
      <Image
        src={`http://localhost:1337${product?.image[0]?.url}`}
        alt="product-desctiption"
        width={300}
        height={300}
        className=" h-full"
      ></Image>
      <div className="flex flex-col text-3xl text-gray-500 gap-2 capitalize">
        <DialogTitle>Add the item</DialogTitle>
        <h1 className="text-2xl">{product.name}</h1>
        <p className="text-sm">{product.description}</p>
        <div className="flex gap-4">
          <h2 className="text-xl">{product.sellingPrice}$</h2>
          <del className="text-red-700 text-xl">{product.realPrice}$</del>
        </div>
        <div className="flex flex-col justify-center items-baseline gap-2">
          <div className="flex gap-2 border ">
            <button
              className="px-8"
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </button>
            <h2>{quantity}</h2>
            <button className="px-8" onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>
          <h1 className="text-2xl font-bold">
            {(totalSellingPrice * quantity).toFixed(2)}$
          </h1>

          {/* Button with loader */}
          <Button
            className="text-black flex items-center justify-center gap-2"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? <Loader /> : <ShoppingBasket />}
            {loading ? "Adding..." : "Add to Cart!"}
          </Button>
        </div>

        <h2 className="text-sm text-amber-500">
          category:
          {product.categories.map((cat) => (
            <span key={cat.id} className="text-gray-500">
              {cat.name + " "}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
