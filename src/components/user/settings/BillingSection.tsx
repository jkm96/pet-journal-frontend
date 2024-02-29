import { ProfileSectionProps } from '@/components/user/settings/ProfileSection';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { getUserBillingDetails } from '@/lib/services/payments/paymentsService';
import { UserSubscriptionResponse } from '@/boundary/interfaces/payment';
import {
  Button,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { formatDate } from '@/helpers/dateHelpers';
import DownloadIcon from '@/components/site/icons/DownloadIcon';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import InvoicePdfDocument from '@/components/user/settings/InvoiceDocument';

export default function BillingSection({ user }: ProfileSectionProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [billingInfo, setBillingInfo] = useState<UserSubscriptionResponse[]>([]);

  useEffect(() => {
    fetchBilling();
  }, []);

  const fetchBilling = async () => {
    setIsLoading(true);
    await getUserBillingDetails(user?.email || '')
      .then((response) => {
        if (response.statusCode === 200) {
          const payments = response.data;
          console.log('payments', payments);
          setBillingInfo(payments);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching billing info: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  async function downloadInvoice(billing: UserSubscriptionResponse) {
    const pdfContent = InvoicePdfDocument(billing,user);
    const blob = await pdf(pdfContent).toBlob();
    saveAs(blob, `${billing.invoice}.pdf`);
  }

  return (
    <>
      {isLoading ? (
        <div className={'grid place-items-center'}>
          <CircularProgress color={'primary'} className={'p-4'}
                            label='Loading your billing status...' />
        </div>
      ) : (
        <>
          <Table  aria-label={user?.username}>
            <TableHeader>
              <TableColumn>Invoice</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn className="hidden md:table-cell lg:table-cell">Start Date</TableColumn>
              <TableColumn className="hidden md:table-cell lg:table-cell">End Date</TableColumn>
              <TableColumn className="hidden md:table-cell lg:table-cell">Plan</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              {billingInfo.map((billing) => (
                <TableRow key={billing.id}>
                  <TableCell>{billing.invoice}</TableCell>
                  <TableCell>${billing.subscriptionPlan.price}</TableCell>
                  <TableCell className="hidden md:table-cell lg:table-cell">{formatDate(billing.startDate)}</TableCell>
                  <TableCell className="hidden md:table-cell lg:table-cell">{formatDate(billing.endDate)}</TableCell>
                  <TableCell className="hidden md:table-cell lg:table-cell">
                    <Chip color={billing.subscriptionPlan.name == "paid" ? 'success':'danger'}
                          size='sm'
                          variant="shadow">
                      {billing.subscriptionPlan.name}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip color={billing.status == "ACTIVE" ? 'success':'danger'}
                          size='sm'
                          variant="shadow">
                      {billing.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Button onPress={()=>downloadInvoice(billing)}
                            isIconOnly
                            size="sm"
                            style={{backgroundColor:'transparent'}}
                    >
                      <DownloadIcon color={"#24ed0d"}/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}