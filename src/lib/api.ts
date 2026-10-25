
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiGet<T>(
  path: string,
  signal?: AbortSignal
): Promise<T> {
  if (!API_URL) {
    throw new Error(
      "A variável NEXT_PUBLIC_API_URL não está configurada."
    );
  }

  const baseUrl = API_URL.replace(/\/$/, "");
  const endpoint = path.replace(/^\//, "");

  const response = await fetch(`${baseUrl}/${endpoint}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Erro ao consultar a API (HTTP ${response.status}).`
    );
  }

  return (await response.json()) as T;
}
