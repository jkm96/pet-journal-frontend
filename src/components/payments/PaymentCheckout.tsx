import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { createCheckoutSession } from '@/lib/services/payments/paymentsService';
import { CheckoutSessionModel } from '@/boundary/interfaces/payment';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CircularProgress } from '@nextui-org/react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PaymentCheckout() {
    const [clientSecret, setClientSecret] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const createPayment = async () => {
        setIsLoading(true);
        await createCheckoutSession()
            .then((response) => {
                if (response.statusCode === 200) {
                    const session: CheckoutSessionModel = response.data;
                    setClientSecret(session.clientSecret)
                }
            })
            .catch((error) => {
                toast.error(`Error redirecting to checkout: ${error}`)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        createPayment();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress
                        color={"primary"}
                        className={"p-4"}
                        label="Preparing checkout...."
                    />
                </div>
            ) : (
                <div id="checkout">
                    {clientSecret && (
                        <EmbeddedCheckoutProvider
                            stripe={stripePromise}
                            options={{clientSecret}}
                        >
                            <EmbeddedCheckout/>
                        </EmbeddedCheckoutProvider>
                    )}
                </div>
            )}
        </>
    )
}