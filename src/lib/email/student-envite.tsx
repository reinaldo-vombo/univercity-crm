// emails/convite-aluno.tsx
import {
   Body, Button, Container, Head, Heading, Hr, Html,
   Preview, Section, Text, Tailwind,
} from "react-email"

interface ConviteAlunoProps {
   nomeAluno?: string
   nomeInstituicao?: string
   curso?: string
   anoLectivo?: string
   numeroEstudante?: string
   linkConvite?: string
   prazoExpiracao?: string
}

export default function ConviteAluno({
   nomeAluno = "Maria João Santos",
   nomeInstituicao = "Universidade Nacional",
   curso = "Licenciatura em Direito",
   anoLectivo = "2024/2025",
   numeroEstudante = "20240892",
   linkConvite = "https://plataforma.universidade.ao/convite/xyz789",
   prazoExpiracao = "7 dias",
}: ConviteAlunoProps) {
   return (
      <Html lang="pt">
         <Head />
         <Preview>
            O teu acesso à Plataforma Académica está pronto — {nomeInstituicao}
         </Preview>
         <Tailwind>
            <Body className="bg-[#F7F5F0] font-sans m-0 p-0">

               {/* Header */}
               <Section className="bg-[#0E1B12]">
                  <Container className="max-w-[600px] mx-auto px-8 py-10">
                     <Text className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase m-0 mb-1">
                        {nomeInstituicao}
                     </Text>
                     <Text className="text-white/40 text-[11px] tracking-widest m-0">
                        Plataforma Académica Digital
                     </Text>
                  </Container>
               </Section>

               <Section className="bg-[#C9A84C] py-0">
                  <Container className="max-w-[600px] mx-auto h-[2px]" />
               </Section>

               {/* Hero com número do estudante */}
               <Section className="bg-[#0E1B12]">
                  <Container className="max-w-[600px] mx-auto px-8 py-10">
                     <Text className="text-white/40 text-[11px] tracking-[0.2em] uppercase m-0 mb-2">
                        Número de Estudante
                     </Text>
                     <Text className="text-[#C9A84C] text-[48px] font-light m-0 leading-none mb-6">
                        {numeroEstudante}
                     </Text>
                     <Text className="text-white/60 text-[13px] m-0">
                        {curso} · {anoLectivo}
                     </Text>
                  </Container>
               </Section>

               {/* Body */}
               <Section className="bg-white">
                  <Container className="max-w-[600px] mx-auto px-8 py-12">

                     <Text className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase m-0 mb-6">
                        Bem-vindo(a) à Universidade
                     </Text>

                     <Heading className="text-[30px] font-light text-[#0E1B12] m-0 mb-8 leading-tight">
                        A tua jornada académica<br />começa aqui
                     </Heading>

                     <Text className="text-[15px] text-[#444] leading-[1.8] m-0 mb-4">
                        Olá, <strong>{nomeAluno}</strong>!
                     </Text>

                     <Text className="text-[15px] text-[#444] leading-[1.8] m-0 mb-4">
                        A tua inscrição na <strong>{nomeInstituicao}</strong> foi confirmada e
                        o teu acesso à Plataforma Académica Digital está pronto. É através desta
                        plataforma que vais gerir toda a tua vida universitária.
                     </Text>

                     <Text className="text-[15px] text-[#444] leading-[1.8] m-0 mb-10">
                        Clica no botão abaixo para criar a tua senha e aceder pela primeira vez.
                        Guarda o teu número de estudante — vais precisar dele frequentemente.
                     </Text>

                     {/* CTA */}
                     <Section className="text-center mb-10">
                        <Button
                           href={linkConvite}
                           className="bg-[#0E1B12] text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase px-10 py-4 no-underline inline-block"
                        >
                           Criar Conta e Aceder →
                        </Button>
                     </Section>

                     {/* Cards de funcionalidades */}
                     <Section className="mb-10">
                        <Text className="text-[13px] font-medium text-[#0E1B12] m-0 mb-5 tracking-wide">
                           O que encontras na plataforma:
                        </Text>

                        <Section className="bg-[#F7F5F0] px-6 py-4 mb-2">
                           <Text className="text-[13px] text-[#444] m-0">
                              <strong className="text-[#0E1B12]">📚 Conteúdos académicos</strong><br />
                              <span className="text-[#666]">Acede a fichas, slides e materiais de todas as unidades curriculares</span>
                           </Text>
                        </Section>

                        <Section className="bg-[#F7F5F0] px-6 py-4 mb-2">
                           <Text className="text-[13px] text-[#444] m-0">
                              <strong className="text-[#0E1B12]">📋 Avaliações e notas</strong><br />
                              <span className="text-[#666]">Consulta resultados, pautas e o teu histórico académico</span>
                           </Text>
                        </Section>

                        <Section className="bg-[#F7F5F0] px-6 py-4 mb-2">
                           <Text className="text-[13px] text-[#444] m-0">
                              <strong className="text-[#0E1B12]">💬 Comunicação directa</strong><br />
                              <span className="text-[#666]">Comunica com docentes e colegas de forma organizada</span>
                           </Text>
                        </Section>

                        <Section className="bg-[#F7F5F0] px-6 py-4">
                           <Text className="text-[13px] text-[#444] m-0">
                              <strong className="text-[#0E1B12]">📅 Calendário e horários</strong><br />
                              <span className="text-[#666]">Consulta o teu horário, datas de exames e eventos do campus</span>
                           </Text>
                        </Section>
                     </Section>

                     <Hr className="border-[#E8E4DC] my-8" />

                     <Text className="text-[12px] text-[#999] leading-relaxed m-0">
                        Este convite expira em <strong>{prazoExpiracao}</strong>. Se tiveres problemas a aceder,
                        contacta os serviços académicos em{" "}
                        <span className="text-[#0E1B12]">academicos@universidade.ao</span>{" "}
                        ou dirige-te à Secretaria com o teu documento de identificação.
                     </Text>
                  </Container>
               </Section>

               {/* Footer */}
               <Section className="bg-[#0E1B12]">
                  <Container className="max-w-[600px] mx-auto px-8 py-8">
                     <Hr className="border-[#C9A84C]/20 mb-6" />
                     <Text className="text-white/30 text-[11px] m-0 mb-1 text-center">
                        {nomeInstituicao} · Plataforma Académica Digital
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