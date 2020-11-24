import Usuario from './Usuario';

class Paciente {
  private id: number | null;

  private nome: string | null;

  private cpf: string | null;

  private idade: number | null;

  private usuario: Usuario | null;

  constructor() {
    this.id = null;
    this.nome = null;
    this.cpf = null;
    this.idade = null;
    this.usuario = null;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setNome(nome: string) {
    this.nome = nome;
  }

  public getNome(): string | null {
    return this.nome;
  }

  public setCpf(cpf: string) {
    this.cpf = cpf;
  }

  public getCpf(): string | null {
    return this.cpf;
  }

  public setIdade(idade: number) {
    this.idade = idade;
  }

  public getIdade(): number | null {
    return this.idade;
  }

  public setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  public getUsuario(): Usuario | null {
    return this.usuario;
  }
}

export default Paciente;
