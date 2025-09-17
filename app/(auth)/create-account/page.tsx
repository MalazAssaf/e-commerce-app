"use client";
// API
import Api, { UserInfo } from "@/app/_utils/Api";

// UI COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// NEXT
import Image from "next/image";
import Link from "next/link";

// REACT & REDUX
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

function CreateAccount() {
  const [userData, setUserData] = useState<UserInfo>({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleCreateBtn = (): void => {
    Api.registerNewUser(userData)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("jwt", JSON.stringify(response.data.jwt));
        toast.success("Account has been created successfully!.");
        dispatch(login());
        router.push("/");
      })
      .catch((e) => {
        toast.error("Error while creating an account: " + (e.message || e));
      });
  };
  return (
    <div className="flex justify-center items-baseline m-5 capitalize">
      <div className="flex flex-col items-center bg-gray-200 w-100 p-5 rounded-xl">
        <Image src="/logo.png" alt="icon" width={150} height={150}></Image>
        <h2 className="text-gray-400 text-sm font-bold mb-5">
          create new account
        </h2>
        <div className="flex flex-col w-full gap-5">
          <Input
            type="text"
            className="bg-white"
            placeholder="Username"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          ></Input>
          <Input
            type="email"
            className="bg-whtie"
            placeholder="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          ></Input>
          <Input
            type="password"
            className="bg-whtie"
            placeholder="Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          ></Input>
          <Button
            disabled={
              !(userData.username && userData.email && userData.password)
            }
            className="font-bold cursor-pointer"
            onClick={() => handleCreateBtn()}
          >
            Create new account
          </Button>
          <p className="text-xs">Already have an account?</p>
          <Link href={"/sign-in"} className="text-blue-500 text-xs">
            sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
