export type EditableFieldType = "text" | "textarea" | "list";
export type SiteLocale = "mk" | "en";

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
}

export interface SiteContent {
  navigation: {
    ctaLabel: string;
    links: NavLinkItem[];
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    values: FeatureItem[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: FeatureItem[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    description: string;
    items: FeatureItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    phone1: string;
    phone2: string;
    email: string;
    address: string;
    mapUrl: string;
    formTitle: string;
    submitLabel: string;
  };
  footer: {
    copyright: string;
  };
}

export type LocalizedSiteContent = Record<SiteLocale, SiteContent>;

export interface FieldDefinition {
  key: string;
  label: string;
  type?: EditableFieldType;
  itemLabel?: string;
}

export const localeLabels: Record<SiteLocale, string> = {
  mk: "Македонски",
  en: "English",
};

export const defaultSiteContent: LocalizedSiteContent = {
  mk: {
    navigation: {
      ctaLabel: "Побарај понуда",
      links: [
        { label: "Дома", href: "#hero" },
        { label: "За нас", href: "#about" },
        { label: "Услуги", href: "#services" },
        { label: "Зошто ние", href: "#why-us" },
        { label: "Контакт", href: "#contact" },
      ],
    },
    hero: {
      badge: "Транспорт и Шпедиција",
      title: "Брзина. Сигурност.",
      highlight: "Доверба.",
      description:
        "Вашиот доверлив партнер за домашен и меѓународен транспорт, секогаш навреме и професионално.",
      primaryCtaLabel: "Побарај понуда",
      secondaryCtaLabel: "Наши услуги",
    },
    about: {
      eyebrow: "За нас",
      title: "Вашиот партнер во логистиката",
      paragraph1:
        "NIMAK е компанија специјализирана за транспорт и шпедиција, посветена на обезбедување брзи, сигурни и ефикасни логистички решенија.",
      paragraph2:
        "Нашата мисија е да го поедноставиме процесот на транспорт и логистика за нашите клиенти, обезбедувајќи ги нивните пратки навреме и со највисок стандард на сигурност.",
      paragraph3:
        "Со години искуство во индустријата и јасен фокус кон клиентот, успешно ги поврзуваме бизнисите со светот и нудиме поддршка од планирање до испорака.",
      values: [
        { title: "Доверба", desc: "Градиме долгорочни партнерства базирани на транспарентност." },
        { title: "Точност", desc: "Секоја пратка стигнува навреме, без компромис." },
        { title: "Тим", desc: "Професионален и посветен тим со годишно искуство." },
        { title: "Квалитет", desc: "Високи стандарди во секој аспект од услугата." },
      ],
    },
    services: {
      eyebrow: "Услуги",
      title: "Комплетни логистички решенија",
      description: "Од локален транспорт до меѓународна шпедиција, ние покриваме сè.",
      items: [
        { title: "Домашен транспорт", desc: "Брза и сигурна дистрибуција на стоки низ целата територија." },
        { title: "Меѓународен транспорт", desc: "Комплетна логистика од врата до врата низ Европа и пошироко." },
        { title: "Царинско посредување", desc: "Професионална царинска обработка и документација." },
        { title: "Следење на пратки", desc: "Целосна транспарентност и контрола на испораката." },
        { title: "Бродски транспорт", desc: "Сигурен и ефикасен превоз на стока преку меѓународни поморски рути." },
        { title: "Складирање", desc: "Безбедно и организирано складирање на стока со целосна контрола и флексибилност." },
      ],
    },
    whyUs: {
      eyebrow: "Зошто ние",
      title: "Повеќе од транспорт, ние сме ваш логистички партнер.",
      description:
        "Со професионален тим, иновативни решенија и флексибилен пристап, вашите пратки стигнуваат навреме и безбедно.",
      items: [
        { title: "Брза испорака", desc: "Оптимизирани рути и ефикасни процеси за навремена достава." },
        { title: "Професионален тим", desc: "Искусни професионалци кои се грижат за секоја пратка." },
        { title: "Персонализирана услуга", desc: "Решенија прилагодени на вашите конкретни потреби." },
        { title: "24/7 Поддршка", desc: "Секогаш достапни за вас по телефон и е-пошта." },
      ],
    },
    contact: {
      eyebrow: "Контакт",
      title: "Контактирајте нè",
      description: "Имате прашања? Ние сме тука за вас. Пишете ни или јавете се.",
      phone1: "072 552 222",
      phone2: "070 444 455",
      email: "nimak.solutions@gmail.com",
      address: "Пробиштипска 16 А, Скопје, Македонија",
      mapUrl: "https://maps.app.goo.gl/VtqSujv5fomoCEVm9",
      formTitle: "Испратете порака",
      submitLabel: "Испрати порака",
    },
    footer: {
      copyright: "Сите права задржани.",
    },
  },
  en: {
    navigation: {
      ctaLabel: "Request a quote",
      links: [
        { label: "Home", href: "#hero" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Why us", href: "#why-us" },
        { label: "Contact", href: "#contact" },
      ],
    },
    hero: {
      badge: "Transport & Logistics",
      title: "Speed. Safety.",
      highlight: "Trust.",
      description:
        "Your reliable partner for domestic and international transport, always on time and professional.",
      primaryCtaLabel: "Request a quote",
      secondaryCtaLabel: "Our services",
    },
    about: {
      eyebrow: "About us",
      title: "Your logistics partner",
      paragraph1:
        "NIMAK is a company specialized in transport and freight forwarding, focused on fast, secure, and efficient logistics solutions.",
      paragraph2:
        "Our mission is to simplify transport and logistics for our clients by delivering shipments on time and with a high standard of reliability.",
      paragraph3:
        "With years of experience and a clear customer focus, we connect businesses with the world and support them from planning to delivery.",
      values: [
        { title: "Trust", desc: "We build long-term partnerships based on transparency." },
        { title: "Precision", desc: "Every shipment arrives on time without compromise." },
        { title: "Team", desc: "A professional and dedicated team with strong industry experience." },
        { title: "Quality", desc: "High standards in every part of the service." },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "Complete logistics solutions",
      description: "From local transport to international freight forwarding, we cover it all.",
      items: [
        { title: "Domestic transport", desc: "Fast and secure distribution of goods across the country." },
        { title: "International transport", desc: "Complete door-to-door logistics across Europe and beyond." },
        { title: "Customs brokerage", desc: "Professional customs processing and documentation support." },
        { title: "Shipment tracking", desc: "Full transparency and control over every delivery." },
        { title: "Sea freight", desc: "Reliable and efficient cargo transport through international maritime routes." },
        { title: "Warehousing", desc: "Safe and organized goods storage with full control and flexibility." },
      ],
    },
    whyUs: {
      eyebrow: "Why us",
      title: "More than transport, we are your logistics partner.",
      description:
        "With a professional team, smart solutions, and a flexible approach, your shipments arrive safely and on time.",
      items: [
        { title: "Fast delivery", desc: "Optimized routes and efficient processes for timely delivery." },
        { title: "Professional team", desc: "Experienced professionals taking care of every shipment." },
        { title: "Tailored service", desc: "Solutions adapted to your specific business needs." },
        { title: "24/7 Support", desc: "Always available for you by phone and email." },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact us",
      description: "Have questions? We are here for you. Send us a message or give us a call.",
      phone1: "072 552 222",
      phone2: "070 444 455",
      email: "nimak.solutions@gmail.com",
      address: "Probishtipska 16 A, Skopje, Macedonia",
      mapUrl: "https://maps.app.goo.gl/VtqSujv5fomoCEVm9",
      formTitle: "Send a message",
      submitLabel: "Send message",
    },
    footer: {
      copyright: "All rights reserved.",
    },
  },
};

export const sectionDefinitions: Array<{
  key: keyof SiteContent;
  label: string;
  description: string;
  fields: FieldDefinition[];
}> = [
  {
    key: "navigation",
    label: "Навигација",
    description: "Горно мени и главното CTA копче.",
    fields: [
      { key: "ctaLabel", label: "Текст на CTA копче" },
      { key: "links", label: "Линкови во мени", type: "list", itemLabel: "линк" },
    ],
  },
  {
    key: "hero",
    label: "Hero",
    description: "Првата секција што ја гледа посетителот.",
    fields: [
      { key: "badge", label: "Badge" },
      { key: "title", label: "Наслов" },
      { key: "highlight", label: "Истакнат збор" },
      { key: "description", label: "Опис", type: "textarea" },
      { key: "primaryCtaLabel", label: "Примарно копче" },
      { key: "secondaryCtaLabel", label: "Секундарно копче" },
    ],
  },
  {
    key: "about",
    label: "За нас",
    description: "Опис на компанијата и вредности.",
    fields: [
      { key: "eyebrow", label: "Наднаслов" },
      { key: "title", label: "Наслов" },
      { key: "paragraph1", label: "Параграф 1", type: "textarea" },
      { key: "paragraph2", label: "Параграф 2", type: "textarea" },
      { key: "paragraph3", label: "Параграф 3", type: "textarea" },
      { key: "values", label: "Картички со вредности", type: "list", itemLabel: "вредност" },
    ],
  },
  {
    key: "services",
    label: "Услуги",
    description: "Секција за услугите и картичките.",
    fields: [
      { key: "eyebrow", label: "Наднаслов" },
      { key: "title", label: "Наслов" },
      { key: "description", label: "Опис", type: "textarea" },
      { key: "items", label: "Услужни картички", type: "list", itemLabel: "услуга" },
    ],
  },
  {
    key: "whyUs",
    label: "Зошто ние",
    description: "Секција за доверба и предности.",
    fields: [
      { key: "eyebrow", label: "Наднаслов" },
      { key: "title", label: "Наслов" },
      { key: "description", label: "Опис", type: "textarea" },
      { key: "items", label: "Картички со причини", type: "list", itemLabel: "причина" },
    ],
  },
  {
    key: "contact",
    label: "Контакт",
    description: "Контакт детали и текстови за формата.",
    fields: [
      { key: "eyebrow", label: "Наднаслов" },
      { key: "title", label: "Наслов" },
      { key: "description", label: "Опис", type: "textarea" },
      { key: "phone1", label: "Телефон 1" },
      { key: "phone2", label: "Телефон 2" },
      { key: "email", label: "Email" },
      { key: "address", label: "Адреса", type: "textarea" },
      { key: "mapUrl", label: "Google Maps линк" },
      { key: "formTitle", label: "Наслов на форма" },
      { key: "submitLabel", label: "Текст на копче" },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Текстот во подножјето на страната.",
    fields: [{ key: "copyright", label: "Copyright текст" }],
  },
];

type SiteContentRow = {
  section: string;
  field_key: string;
  field_value: string;
};

const cloneDefaults = (): LocalizedSiteContent => JSON.parse(JSON.stringify(defaultSiteContent)) as LocalizedSiteContent;

const parseList = (value: string, fallback: FeatureItem[] | NavLinkItem[]) => {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return fallback;
    return parsed.filter(
      (item): item is FeatureItem | NavLinkItem =>
        Boolean(
          item &&
            typeof item === "object" &&
            (("title" in item && "desc" in item) || ("label" in item && "href" in item)),
        ),
    ) as FeatureItem[] | NavLinkItem[];
  } catch {
    return fallback;
  }
};

const applyFieldValue = (
  content: LocalizedSiteContent,
  locale: SiteLocale,
  sectionKey: keyof SiteContent,
  fieldKey: string,
  fieldValue: string,
) => {
  const section = content[locale][sectionKey] as Record<string, unknown>;
  if (!(fieldKey in section)) return;

  const fallbackValue = section[fieldKey];
  if (Array.isArray(fallbackValue)) {
    section[fieldKey] = parseList(fieldValue, fallbackValue as FeatureItem[] | NavLinkItem[]);
    return;
  }

  section[fieldKey] = fieldValue;
};

export const buildSiteContent = (rows?: SiteContentRow[] | null): LocalizedSiteContent => {
  const next = cloneDefaults();
  if (!rows?.length) return next;

  const legacyRows = rows.filter((row) => !row.field_key.includes("::"));
  const localizedRows = rows.filter((row) => row.field_key.includes("::"));

  for (const row of legacyRows) {
    const sectionKey = row.section as keyof SiteContent;
    if (!(sectionKey in next.mk)) continue;
    applyFieldValue(next, "mk", sectionKey, row.field_key, row.field_value);
  }

  for (const row of localizedRows) {
    const sectionKey = row.section as keyof SiteContent;
    if (!(sectionKey in next.mk)) continue;
    const [locale, fieldKey] = row.field_key.split("::");
    if (locale === "mk" || locale === "en") {
      applyFieldValue(next, locale, sectionKey, fieldKey, row.field_value);
    }
  }

  return next;
};

export const flattenSiteContent = (
  content: LocalizedSiteContent,
): Array<{ section: string; field_key: string; field_value: string }> => {
  const rows: Array<{ section: string; field_key: string; field_value: string }> = [];

  for (const locale of Object.keys(content) as SiteLocale[]) {
    for (const [section, fields] of Object.entries(content[locale])) {
      for (const [fieldKey, fieldValue] of Object.entries(fields)) {
        rows.push({
          section,
          field_key: `${locale}::${fieldKey}`,
          field_value: Array.isArray(fieldValue) ? JSON.stringify(fieldValue) : String(fieldValue),
        });
      }
    }
  }

  return rows;
};
