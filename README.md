# Tráfego Juris

Site da Tráfego Juris, agência de anúncios no Instagram e Facebook para escritórios de advocacia em todo o Brasil.

## Estrutura

| Pasta / arquivo | O que é |
|---|---|
| `SITE/` | **O site que vai para o ar.** HTML, CSS e JS puros, sem build. É só enviar o conteúdo desta pasta para a hospedagem. |
| `COPY.md` | Todos os textos do site, seção por seção, e a bio do Instagram. |
| `FOTOS.md` | IDs das fotos do Shutterstock usadas no site. |
| `FOTOS/` | Fotos originais licenciadas no Shutterstock. Ficam só no Drive, fora do repositório (ver `.gitignore`). |
| `LOGOS/` | Logo em SVG (azul, branca e preta). |
| `FONT DA LOGO/` | Fonte Blinker (licença OFL). |
| `CÓDIGO/` | Página de referência usada no início do projeto. |

## Antes de publicar

Troque os dados provisórios:

- **WhatsApp:** `SITE/assets/script.js`, constante `WHATSAPP` (só dígitos, com 55 + DDD).
- **Instagram, e-mail e CNPJ:** rodapé de `SITE/index.html`.

## Publicação (Hostinger)

O branch `site` tem só o conteúdo da pasta `SITE/` na raiz. É ele que a Hostinger publica.
Depois de alterar o site no `main`, atualize o branch `site` com:

```
git subtree push --prefix SITE origin site
```

## Ver localmente

Abra `SITE/index.html` no navegador.
