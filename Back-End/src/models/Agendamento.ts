import Paciente from './Paciente';
import Profissional from './Profissional';

class Agendamento {
  private id: number | null;

  private data: Date | null;

  private dataFormatada: string | null;

  private paciente: Paciente | null;

  private profissional: Profissional | null;

  constructor() {
    this.id = null;
    this.data = null;
    this.dataFormatada = null;
    this.paciente = null;
    this.profissional = null;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setData(data: Date) {
    this.data = data;
  }

  public getData(): Date | null {
    return this.data;
  }

  public setDataFormatada(dataFormatada: string) {
    this.dataFormatada = dataFormatada;
  }

  public getDataFormatada(): string | null {
    return this.dataFormatada;
  }

  public setPaciente(paciente: Paciente) {
    this.paciente = paciente;
  }

  public getPaciente(): Paciente | null {
    return this.paciente;
  }

  public setProfissional(profissional: Profissional) {
    this.profissional = profissional;
  }

  public getProfissional(): Profissional | null {
    return this.profissional;
  }
  public formatarData():void{
    var tempDate = this.getData()
    var visitDate = ""
    if(tempDate !== null){
      visitDate = (tempDate.getUTCFullYear() + "-" + (tempDate.getUTCMonth() + 1) + "-" + tempDate.getUTCDate());
    }
    this.dataFormatada = visitDate
  }
}

export default Agendamento;
