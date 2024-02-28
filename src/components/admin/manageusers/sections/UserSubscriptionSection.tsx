import { UserResponse } from '@/boundary/interfaces/user';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserSubscriptions } from '@/lib/services/admin/manageUserSubscriptionsService';
import { UserSubscriptionResponse } from '@/boundary/interfaces/userSubscription';
import { CircularProgress } from '@nextui-org/react';

export function UserSubscriptionSection({ userId }: { userId: number } ) {
  const [userSubscriptionDetails, setUserSubscriptionDetails] = useState<UserSubscriptionResponse[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  const fetchUserSubscription = async (userId: any) => {
    setIsLoadingDetails(true);
    await getUserSubscriptions(userId)
      .then((response) => {
        if (response.statusCode === 200) {
          const subscription: UserSubscriptionResponse[] = response.data;
          console.log("subscription",subscription)
          setUserSubscriptionDetails(subscription);
        } else {
          toast.error(`Error fetching user subscriptions details: ${response.message}`);
        }
      })
      .catch((error) => {
        console.error('Error fetching user subscriptions details:', error);
        toast.error(`Error fetching user subscriptions details: ${error}`);
      })
      .finally(() => {
        setIsLoadingDetails(false);
      });
  };

  useEffect(() => {
    fetchUserSubscription(userId);
  }, [userId]);

  return (
    <section>
      <h3>User Subscriptions</h3>
      {isLoadingDetails ? (
        <div className='flex items-center justify-center'>
          <CircularProgress color='primary' className='p-4'
                            label='Loading user subscription details...' />
        </div>
      ) : (
        <>info</>
      )}
    </section>
  )
}