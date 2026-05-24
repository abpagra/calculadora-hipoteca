export class Hipoteca {
  capitalPendiente: number;
  fechaFin: Date;
  interes: number;

  constructor(capitalPendiente: number, fechaFin: Date, interes: number) {
    this.capitalPendiente = capitalPendiente;
    this.fechaFin = fechaFin;
    this.interes = interes / 100;
  }

  calcularCuota(): number {
    //Cuota = (capital * interes * (1 + interes) ^ plazos) / ((1 + interes) ^ plazos) - 1
    const plazos = this.calcularPlazos();
    let cuota = 0;
    if (plazos > 0) {
      const interesMensual = this.interes / 12;
      const dividendo =
        this.capitalPendiente *
        interesMensual *
        Math.pow(1 + interesMensual, plazos);
      const divisor = Math.pow(1 + interesMensual, plazos) - 1;

      cuota = dividendo / divisor;
      cuota = Number.parseFloat(cuota.toFixed(2));
    }

    return cuota;
  }

  calcularInteresCuota(capitalPendiente: number): number {
    //interesCuota = capitalPendiente * interes
    const interesCuota = (capitalPendiente * this.interes) / 12;
    return interesCuota;
  }

  private calcularPlazos(): number {
    let plazos = 0;
    const hoy = new Date();
    if (this.fechaFin > hoy) {
      plazos += (this.fechaFin.getFullYear() - hoy.getFullYear()) * 12;
      plazos += this.fechaFin.getMonth() - hoy.getMonth();
      plazos += this.fechaFin.getDate() - hoy.getDate() > 0 ? 1 : 0;
    }
    return plazos;
  }

  cuadroAmortizacion(cuotaActual: number): Amortizacion[] {
    const cuadroAmortizacion: Amortizacion[] = [];
    const plazos = this.calcularPlazos();
    const cuota = cuotaActual || this.calcularCuota();
    let capitalPendiente = this.capitalPendiente;
    for (let i = 0; i < plazos; i++) {
      const interesCuota = this.calcularInteresCuota(capitalPendiente);
      const capitalAmortizado = cuota - interesCuota;
      capitalPendiente = capitalPendiente - capitalAmortizado;

      cuadroAmortizacion.push({
        plazo: i + 1,
        cuota,
        interesCuota,
        capitalCuota: capitalAmortizado,
        capitalPendiente,
      });
    }

    return cuadroAmortizacion;
  }

  calcularAmortizacion(
    cuotaActual: number,
    periocidad: string,
    cantidadAmortizar: number,
  ): Amortizacion[] {
    const cuadroAmortizacion: Amortizacion[] = [];
    const cuota = cuotaActual;
    let capitalPendiente = this.capitalPendiente;
    let plazo = 1;

    while (capitalPendiente > 0) {
      const interesCuota = this.calcularInteresCuota(capitalPendiente);
      const capitalAmortizado = cuota - interesCuota;
      capitalPendiente = capitalPendiente - capitalAmortizado;

      cuadroAmortizacion.push({
        plazo,
        cuota,
        interesCuota,
        capitalCuota: capitalAmortizado,
        capitalPendiente,
      });
      if (periocidad === "mensual") {
        capitalPendiente -= cantidadAmortizar;
        cuadroAmortizacion.push({
          plazo,
          cuota: 0,
          interesCuota: 0,
          capitalCuota: cantidadAmortizar,
          capitalPendiente,
        });
      } else if (periocidad === "anual" && plazo % 12 === 0) {
        capitalPendiente -= cantidadAmortizar;
        cuadroAmortizacion.push({
          plazo,
          cuota: 0,
          interesCuota: 0,
          capitalCuota: cantidadAmortizar,
          capitalPendiente,
        });
      }
      plazo++;
    }

    return cuadroAmortizacion;
  }
}

export interface Amortizacion {
  plazo: number;
  cuota: number;
  interesCuota: number;
  capitalCuota: number;
  capitalPendiente: number;
}

/*
Datos que necesitamos
-Capital pendiente
-Fecha de fin
-Tipo de interes
-Cuota actual

Para las amortizaciones debemos tener los siguientes datos
-Cantidad a amortizar
-Periocidad de la amortizacion

Cuota = (capital * interes * (1 + interes) ^ plazos) / ((1 + interes) ^ plazos) - 1

interesCuota = capitalPendiente * interes

amortizacionCuota = cuota - interesCuota
 */
