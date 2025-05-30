import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#333',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#2e86de',
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  labelText: {
    fontWeight: 'bold',
    color: '#555',
  },
  valueText: {
    color: '#000',
  },
  footer: {
    marginTop: 40,
    fontSize: 10,
    textAlign: 'center',
    color: '#aaa',
  },
});

const BookingDetails = ({ bookings }: { bookings: any[] }) => (
    
  <Document>
    {bookings.map((booking, index) => (
      <Page key={booking._id || index} size="A4" style={styles.page}>
      <Text style={styles.header}>Admin Dashboard Details</Text>

      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>Booking ID:</Text>
          <Text style={styles.valueText}>{booking._id}</Text>
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>Technician:</Text>
          <Text style={styles.valueText}>{booking.technicianId.name}</Text>
        </View>
        <View style={styles.labelRow}>
            <Text style={styles.labelText}>User Name:</Text>
            <Text style={styles.valueText}>{booking.userId.name}</Text>
        </View>
       
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>Date:</Text>
          <Text style={styles.valueText}>{booking.booked_date}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>Rate per Hour:</Text>
          <Text style={styles.valueText}>₹{booking.rateperhour}</Text>
        </View>
         <View style={styles.labelRow}>
          <Text style={styles.labelText}>Admin Commission:</Text>
          <Text style={styles.valueText}>₹{booking.admincommision}</Text>
        </View>
        
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>Final Amount:</Text>
          <Text style={styles.valueText}>₹{booking.totalFinalAmount}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.labelText, { marginBottom: 6 }]}>Service Location:</Text>
        <Text style={styles.valueText}>{booking.addressId.addressname}</Text>
        <Text style={styles.valueText}>Pincode: {booking.pincode}</Text>
      </View>

      <Text style={styles.footer}>Thank you for choosing our service!</Text>
    </Page>
    ))}
  </Document>
);

export default BookingDetails;
