export const changeDateFormat = (date: Date) => {
    const day = ('0' + date.getDate()).slice(-2);
    const monthIndex = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${year}-${monthIndex}-${day}`;
}

export const monthLastDay = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    return changeDateFormat(new Date(year, month +1, 0))
}