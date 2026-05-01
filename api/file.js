export default async function handler(req, res) {
  try {
    const fileUrl = "https://raw.githubusercontent.com/LeandroDuarte28/DocsGraz/main/DECLARAÇÃO%20DE%20ENDEREÇO-2.pdf";

    const response = await fetch(fileUrl);

    if (!response.ok) {
      console.error("Erro ao buscar arquivo:", response.status);
      return res.status(500).send("Erro ao baixar arquivo");
    }

    // FORÇA DOWNLOAD
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=declaracao.pdf");
    res.setHeader("Cache-Control", "no-store");

    // STREAM (mais confiável que buffer)
    const reader = response.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: res.getHeaders(),
    });

  } catch (error) {
    console.error("Erro geral:", error);
    return res.status(500).send("Erro interno no servidor");
  }
}
