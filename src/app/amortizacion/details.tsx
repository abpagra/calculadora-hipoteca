import { Hipoteca } from "../hipoteca";

interface DetailsProps {
  hipoteca: Hipoteca;
  cuotaActual: number;
  periocidad: string;
  cantidadAmortizar: number;
}

export default function Details({
  hipoteca,
  cuotaActual,
  periocidad,
  cantidadAmortizar,
}: DetailsProps) {
  let cuadroAmortizacion = hipoteca.cuadroAmortizacion(cuotaActual);
  let cuadroPeriodico = hipoteca.calcularAmortizacion(
    cuotaActual,
    periocidad,
    cantidadAmortizar,
  );

  let acumuladorAmortizacion = cuadroAmortizacion.reduce(
    (acumulador, valor) => {
      acumulador.capitalCuota += valor.capitalCuota;
      acumulador.interesCuota += valor.interesCuota;
      acumulador.plazo++;
      return acumulador;
    },
  );

  let acumuladorPeriodico = cuadroPeriodico.reduce((acumulador, valor) => {
    acumulador.capitalCuota += valor.capitalCuota;
    acumulador.interesCuota += valor.interesCuota;
    if (valor.interesCuota > 0) acumulador.plazo++;
    return acumulador;
  });

  return (
    <div>
      <div>
        {`Los plazos pasaran de ${acumuladorAmortizacion.plazo} a ${acumuladorPeriodico.plazo},
        ${Math.trunc(acumuladorAmortizacion.plazo / 12)} años y ${acumuladorAmortizacion.plazo % 12} meses 
        a ${Math.trunc(acumuladorPeriodico.plazo / 12)} años y ${acumuladorPeriodico.plazo % 12} meses`}
        <br />
        {`El total de intereses pasaran de ${acumuladorAmortizacion.interesCuota.toFixed(2)} € a ${acumuladorPeriodico.interesCuota.toFixed(2)} €,
        ${(acumuladorAmortizacion.interesCuota - acumuladorPeriodico.interesCuota).toFixed(2)} € menos`}
      </div>
    </div>
  );

  //los datos que nos pueden interesar son el nuevo plazo de amortizacion y el ahorro de intereses que tendriamos
}
