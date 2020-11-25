/* eslint-disable no-shadow */
import Profissional from '../models/Profissional';
import Usuario from '../models/Usuario';
import Endereco from '../models/Endereco';
import ProfissionalDAO from '../dao/ProfissionalDAO';
import UsuarioDAO from '../dao/UsuarioDAO';
import EnderecoDAO from '../dao/EnderecoDAO';
import BuscaPorCPFDAO from '../utils/BuscarPorCPFDAO';

interface ProfissionalDTO {
  especialidade: string;
  anosExperiencia: number;
  nome: string;
  cpf: string;
  numeroDiploma: number;
  numeroCarteira: number;
  login: string;
  senha: string;
  rua: string;
  cidade: string;
  bairro: string;
  numero: number;
  sala: number;
}

interface PacienteSemUsuarioDTO {
  id: number;
  anosExperiencia: number;
  nome: string;
  numeroDiploma: number;
  numeroCarteira: number;
  rua: string;
  cidade: string;
  bairro: string;
  numero: number;
  sala: number;
}

interface ProfissionalDBDTO {
  codprofissional: number;
  especialidade: string;
  anosExperiencia: number;
  nome: string;
  codendereco: number;
  usuario: number;
  cpf: string;
  numeroDiploma: number;
  numeroCarteira: number;
}

interface EnderecoDBDTO {
  codendereco: number;
  rua: string;
  cidade: string;
  bairro: string;
  numero: number;
  sala: number;
}

interface ProfissionalEnderecoDTO {
  codprofissional: number;
  especialidade: string;
  anosExperiencia: number;
  nome: string;
  endereco: EnderecoDBDTO;
  cpf: string;
  numeroDiploma: number;
  numeroCarteira: number;
}
interface MessageRetorno {
  message: string;
}

class ProfissionalController {
  public async cadastrar({
    especialidade,
    anosExperiencia,
    nome,
    login,
    senha,
    cpf,
    numeroDiploma,
    numeroCarteira,
    rua,
    cidade,
    bairro,
    numero,
    sala,
  }: ProfissionalDTO): Promise<Profissional | ProfissionalDBDTO | Error> {
    try {
      const profissional = new Profissional();
      const usuario = new Usuario();
      const endereco = new Endereco();
      const enderecoDao = new EnderecoDAO();
      const profissionalDao = new ProfissionalDAO();
      const usuarioDao = new UsuarioDAO();
      const buscaCPF = new BuscaPorCPFDAO();

      const profissionalExiste = await buscaCPF.getCPF(cpf, 'profissional');
      if (profissionalExiste === true) {
        throw new Error('Profissional já cadastrado');
      }
      if (profissionalExiste !== false) {
        const profissionalAtualizado = await this.atualizar({
          id: profissionalExiste,
          anosExperiencia,
          nome,
          numeroDiploma,
          numeroCarteira,
          rua,
          cidade,
          bairro,
          numero,
          sala,
        });
        usuario.setLogin(login);
        usuario.setSenha(senha);
        usuarioDao.atualizar(usuario, cpf, 'profissional');
        return profissionalAtualizado;
      }

      usuario.setLogin(login);
      usuario.setSenha(senha);
      usuario.setTipo('Profissional');

      const codusuario = await usuarioDao.cadastrar(usuario);
      if (codusuario instanceof Error) {
        throw new Error('Login já cadastrado');
      }

      if (codusuario) {
        usuario.setId(codusuario);
      }

      endereco.setBairro(bairro);
      endereco.setRua(rua);
      endereco.setNumero(numero);
      endereco.setCidade(cidade);
      endereco.setSala(sala);
      const codenederco = await enderecoDao.cadastrar(endereco);

      if (codenederco) {
        endereco.setId(codenederco);
      }

      profissional.setNome(nome);
      profissional.setCpf(cpf);
      profissional.setAnosExperiencia(anosExperiencia);
      profissional.setUsuario(usuario);
      profissional.setEndereco(endereco);
      profissional.setNumeroCarteira(numeroCarteira);
      profissional.setNumeroDiploma(numeroDiploma);
      profissional.setEspecialidade(especialidade);

      const profissionalCriado = await profissionalDao.cadastrar(profissional);

      return profissionalCriado;
    } catch (err) {
      return err.message;
    }
  }

  public async atualizar({
    id,
    anosExperiencia,
    nome,
    numeroDiploma,
    numeroCarteira,
    rua,
    cidade,
    bairro,
    numero,
    sala,
  }: PacienteSemUsuarioDTO): Promise<ProfissionalDBDTO | Error> {
    try {
      const profissional = new Profissional();
      const profissionalDao = new ProfissionalDAO();
      const endereco = new Endereco();
      const enderecoDao = new EnderecoDAO();

      profissional.setId(id);
      profissional.setNome(nome);
      profissional.setAnosExperiencia(anosExperiencia);
      profissional.setNumeroCarteira(numeroCarteira);
      profissional.setNumeroDiploma(numeroDiploma);

      const profissionalAtualizado = await profissionalDao.atualizar(
        profissional,
      );
      if (profissionalAtualizado instanceof Error) {
        throw new Error('Erro ao atualizar atualizado');
      }
      const profissionalDB: ProfissionalDBDTO = profissionalAtualizado;

      endereco.setBairro(bairro);
      endereco.setRua(rua);
      endereco.setNumero(numero);
      endereco.setCidade(cidade);
      endereco.setSala(sala);
      endereco.setId(profissionalDB.codendereco);

      await enderecoDao.atualizar(endereco);

      return profissionalAtualizado;
    } catch (err) {
      return err.message;
    }
  }

  public async deletar(id: number): Promise<MessageRetorno> {
    try {
      const profissional = new Profissional();
      const usuario = new Usuario();
      const profissionalDao = new ProfissionalDAO();
      const usuarioDao = new UsuarioDAO();

      profissional.setId(id);

      const idUsuario = await profissionalDao.deletar(profissional);

      if (idUsuario === 0) {
        throw new Error('Profissional não encontrado');
      }

      usuario.setId(idUsuario);

      await usuarioDao.deletar(usuario);

      return { message: 'Profissional desativado com sucesso' };
    } catch (err) {
      return err.message;
    }
  }

  public async logar(login: string, senha: string): Promise<ProfissionalDBDTO> {
    try {
      const profissional = new Profissional();
      const usuario = new Usuario();
      const profissionalDao = new ProfissionalDAO();
      const usuarioDao = new UsuarioDAO();

      usuario.setLogin(login);
      usuario.setSenha(senha);

      const usuarioLogado = await usuarioDao.login(usuario);
      if (usuarioLogado === 0) {
        throw new Error('Login ou senha incorreta ou usuario desativado');
      }

      usuario.setId(usuarioLogado);

      profissional.setUsuario(usuario);

      const profissionalLogado = await profissionalDao.login(profissional);

      return profissionalLogado;
    } catch (err) {
      return err.message;
    }
  }

  public async listar(id: number): Promise<ProfissionalEnderecoDTO> {
    try {
      const profissional = new Profissional();
      const profissionalDao = new ProfissionalDAO();
      const endereco = new Endereco();
      const enderecoDao = new EnderecoDAO();

      profissional.setId(id);

      const profissionalListado: ProfissionalDBDTO = await profissionalDao.listar(
        profissional,
      );
      if (profissionalListado instanceof Error) {
        throw new Error('Usuario desativado ou não existe');
      }

      endereco.setId(profissionalListado.codendereco);

      const enderecoProfissionalListado: EnderecoDBDTO = await enderecoDao.listar(
        endereco,
      );

      const profissionalEndereco: ProfissionalEnderecoDTO = {
        codprofissional: profissionalListado.codprofissional,
        nome: profissionalListado.nome,
        cpf: profissionalListado.cpf,
        especialidade: profissionalListado.especialidade,
        anosExperiencia: profissionalListado.anosExperiencia,
        numeroCarteira: profissionalListado.numeroCarteira,
        numeroDiploma: profissionalListado.numeroDiploma,
        endereco: enderecoProfissionalListado,
      };

      return profissionalEndereco;
    } catch (err) {
      return err.message;
    }
  }

  public async listarTodos() {
    try {
      const profissionalDao = new ProfissionalDAO();

      const profissionaisListados: ProfissionalDBDTO[] = await profissionalDao.listarTodos();

      return profissionaisListados;
    } catch (err) {
      return err.message;
    }
  }
}

export default ProfissionalController;
