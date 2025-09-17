"use client";
// API
import Api, { Login } from "@/app/_utils/Api";

// UI COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// NEXT
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// REACT & REDUX
import { useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

export default function SignIn() {
  const [logData, setLogData] = useState<Login>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleLogBtn = () => {
    Api.signIn(logData).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("jwt", JSON.stringify(response.data.jwt));
      toast.success("Logged in successfully");
      dispatch(login());
      router.push("/");
    });
  };

  return (
    <div className="flex justify-center items-baseline m-5 capitalize">
      <div className="flex flex-col items-center bg-gray-200 w-100 p-5 rounded-xl">
        <Image src="/logo.png" alt="icon" width={150} height={150}></Image>
        <h2 className="text-gray-400 text-sm font-bold mb-5">Sign In</h2>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="email"
            className="bg-whtie"
            placeholder="Email"
            value={logData.email}
            onChange={(e) => setLogData({ ...logData, email: e.target.value })}
          ></Input>
          <Input
            type="password"
            className="bg-whtie"
            placeholder="Password"
            value={logData.password}
            onChange={(e) =>
              setLogData({ ...logData, password: e.target.value })
            }
          ></Input>
          <Button
            disabled={!(logData.email && logData.password)}
            className="font-bold cursor-pointer"
            onClick={() => handleLogBtn()}
          >
            Sign In
          </Button>
          <div>
            <p className="text-xs inline">Do not Have an account? </p>
            <Link href={"/create-account"} className="text-blue-500 text-xs">
              create new account!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
