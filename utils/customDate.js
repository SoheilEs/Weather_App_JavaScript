const DAYS = [
    "Sunday", "Monday", "Tueday", "Wedday", "Thuday", "Friday", "Satday"
]

export const getWeekDay = data => {
    return DAYS[new Date(data * 1000).getDay()]
}