import Usuario from './Usuario';
import Endereco from './Endereco';

class Profissional {
  private id: number | null;

  private especialidade: string | null;

  private anosExperiencia: number | null;

  private nome: string | null;

  private endereco: Endereco | null;

  private usuario: Usuario | null;

  private cpf: string | null;

  private numeroDiploma: number | null;

  private numeroCarteira: number | null;

  private status: number | null;

  constructor() {
    this.id = null;
    this.especialidade = null;
    this.anosExperiencia = null;
    this.nome = null;
    this.endereco = null;
    this.usuario = null;
    this.cpf = null;
    this.numeroDiploma = null;
    this.numeroCarteira = null;
    this.status = null;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setEspecialidade(especialidade: string) {
    this.especialidade = especialidade;
  }

  public getEspecialidade(): string | null {
    return this.especialidade;
  }

  public setAnosExperiencia(anosExperiencia: number) {
    this.anosExperiencia = anosExperiencia;
  }

  public getAnosExperiencia(): number | null {
    return this.anosExperiencia;
  }

  public setNome(nome: string) {
    this.nome = nome;
  }

  public getNome(): string | null {
    return this.nome;
  }

  public setEndereco(endereco: Endereco) {
    this.endereco = endereco;
  }

  public getEndereco(): Endereco | null {
    return this.endereco;
  }

  public setCpf(cpf: string) {
    this.cpf = cpf;
  }

  public getCpf(): string | null {
    return this.cpf;
  }

  public setNumeroDiploma(numeroDiploma: number) {
    this.numeroDiploma = numeroDiploma;
  }

  public getNumeroDiploma(): number | null {
    return this.numeroDiploma;
  }

  public setNumeroCarteira(numeroCarteira: number) {
    this.numeroCarteira = numeroCarteira;
  }

  public getNumeroCarteira(): number | null {
    return this.numeroCarteira;
  }

  public setStatus(status: number) {
    this.status = status;
  }

  public getStatus(): number | null {
    return this.status;
  }

  public setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  public getUsuario(): Usuario | null {
    return this.usuario;
  }
}

export default Profissional;
