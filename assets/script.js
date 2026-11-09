// ===== Configuração: troque pelo número real (só dígitos, com 55 + DDD) =====
const WHATSAPP = "5500000000000";
const WA_MSG = "Olá! Vim pelo site da Tráfego Juris e quero agendar o diagnóstico gratuito.";

document.querySelectorAll(".js-wa").forEach((a) => {
  a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_MSG)}`;
  a.target = "_blank";
  a.rel = "noopener";
});

// ===== Anúncio no feed do hero: alterna entre áreas do Direito =====
const scenes = [
  {
    area: "Direito previdenciário",
    q: "Teve a aposentadoria negada pelo INSS?",
    a: "Entenda quais são os seus direitos.",
    cap: "Explicamos de forma simples o que fazer quando o INSS nega um benefício.",
    msg: "Olá, vi o anúncio e queria tirar uma dúvida sobre aposentadoria.",
  },
  {
    area: "Direito trabalhista",
    q: "Foi demitido e não recebeu tudo?",
    a: "Saiba o que a lei garante para você.",
    cap: "Rescisão, horas extras e FGTS: veja o que conferir antes de assinar.",
    msg: "Boa tarde! Fui demitido semana passada e queria entender meus direitos.",
  },
  {
    area: "Direito de família",
    q: "Dúvidas sobre pensão alimentícia?",
    a: "Entenda como funciona o pedido.",
    cap: "Quem pode pedir, como é calculada e o que fazer quando não é paga.",
    msg: "Oi, preciso de orientação sobre pensão para o meu filho.",
  },
  {
    area: "Direito do consumidor",
    q: "Juros abusivos no seu financiamento?",
    a: "Conheça os seus direitos.",
    cap: "Saiba quando a cobrança de juros pode ser revista.",
    msg: "Olá, acho que estou pagando juros abusivos no meu carro. Podem analisar?",
  },
  {
    area: "Direito à saúde",
    q: "O plano de saúde negou seu tratamento?",
    a: "Saiba o que pode ser feito.",
    cap: "Entenda o que fazer quando o plano recusa cirurgia, exame ou medicamento.",
    msg: "O plano negou a cirurgia da minha mãe. Preciso falar com um advogado.",
  },
];

const $ = (id) => document.getElementById(id);
const els = {
  art: $("postArt"), area: $("postArea"), q: $("postQ"), a: $("postA"),
  cap: $("postCap"), toast: $("toast"), toastText: $("toastText"),
};
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function fill(s) {
  els.area.textContent = s.area;
  els.q.textContent = s.q;
  els.a.textContent = s.a;
  els.cap.textContent = s.cap;
  els.toastText.textContent = s.msg;
}

async function loop() {
  let i = 0;
  els.toast.classList.add("is-hidden");
  await wait(1600);
  els.toast.classList.remove("is-hidden");
  await wait(3600);

  while (true) {
    i = (i + 1) % scenes.length;
    els.toast.classList.add("is-hidden");
    els.art.classList.add("is-hidden");
    await wait(500);
    fill(scenes[i]);
    els.art.classList.remove("is-hidden");
    await wait(1800);
    els.toast.classList.remove("is-hidden");
    await wait(3600);
  }
}

if (!reduce && els.art) loop();
