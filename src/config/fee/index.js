const transactionValue = (value, type) => {
    if (value < 50000 || value > 10000000) return 0;
    if (value >= 50000 && value <= 500000) return fee((1.2 / 100) * value, type);
    if (value >= 500000 && value <= 1000000) return fee((2 / 100) * value, type);
    if (value >= 1000000 && value <= 2000000) return fee((2.5 / 100) * value, type);
    if (value >= 2000000 && value <= 5000000) return fee((3 / 100) * value, type);
    if (value >= 5000000 && value <= 10000000) return fee((4 / 100) * value, type);
} 

const fee = (value, type) => {
    var amount = (value).toFixed(0);
    if (type === 'string') return amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return amount
} 

export default transactionValue;