import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserSubscriptions } from '@/lib/services/admin/manageUserSubscriptionsService';
import { UserSubscriptionResponse } from '@/boundary/interfaces/userSubscription';
import { Accordion, AccordionItem, Chip, CircularProgress, Input } from '@nextui-org/react';
import { formatDate } from '@/helpers/dateHelpers';
import { CloseIcon } from '@nextui-org/shared-icons';
import CheckMarkIcon from '@/components/site/icons/CheckMarkIcon';

export function UserSubscriptionSection({ userId }: { userId: number }) {
  const [userSubscriptionDetails, setUserSubscriptionDetails] = useState<UserSubscriptionResponse[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  const fetchUserSubscription = async (userId: any) => {
    setIsLoadingDetails(true);
    await getUserSubscriptions(userId)
      .then((response) => {
        if (response.statusCode === 200) {
          const subscription: UserSubscriptionResponse[] = response.data;
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
      <h3 className='m-2'>User Subscriptions</h3>

      {isLoadingDetails ? (
        <div className='flex items-center justify-center'>
          <CircularProgress color='primary' className='p-4'
                            label='Loading user subscription details...' />
        </div>
      ) : (
        <>
          <Accordion variant='splitted'>
            {userSubscriptionDetails.map((subscription) => (
              <AccordionItem key={subscription.id}
                             className='px-0'
                             aria-label={subscription.customerId}
                             startContent={subscription.status === 'ACTIVE' ?
                               <Chip size='sm' color='success'>Active</Chip> :
                               <Chip size='sm' color='danger'>Expired</Chip>}
                             title={`${subscription.customerId}-${subscription.invoice}`}
                             subtitle={formatDate(subscription.createdAt)}
                             indicator={subscription.status == 'ACTIVE' ? <CheckMarkIcon color={'#24ed0d'} /> :
                               <CloseIcon color={'#e30f0f'} />}
              >
                <h3 className='mt-2 mb-3'>Subscription Details</h3>

                <div className='flex flex-col gap-4'>
                  <div className='flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <Input
                      type='text'
                      label='Customer Id'
                      readOnly={true}
                      value={subscription.customerId}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='Invoice'
                      readOnly={true}
                      value={subscription.invoice}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='Payment Intent Id'
                      readOnly={true}
                      value={subscription.paymentIntentId}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='Status'
                      readOnly={true}
                      value={subscription.status}
                      labelPlacement={'outside'}
                    />
                  </div>

                  <div className='flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <Input
                      type='text'
                      label='Start Date'
                      readOnly={true}
                      value={formatDate(subscription.startDate)}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='End Date'
                      readOnly={true}
                      value={formatDate(subscription.endDate)}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='Created At'
                      readOnly={true}
                      value={formatDate(subscription.createdAt)}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='Updated At'
                      readOnly={true}
                      value={formatDate(subscription.updatedAt)}
                      labelPlacement={'outside'}
                    />
                  </div>
                </div>

                <h3 className='mt-2 mb-2'>Subscription Plan Details</h3>
                <div className='flex flex-col gap-4'>
                  <div className='flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <Input
                      type='text'
                      label='Name'
                      readOnly={true}
                      value={subscription.subscriptionPlan.name}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='Billing Cycle'
                      readOnly={true}
                      value={subscription.subscriptionPlan.billingCycle}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='Price'
                      readOnly={true}
                      value={`$ ${subscription.subscriptionPlan.price}`}
                      labelPlacement={'outside'}
                    />
                  </div>

                  <div className='flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4'>
                    <Input
                      type='text'
                      label='Description'
                      readOnly={true}
                      value={subscription.subscriptionPlan.description}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='Created At'
                      readOnly={true}
                      value={formatDate(subscription.createdAt)}
                      labelPlacement={'outside'}
                    />

                    <Input
                      type='text'
                      label='Updated At'
                      readOnly={true}
                      value={formatDate(subscription.updatedAt)}
                      labelPlacement={'outside'}
                    />
                  </div>
                </div>

              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </section>
  );
}