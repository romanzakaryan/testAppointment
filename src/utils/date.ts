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

export const getWeekDayText = (day: Date) => {
    const dayNum = day.getDay();
    const weekDaysArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return weekDaysArr[dayNum]
} 

export const getMonthText = (day: Date) => {
    const monthNum = day.getMonth();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[monthNum];
}

export const from24To12 = (time: number) => {
    const hourEnd = time > 9 ? 2 : 1;
    const minutes = String(time).slice(-2);
    const hour = +String(time).substr(0, hourEnd);
    const h = hour % 12 || 12;
    const ampm = (hour < 12 || hour === 24) ? "AM" : "PM";
    const timeString = `${h}:${minutes} ${ampm}`;

    return timeString;
}

export const dateLine = (dateString: string, time: number) => {
    const date = new Date(dateString);
    const stringTime = from24To12(time);

    return `${getWeekDayText(date)}, ${getMonthText(date)} ${date.getDate()}, ${date.getFullYear()} at ${stringTime}`;
}

