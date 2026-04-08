'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  Sparkles,
  Zap,
  Activity,
  MessageSquare,
  Settings,
  Menu,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Production SI nav items
// ---------------------------------------------------------------------------

interface ProductionNavItem {
  label: string;
  subtitle: string;
  color: string;
  viewBox: string;
  path: string;
  href: string;
}

const productionItems: ProductionNavItem[] = [
  {
    label: 'Dashboard',
    subtitle: 'Summary overview',
    color: '#a6ced4',
    viewBox: '0 0 512 512',
    path: 'M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 96c35.3 0 64-28.7 64-64c0-29.8-20.4-54.9-48-62l0-194c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 194c-27.6 7.1-48 32.2-48 62c0 35.3 28.7 64 64 64zM144 168a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm-24 88a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm296 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM392 144a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z',
    href: '#',
  },
  {
    label: 'Sales',
    subtitle: 'Trends, orders & returns',
    color: '#a6cb90',
    viewBox: '0 0 640 512',
    path: 'M64 16C64 7.2 71.2 0 80 0h37.9c20.6 0 38.6 13 45.3 32H603.5c20.8 0 36.1 19.6 31 39.8L592.6 239.5C585.5 268 559.9 288 530.5 288H216l7.9 38.4c3 14.9 16.1 25.6 31.4 25.6H560c8.8 0 16 7.2 16 16s-7.2 16-16 16H255.2c-30.4 0-56.6-21.4-62.7-51.2l-58.9-288C132 37.3 125.5 32 117.9 32H80c-8.8 0-16-7.2-16-16zM530.5 256c14.7 0 27.5-10 31-24.2L603.5 64H170.1l39.3 192H530.5zM256 480a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0-80a56 56 0 1 1 0 112 56 56 0 1 1 0-112zm280 56a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm-80 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM16 128h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H128c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H144c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16z',
    href: '#',
  },
  {
    label: 'Products',
    subtitle: 'ROI, inventory value, COGS',
    color: '#f5c6cb',
    viewBox: '0 0 640 512',
    path: 'M256 32c53 0 96 43 96 96c0 8.8 7.2 16 16 16s16-7.2 16-16C384 57.3 326.7 0 256 0S128 57.3 128 128c0 8.8 7.2 16 16 16s16-7.2 16-16c0-53 43-96 96-96zM80.4 161.5c-14.1-1.6-27.5 6.2-33.1 19.2l-32 74.7C5.4 278.2 18.7 304.4 43 310l159.2 36.7c18.9 4.4 38.6-3.1 49.9-18.9L320 232.9l67.9 95.1c11.3 15.8 31 23.2 49.9 18.9L597 310c24.3-5.6 37.6-31.8 27.8-54.7l-32-74.7c-5.6-13-19-20.8-33.1-19.2L320 189.2 80.4 161.5zm-3.7 31.8l214.5 24.8-65.1 91.2c-3.8 5.3-10.3 7.7-16.6 6.3L50.2 278.9c-4.9-1.1-7.5-6.4-5.6-10.9l32-74.7zM544 348.7v61.8c0 7.3-5 13.7-12.1 15.5L336 475V336c0-8.8-7.2-16-16-16s-16 7.2-16 16V475L108.1 426C101 424.3 96 417.9 96 410.5V348.7l-32-9.1v71c0 22 15 41.2 36.4 46.6l208 52c7.6 1.9 15.6 1.9 23.3 0l208-52c21.4-5.3 36.4-24.5 36.4-46.6v-71l-32 9.1zM348.8 218.1l214.5-24.8 32 74.7c2 4.6-.7 9.8-5.6 10.9L430.6 315.6c-6.3 1.5-12.9-1-16.6-6.3l-65.1-91.2zm146.4-181c2.8-8.4-1.7-17.4-10.1-20.2s-17.4 1.7-20.2 10.1l-32 96c-2.8 8.4 1.7 17.4 10.1 20.2s17.4-1.7 20.2-10.1l32-96z',
    href: '#',
  },
  {
    label: 'Restock Forecasting',
    subtitle: 'Inventory restock management',
    color: '#ffeeba',
    viewBox: '0 0 640 512',
    path: 'M128 32H352c17.7 0 32 14.3 32 32V384H250.5c-13.2-37.3-48.7-64-90.5-64c-24.6 0-47 9.2-64 24.4V288H64v96 32c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H608V235.8c0-11.5-4.1-22.5-11.6-31.2l-78.7-91.8C508.6 102.1 495.3 96 481.3 96H416V64c0-35.3-28.7-64-64-64H128C92.7 0 64 28.7 64 64V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H240c8.8 0 16-7.2 16-16s-7.2-16-16-16H96V64c0-17.7 14.3-32 32-32zM570.9 224H416V128h65.3c4.7 0 9.1 2 12.1 5.6L570.9 224zM416 256H576V384h-5.5c-13.2-37.3-48.7-64-90.5-64c-24.6 0-47 9.2-64 24.4V256zM96 416a64 64 0 1 1 128 0A64 64 0 1 1 96 416zm384-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM48 160c-8.8 0-16 7.2-16 16s7.2 16 16 16H272c8.8 0 16-7.2 16-16s-7.2-16-16-16H48zM16 224c-8.8 0-16 7.2-16 16s7.2 16 16 16H240c8.8 0 16-7.2 16-16s-7.2-16-16-16H16z',
    href: '#',
  },
  {
    label: 'Keyword Ranking',
    subtitle: 'Keyword rank tracker',
    color: '#ee9aa2',
    viewBox: '0 0 640 512',
    path: 'M300.5 77.2l-3.7 7.5-8.3 1.2L245 92.2 276.6 123l6 5.9-1.4 8.3-7.4 43.3 39-20.6 7.4-3.9 7.5 3.9 38.7 20.3-7.4-43.3-1.4-8.3 6.1-5.9 31.4-30.3-43.4-6.3-8.3-1.2-3.7-7.5L320 37.8 300.5 77.2zm-5-62c10.3-20.6 39.4-19.9 49.1 .1l19.9 40.2 44 6.3 .2 0 0 0c22.1 3.4 31.5 30.6 15.3 46.9l-.2 .2 0 0-31.9 30.8 7.5 43.7 0 .3 0 0c3.4 22-19.5 39.1-39.8 28.9l-.3-.1 0 0L320.2 192l-39.5 20.9-.3 .2 0 0c-20.3 10.2-43.2-6.9-39.8-28.9l0-.3 0 0 7.5-43.8-31.9-31.1-.2-.2 0 0c-16.2-16.2-6.7-43.5 15.3-46.9l.2 0 0 0 44-6.3 19.9-40.2 0 0zM192 368v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48zm224 64v32c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V368 304c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48V432zM256 304V464c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16zM32 368v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16zm448 64v32c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V432c0-8.8-7.2-16-16-16H496c-8.8 0-16 7.2-16 16zm16-48h96c26.5 0 48 21.5 48 48v32c0 26.5-21.5 48-48 48H496c-26.5 0-48-21.5-48-48V432c0-26.5 21.5-48 48-48z',
    href: '#',
  },
  {
    label: 'Ads Insights',
    subtitle: 'Performance & actionable insights',
    color: '#b387f9',
    viewBox: '0 0 640 512',
    path: 'M55.2 1.7c-7.9-4-17.5-.7-21.5 7.2s-.7 17.5 7.2 21.5l64 32c7.9 4 17.5 .7 21.5-7.2s.7-17.5-7.2-21.5l-64-32zm544 28.6c7.9-4 11.1-13.6 7.2-21.5s-13.6-11.1-21.5-7.2l-64 32c-7.9 4-11.1 13.6-7.2 21.5s13.6 11.1 21.5 7.2l64-32zM16 160c-8.8 0-16 7.2-16 16s7.2 16 16 16H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H16zm544 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H560zM119.2 318.3c7.9-4 11.1-13.6 7.2-21.5s-13.6-11.1-21.5-7.2l-64 32c-7.9 4-11.1 13.6-7.2 21.5s13.6 11.1 21.5 7.2l64-32zm416-28.6c-7.9-4-17.5-.7-21.5 7.2s-.7 17.5 7.2 21.5l64 32c7.9 4 17.5 .7 21.5-7.2s.7-17.5-7.2-21.5l-64-32zM464 176c0 30.6-9.5 58.8-25.7 82.1c-4.1 5.9-8.7 12.3-13.6 19c-12.7 17.5-27.1 37.2-38 57.1c-8.9 16.2-13.7 33.3-16.2 49.9H403c2.2-12 5.9-23.7 11.8-34.5c9.9-18 22.2-34.9 34.5-51.8l0 0 0 0 0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C496 78.8 417.2 0 320 0S144 78.8 144 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0 0 0 0 0c12.3 16.8 24.6 33.7 34.5 51.8c5.9 10.8 9.6 22.5 11.8 34.5h32.4c-2.5-16.6-7.3-33.7-16.2-49.9c-10.9-20-25.3-39.7-38-57.1l0 0c-4.9-6.7-9.5-13-13.6-19C185.5 234.8 176 206.6 176 176c0-79.5 64.5-144 144-144s144 64.5 144 144zm-224 0c0-44.2 35.8-80 80-80c8.8 0 16-7.2 16-16s-7.2-16-16-16c-61.9 0-112 50.1-112 112c0 8.8 7.2 16 16 16s16-7.2 16-16zm80 304c-20.9 0-38.7-13.4-45.3-32h90.5c-6.6 18.6-24.4 32-45.3 32zm-80-53.3V432c0 44.2 35.8 80 80 80s80-35.8 80-80v-5.3c0-5.9-4.8-10.7-10.7-10.7H250.7c-5.9 0-10.7 4.8-10.7 10.7z',
    href: '#',
  },
  {
    label: 'Automation',
    subtitle: 'Automate ads optimisation',
    color: '#92e5ff',
    viewBox: '0 0 640 512',
    path: 'M320 0c8.8 0 16 7.2 16 16V96H448c53 0 96 43 96 96V416c0 53-43 96-96 96H192c-53 0-96-43-96-96V192c0-53 43-96 96-96H304V16c0-8.8 7.2-16 16-16zM192 128c-35.3 0-64 28.7-64 64V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H320 192zm16 256h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H208c-8.8 0-16-7.2-16-16s7.2-16 16-16zm96 0h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H304c-8.8 0-16-7.2-16-16s7.2-16 16-16zm96 0h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H400c-8.8 0-16-7.2-16-16s7.2-16 16-16zM224 224a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a64 64 0 1 1 -128 0 64 64 0 1 1 128 0zm96 0a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm32 64a64 64 0 1 1 0-128 64 64 0 1 1 0 128zM48 224H64v32H48c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16H64v32H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zM592 384c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H576V224h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V384h16z',
    href: '#',
  },
  {
    label: 'Mass Campaigns',
    subtitle: 'Create bulk campaigns',
    color: '#ffa772',
    viewBox: '0 0 512 512',
    path: 'M512 256.01c0-9.98-5.81-18.94-14.77-22.81l-99.74-43.27 99.7-43.26c9-3.89 14.81-12.84 14.81-22.81s-5.81-18.92-14.77-22.79L271.94 3.33c-10.1-4.44-21.71-4.45-31.87-.02L14.81 101.06C5.81 104.95 0 113.9 0 123.87s5.81 18.92 14.77 22.79l99.73 43.28-99.7 43.26C5.81 237.08 0 246.03 0 256.01c0 9.97 5.81 18.92 14.77 22.79l99.72 43.26-99.69 43.25C5.81 369.21 0 378.16 0 388.14c0 9.97 5.81 18.92 14.77 22.79l225.32 97.76a40.066 40.066 0 0 0 15.9 3.31c5.42 0 10.84-1.1 15.9-3.31l225.29-97.74c9-3.89 14.81-12.84 14.81-22.81 0-9.98-5.81-18.94-14.77-22.81l-99.72-43.26 99.69-43.25c9-3.89 14.81-12.84 14.81-22.81zM45.23 123.87l208.03-90.26.03-.02c1.74-.71 3.65-.76 5.45.02l208.03 90.26-208.03 90.27c-1.81.77-3.74.77-5.48 0L45.23 123.87zm421.54 264.27L258.74 478.4c-1.81.77-3.74.77-5.48 0L45.23 388.13l110.76-48.06 84.11 36.49a40.066 40.066 0 0 0 15.9 3.31c5.42 0 10.84-1.1 15.9-3.31l84.11-36.49 110.76 48.07zm-208.03-41.87c-1.81.77-3.74.77-5.48 0L45.23 256 156 207.94l84.1 36.5a40.066 40.066 0 0 0 15.9 3.31c5.42 0 10.84-1.1 15.9-3.31l84.1-36.49 110.77 48.07-208.03 90.25z',
    href: '#',
  },
  {
    label: 'Strategy Experts',
    subtitle: 'Video strategies from experts',
    color: '#bcecbb',
    viewBox: '0 0 640 512',
    path: 'M307.2 66.2L47.6 160l74 26.7c10.3-6.9 21.5-12.6 33.4-17.1l159.4-59.8c8.3-3.1 17.5 1.1 20.6 9.4s-1.1 17.5-9.4 20.6L166.2 199.6c-1.5 .5-2.9 1.1-4.3 1.7l145.3 52.5c4.1 1.5 8.4 2.2 12.8 2.2s8.7-.8 12.8-2.2L592.4 160 332.8 66.2c-4.1-1.5-8.4-2.2-12.8-2.2s-8.7 .8-12.8 2.2zM296.3 283.9L126.9 222.7C99.4 246 82.1 279.9 80.2 316.9c5.9 13.2 10.2 27.5 13.4 41.5c6.4 27.6 10.7 65.9 2.1 108.7c-.9 4.3-3.4 8-7.1 10.4s-8.2 3.1-12.4 2l-64-16c-5.2-1.3-9.4-5.1-11.2-10.2s-.9-10.7 2.3-14.9c8.6-11.7 16-24.6 22.5-37.6C37.2 377.8 48 348.4 48 320c0-.6 0-1.2 .1-1.8c1.4-41 18-79.1 45.1-107.7L15.8 182.6C6.3 179.1 0 170.1 0 160s6.3-19.1 15.8-22.6L296.3 36.1c7.6-2.7 15.6-4.1 23.7-4.1s16.1 1.4 23.7 4.1L624.2 137.4c9.5 3.4 15.8 12.5 15.8 22.6s-6.3 19.1-15.8 22.6L343.7 283.9c-7.6 2.7-15.6 4.1-23.7 4.1s-16.1-1.4-23.7-4.1zm-122-10L160.4 406.3c.7 .8 1.8 2.1 3.7 3.7c6 5.2 16.5 11.5 31.9 17.5C226.4 439.4 270.3 448 320 448s93.6-8.6 124.1-20.6c15.4-6 25.8-12.3 31.9-17.5c1.9-1.6 3-2.8 3.7-3.7L465.7 273.8l31-11.2L512 408c0 35.3-86 72-192 72s-192-36.7-192-72l15.3-145.4 31 11.2zM480.5 405a.2 .2 0 1 0 -.3-.1 .2 .2 0 1 0 .3 .1zm-321 0a.1 .1 0 1 0 .2 0 .1 .1 0 1 0 -.2 0zM67 444.2c2.5-20.7 1.7-40-.5-56.7c-3.8 10-8 19.3-12.1 27.6c-3.8 7.6-7.9 15.2-12.5 22.8L67 444.2z',
    href: '#',
  },
];

// ---------------------------------------------------------------------------
// Scale Pilot nav items
// ---------------------------------------------------------------------------

interface PilotNavItem {
  label: string;
  subtitle: string;
  color: string;
  icon: React.ElementType;
  href: string;
}

const pilotItems: PilotNavItem[] = [
  { label: 'Scale Pilot', subtitle: 'AI PPC agent', color: '#45a19c', icon: Sparkles, href: '/' },
  { label: 'Scale Optimizer', subtitle: 'Review recommendations', color: '#45a19c', icon: Zap, href: '/optimizer' },
  { label: 'Activity', subtitle: 'Action log & KPI tracking', color: '#45a19c', icon: Activity, href: '/activity' },
  { label: 'Chat', subtitle: 'Ask Scale Pilot', color: '#45a19c', icon: MessageSquare, href: '/chat' },
  { label: 'Settings', subtitle: 'Configure Scale Pilot', color: '#6c757d', icon: Settings, href: '/settings' },
];

// ---------------------------------------------------------------------------
// SI Logo — matches the actual Scale Insights logo from the production portal
// White circle with 3 ascending bars and an upward arrow
// ---------------------------------------------------------------------------

function SILogo({ size = 32 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/si-logo.png" alt="Scale Insights" width={size} height={size} className="rounded-full" />
  );
}

// ---------------------------------------------------------------------------
// Sidebar Component with slide-out hover behavior
// ---------------------------------------------------------------------------

const COLLAPSED_WIDTH = 56;
const EXPANDED_WIDTH = 260;

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const isPilotActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay when expanded */}
      {expanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setExpanded(false)}
        />
      )}

      <aside
        className="fixed left-0 top-0 h-screen flex flex-col z-50 transition-all duration-200 ease-in-out overflow-hidden"
        style={{
          width: expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
          backgroundColor: '#151c29',
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Header: hamburger + logo + title */}
        <div className="flex items-center gap-3 px-3 shrink-0" style={{ height: 56 }}>
          <div className="flex items-center justify-center shrink-0" style={{ width: 32 }}>
            {expanded ? (
              <Menu size={20} className="text-[#adb5bd]" />
            ) : (
              <SILogo size={32} />
            )}
          </div>
          {expanded && (
            <div className="flex items-center gap-2.5 min-w-0">
              <SILogo size={34} />
              <span className="text-white font-semibold text-[15px] whitespace-nowrap">Scale Insights</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col w-full overflow-y-auto overflow-x-hidden">
          {/* Production SI items */}
          {productionItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center w-full cursor-default transition-colors hover:bg-white/5 shrink-0"
              style={{ height: 56, color: item.color }}
            >
              <div className="flex items-center justify-center shrink-0" style={{ width: COLLAPSED_WIDTH }}>
                <svg viewBox={item.viewBox} width="20" height="20" fill="currentColor">
                  <path d={item.path} />
                </svg>
              </div>
              {expanded && (
                <div className="min-w-0 pr-3">
                  <div className="text-white text-[14px] font-medium leading-tight truncate">{item.label}</div>
                  <div className="text-[#8b95a5] text-[11px] leading-tight truncate">{item.subtitle}</div>
                </div>
              )}
            </div>
          ))}

          {/* Divider */}
          <div className="flex items-center justify-center py-2 shrink-0">
            <div style={{ width: expanded ? EXPANDED_WIDTH - 32 : 32, height: 1, backgroundColor: '#253147' }} />
          </div>

          {/* Scale Pilot items */}
          {pilotItems.map((item) => {
            const Icon = item.icon;
            const active = isPilotActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center w-full transition-colors shrink-0 hover:bg-white/5"
                style={{
                  height: 56,
                  backgroundColor: active ? '#253147' : undefined,
                  borderLeft: active ? `3px solid ${item.color}` : '3px solid transparent',
                  color: item.color,
                }}
              >
                <div className="flex items-center justify-center shrink-0" style={{ width: active ? COLLAPSED_WIDTH - 3 : COLLAPSED_WIDTH - 3 }}>
                  <Icon size={20} />
                </div>
                {expanded && (
                  <div className="min-w-0 pr-3">
                    <div className="text-white text-[14px] font-medium leading-tight truncate">{item.label}</div>
                    <div className="text-[#8b95a5] text-[11px] leading-tight truncate">{item.subtitle}</div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom SI branding */}
        <div className="flex items-center justify-center shrink-0" style={{ height: 40 }}>
          {expanded ? (
            <span style={{ color: '#4a5568', fontSize: 11, fontWeight: 500 }}>Scale Insights v2026</span>
          ) : (
            <span style={{ color: '#4a5568', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>SI</span>
          )}
        </div>
      </aside>
    </>
  );
}
