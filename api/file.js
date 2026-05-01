export default async function handler(req, res) {
  try {
    const fileUrl = encodeURI(
      "https://raw.githubusercontent.com/LeandroDuarte28/DocsGraz/main/DECLARAÇÃO DE ENDEREÇO-2.pdf"
    );

    const response = await fetch(fileUrl);

    if (!response.ok) {
      console.error("Erro ao buscar arquivo:", response.status);
      return res.status(500).send("Erro ao baixar arquivo");
    }

    const buffer = await response.arrayBuffer();

    // HEADERS CORRETOS
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=declaracao.pdf");
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).send(Buffer.from(buffer));

  } catch (error) {
    console.error("Erro geral:", error);
    return res.status(500).send("Erro interno no servidor");
  }
}
