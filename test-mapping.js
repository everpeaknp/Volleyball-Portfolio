// Test the about API and mapping
import { getAboutPage } from './lib/api.js'
import { mapAboutPageData } from './lib/mappers.js'

async function testMapping() {
  try {
    const apiData = await getAboutPage()
    console.log('Raw API Data:', JSON.stringify(apiData, null, 2))

    if (apiData) {
      const mapped = mapAboutPageData(apiData, 'EN')
      console.log('Mapped heroImage:', mapped.heroImage)
      console.log('Mapped introImage:', mapped.introImage)
      console.log('Mapped objectiveImage:', mapped.objectiveImage)
    }
  } catch (e) {
    console.error('Error:', e)
  }
}

testMapping()
