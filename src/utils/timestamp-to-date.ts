function timeStampToDate(timestamp: string): Date {
    const date = new Date(Number(timestamp) * 1000)

    return date;
}

export default timeStampToDate;