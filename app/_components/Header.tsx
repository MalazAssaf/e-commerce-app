"use client";
// API
import Api, { Category } from "../_utils/Api";

// UI COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from "lucide-react";
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

// NEXT
import Image from "next/image";
import { useRouter } from "next/navigation";

// REACT & REDUX
import { login, logout } from "../../store/authSlice";
import { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
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

  const handleLogOutBtn = () => {
    localStorage.clear();
    dispatch(logout());
    router.push("/sign-in");
    toast.success("Logged out successfully!");
  };

  const categoryList = categories.map((cat) => (
    <Link key={cat.id} href={`/product-category/${cat.name}`}>
      <DropdownMenuItem>
        <Image
          src={`http://localhost:1337${cat?.icon[0]?.url}`}
          alt={cat.name}
          width={25}
          height={25}
          unoptimized
        />
        {cat.name}
      </DropdownMenuItem>
    </Link>
  ));

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 shadow-md">
      <div className="flex gap-8 items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={80} height={80} />
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
        <ShoppingBag />0
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
              <DropdownMenuItem>Orders</DropdownMenuItem>
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
