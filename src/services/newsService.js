import { localJson } from './apiClient'

export const getAllNews = async () => {
  const data = await localJson('/data/news.json', 1200)
  return data.news
}
