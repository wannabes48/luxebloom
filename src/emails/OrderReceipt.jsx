import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

// A premium, minimalist email design matching Luxe Bloom
export default function OrderReceipt({ customerName, orderId, total }) {
  return (
    <Html>
      <Head />
      <Preview>Your Luxe Bloom Order Confirmation</Preview>
      <Body style={{ backgroundColor: '#FFFDF7', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ margin: '0 auto', padding: '40px 20px', maxWidth: '600px' }}>
          <Heading style={{ color: '#0A5C36', fontSize: '24px', fontWeight: 'bold' }}>
            Luxe Bloom
          </Heading>
          
          <Text style={{ fontSize: '16px', color: '#1A1A1A', marginTop: '24px' }}>
            Hello {customerName},
          </Text>
          <Text style={{ fontSize: '16px', color: '#1A1A1A', lineHeight: '1.5' }}>
            Thank you for your order! We are preparing your premium arrangement and will notify you as soon as it ships.
          </Text>

          <Section style={{ backgroundColor: '#F8F5F0', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
            <Row>
              <Column>
                <Text style={{ margin: 0, color: '#6B6B6B', fontSize: '12px', textTransform: 'uppercase' }}>Order Number:</Text>
                <Text style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>{orderId}</Text>
              </Column>
              <Column align="right">
                <Text style={{ margin: 0, color: '#6B6B6B', fontSize: '12px', textTransform: 'uppercase' }}>Total Paid:</Text>
                <Text style={{ margin: 0, fontWeight: 'bold', color: '#0A5C36', fontSize: '18px' }}>${total}</Text>
              </Column>
            </Row>
          </Section>

          <Text style={{ marginTop: '40px', fontSize: '14px', color: '#6B6B6B', textAlign: 'center' }}>
            If you have any questions, reply to this email or contact us at support@luxebloom.com.
          </Text>
          
          <Section style={{ textAlign: 'center', marginTop: '24px' }}>
            <Text style={{ fontSize: '12px', color: '#9CA3AF' }}>
              © 2024 Luxe Bloom. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
