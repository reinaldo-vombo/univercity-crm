import { serverEnv } from "@/config/env/server";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AdmitionExamePasseProps {
  applicantName: string;
  examId: string;
}

export const ExameAcessoAprovado = ({
  applicantName,
  examId,
}: AdmitionExamePasseProps) => {
  const registerUrl = `${serverEnv.NEXTAUTH_URL}/register?exameId=${encodeURIComponent(
    examId
  )}`;

  return (
    <Html>
      <Head />

      <Preview>
        Parabéns! Você foi aprovado no Exame de Acesso da Universidade Manuel
        Xavier.
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.logo}>SIGU</Text>
            <Text style={styles.headerSubtitle}>
              Sistema Integrado de Gestão Universitária
            </Text>
          </Section>

          {/* Content */}
          <Section style={styles.content}>
            <Text style={styles.greeting}>
              Prezado(a) <strong>{applicantName}</strong>,
            </Text>

            <Heading style={styles.title}>
              Parabéns pela sua aprovação! 🎉
            </Heading>

            <Text style={styles.paragraph}>
              Temos o prazer de informar que você foi{" "}
              <strong style={styles.successText}>aprovado(a)</strong> no Exame
              de Acesso da <strong>Universidade Manuel Xavier</strong>.
            </Text>

            <Text style={styles.paragraph}>
              Agradecemos a sua participação e dedicação durante o processo de
              admissão. Estamos muito felizes em dar o próximo passo consigo.
            </Text>

            {/* Success badge */}
            <Section style={styles.successBox}>
              <Text style={styles.successIcon}>✓</Text>

              <Text style={styles.successTitle}>
                Exame de Acesso — Aprovado
              </Text>

              <Text style={styles.successDescription}>
                O seu resultado foi validado com sucesso.
              </Text>
            </Section>

            {/* Exam information */}
            <Section style={styles.infoBox}>
              <Text style={styles.infoLabel}>ID DO EXAME</Text>

              <Text style={styles.examId}>{examId}</Text>

              <Text style={styles.infoDescription}>
                Guarde este identificador para futuras consultas relacionadas
                ao seu processo de admissão.
              </Text>
            </Section>

            <Text style={styles.paragraph}>
              Para continuar o seu processo de admissão, realize agora o seu{" "}
              <strong>cadastro como estudante</strong> através do botão abaixo.
            </Text>

            {/* CTA */}
            <Section style={styles.buttonSection}>
              <Button href={registerUrl} style={styles.button}>
                Cadastrar como estudante
              </Button>
            </Section>

            <Text style={styles.smallText}>
              O botão acima irá direcioná-lo para a página de cadastro de
              estudante.
            </Text>

            {/* Fallback URL */}
            <Section style={styles.linkBox}>
              <Text style={styles.linkLabel}>
                Caso o botão não funcione, copie e cole o endereço abaixo no
                seu navegador:
              </Text>

              <Link href={registerUrl} style={styles.link}>
                {registerUrl}
              </Link>
            </Section>

            <Hr style={styles.divider} />

            <Text style={styles.footerText}>
              Este email foi enviado automaticamente pelo SIGU. Por favor, não
              responda a esta mensagem.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerBrand}>SIGU</Text>

            <Text style={styles.footerCopyright}>
              © {new Date().getFullYear()} SIGU — Sistema Integrado de Gestão
              Universitária
            </Text>

            <Text style={styles.footerUniversity}>
              Universidade Manuel Xavier
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f7fb",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    margin: "0",
    padding: "40px 20px",
  },

  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    margin: "0 auto",
    maxWidth: "600px",
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#16233F",
    padding: "28px 40px",
  },

  logo: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "-1px",
    margin: "0",
  },

  headerSubtitle: {
    color: "#b8c3d8",
    fontSize: "12px",
    margin: "5px 0 0",
  },

  content: {
    padding: "40px",
  },

  greeting: {
    color: "#16233F",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 20px",
  },

  title: {
    color: "#16233F",
    fontSize: "26px",
    fontWeight: "700",
    lineHeight: "34px",
    margin: "0 0 16px",
  },

  paragraph: {
    color: "#4B5563",
    fontSize: "15px",
    lineHeight: "25px",
    margin: "0 0 16px",
  },

  successText: {
    color: "#16805B",
  },

  successBox: {
    backgroundColor: "#ECFDF5",
    border: "1px solid #A7F3D0",
    borderRadius: "10px",
    margin: "28px 0 20px",
    padding: "22px",
    textAlign: "center" as const,
  },

  successIcon: {
    backgroundColor: "#16805B",
    borderRadius: "50%",
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "700",
    height: "34px",
    lineHeight: "34px",
    margin: "0 auto 10px",
    width: "34px",
  },

  successTitle: {
    color: "#126B4D",
    fontSize: "16px",
    fontWeight: "700",
    margin: "0 0 5px",
  },

  successDescription: {
    color: "#4B7565",
    fontSize: "13px",
    margin: "0",
  },

  infoBox: {
    backgroundColor: "#F7F8FC",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    margin: "20px 0 28px",
    padding: "20px 22px",
  },

  infoLabel: {
    color: "#6B7280",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    margin: "0 0 8px",
  },

  examId: {
    backgroundColor: "#EEF2FF",
    borderRadius: "6px",
    color: "#16233F",
    display: "inline-block",
    fontFamily: "monospace",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    margin: "0 0 10px",
    padding: "8px 12px",
  },

  infoDescription: {
    color: "#6B7280",
    fontSize: "12px",
    lineHeight: "19px",
    margin: "0",
  },

  buttonSection: {
    padding: "8px 0 12px",
    textAlign: "center" as const,
  },

  button: {
    backgroundColor: "#16233F",
    borderRadius: "7px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: "600",
    padding: "13px 26px",
    textDecoration: "none",
  },

  smallText: {
    color: "#8A94A6",
    fontSize: "12px",
    lineHeight: "18px",
    margin: "8px 0 24px",
    textAlign: "center" as const,
  },

  linkBox: {
    backgroundColor: "#FAFAFA",
    borderRadius: "8px",
    padding: "16px",
  },

  linkLabel: {
    color: "#6B7280",
    fontSize: "12px",
    lineHeight: "18px",
    margin: "0 0 8px",
  },

  link: {
    color: "#315EA8",
    fontSize: "12px",
    lineHeight: "18px",
    wordBreak: "break-all" as const,
  },

  divider: {
    borderColor: "#E5E7EB",
    margin: "30px 0 20px",
  },

  footerText: {
    color: "#9CA3AF",
    fontSize: "11px",
    lineHeight: "18px",
    margin: "0",
    textAlign: "center" as const,
  },

  footer: {
    backgroundColor: "#F8F9FC",
    borderTop: "1px solid #EEF0F4",
    padding: "24px 40px",
    textAlign: "center" as const,
  },

  footerBrand: {
    color: "#16233F",
    fontSize: "16px",
    fontWeight: "800",
    margin: "0 0 6px",
  },

  footerCopyright: {
    color: "#9CA3AF",
    fontSize: "11px",
    lineHeight: "17px",
    margin: "0",
  },

  footerUniversity: {
    color: "#9CA3AF",
    fontSize: "11px",
    margin: "4px 0 0",
  },
};