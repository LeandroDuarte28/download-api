export default async function handler(req, res) {
  try {
    // URL original com acentos (mantida como você pediu)
    const originalUrl = "https://raw.githubusercontent.com/LeandroDuarte28/DocsGraz/main/DECLARAÇÃO DE ENDEREÇO-2.pdf";

    // Corrige encoding automaticamente
    const fileUrl = encodeURI(originalUrl);

    console.log("Baixando arquivo de:", fileUrl);

    const response = await fetch(fileUrl);

    // Se falhar, log detalhado
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao buscar arquivo:", response.status, errorText);

      return res.status(500).send("Erro ao baixar arquivo");
    }

    const buffer = await response.arrayBuffer();

    // Headers para FORÇAR download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=declaracao.pdf");
    res.setHeader("Content-Length", buffer.byteLength);
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).send(Buffer.from(buffer));

  } catch (error) {
    console.error("Erro geral:", error);
    return res.status(500).send("Erro interno no servidor");
  }
}
