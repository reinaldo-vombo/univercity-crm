// emails/convite-professor.tsx
import {
   Body, Button, Container, Head, Heading, Hr, Html,
   Img, Preview, Section, Text, Tailwind,
} from "react-email"

interface ConviteProfessorProps {
   nomeDocente?: string
   nomeInstituicao?: string
   departamento?: string
   linkConvite?: string
}

export default function ConviteProfessor({
   nomeDocente = "Prof. Dr. António Silva",
   nomeInstituicao = "Universidade Nacional",
   departamento = "Faculdade de Engenharia",
   linkConvite = "https://plataforma.universidade.ao/convite/abc123",
}: ConviteProfessorProps) {
   return (
      <Html lang="pt">
         <Head />
         <Preview>
            Convite para aceder à Plataforma Académica — {nomeInstituicao}
         </Preview>
         <Tailwind>
            <Body className="bg-[#F7F5F0] font-sans m-0 p-0">

               {/* Header */}
               <Section className="bg-[#0E1B12] px-0 py-0">
                  <Container className="max-w-[600px] mx-auto px-8 py-10">
                     <Img src='/mx-black.png' width={90} height={90} alt="logo" />
                     <Text className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase m-0 mb-1">
                        {nomeInstituicao}
                     </Text>
                     <Text className="text-white/40 text-[11px] tracking-widest m-0">
                        Plataforma Académica Digital
                     </Text>
                  </Container>
               </Section>

               {/* Linha dourada */}
               <Section className="bg-[#C9A84C] py-0">
                  <Container className="max-w-[600px] mx-auto h-[2px]" />
               </Section>

               {/* Body */}
               <Section className="bg-white">
                  <Container className="max-w-[600px] mx-auto px-8 py-12">

                     <Text className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase m-0 mb-6">
                        Convite Institucional
                     </Text>

                     <Heading className="text-[32px] font-light text-[#0E1B12] m-0 mb-8 leading-tight">
                        Bem-vindo à nossa<br />Plataforma Académica
                     </Heading>

                     <Text className="text-[15px] text-[#444] leading-[1.8] m-0 mb-4">
                        Prezado(a) <strong>{nomeDocente}</strong>,
                     </Text>

                     <Text className="text-[15px] text-[#444] leading-[1.8] m-0 mb-4">
                        É com satisfação que o(a) convidamos a juntar-se à Plataforma Académica Digital
                        da <strong>{nomeInstituicao}</strong>, o espaço centralizado onde docentes e investigadores
                        gerem o seu percurso académico, comunicam com estudantes e acedem a recursos institucionais.
                     </Text>

                     <Text className="text-[15px] text-[#444] leading-[1.8] m-0 mb-10">
                        O seu perfil foi criado no departamento de <strong>{departamento}</strong>.
                        Clique no botão abaixo para activar a sua conta e definir a sua senha de acesso.
                     </Text>

                     {/* CTA */}
                     <Section className="text-center mb-10">
                        <Button
                           href={linkConvite}
                           className="bg-[#0E1B12] text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase px-10 py-4 no-underline inline-block"
                        >
                           Activar Conta de Docente →
                        </Button>
                     </Section>

                     {/* Caixa de info */}
                     <Section className="bg-[#F7F5F0] border-l-2 border-[#C9A84C] px-6 py-5 mb-10">
                        <Text className="text-[13px] text-[#666] m-0 mb-2 leading-relaxed">
                           <strong className="text-[#0E1B12]">O que pode fazer na plataforma:</strong>
                        </Text>
                        <Text className="text-[13px] text-[#666] m-0 leading-relaxed">
                           · Gerir turmas e sumários<br />
                           · Publicar materiais e avaliações<br />
                           · Aceder ao seu dossiê académico<br />
                           · Submeter e gerir investigação
                        </Text>
                     </Section>

                     <Hr className="border-[#E8E4DC] my-8" />

                     <Text className="text-[12px] text-[#999] leading-relaxed m-0">
                        Caso não tenha solicitado este acesso, por favor ignore este email ou contacte
                        os serviços de informática em <span className="text-[#0E1B12]">suporte@universidade.ao</span>.
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