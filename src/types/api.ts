export interface GlobalStylesData {
  primary_500: string;
  primary_600: string;
  secondary_500: string;
  accent_500: string;
  brand_name_ne: string;
  brand_name_en: string;
  brand_name_de: string;
  brand_subtitle_ne: string;
  brand_subtitle_en: string;
  brand_subtitle_de: string;
  enable_nepal_pattern: boolean;
  enable_volleyball_pattern: boolean;
}

export interface NavigationItemData {
  id: number;
  label_ne: string;
  label_en: string;
  label_de: string;
  href: string;
  order: number;
  is_active: boolean;
}

export interface HeroSection {
  hero_title_ne: string;
  hero_title_en: string;
  hero_title_de: string;
  hero_subtitle_ne: string;
  hero_subtitle_en: string;
  hero_subtitle_de: string;
  hero_cta_join_label_ne: string;
  hero_cta_join_label_en: string;
  hero_cta_join_label_de: string;
  hero_cta_learn_label_ne: string;
  hero_cta_learn_label_en: string;
  hero_cta_learn_label_de: string;
  hero_motto_ne: string;
  hero_motto_en: string;
  hero_motto_de: string;
  hero_video: { file: string } | null;
}

export interface IntroSection {
  intro_title_ne: string;
  intro_title_en: string;
  intro_title_de: string;
  intro_text_ne: string;
  intro_text_en: string;
  intro_text_de: string;
  intro_subtext_ne: string;
  intro_subtext_en: string;
  intro_subtext_de: string;
  intro_image: { file: string } | null;
}

export interface ObjectivesSection {
  objectives_title_ne: string;
  objectives_title_en: string;
  objectives_title_de: string;
  objectives_list: string[]; // This might need adjustment if backend sends object list
}

export interface StatsSection {
  stats_members_value: number;
  stats_events_value: number;
  stats_years_value: number;
  stats_awards_value: number;
}

export type HomePageData = HeroSection & IntroSection & ObjectivesSection & StatsSection;
