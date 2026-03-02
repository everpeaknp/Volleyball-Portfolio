const API_BASE_URL = 'http://localhost:8000/api/v1'

export async function fetchAPI<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: 'no-store', // Ensure fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText} for ${endpoint}`)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error(`Network Error fetching ${endpoint}:`, error)
    return null
  }
}

export async function getHomePage() {
  return fetchAPI<any>('/content/home/')
}

export async function getNavigationItems() {
  return fetchAPI<any>('/navigation/items/')
}

export async function getNavigationSettings() {
  return fetchAPI<any>('/navigation/settings/')
}

export async function getFooterSettings() {
  return fetchAPI<any>('/navigation/footer/')
}

export async function getAboutPage() {
  return fetchAPI<any>('/content/about/')
}

export async function getCommitteePage() {
  return fetchAPI<any>('/content/committee/')
}

export async function getTeamPage() {
  return fetchAPI<any>('/content/team/')
}

export async function getMembershipPage() {
  return fetchAPI<any>('/content/membership/')
}

export async function getEventsPage() {
  return fetchAPI<any>('/content/events/')
}

export async function getNewsPage() {
  return fetchAPI<any>('/content/news/')
}

export async function getGalleryPage() {
  return fetchAPI<any>('/content/gallery/')
}

export async function getContactPage() {
  return fetchAPI<any>('/content/contact/')
}

export async function getNoticePage() {
  return fetchAPI<any>('/content/notice/')
}

export function getSponsorshipPage() {
  return fetchAPI<any>('/content/sponsorship/')
}

export async function getGlobalStyles() {
  return fetchAPI<any>('/core/global-styles/')
}
