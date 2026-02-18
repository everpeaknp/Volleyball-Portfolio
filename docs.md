Deep Technical Requirements: Volleyball Django CMS
This document provides a microscopic breakdown of every frontend component and page. The goal is 100% fidelity mirroring of the Next.js frontend in the Django CMS.

🌎 Global System Controls
These settings control the absolute "look and feel" of the site.

🎨 Visual Identity Tokens
Brand Identity:
brand_name: Trilingual (e.g., "Nepal Volleyball Club Hamburg e.V.")
brand_subtitle: Trilingual (e.g., "खेलकुदमार्फत नेपाली समुदायलाई एकताबद्ध गर्दै")
brand_logo: Image (PNG/SVG)
Primary Palette:
crimson_main (#DC143C): Hex Control
crimson_hover (#c41230): Hex Control
crimson_light (#fee2e2): Hex Control (Backgrounds)
Secondary Palette:
blue_main (#003893): Hex Control
blue_dark (#00307d): Hex Control
Patterns & Borders:
hero_overlay_opacity: Slider (0.1 to 1.0)
nepal_pattern_opacity: Slider (0.01 to 0.2)
v_ball_pattern_opacity: Slider (0.01 to 0.1)
accent_border_width: Integer (Default 4px)
🧭 Navigational Components
Navbar
Nav Links: List of { Label (Trilingual), Link, Order }
Language Options: Fixed set { "NE", "EN", "DE" }
Flags: Configurable Emoji or Icon per language.
Footer
Brand Bio: Trilingual TextArea (CKEditor support).
Social Grid: List of { Platform Name, Icon (Lucide), URL }.
Column 1 (Quick Links): Title (Trilingual), List of { Label, Link }.
Column 2 (Contact): Title (Trilingual), Address (Plain text), Phone (Linkable), Email (Linkable).
Column 3 (CTA): Title (Trilingual), Text (Trilingual), Button Label (Trilingual), Button Link.
Copyright Row: established_year, legal_text (Trilingual).
📄 Page-by-Page Micro-Specs (Trilingual)
1. Home Page (Index)
Hero Section:
video_bg: File (mp4/webp)
main_title: Trilingual (Large font, drop shadow)
subtitle: Trilingual (Medium font, white/90)
cta_join_label: Trilingual (Crimson button)
cta_learn_label: Trilingual (Glass button)
scroll_indicator_icon: Lucide (Default: ChevronDown)
Intro Section:
floating_label: Trilingual (e.g., "About Us") -> Small, Crimson, Uppercase
title: Trilingual
body_text: Trilingual
italic_quote: Trilingual (Left border: 4px crimson)
composition_image: Image
decorative_blob_colors: Hex 1, Hex 2
Objectives Swiper:
section_label: Trilingual (e.g., "OUR MISSION") -> Tracking-widest
section_title: Trilingual
sub_description: Trilingual (e.g., "Swipe to explore...")
objective_cards: List of { 
text
: Trilingual, image: Image (background), badge_number: String (e.g., "01"), goal_label: Trilingual (e.g., "Goal"), read_more_text: Trilingual (e.g., "Read More") -> Only visible on hover }
Motto / Conversion:
motto_icon: Lucide (Trophy)
motto_quoted_text: Trilingual
contact_btn_label: Trilingual
Live Stats: 4 Items: { label: Trilingual, value: Int, suffix: String (e.g., "+") }
2. About Us
Hero: Title, Text, BG Image, since_text (Trilingual badge).
Intro Grid:
title_part_1: Trilingual (Normal)
title_part_2: Trilingual (Gradient color)
main_text_group: { Text 1 (Bold block), Text 2 (Regular block) }
stats_group: { Players, Events, Passion } Labels/Values.
Visuals:
main_rounded_image: Large aspect ratio.
hover_overlay_opacity: Default 60%.
floating_badge_text: Trilingual (e.g., "Established 2020").
Core Values:
vision_card: { Title, Text, Icon }
mission_card: { Title, Text, Icon }
Goals Table: Trilingual Section Title, List of Goals.
3. Committee
Executive Board:
List of { Name, Role (Trilingual), Bio (Trilingual), Email, Image }.
Hover: Scale 110%, primary-500/20 overlay.
General Assembly:
Section Title (Trilingual).
List of Strings (Names).
Role Label for all (Trilingual: "Member").
4. Team (Coaches & Players)
Hero: Standard Trilingual + Grayscale Overlay Image.
Coach Section: Label, Title, List { Name, Role, Exp, Image }.
Player Section: Label, Title, List { Name, Position, Number, Image }.
Official Team Photo:
year_heading: Trilingual (e.g., "Official Team Photo 2026").
photo_caption: Trilingual.
full_width_photo: High resolution.
CTA: join_title, join_text, join_btn_label.
5. Membership
Hero: Standard.
Benefts Grid: 3 Items minimum: { Title, Desc, Icon }.
Registration Form:
form_mini_label: Trilingual (e.g., "Form").
form_title, form_text.
success_feedback: { Title, Text, Icon (CheckCircle) }.
labels_master: JSON object for all input fields (Name, Email, Phone, Address, DOB, Gender, Experience, Position, Reason, Submit Button).
6. Events
Hero: High-action grayscale background.
Upcoming List:
label: Trilingual (e.g., "UPCOMING").
section_title.
cards: List of { Title, Date, Time, Location, Desc, Image, Register_btn_label }.
Style: Left border (4px crimson) on headers.
Past List:
label: Trilingual (e.g., "PAST").
cards: List of { Title, Date (Short), Location, Image }.
Style: Grayscale cards, 80% opacity on images.
7. News (Articles)
Hero: "Latest News" standard.
Featured Post:
Title, Excerpt, Date, "Read More" Label, Large Image.
Regular Grid:
List of { Title, Category, Excerpt, Date, Image }.
Labels: featured_badge_text, other_news_title, read_more_cta.
8. Gallery
Hero: High-res stadium shot.
Categorization:
Trilingual List of categories (e.g., "All", "Tournament", "Practice").
Active category style: Primary-500 background + shadow.
Image Cloud:
List of { Image File, Title, Category }.
Hover: ZoomIn icon + Backdrop blur overlay.
Labels: no_images_found_text.
9. Contact
Hero: "Contact Us" standard.
Info Blocks: Labels/Icons for Address, Phone, Email.
Social Grid: Large icons for Facebook, Instagram, Twitter.
Interactive Form:
form_title.
labels: Name, Email, Subject, Message.
submit_btn_label: Trilingual (e.g., "Send").
10. Notices (Internal/Noticeboard)
Hero: Gradient-to-br from gray-900 to gray-800.
List Items:
List { Title, Category, Date, Content (Text-only snippet) }.
Bell Icon Style: Primary-100 bg, primary-500 icon.
CTA: footer_cta_title, footer_cta_text, footer_cta_btn.
🛠️ CMS Global Logic
Trilingual Guard: Publish button is disabled if _ne, _en, or _de fields are null/empty for required items.
Icon Picker: Restrict to Lucide library for consistent SVG rendering.
Media Management: Automatic webp conversion on upload for performance.
Admin Layout: Group fields by language tabs to prevent scrolling fatigue.
SEO Rules: Every page detail must include trilingual Meta Title and Meta Description (max chars enforced: 60/160).