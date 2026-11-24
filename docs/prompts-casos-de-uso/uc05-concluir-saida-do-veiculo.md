# Prompt — UC05 Concluir Saida do Veiculo

## Papel

Atue como engenheiro de software senior e acompanhe a implementacao completa de **UC05 — Concluir Saida do Veiculo**, no repositorio Vaga Facil.

## Dados confirmados

- Ator principal: Motorista.
- Atores secundarios: Sistema de Pagamento, Sistema de Controle de Acesso e Operador de Portaria.
- Objetivo: sair pagando o valor devido.
- Contexto principal: Ocupacao e Acesso coordena; Cobranca e Pagamentos processa pagamento.
- Pre-condicoes: permanencia aberta e tarifa vigente definida para o patio.
- Pos-condicoes: valor calculado, pagamento aprovado registrado, permanencia fechada, vaga livre e saida autorizada.
- RN02: tarifa aplicada e a vigente no momento da saida.
- RN05: saida somente apos confirmacao de pagamento.
- RN07: permanencia e o intervalo entre entrada e saida do mesmo veiculo.
- Saida deve ser maior ou igual a entrada.

## Fluxo principal

1. Identificar a placa no ponto de saida.
2. Recuperar a permanencia aberta.
3. Determinar o horario de saida e calcular o valor devido.
4. Solicitar pagamento ao Sistema de Pagamento.
5. Registrar o pagamento aprovado.
6. Encerrar permanencia e liberar vaga.
7. Comunicar autorizacao de saida.

## Alternativas confirmadas

- A1 — pagamento recusado: saida negada, permanencia continua aberta e motorista informado.
- A2 — Sistema de Pagamento indisponivel: mesmo efeito operacional de A1.
- A3 — nenhuma permanencia aberta: saida negada e encaminhada ao operador quando aplicavel.
- A4 — tarifa vigente inexistente: nao prosseguir ate UC07 definir tarifa.

## Implementacao

1. Inspecione a implementacao existente de checkout, pagamento e permanencia.
2. Preserve o calculo da tarifa em Ocupacao e Acesso.
3. Mantenha Cobranca e Pagamentos apenas como processador e confirmador de pagamento.
4. Defina e implemente adaptadores reais apenas para integracao confirmada.
5. Garanta que pagamento recusado nao altere permanencia nem vaga.
6. Garanta encerramento apenas apos aprovacao.
7. Preserve valor calculado no Registro de Permanencia.
8. Trate concorrencia e falhas parciais com verificacao e estado anterior.
9. Execute testes unitarios, integrados, e2e, lint e build.
10. Atualize a API, o README e evidencias HTTP.

## Restricoes

Nao presuma integracao real com gateway, timeout, retries, idempotencia ou contrato externo. Se nao houver especificacao aprovada, implemente uma porta e um adaptador demonstravel sem inventar comportamento produtivo.
