const number = (value) => {
    return value ? value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : '';
}

export default number;