export const getInitials = (fullName) => {
  if (!fullName) return ''
  return fullName.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
}
