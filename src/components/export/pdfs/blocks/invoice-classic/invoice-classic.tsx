import { PdfxThemeProvider, usePdfxTheme } from '@/lib/pdfx-theme-context';
import { KeyValue } from '../../../pdfx/key-value/pdfx-key-value';

import type { PdfxTheme } from '@/lib/pdfx-theme';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { PageHeader } from '@/components/export/pdfx/page-header/pdfx-page-header';
import { PdfImage } from '@/components/export/pdfx/pdf-image/pdfx-pdf-image';
import { Section } from '@/components/export/pdfx/section/pdfx-section';
import { Text } from '@/components/export/pdfx/text/pdfx-text';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/export/pdfx/table/pdfx-table';
import { PageFooter } from '@/components/export/pdfx/page-footer/pdfx-page-footer';
import { clientEnv } from '@/config/env/client';
import { TExamePayment } from '@/types/global';

type PaymentInvoiceProps = {
  theme?: PdfxTheme;
  payment: TExamePayment;
};

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency,
  }).format(value);
}

function formatDate(date: Date | null) {
  if (!date) return '—';
  return new Intl.DateTimeFormat('pt-AO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function PaymentInvoice({ theme, payment }: PaymentInvoiceProps) {
  return (
    <PdfxThemeProvider theme={theme}>
      <InvoiceClassicContent payment={payment} />
    </PdfxThemeProvider>
  );
}

function InvoiceClassicContent({ payment }: { payment: TExamePayment }) {
  const theme = usePdfxTheme();

  const styles = StyleSheet.create({
    page: {
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      backgroundColor: theme.colors.background,
    },
  });

  const subtotal = payment.paymentItems.reduce((sum, item) => sum + item.amount, 0);
  const extra = payment.extraAmount ?? 0;
  const total = payment.totalAmount ?? subtotal + extra;

  return (
    <Document title={`Recibo ${payment.transactionRef ?? payment.id}`}>
      <Page size="A4" style={styles.page}>
        <PageHeader
          variant="logo-left"
          logo={<PdfImage src={'/logo.svg'} style={{ margin: 0 }} />}
          title={clientEnv.NEXT_PUBLIC_SITE_NAME}
          subtitle="Comprovativo de Pagamento"
          rightText={payment.transactionRef ?? payment.id}
          rightSubText={`Pago em: ${formatDate(payment.paidAt)}`}
          style={{ marginBottom: 0 }}
        />

        <Section noWrap style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, paddingRight: 15 }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }} color="mutedForeground" transform="uppercase" noMargin>
              Pagador
            </Text>
            <Text noMargin variant="xs">{payment.payerName ?? 'Não informado'}</Text>
            {payment.payerBank && <Text noMargin variant="xs">{payment.payerBank}</Text>}
            {payment.payerIban && <Text noMargin variant="xs">{payment.payerIban}</Text>}
          </View>

          <View style={{ flex: 1, paddingRight: 15 }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }} color="mutedForeground" transform="uppercase" noMargin>
              Pago para
            </Text>
            <Text noMargin variant="xs">UN Manuel Xavier</Text>
            <Text noMargin variant="xs">{clientEnv.NEXT_PUBLIC_UNIVERCITY_LOCATION}</Text>
            <Text noMargin variant="xs">{clientEnv.NEXT_PUBLIC_UNIVERCITY_EMAIL}</Text>
          </View>

          <View style={{ flex: 1, paddingRight: 15 }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 2 }} color="mutedForeground" transform="uppercase" noMargin>
              Detalhes do pagamento
            </Text>
            <Text noMargin variant="xs">Método: {payment.method}</Text>
            <Text noMargin variant="xs">Estado: {payment.status}</Text>
            {payment.transactionRef && <Text noMargin variant="xs">Ref: {payment.transactionRef}</Text>}
          </View>
        </Section>

        <Table variant="grid" zebraStripe>
          <TableHeader>
            <TableRow header>
              <TableCell>Descrição</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payment.paymentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">{item.entityType}</TableCell>
                <TableCell align="right">{formatCurrency(item.amount, payment.currency)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Section noWrap style={{ flexDirection: 'row', marginTop: 16 }}>
          <View style={{ marginLeft: 'auto', width: 220 }}>
            <KeyValue
              size="sm"
              dividerThickness={1}
              items={[
                { key: 'Subtotal', value: formatCurrency(subtotal, payment.currency) },
                ...(extra > 0
                  ? [{ key: 'Taxa extra', value: formatCurrency(extra, payment.currency) }]
                  : []),
                {
                  key: 'Total',
                  value: formatCurrency(total, payment.currency),
                  valueStyle: { fontSize: 12, fontWeight: 'bold' },
                  keyStyle: { fontSize: 12, fontWeight: 'bold' },
                },
              ]}
              divided
            />
          </View>
        </Section>

        <PageFooter
          leftText={
            payment.status === 'APROVE'
              ? 'Obrigado pelo seu pagamento!'
              : 'Comprovativo gerado automaticamente'
          }
          rightText="Página 1 de 1"
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
}
