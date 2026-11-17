# 08-06 — Diagnóstico de falhas de integração

## Falhas observadas e analisadas
1. Provider ausente do token do repositório.
2. Módulo de funcionalidade não importado no AppModule.
3. Controller ou service com dependência não resolvida.
4. DTO ou ValidationPipe incompatíveis com a rota.

## Diagnóstico isolado
Foi validado um teste em ambiente isolado onde o OrdersService foi montado sem o provider do ORDERS_REPOSITORY. O NestJS reportou a ausência da dependência e confirmou a causa raiz da falha.

## Conclusão
A falha é de composição de injeção de dependência, não de regra de negócio.
