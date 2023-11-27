"use client";
import "../globals.css";
import React, {useState, useEffect} from "react";
import Loader from "@/components/common/dashboard/Loader";
import {useAuth} from "@/hooks/useAuth";
import NotAuthenticated from "@/components/common/auth/NotAuthenticated";
import Sidebar from "@/components/user/navs/sidebar/SideBar";
import Header from "@/components/user/navs/header/Header";

export default function DashboardLayout({children}: { children: React.ReactNode; }) {
    const {user,loading: authLoading} = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading || authLoading) {
        return <Loader/>;
    }

    if (!user) {
        return <NotAuthenticated/>
    }

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
                        <div className="mx-auto max-w-screen-2xl md:py-6 2xl:py-10">
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
