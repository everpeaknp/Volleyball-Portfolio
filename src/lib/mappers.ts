import { HomePageData } from '@/types/api'
import { content } from '@/data/content'

type Language = 'NE' | 'EN' | 'DE'

export function mapHomePageData(apiData: any, language: Language) {
  const staticContent = content[language]
  if (!apiData) return staticContent

  // Handle array response from DRF ViewSet
  const pageData = Array.isArray(apiData) ? apiData[0] : apiData
  if (!pageData) return staticContent

  const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'

  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  // Themed Placeholders (High quality Unsplash but controlled via mapper)
  const PLACEHOLDERS = {
    heroVideo: '/hero_video.mp4',
    heroImage: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=1600&q=80',
    introImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
    objectiveImage: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&q=80',
  }

  return {
    ...staticContent,
    hero: pageData.hero
      ? {
          title: getLoc(pageData.hero, 'title') || staticContent.hero.title,
          subtitle: getLoc(pageData.hero, 'subtitle') || staticContent.hero.subtitle,
          cta_join: getLoc(pageData.hero, 'cta_join_label') || staticContent.hero.cta_join,
          cta_learn: getLoc(pageData.hero, 'cta_learn_label') || staticContent.hero.cta_learn,
          motto: pageData.motto ? getLoc(pageData.motto, 'text') : staticContent.hero.motto,
          // Media mapping
          video: pageData.hero.video_file || pageData.hero.video_url || PLACEHOLDERS.heroVideo,
          image: pageData.hero.image || pageData.hero.image_url || PLACEHOLDERS.heroImage,
        }
      : staticContent.hero,

    intro: pageData.intro
      ? {
          mini_header: getLoc(pageData.intro, 'mini_header') || staticContent.intro.mini_header,
          title: getLoc(pageData.intro, 'title') || staticContent.intro.title,
          text: getLoc(pageData.intro, 'text') || staticContent.intro.text,
          subtext: getLoc(pageData.intro, 'subtext') || staticContent.intro.subtext,
          image: pageData.intro.image || pageData.intro.image_url || PLACEHOLDERS.introImage,
        }
      : staticContent.intro,

    objectives: pageData.mission
      ? {
          title: getLoc(pageData.mission, 'title') || staticContent.objectives.title,
          mission_label:
            getLoc(pageData.mission, 'mission_label') || staticContent.objectives.mission_label,
          description:
            getLoc(pageData.mission, 'description') || staticContent.objectives.description,
          list: (pageData.mission.objectives || []).map((obj: any, idx: number) => ({
            text: getLoc(obj, 'text'),
            prefix: getLoc(obj, 'goal_prefix') || 'Goal',
            badge: obj.badge_number || `0${idx + 1}`,
            image: obj.image || obj.image_url || PLACEHOLDERS.objectiveImage,
          })),
        }
      : staticContent.objectives,

    motto: pageData.motto
      ? {
          text: getLoc(pageData.motto, 'text') || staticContent.hero.motto,
          button_label:
            getLoc(pageData.motto, 'button_label') ||
            (language === 'NE'
              ? 'सम्पर्क गर्नुहोस्'
              : language === 'DE'
              ? 'Kontaktieren Sie uns'
              : 'Contact Us'),
        }
      : {
          text: staticContent.hero.motto,
          button_label:
            language === 'NE'
              ? 'सम्पर्क गर्नुहोस्'
              : language === 'DE'
              ? 'Kontaktieren Sie uns'
              : 'Contact Us',
        },

    stats: pageData.stats
      ? pageData.stats.map((stat: any) => ({
          label: getLoc(stat, 'label'),
          value: stat.value,
          suffix: stat.suffix,
        }))
      : staticContent.stats,
  }
}

export function mapNavigationData(navItems: any[], navSettings: any, language: Language) {
  const staticContent = content[language]
  const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'

  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  return {
    items:
      navItems && navItems.length > 0
        ? navItems
            .filter((item) => item.is_active)
            .sort((a, b) => a.order - b.order)
            .map((item) => ({
              href: item.href,
              label:
                getLoc(item, 'label') || staticContent.nav[item.href.replace('/', '') || 'home'],
            }))
        : [
            { href: '/', label: staticContent.nav.home },
            { href: '/about', label: staticContent.nav.about },
            { href: '/committee', label: staticContent.nav.committee },
            { href: '/team', label: staticContent.nav.team },
            { href: '/membership', label: staticContent.nav.membership },
            { href: '/events', label: staticContent.nav.events },
            { href: '/news', label: staticContent.nav.news },
            { href: '/gallery', label: staticContent.nav.gallery },
            { href: '/contact', label: staticContent.nav.contact },
          ],
    brand: navSettings
      ? {
          main: getLoc(navSettings, 'brand_name_main') || 'Nepal Volleyball Club',
          secondary: getLoc(navSettings, 'brand_name_secondary') || 'Hamburg e.V.',
          logo: navSettings.logo || '/Volleyball-PNG-Photo.webp',
        }
      : {
          main: 'Nepal Volleyball Club',
          secondary: 'Hamburg e.V.',
          logo: '/Volleyball-PNG-Photo.webp',
        },
  }
}

export function mapFooterData(footerSettings: any, language: Language) {
  const staticContent = content[language]
  const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'

  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  if (!footerSettings) {
    return {
      brand: {
        main: 'Nepal Volleyball',
        secondary: 'Club Hamburg e.V.',
        logo: '/Volleyball-PNG-Photo.webp',
      },
      description: staticContent.intro.subtext,
      social: {
        facebook: '#',
        instagram: '#',
        youtube: '#',
      },
      sections: {
        quickLinks: language === 'NE' ? 'छिटो लिंक' : 'Quick Links',
        contact: staticContent.nav.contact,
        membership: staticContent.nav.membership,
      },
      contact: {
        address: staticContent.contact.address,
        phone: staticContent.contact.phone,
        email: staticContent.contact.email,
        registered: staticContent.contact.registered,
      },
      membership: {
        description:
          language === 'NE'
            ? 'आजै सदस्य बन्नुहोस् र हाम्रो समुदायको हिस्सा बन्नुहोस्।'
            : language === 'DE'
            ? 'Werden Sie noch heute Mitglied und Teil unserer Gemeinschaft.'
            : 'Become a member today and part of our community.',
        buttonText:
          language === 'NE'
            ? 'सदस्य बन्नुहोस्'
            : language === 'DE'
            ? 'Mitglied werden'
            : 'Join Now',
      },
      copyright: `© ${new Date().getFullYear()} Nepal Volleyball Club Hamburg e.V.`,
    }
  }

  return {
    brand: {
      main: getLoc(footerSettings, 'brand_name_main') || 'Nepal Volleyball',
      secondary: getLoc(footerSettings, 'brand_name_secondary') || 'Club Hamburg e.V.',
      logo: footerSettings.logo || '/Volleyball-PNG-Photo.webp',
    },
    description: getLoc(footerSettings, 'description') || staticContent.intro.subtext,
    social: {
      facebook: footerSettings.facebook_url || '#',
      instagram: footerSettings.instagram_url || '#',
      youtube: footerSettings.youtube_url || '#',
    },
    sections: {
      quickLinks:
        getLoc(footerSettings, 'quick_links_title') ||
        (language === 'NE' ? 'छिटो लिंक' : 'Quick Links'),
      contact: getLoc(footerSettings, 'contact_info_title') || staticContent.nav.contact,
      membership: getLoc(footerSettings, 'membership_title') || staticContent.nav.membership,
    },
    quickLinks:
      footerSettings.quick_links
        ?.map((link: any) => ({
          label: getLoc(link, 'label') || link.label_en || link.url,
          href: link.url,
          order: link.order,
        }))
        .sort((a: any, b: any) => a.order - b.order) || [],
    contact: {
      address: getLoc(footerSettings, 'address') || staticContent.contact.address,
      phone: footerSettings.phone || staticContent.contact.phone,
      email: footerSettings.email || staticContent.contact.email,
      registered: footerSettings.registered_info || staticContent.contact.registered,
    },
    membership: {
      description:
        getLoc(footerSettings, 'membership_description') ||
        (language === 'NE'
          ? 'आजै सदस्य बन्नुहोस् र हाम्रो समुदायको हिस्सा बन्नुहोस्।'
          : language === 'DE'
          ? 'Werden Sie noch heute Mitglied und Teil unserer Gemeinschaft.'
          : 'Become a member today and part of our community.'),
      buttonText:
        getLoc(footerSettings, 'membership_button_text') ||
        (language === 'NE'
          ? 'सदस्य बन्नुहोस्'
          : language === 'DE'
          ? 'Mitglied werden'
          : 'Join Now'),
    },
    copyright: (
      getLoc(footerSettings, 'copyright_text') || `© [year] Nepal Volleyball Club Hamburg e.V.`
    ).replace('[year]', new Date().getFullYear().toString()),
  }
}

export function mapAboutPageData(apiData: any, language: Language) {
  const staticContent = content[language].aboutPage
  if (!apiData || (Array.isArray(apiData) && apiData.length === 0)) return staticContent

  const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'
  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  // Handle API response - it comes as an array
  const results = Array.isArray(apiData) ? apiData[0] : apiData

  return {
    ...staticContent,
    // Hero section
    sinceText: getLoc(results.hero, 'since_text') || staticContent.sinceText,
    heroTitle: getLoc(results.hero, 'title') || staticContent.heroTitle,
    heroText: getLoc(results.hero, 'text') || staticContent.heroText,

    // Intro section
    introTitlePart1: getLoc(results.intro, 'title_part1') || staticContent.introTitlePart1,
    introTitlePart2: getLoc(results.intro, 'title_part2') || staticContent.introTitlePart2,
    mainText1: getLoc(results.intro, 'text1') || staticContent.mainText1,
    mainText2: getLoc(results.intro, 'text2') || staticContent.mainText2,
    established: getLoc(results.intro, 'established_label') || staticContent.established,

    // Images from API - map dynamic images
    heroImage: results.hero?.background_image || staticContent.heroImage,
    introImage: results.intro?.main_image || staticContent.introImage,
    objectiveImage: results.intro?.secondary_image || staticContent.objectiveImage,
    strategicImage: results.strategic?.side_image || staticContent.strategicImage,

    // Stats mapping
    stats: {
      players: results.intro?.stats?.[0]
        ? getLoc(results.intro.stats[0], 'label') || staticContent.stats.players
        : staticContent.stats.players,
      events: results.intro?.stats?.[1]
        ? getLoc(results.intro.stats[1], 'label') || staticContent.stats.events
        : staticContent.stats.events,
      passion: results.intro?.stats?.[2]
        ? getLoc(results.intro.stats[2], 'label') || staticContent.stats.passion
        : staticContent.stats.passion,
    },

    // Vision & Mission
    coreTitle: getLoc(results.core, 'title') || staticContent.coreTitle,
    vision: {
      title: getLoc(results.core, 'vision_title') || staticContent.vision.title,
      text: getLoc(results.core, 'vision_text') || staticContent.vision.text,
    },
    mission: {
      title: getLoc(results.core, 'mission_title') || staticContent.mission.title,
      text: getLoc(results.core, 'mission_text') || staticContent.mission.text,
    },

    // Strategic section
    strategicTitle: getLoc(results.strategic, 'strategic_title') || staticContent.strategicTitle,
    objectivesTitle: getLoc(results.strategic, 'objectives_title') || staticContent.objectivesTitle,

    // Promo section
    promo: {
      title:
        getLoc(results.strategic, 'promo_title') ||
        staticContent.promo?.title ||
        'Global Standards',
      text:
        getLoc(results.strategic, 'promo_text') ||
        staticContent.promo?.text ||
        'Bringing international volleyball excellence.',
    },

    // Map objectives list - this overrides the objectives in common
    objectives: {
      ...content[language].objectives,
      list:
        results.strategic?.objectives
          ?.map((obj: any) => getLoc(obj, 'text') || obj.text_en)
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) ||
        content[language].objectives.list,
    },
  }
}

export function mapMembershipPageData(apiData: any, language: Language) {
  const staticContent = content[language].membershipPage
  if (!apiData) return staticContent

  // Handle array response from DRF ViewSet
  const pageData = Array.isArray(apiData) ? apiData[0] : apiData
  if (!pageData) return staticContent

  const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'
  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  return {
    ...staticContent,
    heroTitle: getLoc(pageData.hero, 'title') || staticContent.heroTitle,
    heroText: getLoc(pageData.hero, 'text') || staticContent.heroText,
    heroImage: pageData.hero?.image_url || pageData.hero?.image || staticContent.heroImage,

    benefits: (pageData.benefits || [])
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      .map((benefit: any) => ({
        title: getLoc(benefit, 'title') || benefit.title || '',
        desc: getLoc(benefit, 'desc') || benefit.desc || '',
        icon: benefit.icon || 'Users', // Use dynamic icon from API
      })),

    formTitle: getLoc(pageData.form_settings, 'title') || staticContent.formTitle,
    formText: getLoc(pageData.form_settings, 'text') || staticContent.formText,
    successTitle: getLoc(pageData.form_settings, 'success_title') || staticContent.successTitle,
    successText: getLoc(pageData.form_settings, 'success_text') || staticContent.successText,

    labels: {
      name: getLoc(pageData.form_settings, 'label_name') || staticContent.labels.name,
      email: getLoc(pageData.form_settings, 'label_email') || staticContent.labels.email,
      phone: getLoc(pageData.form_settings, 'label_phone') || staticContent.labels.phone,
      address: getLoc(pageData.form_settings, 'label_address') || staticContent.labels.address,
      dob: getLoc(pageData.form_settings, 'label_dob') || staticContent.labels.dob,
      gender: getLoc(pageData.form_settings, 'label_gender') || staticContent.labels.gender,
      experience:
        getLoc(pageData.form_settings, 'label_experience') || staticContent.labels.experience,
      position: getLoc(pageData.form_settings, 'label_position') || staticContent.labels.position,
      reason: getLoc(pageData.form_settings, 'label_reason') || staticContent.labels.reason,
      submit: getLoc(pageData.form_settings, 'label_submit') || staticContent.labels.submit,
    },

    options: {
      gender:
        [
          '',
          ...(getLoc(pageData.form_settings, 'options_gender') || '').split(', ').filter(Boolean),
        ] || staticContent.options.gender,
      experience:
        [
          '',
          ...(getLoc(pageData.form_settings, 'options_experience') || '')
            .split(', ')
            .filter(Boolean),
        ] || staticContent.options.experience,
      position:
        [
          '',
          ...(getLoc(pageData.form_settings, 'options_position') || '').split(', ').filter(Boolean),
        ] || staticContent.options.position,
    },
  }
}

export function mapEventsPageData(apiData: any, language: Language) {
  const staticContent = content[language].eventsPage
  if (!apiData) return staticContent

  // Handle array response from DRF ViewSet
  const pageData = Array.isArray(apiData) ? apiData[0] : apiData
  if (!pageData) return staticContent

  const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'
  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  return {
    ...staticContent,
    heroTitle: getLoc(pageData.hero, 'title') || staticContent.heroTitle,
    heroText: getLoc(pageData.hero, 'text') || staticContent.heroText,
    heroImage: pageData.hero?.image_url || pageData.hero?.image || staticContent.heroImage,

    upcomingTitle: getLoc(pageData.settings, 'upcoming_title') || staticContent.upcomingTitle,
    pastTitle: getLoc(pageData.settings, 'past_title') || staticContent.pastTitle,
    registerBtn: getLoc(pageData.settings, 'register_btn') || staticContent.registerBtn,

    labels: {
      upcoming: getLoc(pageData.settings, 'label_upcoming') || staticContent.labels.upcoming,
      past: getLoc(pageData.settings, 'label_past') || staticContent.labels.past,
    },

    events: (pageData.events || [])
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      .map((event: any) => ({
        title: getLoc(event, 'title') || event.title || '',
        description: getLoc(event, 'description') || event.description || '',
        date: getLoc(event, 'date_text') || event.date_text || '',
        time: event.time || '',
        location: getLoc(event, 'location') || event.location || '',
        image:
          event.image_url ||
          event.image ||
          'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80',
        isPast: event.is_past || false,
        id: event.id || Math.random(),
      })),

    // Split events for convenience in components
    upcoming: (pageData.events || [])
      .filter((e: any) => !e.is_past)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      .map((event: any) => ({
        title: getLoc(event, 'title') || event.title || '',
        description: getLoc(event, 'description') || event.description || '',
        date: getLoc(event, 'date_text') || event.date_text || '',
        time: event.time || '',
        location: getLoc(event, 'location') || event.location || '',
        image:
          event.image_url ||
          event.image ||
          'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80',
        id: event.id || Math.random(),
      })),

    past: (pageData.events || [])
      .filter((e: any) => e.is_past)
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      .map((event: any) => ({
        title: getLoc(event, 'title') || event.title || '',
        date: getLoc(event, 'date_text') || event.date_text || '',
        location: getLoc(event, 'location') || event.location || '',
        image:
          event.image_url ||
          event.image ||
          'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80',
        id: event.id || Math.random(),
      })),
  }
}

export function mapNewsPageData(apiData: any, language: Language) {
  const staticContent = content[language].newsPage
  if (!apiData) return staticContent

  // Handle array response
  const pageData = Array.isArray(apiData) ? apiData[0] : apiData
  if (!pageData) return staticContent

  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  return {
    ...staticContent,
    heroTitle: getLoc(pageData.hero, 'title') || staticContent.heroTitle,
    heroText: getLoc(pageData.hero, 'text') || staticContent.heroText,
    heroImage: pageData.hero?.image || pageData.hero?.image_url || staticContent.heroImage,

    featuredLabel: getLoc(pageData.settings, 'featured_label') || staticContent.featuredLabel,
    readMoreLabel: getLoc(pageData.settings, 'read_more_label') || staticContent.readMoreLabel,
    otherNewsTitle: getLoc(pageData.settings, 'other_news_title') || staticContent.otherNewsTitle,

    articles:
      pageData.articles
        ?.map((article: any) => ({
          title: getLoc(article, 'title') || article.title_en,
          excerpt: getLoc(article, 'excerpt') || article.excerpt_en,
          date: getLoc(article, 'date_text') || article.date_text_en,
          category: article.category
            ? getLoc(article.category, 'name') || article.category.name_en
            : 'General',
          image:
            article.image ||
            article.image_url ||
            'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
          featured: article.featured,
          slug: article.id?.toString() || '',
          order: article.order,
        }))
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || staticContent.articles,
  }
}

export function mapGalleryPageData(apiData: any, language: Language) {
  const staticContent = content[language].galleryPage
  if (!apiData) return staticContent

  // Handle array response
  const pageData = Array.isArray(apiData) ? apiData[0] : apiData
  if (!pageData) return staticContent

  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  // Create category lookup for images
  const categoryLookup =
    pageData.categories?.reduce((acc: any, cat: any) => {
      acc[cat.id] = getLoc(cat, 'name') || cat.name_en
      return acc
    }, {}) || {}

  return {
    ...staticContent,
    heroTitle: getLoc(pageData.hero, 'title') || staticContent.heroTitle,
    heroText: getLoc(pageData.hero, 'text') || staticContent.heroText,
    noImages: getLoc(pageData.settings, 'no_images_text') || staticContent.noImages,

    categories:
      pageData.categories
        ?.map((cat: any) => getLoc(cat, 'name') || cat.name_en)
        .sort((a: any, b: any) => {
          const catA = pageData.categories.find((c: any) => (getLoc(c, 'name') || c.name_en) === a)
          const catB = pageData.categories.find((c: any) => (getLoc(c, 'name') || c.name_en) === b)
          return (catA?.order || 0) - (catB?.order || 0)
        }) || staticContent.categories,

    images:
      pageData.images
        ?.map((img: any) => ({
          category: categoryLookup[img.category_id] || 'All',
          title: getLoc(img, 'title') || img.title_en,
          image: img.image || img.image_url || img.image_url_full,
          src: img.image || img.image_url || img.image_url_full, // Fallback for different property names
          order: img.order,
        }))
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || staticContent.images,
  }
}

export function mapContactPageData(apiData: any, language: Language) {
  const staticContent = content[language]
  if (!apiData) return staticContent

  // Handle array response
  const pageData = Array.isArray(apiData) ? apiData[0] : apiData
  if (!pageData) return staticContent

  const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'
  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  return {
    ...staticContent,
    // Update contact info in the main object
    contact: {
      ...staticContent.contact,
      title: getLoc(pageData.hero, 'title') || staticContent.contact.title,
    },
    // Adding dynamic sections for contact page specifically
    contactPage: {
      heroSubtitle: getLoc(pageData.hero, 'subtitle') || staticContent.contact.title,
      heroImage:
        pageData.hero?.image ||
        pageData.hero?.image_url ||
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80',

      infoSectionTitle: getLoc(pageData.settings, 'info_section_title') || 'Contact Information',
      socialSectionTitle: getLoc(pageData.settings, 'social_section_title') || 'Social Media',
      formTitle: getLoc(pageData.settings, 'form_title') || 'Send Message',

      infoList: pageData.contact_methods?.map((m: any) => ({
        icon: m.icon,
        label: getLoc(m, 'label'),
        value: m.value,
      })) || [
        {
          icon: 'MapPin',
          label: getLoc(staticContent.contact, 'address'),
          value: staticContent.contact.address,
        },
        {
          icon: 'Phone',
          label: getLoc(staticContent.contact, 'phone'),
          value: staticContent.contact.phone,
        },
        {
          icon: 'Mail',
          label: getLoc(staticContent.contact, 'email'),
          value: staticContent.contact.email,
        },
      ],

      socialLinks: pageData.social_links?.map((s: any) => ({
        platform: s.platform,
        url: s.url,
        icon: s.icon,
      })) || [
        { platform: 'Facebook', url: '#', icon: 'Facebook' },
        { platform: 'Instagram', url: '#', icon: 'Instagram' },
        { platform: 'Twitter', url: '#', icon: 'Twitter' },
      ],

      labels: pageData.settings
        ? {
            name: getLoc(pageData.settings, 'label_name'),
            email: getLoc(pageData.settings, 'label_email'),
            subject: getLoc(pageData.settings, 'label_subject'),
            message: getLoc(pageData.settings, 'label_message'),
            submit: getLoc(pageData.settings, 'label_submit'),
          }
        : {
            name: staticContent.membershipPage.labels.name,
            email: staticContent.membershipPage.labels.email,
            subject: language === 'NE' ? 'विषय' : language === 'DE' ? 'Betreff' : 'Subject',
            message: language === 'NE' ? 'सन्देश' : language === 'DE' ? 'Nachricht' : 'Message',
            submit: language === 'NE' ? 'पठाउनुहोस्' : language === 'DE' ? 'Senden' : 'Send',
          },
    },
  }
}

export function mapCommitteePageData(apiData: any, language: Language) {
  const staticContent = content[language].committee
  if (!apiData || (Array.isArray(apiData) && apiData.length === 0)) return staticContent

  const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'
  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  // Handle API response - it comes as an array
  const results = Array.isArray(apiData) ? apiData[0] : apiData

  return {
    ...staticContent,
    // Hero section
    heroTitle: getLoc(results.hero, 'title') || staticContent.heroTitle,
    heroSubtitle: getLoc(results.hero, 'subtitle') || staticContent.heroSubtitle,
    heroImage: results.hero?.background_image || staticContent.heroImage,

    // Executive Board
    president: {
      name: results.board?.pres_name || staticContent.president.name,
      role: getLoc(results.board, 'pres_role') || staticContent.president.role,
      desc: getLoc(results.board, 'pres_desc') || staticContent.president.desc,
      email: results.board?.pres_email || staticContent.president.email,
      image: results.board?.pres_image || staticContent.president.image,
    },
    secretary: {
      name: results.board?.sec_name || staticContent.secretary.name,
      role: getLoc(results.board, 'sec_role') || staticContent.secretary.role,
      desc: getLoc(results.board, 'sec_desc') || staticContent.secretary.desc,
      email: results.board?.sec_email || staticContent.secretary.email,
      image: results.board?.sec_image || staticContent.secretary.image,
    },
    treasurer: {
      name: results.board?.tres_name || staticContent.treasurer.name,
      role: getLoc(results.board, 'tres_role') || staticContent.treasurer.role,
      desc: getLoc(results.board, 'tres_desc') || staticContent.treasurer.desc,
      email: results.board?.tres_email || staticContent.treasurer.email,
      image: results.board?.tres_image || staticContent.treasurer.image,
    },

    // General members
    members:
      results.members
        ?.map((member: any) => ({
          name: member.name,
          image: member.image,
          order: member.order,
        }))
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || staticContent.members,

    // Section titles
    memberSectionTitle:
      getLoc(results.section_settings, 'member_section_title') || staticContent.memberSectionTitle,
  }
}

export function mapTeamPageData(apiData: any, language: Language) {
  const staticContent = content[language].teamPage
  if (!apiData || (Array.isArray(apiData) && apiData.length === 0)) return staticContent

  const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'
  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  // Handle API response - it comes as an array
  const results = Array.isArray(apiData) ? apiData[0] : apiData

  return {
    ...staticContent,
    // Hero section
    heroTitle: getLoc(results.hero, 'title') || staticContent.heroTitle,
    heroText: getLoc(results.hero, 'text') || staticContent.heroText,
    heroImage: results.hero?.image || results.hero?.image_url || staticContent.heroImage,

    // Section titles
    coachesTitle: getLoc(results.coaches_settings, 'title') || staticContent.coachesTitle,
    playersTitle: getLoc(results.players_settings, 'title') || staticContent.playersTitle,

    // Photo section
    photoTitle: getLoc(results.photo_section, 'title') || staticContent.photoTitle,
    photoSubtitle: getLoc(results.photo_section, 'subtitle') || staticContent.photoSubtitle,
    photoImage:
      results.photo_section?.image || results.photo_section?.image_url || staticContent.photoImage,

    // CTA section
    joinTitle: getLoc(results.cta, 'title') || staticContent.joinTitle,
    joinText: getLoc(results.cta, 'text') || staticContent.joinText,
    joinBtn: getLoc(results.cta, 'button_label') || staticContent.joinBtn,
    joinLink: results.cta?.button_link || staticContent.joinLink,

    // Coaches
    coaches:
      results.coaches
        ?.map((coach: any) => ({
          name: getLoc(coach, 'name') || coach.name_en,
          role: getLoc(coach, 'role') || coach.role_en,
          experience: getLoc(coach, 'experience') || coach.experience_en,
          image:
            coach.image ||
            coach.image_url ||
            staticContent.coaches?.[0]?.image ||
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
          order: coach.order,
        }))
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || staticContent.coaches,

    // Players
    players:
      results.players
        ?.map((player: any) => ({
          name: getLoc(player, 'name') || player.name_en,
          position: getLoc(player, 'position') || player.position_en,
          number: player.number,
          image:
            player.image ||
            player.image_url ||
            staticContent.players?.[0]?.image ||
            'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80',
          order: player.order,
        }))
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || staticContent.players,
  }
}

export function mapNoticePageData(apiData: any, language: Language) {
  const staticContent = content[language].noticePage
  if (!apiData) return staticContent

  // Handle array response
  const pageData = Array.isArray(apiData) ? apiData[0] : apiData
  if (!pageData) return staticContent

  const getLoc = (obj: any, fieldPrefix: string) => {
    if (!obj) return ''
    const suffix = language.toLowerCase() as 'ne' | 'en' | 'de'
    return obj[`${fieldPrefix}_${suffix}`] || ''
  }

  return {
    ...staticContent,
    heroTitle: getLoc(pageData.hero, 'title') || staticContent.heroTitle,
    heroText: getLoc(pageData.hero, 'text') || staticContent.heroText,
    ctaTitle: getLoc(pageData.cta, 'title') || staticContent.ctaTitle,
    ctaText: getLoc(pageData.cta, 'text') || staticContent.ctaText,
    ctaBtn: getLoc(pageData.cta, 'button_text') || staticContent.ctaBtn,
    ctaIcon: pageData.cta?.button_icon || 'ChevronRight',
    notices:
      pageData.notices
        ?.filter((notice: any) => notice.is_published)
        ?.map((notice: any) => ({
          title: getLoc(notice, 'title') || notice.title_en,
          content: getLoc(notice, 'content') || notice.content_en,
          date: getLoc(notice, 'date_text') || notice.date_text_en,
          category: notice.category
            ? getLoc(notice.category, 'name') || notice.category.name_en
            : 'सामान्य',
          icon: notice.icon || 'Bell',
          order: notice.order,
        }))
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0)) || staticContent.notices,
  }
}
