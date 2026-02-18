# Nepal Volleyball Club Hamburg - CMS Requirements Documentation

## Overview
This document outlines the complete structure and requirements for the Django CMS backend that will mirror the Nepal Volleyball Club Hamburg frontend exactly. The frontend is built with Next.js and uses a multi-language system (Nepali, English, German).

## Absolute Rules
- CMS must mirror frontend structure exactly
- Frontend cannot change even a single prop structure
- No redesign logic inside CMS
- No dynamic layout builder
- No arbitrary section creation
- No rearranging structural layout
- Section order must match frontend expectation
- Strict field validation
- Versioned API required
- Production-ready thinking

## Project Structure Analysis

### Frontend Pages (9 Total)
1. **Home** (/) - Main landing page
2. **About** (/about) - About us page
3. **Committee** (/committee) - Executive committee
4. **Team** (/team) - Team members and coaches
5. **Membership** (/membership) - Membership application and info
6. **Events** (/events) - Upcoming and past events
7. **News** (/news) - News articles
8. **Gallery** (/gallery) - Photo gallery
9. **Contact** (/contact) - Contact information
10. **Notice** (/notice) - Official notices

### Language Support
- **NE** - Nepali (Default)
- **EN** - English
- **DE** - German

Each language requires complete translation of all content fields.

---

## Detailed Component Analysis

### 1. Navigation Component (Navbar)

#### Expected Fields:
```typescript
interface Navigation {
  logo: {
    image: string; // "/Volleyball-PNG-Photo.webp"
    alt: string; // "NVC Logo"
  };
  brandName: {
    main: string; // "Nepal Volleyball Club"
    secondary: string; // "Hamburg e.V."
  };
  navItems: {
    home: string;
    about: string;
    committee: string;
    team: string;
    membership: string;
    events: string;
    news: string;
    gallery: string;
    contact: string;
  }[language];
  languageFlags: {
    NE: { flag: string; label: string };
    EN: { flag: string; label: string };
    DE: { flag: string; label: string };
  };
}
```

#### Styling Requirements:
- Fixed position with backdrop blur
- White background with 95% opacity
- Shadow-sm
- Height: 5rem (80px)
- Active state: text-primary-600 font-bold
- Hover state: text-primary-600
- Language flags with hover scale effect

---

### 2. Footer Component

#### Expected Fields:
```typescript
interface Footer {
  brand: {
    logo: string;
    alt: string;
    mainName: string;
    secondaryName: string;
  };
  description: string; // t.intro.subtext
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  quickLinks: {
    home: string;
    about: string;
    events: string;
    news: string;
    contact: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    registered: string;
  };
  newsletter: {
    title: string;
    description: string;
    buttonText: string;
  };
  copyright: string;
  legalLinks: {
    privacy: string;
    terms: string;
  };
}
```

#### Styling Requirements:
- Background: gray-900
- Border-top: border-gray-800
- Grid layout: md:grid-cols-2 lg:grid-cols-4
- Social icons: w-10 h-10 rounded-full hover effects

---

### 3. Home Page Components

#### Hero Section
```typescript
interface Hero {
  video: {
    src: string; // "/hero_video.mp4"
    type: string; // "video/mp4"
  };
  title: string;
  subtitle: string;
  cta_join: string;
  cta_learn: string;
  motto: string;
}
```

#### Intro Section
```typescript
interface Intro {
  title: string;
  text: string;
  subtext: string;
  image: {
    src: string;
    alt: string;
  };
  cta_text: string;
}
```

#### Objectives Section
```typescript
interface Objectives {
  title: string;
  missionLabel: string; // "Our Mission"
  description: string;
  list: string[]; // Array of objective strings
  cardImages: string[]; // 5 rotating images
}
```

#### Stats Section
```typescript
interface Stats {
  items: {
    members: { value: number; suffix: string; label: string };
    events: { value: number; suffix: string; label: string };
    years: { value: number; suffix: string; label: string };
    awards: { value: number; suffix: string; label: string };
  };
}
```

---

### 4. About Page

```typescript
interface AboutPage {
  hero: {
    title: string;
    text: string;
  };
  intro: {
    title: string;
    mainTitle: string;
    mainText1: string;
    mainText2: string;
    imageCaption: string;
    image: {
      src: string;
      alt: string;
    };
  };
  vision: {
    title: string;
    text: string;
  };
  mission: {
    title: string;
    text: string;
  };
  values: {
    title: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  objectives: {
    title: string;
    items: string[];
  };
  sinceText: string;
  introTitleParts: {
    part1: string;
    part2: string;
  };
  stats: {
    players: string;
    events: string;
    passion: string;
  };
  established: string;
  coreTitle: string;
  strategicTitle: string;
  promo: {
    title: string;
    text: string;
  };
}
```

---

### 5. Committee Page

```typescript
interface CommitteePage {
  hero: {
    title: string;
    subtitle: string;
  };
  memberSectionTitle: string;
  roles: {
    president: string;
    secretary: string;
    treasurer: string;
    member: string;
  };
  members: {
    president: {
      name: string;
      description: string;
      image?: string;
    };
    secretary: {
      name: string;
      description: string;
      image?: string;
    };
    treasurer: {
      name: string;
      description: string;
      image?: string;
    };
  };
}
```

---

### 6. Team Page

```typescript
interface TeamPage {
  hero: {
    title: string;
    text: string;
  };
  coachesTitle: string;
  playersTitle: string;
  join: {
    title: string;
    text: string;
    buttonText: string;
  };
  coaches: {
    name: string;
    role: string;
    experience: string;
    image?: string;
  }[];
  players: {
    name: string;
    position: string;
    number: string;
    image?: string;
  }[];
}
```

---

### 7. Membership Page

```typescript
interface MembershipPage {
  hero: {
    title: string;
    text: string;
  };
  benefits: {
    title: string;
    desc: string;
  }[];
  form: {
    title: string;
    text: string;
    successTitle: string;
    successText: string;
    labels: {
      name: string;
      email: string;
      phone: string;
      address: string;
      dob: string;
      gender: string;
      experience: string;
      position: string;
      reason: string;
      submit: string;
    };
    options: {
      gender: string[];
      experience: string[];
      position: string[];
    };
  };
}
```

---

### 8. Events Page

```typescript
interface EventsPage {
  hero: {
    title: string;
    text: string;
  };
  upcoming: {
    title: string;
    label: string;
    registerBtn: string;
  };
  past: {
    title: string;
    label: string;
  };
  events: {
    upcoming: {
      title: string;
      date: string;
      time: string;
      location: string;
      description: string;
      status: 'upcoming';
    }[];
    past: {
      title: string;
      date: string;
      location: string;
    }[];
  };
}
```

---

### 9. News Page

```typescript
interface NewsPage {
  hero: {
    title: string;
    text: string;
  };
  featuredLabel: string;
  readMore: string;
  otherNews: string;
  articles: {
    title: string;
    date: string;
    category: string;
    excerpt: string;
    featured: boolean;
    content?: string; // Full article content
    image?: string;
  }[];
}
```

---

### 10. Gallery Page

```typescript
interface GalleryPage {
  hero: {
    title: string;
    text: string;
  };
  categories: string[];
  noImages: string;
  images: {
    category: string;
    title: string;
    src: string;
    alt: string;
  }[];
}
```

---

### 11. Contact Page

```typescript
interface ContactPage {
  hero: {
    title: string;
    text: string;
  };
  info: {
    address: string;
    phone: string;
    email: string;
    registered: string;
  };
  form: {
    title: string;
    fields: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
    };
  };
}
```

---

### 12. Notice Page

```typescript
interface NoticePage {
  hero: {
    title: string;
    text: string;
  };
  cta: {
    title: string;
    text: string;
    buttonText: string;
  };
  notices: {
    title: string;
    date: string;
    category: string;
    content: string;
  }[];
}
```

---

## Django Backend Structure Requirements

### Apps Structure
```
volleyball_cms/
├── settings/
│   ├── __init__.py
│   ├── base.py
│   ├── development.py
│   ├── production.py
│   └── testing.py
├── urls.py
└── wsgi.py

apps/
├── __init__.py
├── core/                    # Base models and utilities
│   ├── __init__.py
│   ├── models.py           # Abstract base models
│   ├── fields.py           # Custom fields
│   ├── managers.py         # Custom managers
│   ├── validators.py       # Validators
│   └── utils.py
├── navigation/              # Navigation management
│   ├── __init__.py
│   ├── models.py
│   ├── admin.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── pages/                   # Page content management
│   ├── __init__.py
│   ├── models.py
│   ├── admin.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── content/                 # General content
│   ├── __init__.py
│   ├── models.py
│   ├── admin.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── media/                   # Media management
│   ├── __init__.py
│   ├── models.py
│   ├── admin.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
└── api/                     # API endpoints
    ├── __init__.py
    ├── v1/
    │   ├── __init__.py
    │   ├── urls.py
    │   └── views.py
    └── v2/
        ├── __init__.py
        ├── urls.py
        └── views.py
```

### Model Requirements

#### Base Models
```python
# core/models.py
class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

class PublishableModel(TimeStampedModel):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    published_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        abstract = True

class MultiLanguageModel(TimeStampedModel):
    LANGUAGE_CHOICES = [
        ('NE', 'Nepali'),
        ('EN', 'English'),
        ('DE', 'German'),
    ]
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='NE')
    
    class Meta:
        abstract = True
```

#### Navigation Models
```python
# navigation/models.py
class NavigationSettings(PublishableModel):
    logo = models.ForeignKey('media.Media', on_delete=models.SET_NULL, null=True)
    brand_name_main = models.CharField(max_length=100)
    brand_name_secondary = models.CharField(max_length=100)
    
    def __str__(self):
        return f"Navigation Settings ({self.language})"

class NavigationItem(MultiLanguageModel):
    order = models.PositiveIntegerField(default=0)
    href = models.CharField(max_length=200)
    label = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
```

#### Page Models
```python
# pages/models.py
class HomePage(PublishableModel, MultiLanguageModel):
    # Hero Section
    hero_video = models.ForeignKey('media.Media', on_delete=models.SET_NULL, null=True, related_name='hero_video')
    hero_title = models.TextField()
    hero_subtitle = models.TextField()
    hero_cta_join = models.CharField(max_length=100)
    hero_cta_learn = models.CharField(max_length=100)
    hero_motto = models.TextField()
    
    # Intro Section
    intro_title = models.CharField(max_length=200)
    intro_text = models.TextField()
    intro_subtext = models.TextField()
    intro_image = models.ForeignKey('media.Media', on_delete=models.SET_NULL, null=True, related_name='intro_image')
    
    # Objectives Section
    objectives_title = models.CharField(max_length=200)
    objectives_mission_label = models.CharField(max_length=100)
    objectives_description = models.TextField()
    objectives_list = models.JSONField(default=list)  # Array of strings
    
    # Stats Section
    stats_members = models.PositiveIntegerField(default=50)
    stats_events = models.PositiveIntegerField(default=25)
    stats_years = models.PositiveIntegerField(default=5)
    stats_awards = models.PositiveIntegerField(default=10)
    
    class Meta:
        verbose_name = "Home Page"
        verbose_name_plural = "Home Pages"

class AboutPage(PublishableModel, MultiLanguageModel):
    # Hero Section
    hero_title = models.CharField(max_length=200)
    hero_text = models.TextField()
    
    # Intro Section
    intro_title = models.CharField(max_length=200)
    intro_main_title = models.CharField(max_length=200)
    intro_main_text1 = models.TextField()
    intro_main_text2 = models.TextField()
    intro_image_caption = models.CharField(max_length=200)
    intro_image = models.ForeignKey('media.Media', on_delete=models.SET_NULL, null=True)
    
    # Vision & Mission
    vision_title = models.CharField(max_length=200)
    vision_text = models.TextField()
    mission_title = models.CharField(max_length=200)
    mission_text = models.TextField()
    
    # Values
    values_title = models.CharField(max_length=200)
    values_list = models.JSONField(default=list)  # Array of {title, desc} objects
    
    # Objectives
    objectives_title = models.CharField(max_length=200)
    objectives_list = models.JSONField(default=list)
    
    # Additional
    since_text = models.CharField(max_length=100)
    intro_title_part1 = models.CharField(max_length=100)
    intro_title_part2 = models.CharField(max_length=100)
    stats_players_label = models.CharField(max_length=50)
    stats_events_label = models.CharField(max_length=50)
    stats_passion_label = models.CharField(max_max=50)
    established_label = models.CharField(max_length=50)
    core_title = models.CharField(max_length=200)
    strategic_title = models.CharField(max_length=200)
    promo_title = models.CharField(max_length=200)
    promo_text = models.TextField()
    
    class Meta:
        verbose_name = "About Page"
        verbose_name_plural = "About Pages"
```

#### Media Models
```python
# media/models.py
class Media(TimeStampedModel):
    file = models.FileField(upload_to='uploads/%Y/%m/')
    title = models.CharField(max_length=200)
    alt_text_ne = models.CharField(max_length=200, blank=True)
    alt_text_en = models.CharField(max_length=200, blank=True)
    alt_text_de = models.CharField(max_length=200, blank=True)
    file_type = models.CharField(max_length=20, choices=[
        ('image', 'Image'),
        ('video', 'Video'),
        ('document', 'Document'),
    ])
    size = models.PositiveIntegerField()
    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    
    def __str__(self):
        return self.title
```

### API Structure

#### Versioned API Endpoints
```
/api/v1/
├── /content/
│   ├── /home/
│   │   ├── GET / (Get home page content)
│   │   ├── PUT / (Update home page content)
│   ├── /about/
│   ├── /committee/
│   ├── /team/
│   ├── /membership/
│   ├── /events/
│   ├── /news/
│   ├── /gallery/
│   ├── /contact/
│   └── /notice/
├── /navigation/
│   ├── GET / (Get navigation)
│   └── PUT / (Update navigation)
├── /media/
│   ├── GET / (List media)
│   ├── POST / (Upload media)
│   └── DELETE /{id}/ (Delete media)
└── /forms/
    ├── POST /membership/ (Submit membership)
    └── POST /contact/ (Submit contact)
```

### Admin Configuration (Jazzmin)

#### Features Required:
- Clean labels and field grouping
- Collapsible sections
- Image preview
- Order fields
- Read-only system fields
- Draft/Publish workflow
- Language completion validation
- Rich text editing (CKEditor)
- Bulk operations

#### Admin Customization:
```python
# pages/admin.py
@admin.register(HomePage)
class HomePageAdmin(JazzminModelAdmin):
    list_display = ['language', 'status', 'updated_at']
    list_filter = ['language', 'status', 'created_at']
    search_fields = ['hero_title', 'intro_title']
    
    fieldsets = (
        ('Hero Section', {
            'fields': ('hero_video', 'hero_title', 'hero_subtitle', 'hero_cta_join', 'hero_cta_learn', 'hero_motto'),
            'classes': ('collapse',),
        }),
        ('Intro Section', {
            'fields': ('intro_title', 'intro_text', 'intro_subtext', 'intro_image'),
            'classes': ('collapse',),
        }),
        ('Objectives Section', {
            'fields': ('objectives_title', 'objectives_mission_label', 'objectives_description', 'objectives_list'),
            'classes': ('collapse',),
        }),
        ('Stats Section', {
            'fields': ('stats_members', 'stats_events', 'stats_years', 'stats_awards'),
            'classes': ('collapse',),
        }),
        ('Publishing', {
            'fields': ('status', 'published_at'),
            'classes': ('collapse',),
        }),
    )
```

### Caching Strategy (Redis)

#### Cache Keys Structure:
```
volleyball:content:home:{language}
volleyball:content:about:{language}
volleyball:content:committee:{language}
volleyball:content:team:{language}
volleyball:content:membership:{language}
volleyball:content:events:{language}
volleyball:content:news:{language}
volleyball:content:gallery:{language}
volleyball:content:contact:{language}
volleyball:content:notice:{language}
volleyball:navigation:{language}
volleyball:media:{id}
```

#### Cache Invalidation:
- Automatic on model save/delete
- Manual cache clear in admin
- Version-based cache busting

### Production Requirements

#### Security:
- CSRF protection
- XSS protection
- SQL injection protection
- Secure file uploads
- Rate limiting
- Authentication/authorization

#### Performance:
- Database optimization
- Redis caching
- CDN for media
- Gzip compression
- Lazy loading

#### Monitoring:
- Error tracking
- Performance monitoring
- Cache hit rates
- API response times

### SEO Requirements

#### Meta Tags Support:
```python
class SEOFields(models.Model):
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    meta_keywords = models.CharField(max_length=500, blank=True)
    og_title = models.CharField(max_length=200, blank=True)
    og_description = models.TextField(blank=True)
    og_image = models.ForeignKey('media.Media', on_delete=models.SET_NULL, null=True, blank=True)
    canonical_url = models.URLField(blank=True)
    
    class Meta:
        abstract = True
```

### Validation Rules

#### Language Completion:
- Cannot publish if any language is incomplete
- Warning indicators for missing translations
- Required field validation per language

#### Content Validation:
- Image alt text required for accessibility
- URL format validation
- Email format validation
- Phone number format validation

### Deployment Structure

#### Environment Variables:
```
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/dbname
REDIS_URL=redis://localhost:6379/0
ALLOWED_HOSTS=yourdomain.com
STATIC_URL=/static/
MEDIA_URL=/media/
```

#### Static/Media Handling:
- Whitenoise for static files
- S3/CloudFront for media in production
- Local storage in development

---

## Implementation Priority

### Phase 1: Core Structure
1. Set up Django project with apps
2. Create base models and utilities
3. Set up Jazzmin admin
4. Create basic API structure

### Phase 2: Content Models
1. Implement navigation models
2. Create page content models
3. Set up media management
4. Add multi-language support

### Phase 3: API & Frontend Integration
1. Build API endpoints
2. Implement caching
3. Add validation rules
4. Create admin interface

### Phase 4: Production Features
1. Add SEO fields
2. Implement security measures
3. Set up monitoring
4. Optimize performance

---

## Testing Requirements

### Unit Tests:
- Model validation
- API endpoints
- Business logic
- Cache operations

### Integration Tests:
- Frontend-backend integration
- Multi-language functionality
- File uploads
- Form submissions

### Performance Tests:
- Load testing
- Cache performance
- Database query optimization

---

This documentation serves as the complete specification for building the Django CMS backend that will perfectly mirror the Nepal Volleyball Club Hamburg frontend structure while maintaining all functionality, styling, and multi-language support requirements.
