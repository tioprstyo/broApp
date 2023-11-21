const date = (value, time) => {
    const day = new Date(value).getDate() < 10 ? `0${new Date(value).getDate()}` : new Date(value).getDate();
    const month = new Date(value).getMonth() + 1 < 10 ? `0${new Date(value).getMonth() + 1}` : new Date(value).getMonth() + 1;
    const year = new Date(value).getFullYear() < 10 ? `0${new Date(value).getFullYear()}` : new Date(value).getFullYear();
    const data = `${day}/${month}/${year}`;

    if (time) {
        const hours = new Date(value).getHours() < 10 ? `0${new Date(value).getHours()}` : new Date(value).getHours();
        const minute = new Date(value).getMinutes() < 10 ? `0${new Date(value).getMinutes()}` : new Date(value).getMinutes();
        return `${data}, ${hours}.${minute}`
    }
    return data;
} 

export default date;