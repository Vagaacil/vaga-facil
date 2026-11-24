# Prompt — UC09 Tratar Impedimento de Saida

## Papel

Atue como engenheiro de software senior e acompanhe a implementacao completa de **UC09 — Tratar Impedimento de Saida**, no repositorio Vaga Facil.

## Dados confirmados

- Ator principal: Operador de Portaria.
- Objetivo: resolver veiculo que nao conseguiu concluir a saida.
- Resultado: impedimento resolvido e registrado.
- Situacao no documento: novo.
- Contexto: Ocupacao e Acesso.
- E o caminho operacional acionado em impedimentos de UC05.

## Restricoes

Nao presuma autorizacao manual, tratamento de pendencia, pagamento, liberacao da cancela, auditoria ou semantica HTTP. Q04 ainda deve ser respondido antes de definir o fluxo completo.

## Trabalhos

1. Inspecione UC05 e os registros de permanencia e pagamento existentes.
2. Identifique a Issue, dependencia e estado real do impedimento.
3. Separe consulta, resolucao temporaria e resolucao definitiva conforme contratos aprovados.
4. Nao conceda saida antes de os requisitos de pagamento ou excecao serem confirmados.
5. Registre decisao do operador com rastreabilidade suficiente.
6. Preserve permanencia e vaga em estado consistente.
7. Implemente testes para pagamento recusado, permanencia ausente, tarifa ausente e resolucao aprovada.
8. Execute testes, lint, build e verificacao HTTP.
9. Documente auditabilidade e pendencias.
