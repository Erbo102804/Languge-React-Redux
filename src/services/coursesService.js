import { apiClient, localJson } from './apiClient'

// READ — локальный JSON каталог курсов
export const getAllCourses = async () => {
  const data = await localJson('/data/courses.json', 1500)
  return data.courses
}

export const getCourseById = async (id) => {
  const data = await localJson('/data/courses.json', 800)
  const course = data.courses.find(c => c.id === Number(id))
  if (!course) throw new Error('Курс не найден')
  return course
}

// CRUD идёт через JSONPlaceholder /posts — это публичный fake REST API.
// Запрос отправляется (чтобы продемонстрировать работу с настоящим REST),
// но локальное состояние обновляется в любом случае: даже если сеть
// недоступна, UX не должен ломаться.

const safeRest = async (fn) => {
  try {
    return await fn()
  } catch (e) {
    console.warn('[REST API] запрос не прошёл, продолжаем локально:', e.message)
    return null
  }
}

export const createCourseRemote = async (course) => {
  const payload = { title: course.title, body: course.description, userId: 1 }
  const created = await safeRest(() => apiClient.post('/posts', payload))
  return { ...course, remoteId: created?.id }
}

export const updateCourseRemote = async (course) => {
  const remoteId = (course.id % 100) + 1
  const payload = { id: remoteId, title: course.title, body: course.description, userId: 1 }
  await safeRest(() => apiClient.put(`/posts/${remoteId}`, payload))
  return course
}

export const deleteCourseRemote = async (id) => {
  const remoteId = (id % 100) + 1
  await safeRest(() => apiClient.delete(`/posts/${remoteId}`))
  return id
}
