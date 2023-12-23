import {useEffect, useState} from "react";
import {createCheckoutSession, fetchCheckoutSession} from "@/lib/services/payments/paymentsService";
import {CheckoutSessionModel} from "@/boundary/interfaces/payment";
import {toast} from "react-toastify";
import {redirect, useRouter} from "next/navigation";
import {CircularProgress} from "@nextui-org/react";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import Link from "next/link";
import {AccessTokenModel} from "@/boundary/interfaces/token";
import {useAuth} from "@/hooks/useAuth";
import {deleteAccessToken} from "@/lib/services/token/tokenService";

export default function CheckoutReturn() {
    const {clearAuthToken, storeAuthToken} = useAuth();
    const router = useRouter()
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const getCheckoutSession = async (sessionId: string) => {
        setIsLoading(true);
        await fetchCheckoutSession(sessionId)
            .then((response) => {
                console.log("checkout response", response)
                if (response.statusCode === 200) {
                    const session: CheckoutSessionModel = response.data.sessionData;

                    clearAuthToken();
                    let responseData: AccessTokenModel = response.data.cookieRequest;
                    storeAuthToken(responseData);

                    setCustomerEmail(session.customerEmail)
                    setStatus(session.sessionStatus)
                }
            })
            .catch((error) => {
                console.error("Error completing checkout", error);
                toast.error(`Error completing checkout: ${error}`)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams?.get('session_id') ?? '';
        console.log("sessionId", sessionId)
        getCheckoutSession(sessionId);
    }, []);

    useEffect(() => {
        if (status === 'complete') {
            toast.success("Payment completed successfully. Redirecting to dashboard...");
            setTimeout(() => {
                router.push(NAVIGATION_LINKS.DASHBOARD)
            }, 5000);
        }
    }, [status]);

    return (
        <div className={"grid place-items-center"}>
            {isLoading ? (
                <CircularProgress
                    color={"primary"}
                    className={"p-4"}
                    label="Processing payment checkout...Please stay on this page"
                />
            ) : (
                <>
                    {status === 'open' && (
                        <section id="success">
                            <p>
                                The payment failed or was canceled. Please
                                <Link className="text-primary" href={NAVIGATION_LINKS.PAYMENTS}>Try Again</Link>
                                or contact customer support.
                            </p>
                        </section>
                    )}

                    {status === 'complete' && (
                        <section id="success">
                            <p>
                                We appreciate your business! A confirmation email will be sent to {customerEmail}.
                                If you have any questions, please email{" "}
                                <a href="mailto:orders@example.com">orders@example.com</a>.
                            </p>
                            <p>Redirecting to dashboard...</p>
                        </section>
                    )}
                </>
            )}
        </div>
    )
}