import type { Dictionary } from "./fr";

const en: Dictionary = {
  meta: {
    siteTitle: "Arrow Home Group | Construction, renovation and fit-out in Senegal",
    siteDescription:
      "Arrow Home Group delivers construction, renovation, interior fit-out and finishing services in Dakar and across Senegal. Let's talk about your project.",
    pages: {
      services: {
        title: "Our expertise: construction, renovation, fit-out",
        description:
          "Construction and civil works, renovation, fit-out and finishing, aluminium, wood, elevators and interior design in Dakar and Senegal.",
      },
      projects: {
        title: "Our projects",
        description:
          "Explore Arrow Home Group's fields of work: construction, renovation, fit-out, aluminium, wood and interior design.",
      },
      about: {
        title: "About Arrow Home Group",
        description:
          "A construction, renovation and fit-out company based in Dakar: our vision, our approach and our commitments.",
      },
      process: {
        title: "Our process",
        description:
          "From the first conversation to project completion: how Arrow Home Group supports every project, step by step.",
      },
      contact: {
        title: "Contact",
        description:
          "Contact Arrow Home Group in Dakar by phone, WhatsApp, email or online form. Avenue Malick Sy, Médina.",
      },
      quote: {
        title: "Request a quote",
        description:
          "Tell us about your construction, renovation or fit-out project and Arrow Home Group will get back to you.",
      },
      legal: { title: "Legal notice", description: "Legal notice for the Arrow Home Group website." },
      privacy: {
        title: "Privacy policy",
        description: "How Arrow Home Group processes personal data submitted through this website.",
      },
    },
  },

  nav: {
    home: "Home",
    services: "Our expertise",
    projects: "Our projects",
    about: "About",
    process: "Our process",
    contact: "Contact",
    cta: "Let's talk about your project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    skip: "Skip to content",
    language: "Language",
    homeLabel: "Arrow Home Group, home",
  },

  hero: {
    carousel: "Introducing Arrow Home Group",
    slide: "slide",
    slideOf: "{n} of {total}",
    prev: "Previous slide",
    next: "Next slide",
    pause: "Pause the slideshow",
    play: "Resume the slideshow",
    goTo: "Go to slide {n}: {name}",
    scroll: "Scroll to discover more",
    whatsapp: "Message us on WhatsApp",
    trust: [
      "Office in Dakar, Avenue Malick Sy, Médina",
      "8 trades coordinated by a single team",
      "Reach us by phone, WhatsApp or e-mail",
    ],
    quick: {
      title: "What is your project?",
      text: "Pick a service: the quote form opens already filled in.",
      other: "Other project",
      or: "or contact us directly",
      call: "Call",
      whatsapp: "WhatsApp",
    },
    mobileBar: { label: "Quick actions", call: "Call", whatsapp: "WhatsApp", quote: "Quote" },
    slides: [
      {
        eyebrow: "Arrow Home Group",
        title: "Building today.",
        highlight: "Shaping tomorrow.",
        text: "Arrow Home Group supports your construction, renovation and fit-out projects with an approach built on quality, precision and attention to detail.",
        cta: "Let's talk about your project",
        secondary: "Discover our projects",
      },
      {
        eyebrow: "Construction & civil works",
        title: "We build your projects",
        highlight: "to exacting standards.",
        text: "Villas, residential buildings, commercial premises: from planning to structural work, we deliver solid, carefully executed buildings in Dakar and across the regions.",
        cta: "Request a quote",
        secondary: "Our expertise",
      },
      {
        eyebrow: "Renovation & fit-out",
        title: "Give your spaces",
        highlight: "a new life.",
        text: "Renovation, finishing, aluminium and wood joinery, interior design: we transform villas, apartments and offices.",
        cta: "Renovate my space",
        secondary: "Our projects",
      },
      {
        eyebrow: "Large-scale projects",
        title: "Complete solutions",
        highlight: "for your buildings.",
        text: "Hotels, residences, apartment buildings: construction, fit-out, elevators and finishing coordinated by a single team.",
        cta: "Present my project",
        secondary: "Our process",
      },
    ],
  },

  marquee: {
    label: "Our fields of work",
    items: ["Construction", "Renovation", "Fit-out", "Finishing", "Interior design"],
  },

  services: {
    eyebrow: "Our expertise",
    title: "Our expertise",
    subtitle: "Solutions tailored to your projects, from design to delivery, depending on the services involved.",
    more: "Learn more",
    quote: "Request a quote",
    pageIntro:
      "A single point of contact to coordinate every trade on your project: construction, finishing, plumbing, joinery, elevators and interior design.",
    items: {
      construction: {
        title: "Construction & civil works",
        short: "Villas, apartment buildings and commercial premises, from planning to structural work.",
        body: "We build private homes, apartment buildings and commercial premises, including hotel and residential projects. Every site starts with careful preparation: understanding your needs, assessing the plot and planning the work. Execution is closely supervised, with constant attention to build quality.",
        points: ["Structural work", "Turnkey projects", "Site supervision"],
      },
      renovation: {
        title: "Renovation",
        short: "Transforming and upgrading existing villas, apartments and buildings.",
        body: "Partial or full renovation, rehabilitation, reconfiguration of spaces: we add value to your property by improving its comfort, functionality and aesthetics.",
        points: ["Full or partial renovation", "Building rehabilitation", "Space modernisation"],
      },
      "amenagement-finition": {
        title: "Fit-out & finishing",
        short: "Secondary works and carefully executed finishes for coherent spaces.",
        body: "Electrical work, waterproofing, tiling, painting, suspended ceilings, outdoor landscaping: we handle secondary works and finishing, paying particular attention to detail and overall consistency.",
        points: ["Secondary works", "Interior finishing", "Outdoor landscaping"],
      },
      "plomberie-sanitaire": {
        title: "Plumbing & sanitary",
        short: "Installation and renovation of water networks and sanitary fixtures.",
        body: "Water supply, drainage, bathrooms, kitchens and sanitary fixtures: we install, replace and restore your systems and appliances for reliable, long-lasting installations.",
        points: ["Water supply and drainage", "Bathrooms and kitchens", "Sanitary fixture installation"],
      },
      aluminium: {
        title: "Aluminium",
        short: "Aluminium joinery: doors, windows and glazed partitions.",
        body: "We design and install aluminium joinery suited to your project: doors, windows, bay windows and glazed partitions, for bright, contemporary spaces.",
        points: ["Doors and windows", "Glazed partitions", "Made-to-measure installation"],
      },
      bois: {
        title: "Wood",
        short: "Made-to-measure interior woodwork.",
        body: "Doors, built-in wardrobes, wall cladding and furniture: our woodwork brings warmth and character to your interiors, made to measure and finished to your choice.",
        points: ["Doors and wardrobes", "Interior cladding", "Bespoke furniture"],
      },
      ascenseurs: {
        title: "Elevators",
        short: "Supply, installation and maintenance of elevators.",
        body: "We support residential, commercial and hotel buildings with their elevator projects: needs assessment, supply, installation and maintenance.",
        points: ["Supply and installation", "Maintenance", "Residential and commercial buildings"],
      },
      decoration: {
        title: "Interior design",
        short: "Harmonious, attractive and functional interiors.",
        body: "Materials, colours, lighting and furniture: we design interiors that combine harmony, aesthetics and everyday practicality.",
        points: ["Interior design", "Material selection", "Furniture and lighting"],
      },
    },
    ctaTitle: "Have a project in mind?",
    ctaText: "Tell us what you need and we will get back to you to discuss it.",
  },

  portfolio: {
    eyebrow: "Our projects",
    title: "Our projects",
    subtitle: "Ideas turned into real spaces.",
    categories: {
      all: "All projects",
      construction: "Construction",
      renovation: "Renovation",
      amenagement: "Fit-out",
      aluminium: "Aluminium",
      bois: "Wood",
      decoration: "Interior design",
    },
    filterLabel: "Filter by category",
    carouselLabel: "Selected projects",
    scrollLeft: "Scroll left",
    scrollRight: "Scroll right",
    gridTitle: "All categories",
    viewAll: "View all projects",
    illustration: "Photos coming soon",
    illustrationNote: "Photographs of our projects will be published very soon.",
    illustrationCaption: "Field of work",
    instagram: "Follow our sites on Instagram",
    startProject: "Planning something similar?",
    count: "{n} item(s)",
    detail: {
      category: "Category",
      location: "Location",
      services: "Services delivered",
      highlights: "Project highlights",
      gallery: "Gallery",
      back: "All projects",
      cta: "Let's talk about your project",
      image: "Photo of the {title} project",
    },
  },

  stats: {
    label: "Arrow Home in figures",
    items: [
      { value: "50", suffix: "+", label: "Projects delivered" },
      { value: "90", suffix: " days", label: "Average timeline" },
      { value: "8", suffix: "", label: "Coordinated trades" },
      { value: "1", suffix: " year", label: "Quality warranty" },
    ],
  },

  about: {
    eyebrow: "Who we are",
    title: "About Arrow Home Group",
    lead: "Chinese know-how, local team, international standards",
    paragraphs: [
      "Arrow Home combines the excellence of Chinese engineering with in-depth knowledge of the Senegalese market. Our international team works on high-end projects in Dakar and throughout the region.",
      "We commit to a clear schedule, quality control at every stage and follow-up after delivery.",
      "Arrow Home Group supports individuals, businesses and investors with their construction, renovation and fit-out projects.",
      "Based in Médina, Dakar, we bring several complementary skills together under one roof: construction, finishing, plumbing and sanitary, aluminium and wood joinery, elevators and interior design. This lets us coordinate every trade and give our clients a single point of contact.",
      "Our vision is simple: to offer solutions tailored to each project, delivered with care and in line with the commitments made to the client.",
    ],
    values: [
      { title: "Listening", text: "Every project starts with a precise understanding of your needs and constraints." },
      { title: "Transparency", text: "A detailed proposal and regular progress updates." },
      { title: "High standards", text: "Attention to detail and quality control at every stage." },
      { title: "Support", text: "Close follow-up, from the first meeting to project completion." },
    ],
    commitmentsLabel: "Our commitments",
    commitments: [
      "Detailed, transparent quote — no unpleasant surprises",
      "Deadlines set by contract and met",
      "Quality control at every stage",
      "1-year warranty · After-delivery service",
    ],
    cta: "Let's talk about your project",
    more: "Learn more about us",
  },

  diaspora: {
    title: "Living abroad?",
    text: "Move your project in Senegal forward with peace of mind: a single point of contact, regular updates with photos and videos of the site, and clear follow-up at every stage.",
    cta: "Talk about my project",
  },

  process: {
    eyebrow: "Our process",
    title: "Our process",
    subtitle: "A clear path, from the first conversation to the completion of your project.",
    steps: [
      { title: "Initial discussion", text: "We take the time to understand your needs and objectives." },
      { title: "Project study", text: "Together, we clarify the requirements, budget and constraints of the project." },
      { title: "Proposal", text: "We present a proposal tailored to the services involved." },
      { title: "Delivery and follow-up", text: "We carry out the project within the agreed scope, with regular updates." },
      { title: "Completion", text: "We present the result and provide the agreed follow-up." },
    ],
    step: "Step",
  },

  testimonials: { eyebrow: "Testimonials", title: "They placed their trust in us" },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your project",
    text: "Call us, message us on WhatsApp or by email, or visit our office.",
    phone: "Phone",
    whatsapp: "WhatsApp",
    email: "Email",
    office: "Office",
    address: "Avenue Malick Sy, Médina, Dakar, Senegal",
    hoursTitle: "Opening hours",
    hours: [
      { days: "Monday – Friday", time: "9 am – 5 pm" },
      { days: "Saturday", time: "9 am – 1 pm" },
      { days: "Sunday", time: "Closed" },
    ],
    mapTitle: "Map: Avenue Malick Sy, Médina, Dakar",
    formTitle: "Write to us",
    formText: "Have a question? Leave us a message and we will reply promptly.",
    quoteTitle: "Need a quote?",
    quoteText: "Describe your project in a few minutes and we will contact you to discuss it.",
    quoteCta: "Request a quote",
    whatsappMsg: "Hello Arrow Home, I would like some information about your services.",
    call: "Call",
  },

  quote: {
    eyebrow: "Quote",
    title: "Request a quote",
    text: "A few details are all we need to review your project and get back to you.",
    asideTitle: "Prefer to speak to us directly?",
    asideText: "Our team can be reached by phone and WhatsApp during opening hours.",
  },

  form: {
    fields: {
      name: "Full name",
      phone: "Phone",
      email: "Email address",
      service: "Type of service",
      location: "Project location",
      budget: "Indicative budget",
      message: "Description of your needs",
      contactMessage: "Your message",
      consent:
        "I agree that Arrow Home Group may use this information to respond to my request, in accordance with the privacy policy.",
    },
    placeholders: {
      name: "First and last name",
      phone: "+221 7X XXX XX XX",
      email: "name@example.com",
      location: "e.g. Dakar, Saly, Thiès…",
      message: "Type of work, floor area, preferred timeline…",
    },
    optional: "optional",
    required: "required",
    requiredNote: "Fields marked with an asterisk (*) are required.",
    selectService: "Select a service",
    otherService: "Other / not sure yet",
    selectBudget: "Specify a budget (optional)",
    budgets: {
      lt5: "Under 5 million FCFA",
      "5-20": "5 to 20 million FCFA",
      "20-50": "20 to 50 million FCFA",
      "50-100": "50 to 100 million FCFA",
      gt100: "Over 100 million FCFA",
      unknown: "Not sure yet",
    },
    honeypot: "Leave this field empty",
    submitQuote: "Send my request",
    submitContact: "Send message",
    sending: "Sending…",
    privacyLink: "privacy policy",
    successTitle: "Request received",
    successText: "Thank you. Your request has been recorded and our team will contact you as soon as possible.",
    newRequest: "Send another request",
    errorSummary: "Please correct the highlighted fields.",
    errors: {
      required: "This field is required.",
      tooShort: "This field is too short.",
      tooLong: "This field is too long.",
      email: "Invalid email address.",
      phone: "Invalid phone number.",
      consent: "Your consent is required to process this request.",
      invalid: "Invalid value.",
      rateLimited: "Too many requests have been sent. Please try again later or give us a call.",
      spam: "Your request could not be sent. Please try again.",
      unavailable: "Online submission is temporarily unavailable. Please contact us by phone, WhatsApp or email.",
      server: "Something went wrong while sending. Please try again or contact us directly.",
    },
  },

  footer: {
    about: "Construction, renovation, fit-out and finishing in Dakar and across Senegal.",
    services: "Expertise",
    navigation: "Navigation",
    contact: "Contact",
    legal: "Legal notice",
    privacy: "Privacy",
    rights: "All rights reserved.",
    location: "Dakar, Senegal",
    social: "Social media",
  },

  legal: {
    title: "Legal notice",
    sections: [
      {
        heading: "Publisher",
        body: [
          "This website is published by ARROW HOME GROUP, whose office is located on Avenue Malick Sy, Médina, Dakar, Senegal.",
          "Phone: +221 78 715 54 54. Email: info@arrowhome.cc.",
          "NINEA: [To be completed]",
          "RCCM: [To be completed]",
        ],
      },
      {
        heading: "Hosting",
        body: ["The website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States."],
      },
      {
        heading: "Intellectual property",
        body: [
          "The logo, text and graphic elements of this website are the property of ARROW HOME GROUP or used with permission. Any reproduction without prior authorisation is prohibited.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The information on this website is provided for guidance only. It does not constitute a contractual offer: every service is subject to a personalised proposal.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy policy",
    sections: [
      {
        heading: "Data collected",
        body: [
          "When you use our forms, we collect the information you enter: name, phone number, email address, type of service, project location, indicative budget and description of your needs.",
          "To prevent abuse, a non-reversible fingerprint of your IP address is stored with the request.",
        ],
      },
      {
        heading: "Purpose and legal basis",
        body: [
          "This data is used solely to respond to your request and to follow up on our relationship with you. It is processed on the basis of your consent, given by ticking the box provided.",
        ],
      },
      {
        heading: "Recipients and service providers",
        body: [
          "The data is intended for the Arrow Home Group team. It is never sold or transferred. It is hosted by our technical providers (website hosting, database and email delivery), acting on our behalf.",
        ],
      },
      {
        heading: "Retention period",
        body: [
          "Data is kept for as long as necessary to process your request and manage the business relationship, then deleted.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Under Senegalese Law No. 2008-12 of 25 January 2008 on the protection of personal data, you have the right to access, rectify, object to and delete your data. To exercise these rights, write to info@arrowhome.cc.",
          "You may also contact Senegal's personal data protection authority, the Commission de protection des données personnelles (CDP).",
        ],
      },
      {
        heading: "Cookies and local storage",
        body: [
          "This website does not use advertising cookies or audience measurement tools. A technical cookie remembers your chosen language, and form fields you are filling in are temporarily kept in your browser so they are not lost when you switch language.",
          "The access map is provided by Google Maps, which may set its own cookies when displayed.",
        ],
      },
    ],
  },

  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    back: "Back to home",
  },

  common: {
    learnMore: "Learn more",
  },
};

export default en;
