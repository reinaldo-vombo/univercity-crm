// emails/reset-password.tsx
import { serverEnv } from "@/config/env/server"
import {
   Body, Button, Container, Head, Heading, Hr, Html,
   Preview, Section, Text, Tailwind,
} from "react-email"

interface ResetPasswordProps {
   resetLink?: string
   expIn?: string
   requesterIp?: string
   requestDate?: string
}

export default function ResetPassword({
   resetLink = "https://plataforma.universidade.ao/reset/token123",
   expIn = "30 minutos",
   requesterIp = "197.155.32.10",
   requestDate = "1 de Maio de 2025, 14:32",
}: ResetPasswordProps) {
   const univercityName = serverEnv.UNIVERCITY_NAME
   return (
      <Html lang="pt">
         <Head />
         <Preview>
            Pedido de redefinição de senha — {univercityName}
         </Preview>
         <Tailwind>
            <Body className="bg-[#F7F5F0] font-sans m-0 p-0">
               <Section className="bg-[#0E1B12]">
                  <Container className="max-w-[600px] mx-auto px-8 py-10">
                     <Text className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase m-0 mb-1">
                        {univercityName}
                     </Text>
                     <Text className="text-white/40 text-[11px] tracking-widest m-0">
                        Segurança da Conta
                     </Text>
                  </Container>
               </Section>

               <Section className="bg-[#C9A84C] py-0">
                  <Container className="max-w-[600px] mx-auto h-[2px]" />
               </Section>

               {/* Alerta de segurança */}
               <Section className="bg-[#FFF8E8]">
                  <Container className="max-w-[600px] mx-auto px-8 py-4">
                     <Text className="text-[12px] text-[#8B6914] m-0 text-center tracking-wide">
                        ⚠ &nbsp; Pedido de alteração de credenciais de acesso
                     </Text>
                  </Container>
               </Section>

               {/* Body */}
               <Section className="bg-white">
                  <Container className="max-w-[600px] mx-auto px-8 py-12">

                     <Text className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase m-0 mb-6">
                        Redefinição de Senha
                     </Text>

                     <Heading className="text-[30px] font-light text-[#0E1B12] m-0 mb-8 leading-tight">
                        Recebemos um pedido<br />para redefinir a sua senha
                     </Heading>

                     <Text className="text-[15px] text-[#444] leading-[1.8] m-0 mb-10">
                        Foi efectuado um pedido de redefinição de senha para a sua conta na
                        Plataforma Académica da <strong>{univercityName}</strong>.
                        Se foi você, clique no botão abaixo para criar uma nova senha.
                     </Text>

                     {/* CTA */}
                     <Section className="text-center mb-4">
                        <Button
                           href={resetLink}
                           className="bg-[#0E1B12] text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase px-10 py-4 no-underline inline-block"
                        >
                           Redefinir Senha →
                        </Button>
                     </Section>

                     <Text className="text-[11px] text-[#999] text-center m-0 mb-10">
                        Este link expira em <strong className="text-[#666]">{expIn}</strong>
                     </Text>

                     <Hr className="border-[#E8E4DC] my-8" />

                     {/* Detalhes da solicitação */}
                     <Section className="bg-[#F7F5F0] px-6 py-5 mb-8">
                        <Text className="text-[12px] font-medium text-[#0E1B12] m-0 mb-4 tracking-wide uppercase">
                           Detalhes do Pedido
                        </Text>
                        <Text className="text-[12px] text-[#666] m-0 mb-2 leading-relaxed">
                           <span className="text-[#999]">Data e hora: &nbsp;</span>
                           {requestDate}
                        </Text>
                        <Text className="text-[12px] text-[#666] m-0 leading-relaxed">
                           <span className="text-[#999]">Endereço IP: &nbsp;</span>
                           {requesterIp}
                        </Text>
                     </Section>

                     {/* Aviso de segurança */}
                     <Section className="border border-[#F0C0C0] bg-[#FFF5F5] px-6 py-5 mb-8">
                        <Text className="text-[13px] text-[#C0392B] m-0 mb-2 font-medium">
                           Não fez este pedido?
                        </Text>
                        <Text className="text-[13px] text-[#666] m-0 leading-relaxed">
                           Se não solicitou a redefinição da sua senha, ignore este email — a sua conta
                           permanece segura. Recomendamos que altere a sua senha brevemente e contacte
                           os serviços de suporte em{" "}
                           <span className="text-[#0E1B12] font-medium">seguranca@universidade.ao</span>{" "}
                           caso suspeite de acesso não autorizado.
                        </Text>
                     </Section>

                     {/* Link alternativo */}
                     <Text className="text-[12px] text-[#999] leading-relaxed m-0">
                        Se o botão não funcionar, copie e cole o seguinte endereço no seu navegador:
                     </Text>
                     <Text className="text-[11px] text-[#0E1B12] break-all m-0 mt-2 font-mono bg-[#F7F5F0] px-3 py-2">
                        {resetLink}
                     </Text>
                  </Container>
               </Section>

               {/* Footer */}
               <Section className="bg-[#0E1B12]">
                  <Container className="max-w-[600px] mx-auto px-8 py-8">
                     <Hr className="border-[#C9A84C]/20 mb-6" />
                     <Text className="text-white/30 text-[11px] m-0 mb-1 text-center">
                        {univercityName} · Segurança da Conta
                     </Text>
                     <Text className="text-white/20 text-[10px] m-0 text-center tracking-widest uppercase">
                        Este é um email automático — não responda a esta mensagem
                     </Text>
                  </Container>
               </Section>

            </Body>
         </Tailwind>
      </Html>
   )
}