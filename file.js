export default async function handler(req, res) {
  const fileUrl = "https://raw.githubusercontent.com/LeandroDuarte28/DocsGraz/main/DECLARAÇÃO%20DE%20ENDEREÇO-2.pdf";

  const response = await fetch(fileUrl);

  if (!response.ok) {
    return res.status(500).send("Erro ao baixar arquivo");
  }

  const buffer = await response.arrayBuffer();

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Disposition", "attachment; filename=declaracao.pdf");

  res.send(Buffer.from(buffer));
}
