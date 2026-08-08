/**
 * Areas we cover.
 *
 * These power the /areas-we-cover hub and the /house-removals/$area local
 * landing pages. The Slough page URL (/house-removals/slough) already exists
 * and is indexed on the live domain — it must keep working. See
 * docs/seo-migration.md before adding, renaming or removing a slug.
 *
 * Copy rule: TTT is London-based and travels. Nothing here should imply a
 * branch, depot or office in the area.
 */

export type Area = {
  slug: string;
  /** Place name as customers would say it. */
  name: string;
  /** County / part of London — used in headings and meta. */
  region: string;
  /** One-line summary for the hub page. */
  summary: string;
  /** Local detail that makes the page genuinely useful, not filler. */
  intro: string[];
  /** Practical, honest notes about moving in this area. */
  localNotes: string[];
  /** Whether this URL already existed on the legacy site. */
  legacyUrl?: string;
};

export const areas: Area[] = [
  {
    slug: "slough",
    name: "Slough",
    region: "Berkshire",
    legacyUrl: "/house-removals/slough",
    summary: "Berkshire moves, in and out of London, handled end to end.",
    intro: [
      "Slough sits on the edge of the M4 corridor, which makes it one of the most common moves we do in either direction — families moving out of west London for more space, and people moving into town for work.",
      "TTT covers Slough and the surrounding Berkshire towns for house moves, flat moves and office relocations, with the same team from packing through to reassembly.",
    ],
    localNotes: [
      "Straightforward access from London via the M4 means most Slough moves are comfortably a single-day job.",
      "Plenty of moves here involve newer flats with shared parking and lift access — tell us about both when you request a quote so we bring the right crew.",
      "Moving out of London to Slough often means a bigger property at the other end, so it's worth asking about packing to keep moving day short.",
    ],
  },
  {
    slug: "croydon",
    name: "Croydon",
    region: "South London",
    summary: "South London house and office moves, from flats to family homes.",
    intro: [
      "Croydon covers everything from tower-block flats near the centre to larger houses out towards Shirley and Purley, and the two need quite different moves.",
      "TTT handles house removals, flat moves and office relocations across Croydon and the surrounding south London boroughs.",
    ],
    localNotes: [
      "Central Croydon moves often mean lifts, loading bays and time limits — worth confirming before the day.",
      "The outer areas are mostly houses with driveways or on-street parking, which usually makes for a quicker load.",
      "Plenty of office moves here too, including out-of-hours relocations.",
    ],
  },
  {
    slug: "camden",
    name: "Camden",
    region: "North London",
    summary: "Period conversions, narrow stairs and permit parking — planned for.",
    intro: [
      "Camden is full of Victorian conversions, and most of the difficulty in a Camden move is between your front door and the van rather than on the road.",
      "TTT moves flats, houses and offices across Camden and the neighbouring north London boroughs.",
    ],
    localNotes: [
      "Narrow staircases and tight landings are the norm — tell us about the access and we'll bring the right team and equipment.",
      "Controlled parking zones apply across most of the borough, so we plan loading before the day rather than on it.",
      "Larger items sometimes need dismantling to come out at all. We can handle that as part of the move.",
    ],
  },
  {
    slug: "islington",
    name: "Islington",
    region: "North London",
    summary: "Flat and townhouse moves in one of London's tightest-access boroughs.",
    intro: [
      "Islington moves are usually about access: terraced streets, upper-floor flats, and very little room to park a van for long.",
      "TTT covers Islington for house removals, flat moves, packing and office relocations.",
    ],
    localNotes: [
      "Upper-floor flats without lifts are common — the crew size matters more here than the vehicle size.",
      "Loading windows are often short, so we plan what comes out first before we arrive.",
      "Storage can help if you're moving between properties with a gap in the middle.",
    ],
  },
  {
    slug: "hackney",
    name: "Hackney",
    region: "East London",
    summary: "Flat shares, warehouse conversions and studio moves across east London.",
    intro: [
      "Hackney has an unusual mix — Victorian terraces, ex-industrial conversions and a lot of shared households moving at short notice.",
      "TTT handles house and flat removals, part moves and commercial relocations across Hackney and east London.",
    ],
    localNotes: [
      "Conversion flats often have awkward entrances and unusually large rooms to empty — worth mentioning when you request a quote.",
      "Short-notice and single-room moves are common here and we can often help quickly.",
      "Studios and small businesses in the area move regularly; we can work around your trading hours.",
    ],
  },
  {
    slug: "wandsworth",
    name: "Wandsworth",
    region: "South West London",
    summary: "Family homes, flats and moves out of London to the south west.",
    intro: [
      "Wandsworth sees a lot of moves in both directions — families upsizing within the borough, and families leaving London altogether for the south west.",
      "TTT covers Wandsworth for house removals, packing and long-distance moves out of the capital.",
    ],
    localNotes: [
      "Larger family homes here often benefit from a full or part packing service to keep moving day manageable.",
      "Moves leaving London to the coast or the west country are a common long-distance route for us.",
      "Riverside developments usually mean lift bookings and loading bays — let us know and we'll plan around them.",
    ],
  },
  {
    slug: "ealing",
    name: "Ealing",
    region: "West London",
    summary: "West London moves, and the well-worn route out towards the M4.",
    intro: [
      "Ealing is a mix of large period houses and modern flats, and it sits on the natural route out of London towards Slough, Reading and the west.",
      "TTT handles house removals, office moves and packing across Ealing and west London.",
    ],
    localNotes: [
      "Bigger houses here often mean loft and garage contents too — include them in your quote request so the day isn't a surprise.",
      "Moves heading west along the M4 corridor are one of our most frequent long-distance routes.",
      "Newer developments usually have lift and loading-bay rules; tell us and we'll book around them.",
    ],
  },
  {
    slug: "richmond",
    name: "Richmond",
    region: "South West London",
    summary: "Careful moves for period properties and narrow riverside streets.",
    intro: [
      "Richmond has a high proportion of period properties, and often furniture and pieces that need genuine care rather than speed.",
      "TTT covers Richmond and the surrounding south west London area for house removals, fragile packing and storage.",
    ],
    localNotes: [
      "Narrow streets and restricted parking near the river need planning ahead of the day.",
      "Fragile packing is worth considering if you have glassware, mirrors or artwork.",
      "Storage is often useful here when purchases and sales complete on different days.",
    ],
  },
  {
    slug: "kingston-upon-thames",
    name: "Kingston upon Thames",
    region: "South West London",
    summary: "House moves, student moves and business relocations in Kingston.",
    intro: [
      "Kingston covers family houses, town-centre flats and a large student population, so moves here range from a single room to a full house.",
      "TTT handles removals of every size across Kingston and the surrounding boroughs.",
    ],
    localNotes: [
      "Town-centre access can be restricted at busy times, so we agree the loading window in advance.",
      "Single-room and part moves are common and quick to arrange.",
      "Plenty of local businesses relocating within the area — office moves can be done out of hours.",
    ],
  },
  {
    slug: "watford",
    name: "Watford",
    region: "Hertfordshire",
    summary: "Hertfordshire moves and the route north out of London.",
    intro: [
      "Watford is a common destination for people leaving north London for more space, and a common starting point for moves further north.",
      "TTT covers Watford and the surrounding Hertfordshire towns for house removals, packing and storage.",
    ],
    localNotes: [
      "Easy access from London via the M1 and A41 usually makes for a single-day move.",
      "Larger properties at the destination often mean it's worth adding unpacking to your quote.",
      "If your dates don't line up, storage can bridge the gap.",
    ],
  },
  {
    slug: "hounslow",
    name: "Hounslow",
    region: "West London",
    summary: "West London removals, including moves around the Heathrow corridor.",
    intro: [
      "Hounslow moves a lot of people in and out — it's a west London borough with strong transport links and a steady turnover of rented and owned homes.",
      "TTT handles house removals, flat moves and international removals for customers relocating from the area.",
    ],
    localNotes: [
      "Flat moves at short notice are common and we can often help quickly.",
      "We handle international removals for households relocating abroad from west London.",
      "Parking near the busier main roads needs planning; tell us the address and we'll advise.",
    ],
  },
  {
    slug: "barnet",
    name: "Barnet",
    region: "North London",
    summary: "Family home moves across north London and out into Hertfordshire.",
    intro: [
      "Barnet is largely family housing, which means larger moves, more furniture to dismantle, and lofts and garages that get forgotten until the day.",
      "TTT covers Barnet for house removals, packing, dismantling and storage.",
    ],
    localNotes: [
      "Larger homes are usually best served by a part or full packing service.",
      "Bed frames and wardrobes often need dismantling — we can include it in the quote.",
      "Moves continuing north into Hertfordshire are straightforward from here.",
    ],
  },
];

export const getArea = (slug: string): Area | undefined => areas.find((a) => a.slug === slug);
