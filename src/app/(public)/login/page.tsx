export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Entrar no Elite Gestão
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Acede à tua conta de gestão.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="teu@email.com"
              className="w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Palavra-passe
            </label>

            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}