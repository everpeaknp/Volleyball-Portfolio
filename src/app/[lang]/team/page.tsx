import Image from 'next/image'
import { Trophy, Award, Calendar, MapPin, Users, Star, Instagram, Facebook, Twitter } from 'lucide-react'
import { getTeamPage } from '@/lib/api'
import { mapTeamPageData } from '@/lib/mappers'
import { content } from '@/data/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  try {
    const apiData = await getTeamPage()
    if (apiData) {
      const dynamicData = mapTeamPageData(apiData, langCode)
      const title = dynamicData.teamPage.header
      const description = dynamicData.teamPage.description
      
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
    console.error('Failed to load team page metadata:', error)
  }
  
  // Fallback to static content
  const fallbackContent = content[langCode] || content.NE
  return {
    title: fallbackContent.teamPage?.header || fallbackContent.nav.team,
    description: fallbackContent.teamPage?.description || '',
    openGraph: {
      title: fallbackContent.teamPage?.header || fallbackContent.nav.team,
      description: fallbackContent.teamPage?.description || '',
      type: 'website',
      locale: langCode === 'NE' ? 'ne_NP' : langCode === 'DE' ? 'de_DE' : 'en_US',
    },
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function TeamPage({ params }: Props) {
  const { lang } = await params
  const langCode = lang.toUpperCase() as 'NE' | 'EN' | 'DE'
  
  let pageData = content[langCode] || content.NE
  
  try {
    const apiData = await getTeamPage()
    if (apiData) {
      pageData = mapTeamPageData(apiData, langCode)
    }
  } catch (error) {
    console.error('Failed to load team page data:', error)
  }

  const t = pageData.teamPage || pageData
  const common = pageData

  // Helper function to get social icon
  const getSocialIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'instagram':
        return Instagram
      case 'facebook':
        return Facebook
      case 'twitter':
        return Twitter
      default:
        return Users
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-teal-600 via-cyan-500 to-blue-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t.header || common.nav?.team || 'Our Team'}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
              {t.description || 'Meet the talented players who make our volleyball team strong'}
            </p>
          </div>
        </div>
      </section>

      {/* Team Stats/Overview */}
      {(t.stats || t.achievements) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.stats_title || 'Team Overview'}
                </h2>
              </div>
              
              {/* Stats Grid */}
              {t.stats && t.stats.length > 0 && (
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                  {t.stats.map((stat: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-teal-600">
                          {stat.value}{stat.suffix || ''}
                        </span>
                      </div>
                      <p className="text-gray-600 font-semibold">
                        {stat.label || stat.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Achievements */}
              {t.achievements && t.achievements.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {t.achievements.map((achievement: any, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {achievement.title || achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {achievement.description}
                      </p>
                      {achievement.year && (
                        <p className="text-xs text-gray-500">
                          {achievement.year}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Team Rosters/Groups */}
      {t.teams && t.teams.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.teams_title || 'Team Rosters'}
                </h2>
              </div>
              
              {t.teams.map((team: any, teamIndex: number) => (
                <div key={teamIndex} className="mb-16 last:mb-0">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {team.name || team.title || `Team ${teamIndex + 1}`}
                    </h3>
                    {team.description && (
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {team.description}
                      </p>
                    )}
                  </div>
                  
                  {team.players && team.players.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {team.players.map((player: any, playerIndex: number) => (
                        <div key={playerIndex} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                          <div className="text-center mb-4">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                              {player.photo || player.image ? (
                                <Image
                                  src={player.photo || player.image}
                                  alt={player.name || 'Team Member'}
                                  width={96}
                                  height={96}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-white text-xl font-bold">
                                  {(player.name || 'P').charAt(0)}
                                </div>
                              )}
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">
                              {player.name || 'Team Member'}
                            </h4>
                            <p className="text-teal-600 font-semibold text-sm">
                              {player.position || player.role || 'Player'}
                            </p>
                            {player.jersey_number && (
                              <span className="inline-block w-8 h-8 bg-teal-100 text-teal-700 rounded-full text-sm font-bold mt-2 leading-8">
                                #{player.jersey_number}
                              </span>
                            )}
                          </div>

                          {/* Player Details */}
                          {(player.age || player.height || player.experience) && (
                            <div className="mb-4 space-y-2">
                              {player.age && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Age:</span>
                                  <span className="font-semibold">{player.age}</span>
                                </div>
                              )}
                              {player.height && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Height:</span>
                                  <span className="font-semibold">{player.height}</span>
                                </div>
                              )}
                              {player.experience && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Experience:</span>
                                  <span className="font-semibold">{player.experience}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Player Bio */}
                          {player.bio && (
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                              {player.bio}
                            </p>
                          )}

                          {/* Achievements */}
                          {player.achievements && player.achievements.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                                <Award className="w-4 h-4 mr-1 text-yellow-500" />
                                Achievements
                              </h5>
                              <ul className="text-xs text-gray-600 space-y-1">
                                {player.achievements.map((achievement: string, achIndex: number) => (
                                  <li key={achIndex} className="flex items-center">
                                    <Star className="w-3 h-3 mr-2 text-yellow-400" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Social Links */}
                          {player.social_links && player.social_links.length > 0 && (
                            <div className="flex justify-center space-x-3 pt-4 border-t border-gray-100">
                              {player.social_links.map((social: any, socialIndex: number) => {
                                const IconComponent = getSocialIcon(social.platform)
                                return (
                                  <a
                                    key={socialIndex}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-teal-100 hover:text-teal-600 transition-colors"
                                  >
                                    <IconComponent className="w-4 h-4" />
                                  </a>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Coaching Staff */}
      {t.coaching_staff && t.coaching_staff.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t.coaching_title || 'Coaching Staff'}
                </h2>
                <p className="text-xl text-gray-600 mt-4">
                  {t.coaching_subtitle || 'Meet our experienced coaching team'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.coaching_staff.map((coach: any, index: number) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                      {coach.photo || coach.image ? (
                        <Image
                          src={coach.photo || coach.image}
                          alt={coach.name || 'Coach'}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-white text-xl font-bold">
                          {(coach.name || 'C').charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {coach.name || 'Coach'}
                    </h3>
                    <p className="text-teal-600 font-semibold mb-4">
                      {coach.position || coach.role || 'Coach'}
                    </p>
                    {coach.bio && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {coach.bio}
                      </p>
                    )}
                    {coach.experience && (
                      <p className="text-xs text-gray-500 mt-3">
                        {coach.experience} years experience
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Fallback message if no team data */}
      {(!t.teams || t.teams.length === 0) && (!t.coaching_staff || t.coaching_staff.length === 0) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-teal-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {common.nav?.team || 'Team'}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Team information will be updated soon. Check back later to meet our amazing players and coaching staff!
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}