import Image from 'next/image'
import { Camera, Play, Download, Eye, Calendar } from 'lucide-react'
import { getGalleryPage } from '@/lib/api'
import { mapGalleryPageData } from '@/lib/mappers'
import { content } from '@/data/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  try {
    const apiData = await getGalleryPage()
    if (apiData) {
      const dynamicData = mapGalleryPageData(apiData, langCode)
      const title = dynamicData.galleryPage.header
      const description = dynamicData.galleryPage.description
      
      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'website',
          locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
        },
      }
    }
  } catch (error) {
    console.error('Failed to load gallery page metadata:', error)
  }
  
  // Fallback to static content
  const fallbackContent = content[langCode] || content.NE
  return {
    title: fallbackContent.galleryPage?.header || fallbackContent.nav.gallery,
    description: fallbackContent.galleryPage?.description || '',
    openGraph: {
      title: fallbackContent.galleryPage?.header || fallbackContent.nav.gallery,
      description: fallbackContent.galleryPage?.description || '',
      type: 'website',
      locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
    },
  }
}

export const revalidate = 7200 // Revalidate every 2 hours

export default async function GalleryPage({ params }: Props) {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  let pageData = content[langCode] || content.NE
  
  try {
    const apiData = await getGalleryPage()
    if (apiData) {
      pageData = mapGalleryPageData(apiData, langCode)
    }
  } catch (error) {
    console.error('Failed to load gallery page data:', error)
  }

  const t = pageData.galleryPage || pageData
  const common = pageData

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.header || common.nav?.gallery || 'Gallery'}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
              {t.description || 'Capturing moments from our volleyball journey and community events'}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Images/Videos Section */}
      {t.featured_media && t.featured_media.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">
                  {t.featured_subtitle || 'Highlights'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  {t.featured_title || 'Featured Media'}
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {t.featured_media.slice(0, 2).map((media: any, index: number) => (
                  <div key={index} className="relative group">
                    <div className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={media.image || media.thumbnail}
                        alt={media.title || media.alt || 'Featured Media'}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {media.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-8 h-8 text-green-600 ml-1" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="text-xl font-bold mb-1">
                          {media.title || 'Media Item'}
                        </h3>
                        {media.description && (
                          <p className="text-sm opacity-90">
                            {media.description}
                          </p>
                        )}
                        {media.date && (
                          <p className="text-xs mt-2 opacity-75">
                            {new Date(media.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery Section */}
      {t.images && t.images.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.images_title || 'Photo Gallery'}
                </h2>
                <p className="text-xl text-gray-600 mt-4">
                  {t.images_subtitle || 'Moments from our volleyball activities'}
                </p>
              </div>
              
              {/* Category Filter (if categories exist) */}
              {t.categories && t.categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {t.categories.map((category: any, index: number) => (
                    <button
                      key={index}
                      className="px-6 py-2 bg-white text-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                    >
                      {category.name || category}
                    </button>
                  ))}
                </div>
              )}

              {/* Masonry Grid */}
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {t.images.map((image: any, index: number) => (
                  <div key={index} className="break-inside-avoid">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                      <div className="relative overflow-hidden">
                        <Image
                          src={image.src || image.image}
                          alt={image.alt || image.title || `Gallery image ${index + 1}`}
                          width={image.width || 400}
                          height={image.height || 300}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex space-x-3">
                            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                              <Eye className="w-5 h-5 text-white" />
                            </button>
                            {image.download_url && (
                              <a
                                href={image.download_url}
                                download
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                              >
                                <Download className="w-5 h-5 text-white" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      {(image.title || image.description || image.date) && (
                        <div className="p-4">
                          {image.title && (
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {image.title}
                            </h3>
                          )}
                          {image.description && (
                            <p className="text-sm text-gray-600 mb-2">
                              {image.description}
                            </p>
                          )}
                          {image.date && (
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(image.date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Gallery Section */}
      {t.videos && t.videos.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.videos_title || 'Video Gallery'}
                </h2>
                <p className="text-xl text-gray-600 mt-4">
                  {t.videos_subtitle || 'Watch our team in action'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.videos.map((video: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="aspect-[16/9] relative group">
                      <Image
                        src={video.thumbnail || video.image}
                        alt={video.title || `Video ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 text-green-600 ml-1" />
                        </div>
                      </div>
                    </div>
                    {(video.title || video.description) && (
                      <div className="p-6">
                        {video.title && (
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {video.title}
                          </h3>
                        )}
                        {video.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {video.description}
                          </p>
                        )}
                        {video.date && (
                          <div className="flex items-center text-xs text-gray-500 mt-3">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(video.date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fallback message if no media */}
      {(!t.images || t.images.length === 0) && (!t.videos || t.videos.length === 0) && (!t.featured_media || t.featured_media.length === 0) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {common.nav?.gallery || 'Gallery'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Gallery content will be updated soon. Check back later to see our photos and videos!
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}