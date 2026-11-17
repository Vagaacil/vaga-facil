export class PatioNaoEncontradoError extends Error {
  constructor(patioId: string) {
    super(`PATIO_NAO_ENCONTRADO: ${patioId}`);
    this.name = 'PatioNaoEncontradoError';
  }
}

export class PatioLotadoError extends Error {
  constructor() {
    super('PATIO_LOTADO');
    this.name = 'PatioLotadoError';
  }
}

export class VeiculoJaNoPatioError extends Error {
  constructor() {
    super('VEICULO_JA_NO_PATIO');
    this.name = 'VeiculoJaNoPatioError';
  }
}

export class PermanenciaNaoEncontradaError extends Error {
  constructor(registroId: string) {
    super(`PERMANENCIA_NAO_ENCONTRADA: ${registroId}`);
    this.name = 'PermanenciaNaoEncontradaError';
  }
}

export class PermanenciaJaFechadaError extends Error {
  constructor() {
    super('PERMANENCIA_JA_FECHADA');
    this.name = 'PermanenciaJaFechadaError';
  }
}

export class VagaDaPermanenciaNaoEncontradaError extends Error {
  constructor(vagaId: string) {
    super(`VAGA_DA_PERMANENCIA_NAO_ENCONTRADA: ${vagaId}`);
    this.name = 'VagaDaPermanenciaNaoEncontradaError';
  }
}

export class VagaNaoEncontradaError extends Error {
  constructor(vagaId: string) {
    super(`VAGA_NAO_ENCONTRADA: ${vagaId}`);
    this.name = 'VagaNaoEncontradaError';
  }
}

export class CategoriaDeVagaNaoEncontradaError extends Error {
  constructor(codigo: string) {
    super(`CATEGORIA_NAO_ENCONTRADA: ${codigo}`);
    this.name = 'CategoriaDeVagaNaoEncontradaError';
  }
}

export class RetencaoNaoEncontradaError extends Error {
  constructor(reservaId: string) {
    super(`RETENCAO_NAO_ENCONTRADA: ${reservaId}`);
    this.name = 'RetencaoNaoEncontradaError';
  }
}
