class Usuario {
  id: number | null;
  login: string;
  senha: string;
  tipo: string;

  constructor({ login, senha, tipo }: Omit<Usuario, 'id'>) {
    this.id = null;
    this.login = login;
    this.senha = senha;
    this.tipo = tipo;
  }

  public getId(): number | null {
    return this.id
  }

  public setLogin(login: string) {
    this.login = login;
  }

  public getLogin(): string {
    return this.login
  }

  public setSenha(senha: string) {
    this.senha = senha;
  }

  public getSenha(): string {
    return this.senha
  }

  public setTipo(tipo: string) {
    this.tipo = tipo;
  }

  public getTipo(): string {
    return this.tipo
  }

}

export default Usuario
