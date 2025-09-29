"use client";
// API
import Api, { CartItemsListInterface, Category } from "../_utils/Api";

// UI COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CircleUserIcon,
  House,
  LayoutGrid,
  Search,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// NEXT
import Image from "next/image";
import { useRouter } from "next/navigation";

// REACT & REDUX
import { login, logout } from "../../store/authSlice";
import { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../_contexts/CartContext";
import { NumberItemsInCartContext } from "../_contexts/NumberItemsInCartContext";

// OTHERS
import CartItemsList from "./CartItemsList";
import { ItemsInCartContext } from "../_contexts/ItemsInCartContext";
import Loading from "../(routes)/myOrders/Loading";

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { updateCart } = useContext(CartContext)!;
  const { itemsCartList, setItemsCartList } = useContext(ItemsInCartContext);
  const { itemsInCart, setItemsInCart } = useContext(NumberItemsInCartContext);

  const storedJwt = localStorage.getItem("jwt");
  const jwt = storedJwt ? JSON.parse(storedJwt) : null;
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    // Sync login state from localStorage
    const jwt = localStorage.getItem("jwt");
    if (jwt) dispatch(login());

    // Load categories
    Api.getCategoryList().then((data) => setCategories(data));
  }, [dispatch]);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  const handleLogOutBtn = () => {
    localStorage.clear();
    dispatch(logout());
    router.push("/sign-in");
    toast.success("Logged out successfully!");
  };

  const getCartItems = async () => {
    const cartItems = await Api.getCartItems(user.id, jwt);
    setItemsInCart(cartItems?.length);
  };

  const handleShowItemsList = async () => {
    const cartItemsList: CartItemsListInterface[] = await Api.getCartItemsList(
      user.id,
      jwt
    );
    setItemsCartList(cartItemsList);
  };

  const categoryList = categories.map((cat) => (
    <Link key={cat.id} href={`/product-category/${cat.name}`}>
      <DropdownMenuItem>
        <Image
          src={`http://localhost:1337${cat?.icon[0]?.url}`}
          alt={cat.name}
          width={25}
          height={25}
          unoptimized={true}
        />
        {cat.name}
      </DropdownMenuItem>
    </Link>
  ));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 shadow-md">
      <div className="flex gap-8 items-center">
        <Link
          href="/"
          className="flex gap-2 rounded-full bg-slate-200 p-3 capitalize cursor-pointer"
        >
          <House />
          <h2>Home</h2>
        </Link>

        {/* Drop Down Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-2 rounded-full bg-slate-200 p-3 capitalize cursor-pointer">
              <LayoutGrid />
              <h2>category</h2>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>{categoryList}</DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex items-center border-2 rounded-full p-2 relative">
          <Search className="absolute right-5" />
          <Input
            type="text"
            placeholder="search"
            className="w-[18rem] border-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Sheet>
          <SheetTrigger>
            <ShoppingBag onClick={() => handleShowItemsList()} />
          </SheetTrigger>
          <SheetContent className="flex flex-col h-screen">
            <SheetHeader>
              <SheetTitle className="bg-amber-500 px-4 py-3 mt-5 font-bold capitalize rounded-md flex gap-2">
                My cart
                <ShoppingBag />
              </SheetTitle>
            </SheetHeader>
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-2">
              {/* Show Loader While waiting for the API request to be finished */}
              {itemsCartList.length === 0 && itemsInCart !== 0 ? (
                <Loading />
              ) : itemsCartList.length === 0 && itemsInCart === 0 ? (
                <p className="flex justify-center font-bold text-lg capitalize">
                  Your cart is empty
                </p>
              ) : itemsCartList.length > 0 && itemsInCart !== 0 ? (
                <CartItemsList />
              ) : (
                <p className="flex justify-center font-bold text-lg capitalize">
                  Loading cart...
                </p>
              )}
            </div>
            <SheetDescription>
              <Link href={"/checkout"}>
                <Button className="my-4 mx-auto flex justify-center w-9/10">
                  Checkout
                </Button>
              </Link>
            </SheetDescription>
          </SheetContent>
        </Sheet>

        {itemsInCart}
        {!isLoggedIn ? (
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserIcon className="h-7 w-7 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="px-2 py-1.5">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/myOrders"}>
                <DropdownMenuItem>Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleLogOutBtn}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
