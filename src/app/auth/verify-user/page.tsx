"use client";
import React, {useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {RedirectUserToDashboard} from "@/components/common/auth/RedirectUserToDashboard";
import Loader from "@/components/common/dashboard/Loader";
import {redirect} from "next/navigation";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import VerifyUser from "@/components/user/auth/VerifyUser";

export default function VerifyUserPage() {
    return <VerifyUser/>;
};
