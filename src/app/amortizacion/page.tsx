"use client";

import { useState } from "react";
import { Hipoteca } from "../hipoteca";
import Details from "./details";

export default function Page() {
  const [capitalPendiente, setCapitalPendiente] = useState(0);
  const [fechaFin, setFechaFin] = useState(new Date());
  const [tipoInteres, setTipoInteres] = useState(0);
  const [cuotaActual, setCuotaActual] = useState(0);
  const [cantidadAmortizar, setCantidadAmortizar] = useState(0);
  const [periocidad, setPeriocidad] = useState("anual");

  const [hipoteca, setHipoteca] = useState<Hipoteca | undefined>();
  const realizarCalculos = () => {
    const hipoteca = new Hipoteca(capitalPendiente, fechaFin, tipoInteres);
    setHipoteca(hipoteca);
  };

  return (
    <main>
      <h1 className="text-danger">Simulación de amortización periódica</h1>
      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="capitalPendiente" className="form-label mb-2">
            Capital pendiente <span className="text-muted" title="Cantidad que queda por pagar de la hipoteca">ⓘ</span>
          </label>
          <input
            id="capitalPendiente"
            type="number"
            className="form-control  form-control-sm"
            min={0}
            onChange={(e) =>
              setCapitalPendiente(Number.parseFloat(e.target.value))
            }
          />
          <div className="form-text">Importe total que aún debes del préstamo.</div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="fechaFin" className="from-label mb-2">
            Fecha de fin <span className="text-muted" title="Fecha en la que finaliza la hipoteca actualmente">ⓘ</span>
          </label>
          <input
            type="date"
            id="fechaFin"
            className="form-control form-control-sm"
            onChange={(e) => setFechaFin(new Date(e.target.value))}
          />
          <div className="form-text">Fecha prevista de finalización de la hipoteca.</div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="tipoInteres" className="form-label mb-2">
            Tipo de interés <span className="text-muted" title="Interés anual nominal aplicado al préstamo">ⓘ</span>
          </label>
          <input
            id="tipoInteres"
            type="number"
            className="form-control  form-control-sm"
            min={0}
            step="0.01"
            onChange={(e) => setTipoInteres(Number.parseFloat(e.target.value))}
          />
          <div className="form-text">Interés anual en porcentaje (ej: 3.5).</div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="cuotaActual" className="from-label mb-2">
            Cuota actual <span className="text-muted" title="Cantidad que pagas cada mes actualmente">ⓘ</span>
          </label>
          <input
            type="number"
            id="cuotaActual"
            className="form-control  form-control-sm"
            min={0}
            onChange={(e) => setCuotaActual(Number.parseFloat(e.target.value))}
          />
          <div className="form-text">Cuota mensual que pagas en la actualidad. Si no se indica, se calcula automáticamente.</div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="cantidadAmortizar" className="form-label mb-2">
            Cantidad a amortizar <span className="text-muted" title="Cantidad extra que pagarás periódicamente para reducir capital">ⓘ</span>
          </label>
          <input
            id="cantidadAmortizar"
            type="number"
            className="form-control  form-control-sm"
            min={0}
            onChange={(e) =>
              setCantidadAmortizar(Number.parseFloat(e.target.value))
            }
          />
          <div className="form-text">Importe extra que pagarás de forma periódica para reducir la deuda.</div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="periocidad" className="from-label mb-2">
            Periodicidad de la amortización <span className="text-muted" title="Cada cuánto tiempo harás el pago extra">ⓘ</span>
          </label>
          <select
            id="periocidad"
            className="form-select  form-select-sm"
            defaultValue={"anual"}
            onChange={(e) => setPeriocidad(e.target.value)}
          >
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
          <div className="form-text">Frecuencia con la que realizarás la amortización anticipada.</div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={realizarCalculos}
      >
        Calcular
      </button>
      {hipoteca && (
        <Details
          hipoteca={hipoteca}
          periocidad={periocidad}
          cantidadAmortizar={cantidadAmortizar}
          cuotaActual={cuotaActual}
        />
      )}
    </main>
  );
}
