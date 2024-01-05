"use client";
import "../globals.css";
import React, {useEffect, useState} from "react";
import Loader from "@/components/common/dashboard/Loader";
import {useAuth} from "@/hooks/useAuth";
import Sidebar from "@/components/shared/navs/sidebar/SideBar";
import Header from "@/components/shared/navs/header/Header";
import {redirect} from "next/navigation";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";

export default function UserDashboardLayout({children}: { children: React.ReactNode; }) {
    const {user, loading: authLoading} = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading || authLoading) {
        return <Loader/>;
    } else if (!user) {
        redirect(NAVIGATION_LINKS.LOGIN)
    } else if (user && !user.isSubscribed) {
        redirect(NAVIGATION_LINKS.PAYMENTS)
    } else if (user && user.isSubscribed) {
        return (
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
                <div className="flex h-screen overflow-hidden">
                    {/* <!-- ===== Sidebar Start ===== --> */}
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    {/* <!-- ===== Sidebar End ===== --> */}

                    {/* <!-- ===== Content Area Start ===== --> */}
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        {/* <!-- ===== Header Start ===== --> */}
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        {/* <!-- ===== Header End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main>
                            <div className="sm:m-1 md:p-10 lg:p-6 2xl:p-6">
                                {children}
                            </div>
                        </main>
                        {/* <!-- ===== Main Content End ===== --> */}
                    </div>
                    {/* <!-- ===== Content Area End ===== --> */}
                </div>
            </div>
        );
    }
}
