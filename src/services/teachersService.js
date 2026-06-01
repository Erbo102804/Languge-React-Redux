import { localJson } from './apiClient'

export const getAllTeachers = async () => {
  const data = await localJson('/data/teachers.json', 1000)
  return data.teachers
}
