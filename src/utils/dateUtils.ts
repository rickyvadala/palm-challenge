export const serializedDate = (date = new Date()) => {
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();
    let hh = date.getHours();
    let m = date.getMinutes();
    return [
        (dd>9 ? '' : '0') + dd,
        (mm>9 ? '' : '0') + mm,
        `${date.getFullYear()} ${(hh>9 ? '' : '0') + hh}:${(m>9 ? '' : '0') + m}`,
    ].join('-');
}

export const timestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return serializedDate(date)
}