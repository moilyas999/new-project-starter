/**
 * Service catalogue.
 *
 * IMPORTANT — SEO: the `slug` values deliberately match the URLs that are
 * already indexed on the existing totaltransportteam.co.uk domain. Do not
 * "tidy" them. See docs/seo-migration.md.
 *
 * Copy rules applied here:
 *  - removals language ("home", "belongings", "moving day"), not freight jargon
 *  - no unverified statistics, certifications, guarantees or facility specs
 */

export type ServiceCategory = "removals" | "support";

export type ServiceDetailBlock = {
  heading: string;
  items: string[];
};

export type Service = {
  /** URL path segment — matches the legacy indexed URL where one existed. */
  slug: string;
  /** Short label used in navigation and footers. */
  navLabel: string;
  /** Page heading. */
  title: string;
  category: ServiceCategory;
  metaTitle: string;
  metaDescription: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Opening paragraphs on the service page. */
  intro: string[];
  /** "What's included" style blocks. */
  blocks: ServiceDetailBlock[];
  /** Short reasons to choose us for this service. */
  highlights: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  /** Lucide icon name used by the card/hero. */
  icon:
    | "home"
    | "briefcase"
    | "building"
    | "mapPin"
    | "route"
    | "globe"
    | "package"
    | "warehouse"
    | "wrench";
};

export const services: Service[] = [
  {
    slug: "house-removals",
    navLabel: "House Removals",
    title: "House Removals",
    category: "removals",
    icon: "home",
    metaTitle: "House Removals in London & the UK | House Moving Experts",
    metaDescription:
      "We handle house and flat removals across London and the UK. Careful packing, a professional team and clear communication from quote to moving day. Get a free quote.",
    summary:
      "Studios, flats and family homes moved carefully, from the first box to the last piece of furniture.",
    intro: [
      "Moving home is one of the biggest days you'll have all year, and most of the stress comes from not knowing what happens next. We plan your move properly, turns up when we said we would, and treats your belongings the way we'd want ours treated.",
      "Whether it's a one-bed flat across London or a family home moving out of the city, you get a team that knows how to protect furniture, handle the awkward staircase, and get everything into the right room at the other end.",
    ],
    blocks: [
      {
        heading: "What's included",
        items: [
          "A walk-through of your move before we quote, so nothing is a surprise",
          "Protective wrapping for furniture, mattresses and delicate items",
          "Careful loading and secure transport",
          "Dismantling and reassembling standard flat-pack furniture on request",
          "Boxes placed in the rooms you want them in, not dumped in the hallway",
        ],
      },
      {
        heading: "We move",
        items: [
          "Studios and one-bed flats",
          "Two, three and four-bed houses",
          "Larger family homes",
          "Part moves and single-item moves",
          "Moves involving storage between properties",
        ],
      },
    ],
    highlights: [
      {
        title: "Planned around your day",
        body: "We work to your timings, including tight completion days and property chains that move at the last minute.",
      },
      {
        title: "Careful handling",
        body: "Furniture is wrapped, fragile items are packed properly, and floors and doorways are protected on the way out.",
      },
      {
        title: "One point of contact",
        body: "You'll know who is coming, roughly when they'll arrive, and how to reach us on the day.",
      },
    ],
    faqs: [
      {
        q: "How far in advance should I book my house move?",
        a: "As early as you can — but we understand that completion dates move. If you don't have a confirmed date yet, tell us your rough window when you request a quote and we'll work around it.",
      },
      {
        q: "Can you pack for me?",
        a: "Yes. We offer full packing, part packing for selected rooms, and fragile-only packing. You can add packing to your quote request.",
      },
      {
        q: "Do you move at weekends?",
        a: "Yes. Tell us the day you need and we'll confirm availability when we quote.",
      },
    ],
  },
  {
    slug: "office-removals",
    navLabel: "Office Removals",
    title: "Office Removals",
    category: "removals",
    icon: "briefcase",
    metaTitle: "Office Removals in London & the UK | House Moving Experts",
    metaDescription:
      "Office moves planned around your business. We move desks, furniture and IT equipment carefully, with clear labelling and minimal downtime. Get a commercial removals quote.",
    summary:
      "Office relocations planned around your working week, so your team is back up and running quickly.",
    intro: [
      "An office move is measured in downtime. We plan your relocation around how your business actually works — what has to move first, what can't be switched off during the day, and who needs to be sitting where on Monday morning.",
      "We move desks, chairs, storage, meeting-room furniture and IT equipment, label everything by destination, and put it back together at the other end.",
    ],
    blocks: [
      {
        heading: "What's included",
        items: [
          "A site visit and move plan before your relocation",
          "Labelling by room, desk or department so nothing gets lost",
          "Dismantling and reassembling desks and office furniture",
          "Careful handling and packing of IT equipment, screens and peripherals",
          "Clearing packing materials once you're set up",
        ],
      },
      {
        heading: "Works well for",
        items: [
          "Small offices and single-floor moves",
          "Multi-floor and multi-site relocations",
          "Studios, agencies and professional services",
          "Moves that need to happen outside working hours",
          "Relocations that need storage in between",
        ],
      },
    ],
    highlights: [
      {
        title: "Minimal downtime",
        body: "We sequence the move so the parts of your business that can't stop, don't have to.",
      },
      {
        title: "Everything labelled",
        body: "Clear labelling by destination means your team unpacks into the right space instead of hunting for boxes.",
      },
      {
        title: "Flexible timing",
        body: "Evening and weekend moves can usually be arranged — ask when you request your quote.",
      },
    ],
    faqs: [
      {
        q: "Can you move us outside office hours?",
        a: "In most cases, yes. Tell us the window you need and we'll confirm availability when we quote.",
      },
      {
        q: "Do you handle IT equipment?",
        a: "We pack, transport and reposition IT hardware carefully. Disconnecting and reconnecting systems is usually handled by your own IT team or provider — tell us the arrangement and we'll plan around it.",
      },
      {
        q: "Can you store furniture we don't need straight away?",
        a: "Yes — storage can be included as part of your office move. Mention it in your quote request.",
      },
    ],
  },
  {
    slug: "commercial-moving",
    navLabel: "Commercial Removals",
    title: "Commercial Removals",
    category: "removals",
    icon: "building",
    metaTitle: "Commercial Removals & Warehouse Moves | House Moving Experts",
    metaDescription:
      "Commercial removals — shops, studios, warehouses and business premises moved across London and the UK, planned around your operation. Get a quote.",
    summary: "Business premises, retail units and warehouse moves, planned around your operation.",
    intro: [
      "Commercial moves are rarely just furniture. Stock, shelving, equipment and fit-out all have to come out in the right order and go back in without holding up trading.",
      "We handle business relocations across London and the UK, including warehouse and stockroom moves, with a plan agreed before anyone picks up a box.",
    ],
    blocks: [
      {
        heading: "What's included",
        items: [
          "A walk-through and written move plan",
          "Dismantling and reassembling racking, shelving and fixtures where practical",
          "Careful handling of stock, equipment and fit-out",
          "Phased moves so trading or production can continue",
          "Storage arranged where dates don't line up",
        ],
      },
      {
        heading: "We move",
        items: [
          "Retail units and showrooms",
          "Warehouses and stockrooms",
          "Workshops and studios",
          "Business storage and archive moves",
          "Mixed office and commercial premises",
        ],
      },
    ],
    highlights: [
      {
        title: "Planned in phases",
        body: "We can move you in stages so the business keeps running while the relocation happens.",
      },
      {
        title: "Warehouse moves included",
        body: "Stock, racking and equipment moves are part of our commercial service — you don't need a separate contractor.",
      },
      {
        title: "One team, start to finish",
        body: "The same team plans the move, carries it out and finishes the job.",
      },
    ],
    faqs: [
      {
        q: "Do you move warehouses and stockrooms?",
        a: "Yes. Warehouse and stockroom moves are handled as part of our commercial removals service.",
      },
      {
        q: "Can the move be done in stages?",
        a: "Yes — phased moves are common for businesses that can't close. We'll agree the sequence with you before we start.",
      },
      {
        q: "Can you work overnight?",
        a: "Out-of-hours moves can usually be arranged. Tell us the window you need when you request a quote.",
      },
    ],
  },
  {
    slug: "local-removals",
    navLabel: "Local Removals",
    title: "Local Removals in London",
    category: "removals",
    icon: "mapPin",
    metaTitle: "Local Removals in London | House Moving Experts",
    metaDescription:
      "Local removals across London. Short moves, flat moves and single-item moves handled quickly and carefully by a London-based team. Get a free quote.",
    summary: "Short moves across London — flats, single rooms and moves just around the corner.",
    intro: [
      "A move across the borough still needs doing properly. Narrow stairwells, permit parking, lift bookings and a two-hour loading window are all easier with a team that works in London every day.",
      "We handle local moves of every size, from a single sofa to a full house a few streets away.",
    ],
    blocks: [
      {
        heading: "What's included",
        items: [
          "Furniture wrapped and protected, even for a short journey",
          "Help with lifts, stairs and awkward access",
          "Advice on parking and loading restrictions",
          "Single-item and part moves",
          "Same-day availability where we have a team free",
        ],
      },
      {
        heading: "Typical local moves",
        items: [
          "Flat and house shares",
          "Moving in with a partner",
          "Student and first-time moves",
          "Moving a few large items only",
          "Moving into or out of storage",
        ],
      },
    ],
    highlights: [
      {
        title: "London know-how",
        body: "We plan around parking, permits, red routes and loading bays instead of finding out about them on the day.",
      },
      {
        title: "Right-sized team",
        body: "You get the crew and vehicle the job actually needs — not more, not less.",
      },
      {
        title: "Quick to arrange",
        body: "Local moves can often be booked at short notice. Call and we'll tell you honestly what's available.",
      },
    ],
    faqs: [
      {
        q: "Do you do small, single-item moves?",
        a: "Yes. Tell us what needs moving and where it's going and we'll quote for it.",
      },
      {
        q: "Can you help with parking permits?",
        a: "We'll advise on access and loading, but suspended-bay or permit applications are usually made by the resident or business. We'll tell you what's needed when we quote.",
      },
      {
        q: "How quickly can you come out?",
        a: "Sometimes the same day, depending on team availability. Give us a call and we'll tell you straight away.",
      },
    ],
  },
  {
    slug: "long-distance-moving",
    navLabel: "Long-Distance Removals",
    title: "Long-Distance Removals",
    category: "removals",
    icon: "route",
    metaTitle: "Long-Distance Removals from London | House Moving Experts",
    metaDescription:
      "Moving out of London or across the country? We handle long-distance removals UK-wide, with careful packing, secure loading and clear arrival times. Get a quote.",
    summary:
      "Moving out of London or across the country, with everything packed to travel properly.",
    intro: [
      "A long move puts everything you own on the road for hours. That changes how it should be packed, loaded and secured — and it makes clear communication about arrival times far more important.",
      "We are London-based and move customers to destinations across the UK. You'll know the plan for the day, who's driving, and roughly when to expect us at the other end.",
    ],
    blocks: [
      {
        heading: "What's included",
        items: [
          "Packing that's built for distance, not just for the van",
          "Furniture wrapped and secured for a longer journey",
          "A clear plan for loading, travel and unloading times",
          "Updates on the day so you're not waiting in an empty house",
          "Storage where your dates don't line up",
        ],
      },
      {
        heading: "Common long-distance moves",
        items: [
          "London to the South Coast, Midlands and North",
          "Moving out of London to the countryside",
          "Relocating for a new job",
          "Moving back home or downsizing",
          "Two-property and split moves",
        ],
      },
    ],
    highlights: [
      {
        title: "Packed to travel",
        body: "Long journeys need more protection, not less. We pack and load accordingly.",
      },
      {
        title: "Clear arrival times",
        body: "You'll get realistic timings and updates rather than a vague window.",
      },
      {
        title: "London to anywhere in the UK",
        body: "We're based in London and move customers all over the country.",
      },
    ],
    faqs: [
      {
        q: "Will my move be completed in one day?",
        a: "Most long-distance moves are, but it depends on distance, access and how much there is. We'll tell you honestly when we quote.",
      },
      {
        q: "What if my completion date moves?",
        a: "Tell us as soon as you know. Chains slip constantly and we plan for it — that's why our quote form lets you say your date is approximate or flexible.",
      },
      {
        q: "Can you store our things between properties?",
        a: "Yes. Storage can be built into a long-distance move if there's a gap between your dates.",
      },
    ],
  },
  {
    slug: "international-moving",
    navLabel: "International Removals",
    title: "International Removals",
    category: "removals",
    icon: "globe",
    metaTitle: "International Removals from London | House Moving Experts",
    metaDescription:
      "Moving a home or business abroad? We arrange international removals from London, with packing built for long journeys and a quote tailored to your destination.",
    summary: "Moving a home or a business abroad, packed and planned for the journey.",
    intro: [
      "Moving abroad is a different kind of move. Timings are longer, packing has to survive more handling, and the paperwork matters as much as the loading.",
      "We arrange international removals for households and businesses leaving London and the UK. Because every destination is different, international moves are always quoted individually — tell us where you're going and what's coming with you.",
    ],
    blocks: [
      {
        heading: "What we cover",
        items: [
          "European removals",
          "International home moves",
          "International business relocations",
          "Packing built for international transit",
          "A custom quote for your destination and volume",
        ],
      },
      {
        heading: "What we'll ask you",
        items: [
          "Where you're moving to and roughly when",
          "The size of the property you're leaving",
          "Whether you need full or part packing",
          "Any specialist or high-value items",
          "Whether anything needs storing before it travels",
        ],
      },
    ],
    highlights: [
      {
        title: "Quoted properly",
        body: "International moves are priced on destination, volume and timing — not from a generic table.",
      },
      {
        title: "Packed for the journey",
        body: "Items travelling internationally are handled more times. We pack for that.",
      },
      {
        title: "Homes and businesses",
        body: "We move households relocating abroad and businesses opening up overseas.",
      },
    ],
    faqs: [
      {
        q: "Which countries do you move to?",
        a: "Tell us your destination when you request a quote and we'll confirm what we can arrange for that route.",
      },
      {
        q: "How is an international move priced?",
        a: "On volume, destination, timing and how much packing you'd like. That's why we quote each international move individually.",
      },
      {
        q: "How far ahead should I get in touch?",
        a: "As early as possible. International moves need more lead time than a UK move, and early planning gives you more options.",
      },
    ],
  },
  {
    slug: "packing-and-unpacking-services",
    navLabel: "Packing & Unpacking",
    title: "Packing & Unpacking Services",
    category: "support",
    icon: "package",
    metaTitle: "Packing & Unpacking Services | House Moving Experts",
    metaDescription:
      "Full packing, part packing, fragile packing and unpacking. Let our team pack your home properly — or just the things you'd rather not do yourself.",
    summary: "Full packing, fragile-only, or just the rooms you'd rather not do yourself.",
    intro: [
      "Packing is where most of the work in a move actually is — and where most of the damage happens when it's rushed the night before.",
      "We can pack your whole home, focus on the fragile things, or take on the few rooms you're dreading. At the other end, we can unpack too, so you're not living out of boxes for a fortnight.",
    ],
    blocks: [
      {
        heading: "Our packing options",
        items: [
          "Full packing — we pack the whole property for you",
          "Part packing — we take on selected rooms or items",
          "Fragile packing — glassware, china, mirrors, artwork and delicate pieces",
          "Unpacking — boxes emptied and items placed where you want them",
          "Packing materials — boxes and materials supplied for the job",
        ],
      },
      {
        heading: "Also available",
        items: [
          "Furniture dismantling before packing",
          "Reassembly at your new home",
          "Wardrobe and hanging-clothes packing",
          "Labelling by room for an easier unpack",
          "Removing packing materials once you're settled",
        ],
      },
    ],
    highlights: [
      {
        title: "As much or as little as you want",
        body: "Some customers hand over the whole house. Others just want the kitchen and the china doing. Both are fine.",
      },
      {
        title: "Fragile things packed properly",
        body: "Glass, china, mirrors and artwork are packed with the protection they need for the journey.",
      },
      {
        title: "Unpacking too",
        body: "We can empty boxes and put things where you want them, so your first night in the new place is a normal one.",
      },
    ],
    faqs: [
      {
        q: "Can you pack the day before the move?",
        a: "Yes — pre-move packing is common, especially for larger homes. We'll agree the schedule with you when we quote.",
      },
      {
        q: "Do you supply boxes?",
        a: "Yes, packing materials can be supplied as part of your quote. Tell us if you'd like them.",
      },
      {
        q: "Can I pack some of it myself?",
        a: "Absolutely. Part packing is one of our most popular options — you do the straightforward boxes and we handle the rest.",
      },
    ],
  },
  {
    slug: "storage-services",
    navLabel: "Storage",
    title: "Storage",
    category: "support",
    icon: "warehouse",
    metaTitle: "Storage for House & Office Moves | House Moving Experts",
    metaDescription:
      "Storage that fits around your move. We arrange storage when your dates don't line up, while you renovate, downsize or relocate a business. Get a quote.",
    summary: "For when your moving dates don't line up — or you need space in between.",
    intro: [
      "Storage is usually a moving problem, not a storage problem. Your completion dates don't line up, the renovation isn't finished, or the new office isn't ready.",
      "We can build storage into your move so your belongings go straight from one to the other, without you arranging it separately or moving everything twice.",
    ],
    blocks: [
      {
        heading: "When storage helps",
        items: [
          "Your moving-out and moving-in dates don't line up",
          "You're renovating before you move in",
          "You're downsizing and not everything fits yet",
          "You're relocating temporarily or working away",
          "A business relocation is happening in phases",
          "You're decluttering before the move to make the day easier",
        ],
      },
      {
        heading: "How it works with your move",
        items: [
          "We collect as part of your normal move",
          "Items are inventoried so you know what's where",
          "Everything is wrapped and protected before it goes in",
          "We deliver to your new property when you're ready",
          "Short and longer-term arrangements available",
        ],
      },
    ],
    highlights: [
      {
        title: "Built into your move",
        body: "One team, one plan — you don't have to arrange storage and removals separately.",
      },
      {
        title: "As long as you need",
        body: "A few days between completions or a longer gap while you renovate.",
      },
      {
        title: "Handled once",
        body: "Your things are packed and protected before they go into storage, not repacked later.",
      },
    ],
    faqs: [
      {
        q: "How long can I store my things for?",
        a: "From a few days to longer-term. Tell us roughly how long you need when you request a quote and we'll confirm the options.",
      },
      {
        q: "Can I access my items while they're stored?",
        a: "Access arrangements depend on how your items are stored, so please ask us when you book and we'll confirm exactly what's possible.",
      },
      {
        q: "Do you deliver back to my new home?",
        a: "Yes. Redelivery is arranged for the date you need, as part of the same move.",
      },
    ],
  },
  {
    slug: "furniture-dismantling-reassembly",
    navLabel: "Furniture Dismantling & Reassembly",
    title: "Furniture Dismantling & Reassembly",
    category: "support",
    icon: "wrench",
    metaTitle: "Furniture Dismantling & Reassembly | House Moving Experts",
    metaDescription:
      "Beds, wardrobes, desks and flat-pack taken apart before your move and put back together at your new home by our removals team. Add it to your quote.",
    summary: "Beds, wardrobes and flat-pack taken apart, moved, and put back together.",
    intro: [
      "Some furniture simply won't come down the stairs in one piece — and some of it shouldn't be moved assembled even if it fits.",
      "We can take furniture apart before the move and put it back together in the right room at your new home, so you're not sleeping on a mattress on the floor.",
    ],
    blocks: [
      {
        heading: "Commonly dismantled and reassembled",
        items: [
          "Beds and bed frames",
          "Wardrobes and flat-pack storage",
          "Desks and office furniture",
          "Dining tables",
          "Shelving units",
        ],
      },
      {
        heading: "How it works",
        items: [
          "Tell us what needs dismantling when you request your quote",
          "Fixings are bagged and labelled so nothing goes missing",
          "Parts are wrapped and protected in transit",
          "Reassembly happens in the room you want it in",
          "We take the packaging away with us",
        ],
      },
    ],
    highlights: [
      {
        title: "Nothing gets lost",
        body: "Screws and fixings are bagged and labelled to the piece they belong to.",
      },
      {
        title: "Rebuilt where you want it",
        body: "We reassemble in the room it's going in, not in the hallway.",
      },
      {
        title: "Part of your move",
        body: "Add it to your quote — it's handled by the same team on the same day.",
      },
    ],
    faqs: [
      {
        q: "Is dismantling included in a house move?",
        a: "Standard items can usually be included — just tell us what's involved when you request a quote so we can plan the time for it.",
      },
      {
        q: "Can you reassemble flat-pack that came without instructions?",
        a: "Usually, yes. If a piece is unusual or we think reassembly is risky, we'll tell you before we take it apart.",
      },
      {
        q: "What about built-in wardrobes?",
        a: "Built-in and fitted furniture is assessed case by case. Send us a photo with your quote request and we'll advise.",
      },
    ],
  },
];

export const removalsServices = services.filter((s) => s.category === "removals");
export const supportServices = services.filter((s) => s.category === "support");

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
