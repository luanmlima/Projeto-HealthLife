import Paciente from './Paciente';
import Profissional from './Profissional';

class Agendamento {
  private id: number | null;

  private data: Date | null;

  private paciente: Paciente | null;

  private profissional: Profissional | null;

  constructor() {
    this.id = null;
    this.data = null;
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
}

export default Agendamento;
