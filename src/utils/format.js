export const formatPrice = (value) => {
  if (typeof value !== 'number') return '0 сом'
  return `${value.toLocaleString('ru-RU')} сом`
}

export const formatTime = (ts) => {
  const d = new Date(ts)
  return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

export const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}
