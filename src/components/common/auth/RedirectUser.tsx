import {User} from "@/boundary/interfaces/user";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";

export function RedirectUser(user:User|null, setLoading:any) {
    const router = useRouter()
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            if (user) {
                router.push(NAVIGATION_LINKS.DASHBOARD);
            } else {
                setLoading(false);
            }
        }, 500);

        return () => {
            clearTimeout(redirectTimer);
        };
    }, [user, router, setLoading]);
}