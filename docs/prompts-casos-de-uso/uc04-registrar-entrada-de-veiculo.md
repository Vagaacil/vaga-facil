# Prompt — UC04 Registrar Entrada de Veiculo

## Papel

Atue como engenheiro de software senior e acompanhe a implementacao completa de **UC04 — Registrar Entrada de Veiculo**, no repositorio Vaga Facil.

## Dados confirmados

- Ator principal: Motorista, acionando o Ponto de Acesso.
- Atores secundarios: Sistema de Controle de Acesso e Operador de Portaria em identificacao manual.
- Objetivo: entrar no estacionamento com vaga designada e permanencia registrada.
- Situacao no documento: novo.
- Contexto: Ocupacao e Acesso.
- Pre-condicao: o patio existe e possui vagas cadastradas pelo UC06.
- Pos-condicoes: permanencia aberta para a placa, vaga ocupada e entrada comunicada.
- RN01: uma vaga nao pode estar associada a mais de um registro de permanencia aberto.
- RN08: cada patio controla sua ocupacao independentemente.
- RN09: hipotese de um veiculo com apenas uma permanencia aberta.

## Fluxo principal

1. Identificar a placa no Ponto de Acesso.
2. Verificar que o veiculo nao possui permanencia aberta.
3. Identificar vagas livres do patio.
4. Escolher uma vaga conforme a politica de alocacao.
5. Ocupar a vaga protegendo RN01.
6. Abrir Registro de Permanencia com horario de entrada.
7. Comunicar autorizacao e vaga designada.

## Alternativas confirmadas

- A1 — patio sem vagas livres: entrada negada, nenhuma alteracao.
- A2 — veiculo ja possui permanencia aberta: entrada negada, nenhuma alteracao.
- Condicao concorrente — vaga deixa de estar livre: tentar outra vaga; se esgotar, aplicar A1.
- MA — placa nao identificada: operador informa a placa e o fluxo continua.
- A5 — patio inexistente ou sem condicao de operar: solicitação rejeitada.
- A6 — falha tecnica: nenhuma ocupacao parcial, preservar o estado anterior.

## Implementacao

1. Inspecione o codigo atual e reutilize componentes existentes.
2. Modele Vaga e Registro de Permanencia como conceitos distintos.
3. Preserve atomicidade entre ocupacao da vaga e abertura da permanencia.
4. Proteja RN01 na operacao de dominio e na persistencia.
5. Use horario fornecido pelo servidor como fonte primaria ate decisao diferente.
6. Mantenha o Command independente do canal HTTP, se houver um ponto de entrada HTTP.
7. Implemente testes de sucesso, vaga ocupada por dois registros, concorrencia, falha parcial e patio sem vagas.
8. Nao implemente reserva, tarifa, cancela fisica, notificacao ou indicadores neste fluxo.
9. Execute testes, lint, build e verificacao HTTP real.

## Nao presuma

Nao definja como o operador escolhe vaga, formato da placa, idempotencia de leitura duplicada, autoridade da cancela ou cardinalidade Registro-Ponto-de-Acesso. Registre pendencias no diagnostico.
