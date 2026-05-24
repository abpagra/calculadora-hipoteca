"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Amortizacion } from "../hipoteca";

interface AmortizationChartProps {
  cuadroBase: Amortizacion[];
  cuadroExtra: Amortizacion[];
}

const COLORS = {
  base: "#dc3545",
  extra: "#0d6efd",
  capital: "#0d6efd",
  interes: "#dc3545",
};

function prepararLineas(
  base: Amortizacion[],
  extra: Amortizacion[],
) {
  const maxLen = Math.max(base.length, extra.length);
  const result = [];
  for (let i = 0; i < maxLen; i++) {
    const point: Record<string, number | string> = { mes: i + 1 };
    if (i < base.length) point["Sin amortizar"] = Math.max(0, base[i].capitalPendiente);
    if (i < extra.length) point["Con amortización"] = Math.max(0, extra[i].capitalPendiente);
    result.push(point);
  }
  return result;
}

function prepararBarras(extra: Amortizacion[]) {
  const primeras = extra.filter((r) => r.cuota > 0).slice(0, 12);
  return primeras.map((r) => ({
    mes: r.plazo,
    Capital: r.capitalCuota,
    Interés: r.interesCuota,
  }));
}

function totales(data: Amortizacion[]) {
  return data.reduce(
    (acc, r) => ({
      capital: acc.capital + (r.cuota > 0 ? r.capitalCuota : 0),
      interes: acc.interes + r.interesCuota,
    }),
    { capital: 0, interes: 0 },
  );
}

export default function AmortizationChart({
  cuadroBase,
  cuadroExtra,
}: AmortizationChartProps) {
  const datosLineas = prepararLineas(cuadroBase, cuadroExtra);
  const datosBarras = prepararBarras(cuadroExtra);
  const totalBase = totales(cuadroBase);
  const totalExtra = totales(cuadroExtra);
  const ahorroIntereses = totalBase.interes - totalExtra.interes;

  const donutData = [
    { name: "Capital", value: Math.round(totalExtra.capital) },
    { name: "Intereses", value: Math.round(totalExtra.interes) },
  ];

  return (
    <div className="mt-4">
      <h5 className="mb-3">Evolución del capital pendiente</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datosLineas}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Sin amortizar"
            stroke={COLORS.base}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="Con amortización"
            stroke={COLORS.extra}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="row mt-4">
        <div className="col-md-6">
          <h5 className="mb-3">Composición de las primeras 12 cuotas</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={datosBarras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Capital" stackId="a" fill={COLORS.capital} />
              <Bar dataKey="Interés" stackId="a" fill={COLORS.interes} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-md-6">
          <h5 className="mb-3">Distribución total con amortización</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value.toLocaleString()} €`}
              >
                {donutData.map((entry, idx) => (
                  <Cell
                    key={idx}
                    fill={entry.name === "Capital" ? COLORS.capital : COLORS.interes}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-success small">
            Ahorro en intereses: {ahorroIntereses.toFixed(2)} €
          </p>
        </div>
      </div>
    </div>
  );
}
