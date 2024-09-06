"use client";
import React from "react";
import { signOut } from "aws-amplify/auth";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { logOut } from "@/redux/features/authSlice";
import { removeConfig } from "@/redux/features/configSlice";

const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut();
    dispatch(logOut());
    dispatch(removeConfig());
    router.push("/login");
  };

  return (
    <div>
      <Button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold border-white/10 border text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:border-white/25 data-[open]:border-white/25 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <span>Log out</span> <LogoutOutlined />
      </Button>
    </div>
  );
};

export default LogoutButton;
