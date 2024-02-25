import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { UserSubscriptionResponse } from '@/boundary/interfaces/payment';
import { formatDate } from '@/helpers/dateHelpers';
import { User } from '@/boundary/interfaces/user';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  row: {
    fontSize:14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});

const InvoicePdfDocument = (billing: UserSubscriptionResponse, user: User | null) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={[styles.header,{textAlign:'center'}]}>Pet Diaries</Text>
        <View style={styles.section}>
          <Text style={styles.header}>Invoice Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Customer Ref:</Text>
            <Text style={{ textAlign:'left'}}>{user?.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice Number:</Text>
            <Text style={{ textAlign:'left'}}>{billing.invoice}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice Date:</Text>
            <Text>{formatDate(billing.createdAt)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice Status:</Text>
            <Text>Paid</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Subscription Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Subscription Plan:</Text>
            <Text>{billing.subscriptionPlan.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Start Date:</Text>
            <Text>{formatDate(billing.startDate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>End Date:</Text>
            <Text>{formatDate(billing.endDate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text>{billing.status}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Price:</Text>
            <Text>${billing.subscriptionPlan.price}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePdfDocument;
