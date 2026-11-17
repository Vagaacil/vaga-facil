export class Placa {
  private constructor(public readonly valor: string) {}

  static criar(valor: string): Placa {
    const normalizada = valor.trim().toUpperCase();
    if (!/^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/.test(normalizada)) {
      throw new Error('PLACA_INVALIDA');
    }
    return new Placa(normalizada.replace('-', ''));
  }

  equals(outra: Placa): boolean {
    return this.valor === outra.valor;
  }
}
