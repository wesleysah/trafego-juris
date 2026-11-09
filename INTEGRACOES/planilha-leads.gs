/**
 * Recebe os leads do quiz (trafegojuris.dablioagencia.com/diagnostico) e grava na planilha
 * "Leads — Diagnóstico Tráfego Juris", uma linha por envio.
 *
 * Como instalar (uma vez):
 *  1. Abra a planilha > Extensões > Apps Script. Apague o que estiver lá e cole este arquivo inteiro.
 *  2. Salve. Clique em Implantar > Nova implantação > tipo "App da Web".
 *     Executar como: Eu.  Quem pode acessar: Qualquer pessoa.  Clique em Implantar e autorize.
 *  3. Copie a "URL do app da Web" (termina em /exec) e cole em LEAD_ENDPOINT no quiz.
 */

const CAMPOS = ['nome', 'whatsapp', 'cidade', 'area', 'desafio', 'atendimento', 'investimento'];

function doPost(e) {
  try {
    const dados = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const limpo = {};
    CAMPOS.forEach((c) => { limpo[c] = seguro(dados[c]); });

    // Ignora envios sem nome ou sem WhatsApp (robôs, testes vazios)
    if (!limpo.nome || limpo.whatsapp.replace(/\D/g, '').length < 12) return resposta('ignorado');

    const aba = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    aba.appendRow([
      new Date(), limpo.nome, limpo.whatsapp, limpo.cidade, limpo.area,
      limpo.desafio, limpo.atendimento, limpo.investimento, seguro(dados.pagina),
    ]);
    return resposta('ok');
  } catch (err) {
    return resposta('erro');
  }
}

// Texto curto e sem fórmula: o que começa com = + - @ vira texto puro na planilha.
function seguro(v) {
  let s = String(v == null ? '' : v).trim().slice(0, 200);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function resposta(status) {
  return ContentService.createTextOutput(JSON.stringify({ status })).setMimeType(ContentService.MimeType.JSON);
}
