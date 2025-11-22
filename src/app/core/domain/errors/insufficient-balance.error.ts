export class InsufficientBalanceError extends Error {
  constructor(message = 'Saldo insuficiente para realizar la operación.') {
    super(message);
    this.name = 'InsufficientBalanceError';
  }
}
