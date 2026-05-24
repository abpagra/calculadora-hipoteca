"use client";

import { useState } from "react";
import { Hipoteca } from "../hipoteca";
import AmortizationTable from "./amortization-table";
import AmortizationChart from "./amortization-chart";

interface DetailsProps {
  hipoteca: Hipoteca;
  cuotaActual: number;
  periocidad: string;
  cantidadAmortizar: number;
}

type Seccion = "resumen" | "tabla" | "graficos";

export default function Details({
  hipoteca,
  cuotaActual,
  periocidad,
  cantidadAmortizar,
}: DetailsProps) {
  const [seccion, setSeccion] = useState<Seccion>("resumen");

  const cuadroBase = hipoteca.cuadroAmortizacion(cuotaActual);
  const cuadroExtra = hipoteca.calcularAmortizacion(
    cuotaActual,
    periocidad,
    cantidadAmortizar,
  );

  const totalBase = cuadroBase.reduce(
    (acc, v) => ({
      capital: acc.capital + v.capitalCuota,
      interes: acc.interes + v.interesCuota,
      plazo: acc.plazo + 1,
    }),
    { capital: 0, interes: 0, plazo: 0 },
  );

  const totalExtra = cuadroExtra.reduce(
    (acc, v) => {
      acc.capital += v.capitalCuota;
      acc.interes += v.interesCuota;
      if (v.interesCuota > 0) acc.plazo++;
      return acc;
    },
    { capital: 0, interes: 0, plazo: 0 },
  );

  const navItems: { key: Seccion; label: string }[] = [
    { key: "resumen", label: "Resumen" },
    { key: "tabla", label: "Tabla detallada" },
    { key: "graficos", label: "Gráficos" },
  ];

  return (
    <div className="mt-4">
      <ul className="nav nav-tabs">
        {navItems.map((item) => (
          <li className="nav-item" key={item.key}>
            <button
              type="button"
              className={`nav-link ${seccion === item.key ? "active" : ""}`}
              onClick={() => setSeccion(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content border border-top-0 p-3 rounded-bottom">
        {seccion === "resumen" && (
          <div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="card bg-light h-100">
                  <div className="card-body">
                    <h6 className="card-title text-muted">Sin amortizar</h6>
                    <p className="card-text mb-1">
                      <strong>{totalBase.plazo}</strong> cuotas (
                      {Math.trunc(totalBase.plazo / 12)} años y{" "}
                      {totalBase.plazo % 12} meses)
                    </p>
                    <p className="card-text mb-0">
                      Intereses totales:{" "}
                      <strong>{totalBase.interes.toFixed(2)} €</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <div className="card bg-light h-100">
                  <div className="card-body">
                    <h6 className="card-title text-muted">
                      Con amortización ({periocidad})
                    </h6>
                    <p className="card-text mb-1">
                      <strong>{totalExtra.plazo}</strong> cuotas (
                      {Math.trunc(totalExtra.plazo / 12)} años y{" "}
                      {totalExtra.plazo % 12} meses)
                    </p>
                    <p className="card-text mb-0">
                      Intereses totales:{" "}
                      <strong>{totalExtra.interes.toFixed(2)} €</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-success d-flex justify-content-between align-items-center">
              <span>
                <strong>Ahorro total:</strong>{" "}
                {totalBase.plazo - totalExtra.plazo} cuotas menos (
                {Math.trunc((totalBase.plazo - totalExtra.plazo) / 12)} años y{" "}
                {(totalBase.plazo - totalExtra.plazo) % 12} meses)
              </span>
              <span className="fs-5">
                {
                  (totalBase.interes - totalExtra.interes).toFixed(2)
                } € menos en intereses
              </span>
            </div>
          </div>
        )}

        {seccion === "tabla" && (
          <AmortizationTable
            cuadroBase={cuadroBase}
            cuadroExtra={cuadroExtra}
          />
        )}

        {seccion === "graficos" && (
          <AmortizationChart
            cuadroBase={cuadroBase}
            cuadroExtra={cuadroExtra}
          />
        )}
      </div>
    </div>
  );
}
