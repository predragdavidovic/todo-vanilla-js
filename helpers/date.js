function getCurrentDate() {
    const localDate = new Date();
    const day = localDate.toLocaleString('default', {weekday: 'long', day: '2-digit'});
    const month = localDate.toLocaleString('default', {month: 'long'});
    return {
        day: day.replace(/ /, ', '),
        month
    }
}

export {getCurrentDate};