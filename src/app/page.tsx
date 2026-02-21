import Link from "next/link";


export default function Home() {
  return (
    <main>
      <h1 className="text-danger" >Simulador hipotecas</h1>
      <Link href="/amortizacion" className="btn btn-primary">Simulacion de amortizacion periodica</Link>
    </main>
  );
}
