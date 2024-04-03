import { useEffect, useState } from 'react';
import { fetchCheckoutSession } from '@/lib/services/payments/paymentsService';
import { CheckoutSessionModel } from '@/boundary/interfaces/payment';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@nextui-org/react';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import Link from 'next/link';

export default function CheckoutReturn() {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getCheckoutSession = async (sessionId: string) => {
    setIsLoading(true);
    await fetchCheckoutSession(sessionId)
      .then((response) => {
        if (response.statusCode === 200) {
          const session: CheckoutSessionModel = response.data.sessionData;
          setCustomerEmail(session.customerEmail);
          setStatus(session.sessionStatus);
        }
      })
      .catch((error) => {
        console.error('Error completing checkout', error);
        toast.error(`Error completing checkout: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams?.get('session_id') ?? '';
    getCheckoutSession(sessionId);
  }, []);

  useEffect(() => {
    if (status === 'complete') {
      toast.success('Payment completed successfully. Redirecting to dashboard...');
      setTimeout(() => {
        router.push(NAVIGATION_LINKS.USER_DASHBOARD);
      }, 5000);
    }
  }, [status]);

  return (
    <div className='grid place-items-center'>
      {isLoading ? (
        <CircularProgress
          color={'primary'}
          className={'p-4'}
          label='Processing payment checkout...Please stay on this page'
        />
      ) : (
        <>
          {status === 'complete' ? (
            <>
              <div className='p-10 text-center'>
                <p>
                  Thank you for choosing our services! A confirmation email will be promptly dispatched to
                  the email address you provided.
                </p>
                <p>
                  If you have any inquiries or require
                  further assistance, please do not hesitate to contact our dedicated support team at{' '}
                  <a href='mailto:support@example.com'>support@petdiaries.io</a>.
                </p>
              </div>
            </>
          ) : (
            <div className='p-10 text-center'>
              The payment failed or was canceled. Please <Link className='text-primary'
                                                               href={NAVIGATION_LINKS.PAYMENTS}>Try Again</Link>
              or contact customer support.
            </div>
          )}
        </>
      )}
    </div>
  );
}