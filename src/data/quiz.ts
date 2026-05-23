export const quizQuestion = {
  id: "rio-jucu",
  question: "Qual rio passa pela Rota das Águas em Viana?",
  options: [
    { id: "a", label: "Rio Doce" },
    { id: "b", label: "Rio Jucu" },
    { id: "c", label: "Rio Santa Maria da Vitória" },
    { id: "d", label: "Rio Itapemirim" },
  ],
  correctId: "b" as const,
  successMessage:
    "Correto! O Rio Jucu é o coração da Rota das Águas. Cadastre-se e garanta seu voucher.",
  errorMessage:
    "Quase! O Rio Jucu corta Viana e é o eixo da Rota das Águas. Cadastre-se para aprender mais.",
};
