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
        <div className="grid place-items-center">
            {isLoading ? (
                <CircularProgress
                    color={"primary"}
                    className={"p-4"}
                    label="Processing payment checkout...Please stay on this page"
                />
            ) : (
                <>
                    {status === 'complete' ? (
                        <>
                            <p>
                                Thank you for choosing our services! A confirmation email will be promptly dispatched to
                                the email address you provided ({customerEmail}). If you have any inquiries or require
                                further assistance, please do not hesitate to contact our dedicated support team at{" "}
                                <a href="mailto:support@example.com">support@example.com</a>. We value your business and
                                are here to ensure your experience is seamless.
                            </p>
                            <p>
                                Thank you for being a valued member of our community.
                            </p>
                        </>
                    ) : (
                        <p>
                            The payment failed or was canceled. Please
                            <Link className="text-primary" href={NAVIGATION_LINKS.PAYMENTS}>Try Again</Link>
                            or contact customer support.
                        </p>
                    )}
                </>
            )}
        </div>
    )
}