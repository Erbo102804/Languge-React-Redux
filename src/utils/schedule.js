const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const TIMES = ['09:00 - 11:00', '11:30 - 13:30', '14:00 - 16:00', '16:30 - 18:30', '19:00 - 21:00']
export const DAY_ORDER = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

export const getScheduleSlot = (courseId) => {
  const id = Number(courseId) || 0
  return {
    day: DAYS[id % DAYS.length],
    time: TIMES[id % TIMES.length]
  }
}

export const sortByDayAndTime = (items) =>
  [...items].sort((a, b) => {
    const d = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
    if (d !== 0) return d
    return a.time.localeCompare(b.time)
  })
