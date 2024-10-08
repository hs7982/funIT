export const calcPer = (target, total) => {
    return Math.floor((total / target) * 100);
}

export const calcDay = (endDate) => {
    const today = new Date();
    const date = new Date(endDate);
    const timeGap = date - today;
    const dayGap = Math.ceil(timeGap / (1000 * 60 * 60 * 24));
    return dayGap < 0 ? -1 : dayGap;
}