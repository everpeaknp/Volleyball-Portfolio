import { notFound } from 'next/navigation';
import { getNavigationItems, getNavigationSettings, getFooterSettings } from '@/lib/api';
import { mapNavigationData, mapFooterData } from '@/lib/mappers';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Language = 'NE' | 'EN' | 'DE'

const validLanguages: Language[] = ['NE', 'EN', 'DE'];

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const langCode = params.lang.toUpperCase() as Language;
  
  if (!validLanguages.includes(langCode)) {
    notFound();
  }

  // Fetch navigation and footer data server-side
  let navData = null;
  let footerData = null;
  
  try {
    const [navItems, navSettings, footerSettings] = await Promise.all([
      getNavigationItems(),
      getNavigationSettings(),
      getFooterSettings(),
    ]);
    
    navData = mapNavigationData(navItems || [], navSettings, langCode);
    footerData = mapFooterData(footerSettings, langCode);
  } catch (error) {
    console.error('Failed to load navigation/footer data:', error);
    // Components will use fallback data
  }

  return (
    <>
      <Navbar language={langCode} navData={navData} />
      {children}
      <Footer language={langCode} footerData={footerData} />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { lang: 'ne' },
    { lang: 'en' },
    { lang: 'de' }
  ];
}