// The day's stories, each checked against at least one report published on Tuesday 17 November 2026.
// lon/lat place the numbered pin on the map. Wording is our own.

export const DAY = {
  weekday: 'Tuesday',
  date: '17 November 2026',
  short: 'Tuesday',
};

// Three lead stories, drawn large.
export const LEADS = [
  {
    n: 1, region: 'Europe · Ukraine war', art: 'kerch', lon: 36.5, lat: 45.3,
    head: 'Ukraine knocks out a span of the Kerch Bridge to Crimea',
    sub: 'Missiles and drones drop part of the road deck; trains run again. Russia had hit two Kyiv bridges hours earlier.',
  },
  {
    n: 2, region: 'Middle East · Gulf', art: 'gulf', lon: 50.6, lat: 26.1,
    head: 'Iran fires drones at US radar in Bahrain; US hits Qeshm',
    sub: 'Bahrain says it stopped the drones. Kuwait intercepts drones too; burning tankers in the Strait of Hormuz.',
  },
  {
    n: 3, region: 'Americas · Health', art: 'measles', lon: -98, lat: 39,
    head: 'US loses measles-free status after 26 years',
    sub: 'PAHO says measles is endemic again in the US, Mexico and Bolivia; US cases are the most since 1991.',
  },
];

// Nine smaller stories with an icon each.
export const CARDS = [
  { n: 4, region: 'Asia-Pacific', art: 'quad', lon: 121, lat: 14.6,
    head: 'Quad leaders meet in Manila', sub: 'Trump, Modi, Takaichi, Albanese: minerals deals, joint drills; hundreds held at protests' },
  { n: 5, region: 'Middle East', art: 'knesset', lon: 35.2, lat: 31.8,
    head: 'Knesset elects speaker backed by Netanyahu’s rivals', sub: 'Matan Kahana, an ally of Gadi Eisenkot, who is forming the next government' },
  { n: 6, region: 'US · Business', art: 'chip', lon: -122, lat: 37.4,
    head: 'Nvidia revenue doubles to $115.8bn', sub: 'Board won’t reinstate ousted CEO Jensen Huang; he will testify to Congress' },
  { n: 7, region: 'Europe', art: 'strike', lon: 2.35, lat: 48.86,
    head: 'France: public sector strikes over pay', sub: '146,000 march, says the government; the CGT union says 500,000+' },
  { n: 8, region: 'Europe', art: 'serbia', lon: 20.46, lat: 44.8,
    head: 'Serbia’s student MPs sworn in', sub: '140 newcomers end 14 years of rule by Aleksandar Vučić’s party' },
  { n: 9, region: 'Global · Climate', art: 'cop', lon: 30.7, lat: 36.9,
    head: 'COP31 draft deal runs into resistance', sub: 'EU calls the draft text “untenable” as talks enter their final days' },
  { n: 10, region: 'Russia', art: 'plane', lon: 86, lat: 55.3,
    head: 'Military cargo plane crashes in Siberia', sub: 'All 19 aboard the An-12 near Kemerovo killed; equipment failure suspected' },
  { n: 11, region: 'South Asia', art: 'garment', lon: 90.4, lat: 24,
    head: 'Bangladesh police tear-gas garment workers', sub: 'Thousands block the Dhaka–Mymensingh highway demanding higher wages' },
  { n: 12, region: 'Central America', art: 'press', lon: -84.1, lat: 9.9,
    head: 'Costa Rican journalist shot dead', sub: 'Camilo Rodríguez, who exposed alleged drug links: first such killing in 25 years' },
];

// Short items, one line each, grouped by place. where is printed in bold; icon names a small glyph in art.mjs.
// Every item happened, or was first announced, on Tuesday 17 November.
export const ALSO = [
  { where: 'US', icon: 'tech', lon: -100, lat: 45, text: 'Apple Pay, iCloud and Gmail outages' },
  { where: 'US', icon: 'shield', lon: -76.8, lat: 39.1, text: 'NSA’s classified network goes down' },
  { where: 'US', icon: 'atom', lon: -77, lat: 38.9, text: 'Trump “looking into” Iran dirty-bomb tip' },
  { where: 'US', icon: 'plane', lon: -87.6, lat: 41.9, text: 'FAA pauses router installs' },
  { where: 'US', icon: 'bank', lon: -77.04, lat: 38.9, text: 'Fed’s Lisa Cook snubs White House hearing' },
  { where: 'US', icon: 'dice', lon: -74, lat: 40.7, text: 'Kalshi halts bets on Trump speeches' },
  { where: 'US', icon: 'medal', lon: null, lat: null, text: 'Gen Chris LaNeve picked as army chief' },
  { where: 'US', icon: 'shield', lon: null, lat: null, text: 'Navy pick grilled on Iran-war strain' },
  { where: 'UK', icon: 'shield', lon: -0.13, lat: 51.5, text: 'US soldier in Russia spy case handed to US' },
  { where: 'UK', icon: 'flag', lon: null, lat: null, text: 'sanctions 8 Israeli settlement firms' },
  { where: 'UK', icon: 'chart', lon: -1.5, lat: 53, text: 'unemployment dips to 4.6%' },
  { where: 'UK', icon: 'factory', lon: -2.6, lat: 51.45, text: 'Imperial Brands to cut up to 4,600 jobs' },
  { where: 'Germany', icon: 'bank', lon: 8.7, lat: 50.1, text: 'leak: Deutsche Bank ignored risk alerts' },
  { where: 'Thailand', icon: 'trade', lon: 100.5, lat: 13.8, text: 'to scrap tariffs on US goods' },
  { where: 'China', icon: 'chip', lon: 116.4, lat: 39.9, text: 'vows to answer new US chip curbs' },
  { where: 'China', icon: 'trade', lon: 114.06, lat: 22.54, text: 'Carney and Xi cut tariffs at APEC' },
  { where: 'N Korea', icon: 'globe', lon: 125.75, lat: 39.0, text: 'Trump: Kim “would like” to join APEC' },
  { where: 'Australia', icon: 'chart', lon: 151.2, lat: -33.9, text: 'RBA minutes warn of sharper downturn' },
  { where: 'PNG', icon: 'pick', lon: 155.5, lat: -6.2, text: 'Rio Tinto pays $250m for mine clean-up' },
  { where: 'Iraq', icon: 'oil', lon: 44.4, lat: 33.3, text: 'PM to Beirut over Hormuz-bypass pipeline' },
  { where: 'West Bank', icon: 'grave', lon: 35.45, lat: 31.85, text: 'settlers kill woman, 72' },
  { where: 'Mozambique', icon: 'scale', lon: 32.6, lat: -25.9, text: 'opposition leader on trial' },
  { where: 'Guinea', icon: 'pick', lon: -9.7, lat: 11.5, text: 'mining ban: thousands flee to Mali' },
  { where: 'Haiti', icon: 'people', lon: -72.3, lat: 18.5, text: 'rallies back Salvadoran troops' },
  { where: 'Brazil', icon: 'leaf', lon: -46, lat: -4, text: 'isolated Awá people emerge' },
  { where: 'Brazil', icon: 'leaf', lon: -50, lat: -15, text: 'EU-made pesticides in 1,605 poisonings' },
  { where: 'COP31', icon: 'leaf', lon: null, lat: null, text: 'UK backs levies on polluting sectors' },
  { where: 'Study', icon: 'co2', lon: null, lat: null, text: 'Russia, Saudi, Australia top CO₂ exporters' },
  { where: 'Study', icon: 'robot', lon: null, lat: null, text: 'AI chatbots drift to climate denial' },
  { where: 'Football', icon: 'ball', lon: 103.8, lat: 1.35, text: 'Brazil 7 Singapore 0, Vinícius hat-trick' },
  { where: 'Football', icon: 'ball', lon: null, lat: null, text: 'India beat Pakistan in SAFF final' },
  { where: 'Golf', icon: 'golf', lon: null, lat: null, text: 'Tiger Woods to return in December' },
  { where: 'Golf', icon: 'golf', lon: null, lat: null, text: 'DeChambeau joins the DP World Tour' },
  { where: 'Rally', icon: 'car', lon: null, lat: null, text: 'Alonso to race the 2027 Dakar' },
  { where: 'MMA', icon: 'scale', lon: 54.4, lat: 24.45, text: 'Usman Nurmagomedov freed in UAE' },
  { where: 'Boxing', icon: 'glove', lon: -8.6, lat: 52.66, text: 'Irish boxer Lee Reeves dies at 31' },
];

export const SOURCES = 'Sources, all 17 Nov 2026: The Guardian, Al Jazeera, Reuters, AFP, AP, PAHO';
