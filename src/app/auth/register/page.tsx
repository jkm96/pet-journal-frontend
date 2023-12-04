"use client";
import React, {useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import RegisterForm from "@/components/user/auth/RegisterForm";
import {RedirectUser} from "@/components/common/auth/RedirectUser";
import Loader from "@/components/common/dashboard/Loader";

export default function RegisterPage(){
  const {user,loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  RedirectUser(user,setLoading)

  if (loading || authLoading) {
    return <Loader/>;
  } else if (!user) {
    return <RegisterForm/>;
  } else {
    return null;
  }
};

