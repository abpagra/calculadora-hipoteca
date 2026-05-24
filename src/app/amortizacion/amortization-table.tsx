"use client";

import { useState } from "react";
import { Amortizacion } from "../hipoteca";

interface AmortizationTableProps {
  cuadroBase: Amortizacion[];
  cuadroExtra: Amortizacion[];
}

export default function AmortizationTable({
  cuadroBase,
  cuadroExtra,
}: AmortizationTableProps) {
  const [escenario, setEscenario] = useState<"base" | "extra">("extra");
  const [mostrarTodas, setMostrarTodas] = useState(false);

  const data = escenario === "base" ? cuadroBase : cuadroExtra;
  const visible = mostrarTodas ? data : data.slice(0, 12);

  return (
    <div className="mt-3">
      <div className="btn-group mb-2" role="group">
        <button
          type="button"
          className={`btn btn-sm ${escenario === "base" ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => setEscenario("base")}
        >
          Sin amortizar
        </button>
        <button
          type="button"
          className={`btn btn-sm ${escenario === "extra" ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => setEscenario("extra")}
        >
          Con amortización
        </button>
      </div>

      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-striped table-hover table-sm mb-0">
          <thead className="table-dark" style={{ position: "sticky", top: 0 }}>
            <tr>
              <th>#</th>
              <th>Cuota (€)</th>
              <th>Intereses (€)</th>
              <th>Capital amortizado (€)</th>
              <th>Capital pendiente (€)</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.plazo + (row.cuota > 0 ? "C" : "A")}>
                <td>{row.plazo}</td>
                <td>{row.cuota > 0 ? row.cuota.toFixed(2) : "—"}</td>
                <td>{row.interesCuota.toFixed(2)}</td>
                <td>{row.capitalCuota.toFixed(2)}</td>
                <td>{Math.max(0, row.capitalPendiente).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 12 && (
        <button
          type="button"
          className="btn btn-link btn-sm mt-1"
          onClick={() => setMostrarTodas(!mostrarTodas)}
        >
          {mostrarTodas
            ? "Mostrar solo primeras 12 cuotas"
            : `Mostrar todas (${data.length} cuotas)`}
        </button>
      )}
    </div>
  );
}
