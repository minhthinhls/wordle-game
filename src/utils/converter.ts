export function convertAmountToBalance(amount: number, exchangeRate: number): number {
    return Math.round((amount * exchangeRate + Number.EPSILON) * 100) / 100;
}
