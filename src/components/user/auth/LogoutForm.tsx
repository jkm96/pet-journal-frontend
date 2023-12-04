import {useAuth} from "@/hooks/useAuth";
import {redirect, useRouter} from "next/navigation";
import {deleteAccessToken} from "@/lib/services/token/tokenService";
import LogoutIcon from "@/components/shared/icons/LogoutIcon";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {router} from "next/client";

export default function LogoutForm() {
    const router = useRouter()
    const {clearAuthToken} = useAuth();

    async function handleLogout() {
        const response = await deleteAccessToken();
        if (response.statusCode === 200) {
            clearAuthToken();
            router.push(NAVIGATION_LINKS.LOGIN)
        }
    }

    return (
        <>
            <button
                type={"submit"} onClick={handleLogout} color="primary"
                className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                <LogoutIcon/>
                Log Out
            </button>
        </>
    );
}