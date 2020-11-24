class Usuario {
  private id: number | null;

  private login: string | null;

  private senha: string | null;

  private tipo: string | null;

  constructor() {
    this.id = null;
    this.login = null;
    this.senha = null;
    this.tipo = null;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setLogin(login: string) {
    this.login = login;
  }

  public getLogin(): string | null {
    return this.login;
  }

  public setSenha(senha: string) {
    this.senha = senha;
  }

  public getSenha(): string | null {
    return this.senha;
  }

  public setTipo(tipo: string) {
    this.tipo = tipo;
  }

  public getTipo(): string | null {
    return this.tipo;
  }
}

export default Usuario;
