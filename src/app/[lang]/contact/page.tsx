import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Language } from '@/types/api';
import { getContactPage } from '@/lib/api';
import { mapContactPageData } from '@/lib/mappers';
import { content } from '@/data/content';
import ContactForm from '@/components/ContactForm';
import type { Metadata } from 'next';

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

const validLanguages: Language[] = ['NE', 'EN', 'DE'];

export async function generateStaticParams() {
  return [
    { lang: 'ne' },
    { lang: 'en' },
    { lang: 'de' }
  ];
}

export const revalidate = 3600; // ISR: Revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const langCode = params.lang.toUpperCase() as Language;
  
  if (!validLanguages.includes(langCode)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    };
  }

  try {
    const apiData = await getContactPage();
    const data = mapContactPageData(apiData, langCode);
    
    const suffix = langCode.toLowerCase();
    const metaTitle = apiData?.[0]?.[`meta_title_${suffix}`] || 
                     (langCode === 'NE' ? 'सम्पर्क - नेपाल भलिबल क्लब हामबर्ग' : 
                      langCode === 'DE' ? 'Kontakt - Nepal Volleyball Club Hamburg' : 
                      'Contact - Nepal Volleyball Club Hamburg');
    
    const metaDesc = apiData?.[0]?.[`meta_description_${suffix}`] || 
                     (langCode === 'NE' ? 'हामीसँग सम्पर्क गर्नुहोस्। नेपाल भलिबल क्लब हामबर्ग।' :
                      langCode === 'DE' ? 'Kontaktieren Sie uns. Nepal Volleyball Club Hamburg.' :
                      'Contact us. Nepal Volleyball Club Hamburg.');

    return {
      title: metaTitle,
      description: metaDesc,
      openGraph: {
        title: metaTitle,
        description: metaDesc,
        images: apiData?.[0]?.og_image_url ? [apiData[0].og_image_url] : undefined,
      },
    };
  } catch (error) {
    // Fallback metadata
    return {
      title: langCode === 'NE' ? 'सम्पर्क' : langCode === 'DE' ? 'Kontakt' : 'Contact',
      description: langCode === 'NE' ? 'हामीसँग सम्पर्क गर्नुहोस्' : langCode === 'DE' ? 'Kontaktieren Sie uns' : 'Contact us',
    };
  }
}

export default async function ContactPage({
  params,
}: {
  params: { lang: string };
}) {
  const langCode = params.lang.toUpperCase() as Language;
  
  if (!validLanguages.includes(langCode)) {
    notFound();
  }

  // Server-side data fetching for ISR
  let data;
  try {
    const apiData = await getContactPage();
    data = mapContactPageData(apiData, langCode);
  } catch (error) {
    console.error('Error loading contact data:', error);
    data = {
      ...content[langCode],
      contactPage: {
        heroSubtitle: langCode === 'NE' ? 'हामीसँग सम्पर्क गर्नुहोस्' : langCode === 'DE' ? 'Kontaktieren Sie uns' : 'Get in touch with us',
        heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80',
        infoSectionTitle: langCode === 'NE' ? 'सम्पर्क जानकारी' : langCode === 'DE' ? 'Kontaktinformationen' : 'Contact Information',
        socialSectionTitle: langCode === 'NE' ? 'सामाजिक सञ्जाल' : langCode === 'DE' ? 'Soziale Medien' : 'Social Media',
        formTitle: langCode === 'NE' ? 'सन्देश पठाउनुहोस्' : langCode === 'DE' ? 'Nachricht senden' : 'Send Message',
        infoList: [
          { icon: 'MapPin', label: langCode === 'NE' ? 'ठेगाना' : langCode === 'DE' ? 'Adresse' : 'Address', value: content[langCode].contact.address },
          { icon: 'Phone', label: langCode === 'NE' ? 'फोन' : langCode === 'DE' ? 'Telefon' : 'Phone', value: content[langCode].contact.phone },
          { icon: 'Mail', label: langCode === 'NE' ? 'इमेल' : langCode === 'DE' ? 'E-Mail' : 'Email', value: content[langCode].contact.email },
        ],
        socialLinks: [
          { platform: 'Facebook', url: '#', icon: 'Facebook' },
          { platform: 'Instagram', url: '#', icon: 'Instagram' },
          { platform: 'Twitter', url: '#', icon: 'Twitter' },
        ],
        labels: {
          name: content[langCode].membershipPage.labels.name,
          email: content[langCode].membershipPage.labels.email,
          subject: langCode === 'NE' ? 'विषय' : langCode === 'DE' ? 'Betreff' : 'Subject',
          message: langCode === 'NE' ? 'सन्देश' : langCode === 'DE' ? 'Nachricht' : 'Message',
          submit: langCode === 'NE' ? 'पठाउनुहोस्' : langCode === 'DE' ? 'Senden' : 'Send',
        }
      }
    };
  }

  const contactInfo = data.contact;
  const cp = data.contactPage;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-32 bg-gray-950 text-white relative overflow-hidden">
         <div className="absolute inset-0">
            <Image 
               src={cp.heroImage} 
               alt="Contact Us" 
               fill
               className="object-cover opacity-30 grayscale"
               priority
               sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950"></div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         </div>
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg animate-fade-in">
              {contactInfo.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light animate-slide-up">
              {cp.heroSubtitle}
            </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                 {cp.infoSectionTitle}
              </h2>
              <div className="space-y-8">
                {cp.infoList.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <DynamicIcon name={item.icon} className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {item.label}
                      </h3>
                      <p className="text-gray-600 break-all">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              {cp.socialLinks.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {cp.socialSectionTitle}
                  </h3>
                  <div className="flex gap-4">
                    {cp.socialLinks.map((social: any, idx: number) => (
                      <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 hover:bg-primary-500 hover:text-white rounded-full flex items-center justify-center transition-all">
                        <DynamicIcon name={social.icon} className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form - Client Component */}
            <ContactForm labels={cp.labels} formTitle={cp.formTitle} />
          </div>
        </div>
      </section>
    </>
  );
}