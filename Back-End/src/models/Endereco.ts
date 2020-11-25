class Endereco {
  private id: number | null;

  private rua: string | null;

  private cidade: string | null;

  private bairro: string | null;

  private numero: number | null;

  private sala: number | null;

  constructor() {
    this.id = null;
    this.rua = null;
    this.cidade = null;
    this.bairro = null;
    this.numero = null;
    this.sala = null;
  }

  public getId(): number | null {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setRua(rua: string) {
    this.rua = rua;
  }

  public getRua(): string | null {
    return this.rua;
  }

  public setCidade(cidade: string) {
    this.cidade = cidade;
  }

  public getCidade(): string | null {
    return this.cidade;
  }

  public setBairro(bairro: string) {
    this.bairro = bairro;
  }

  public getBairro(): string | null {
    return this.bairro;
  }

  public setNumero(numero: number) {
    this.numero = numero;
  }

  public getNumero(): number | null {
    return this.numero;
  }

  public setSala(sala: number) {
    this.sala = sala;
  }

  public getSala(): number | null {
    return this.sala;
  }
}

export default Endereco;
