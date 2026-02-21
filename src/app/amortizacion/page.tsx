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
  let realizarCalculos = () => {
    let hipoteca = new Hipoteca(capitalPendiente, fechaFin, tipoInteres);
    setHipoteca(hipoteca);
  };

  return (
    <main>
      <h1 className="text-danger">Simulacion de amortizacion periodica</h1>
      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="capitalPendiente" className="form-label mb-2">
            Capital pendiente
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
        </div>
        <div className="col-sm-6">
          <label htmlFor="fechaFin" className="from-label mb-2">
            Fecha de fin
          </label>
          <input
            type="date"
            id="fechaFin"
            className="form-control form-control-sm"
            onChange={(e) => setFechaFin(new Date(e.target.value))}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="tipoInteres" className="form-label mb-2">
            Tipo de interes
          </label>
          <input
            id="tipoInteres"
            type="number"
            className="form-control  form-control-sm"
            min={0}
            onChange={(e) => setTipoInteres(Number.parseFloat(e.target.value))}
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="cuotaActual" className="from-label mb-2">
            Cuota actual
          </label>
          <input
            type="number"
            id="cuotaActual"
            className="form-control  form-control-sm"
            min={0}
            onChange={(e) => setCuotaActual(Number.parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <label htmlFor="cantidadAmortizar" className="form-label mb-2">
            Cantidad a amortizar
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
        </div>
        <div className="col-sm-6">
          <label htmlFor="periocidad" className="from-label mb-2">
            Periocidad de la amortizacion
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
