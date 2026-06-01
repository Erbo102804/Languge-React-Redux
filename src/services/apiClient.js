const BASE_URL = 'https://jsonplaceholder.typicode.com'
const REQUEST_TIMEOUT_MS = 5000

const wait = (ms) => new Promise(r => setTimeout(r, ms))

const handle = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`)
  }
  if (response.status === 204) return null
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(t)
  }
}

export const apiClient = {
  async get(path) {
    const url = path.startsWith('http') ? path : BASE_URL + path
    return handle(await fetchWithTimeout(url))
  },
  async post(path, body) {
    return handle(await fetchWithTimeout(BASE_URL + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }))
  },
  async put(path, body) {
    return handle(await fetchWithTimeout(BASE_URL + path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }))
  },
  async delete(path) {
    return handle(await fetchWithTimeout(BASE_URL + path, { method: 'DELETE' }))
  }
}

export const localJson = async (path, delayMs = 0) => {
  if (delayMs) await wait(delayMs)
  const r = await fetch(path)
  if (!r.ok) throw new Error('Ошибка загрузки ' + path)
  return r.json()
}
