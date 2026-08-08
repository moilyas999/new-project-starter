/**
 * Options for the multi-step quote flow.
 *
 * These mirror the information the old enquiry form collected (name, phone,
 * email, service, pickup, delivery, date, notes) but broken into steps a
 * person moving home can actually answer.
 */

export const moveTypes = [
  { value: "house", label: "House move", hint: "A whole house, at any size" },
  { value: "flat", label: "Flat move", hint: "Flat, apartment or maisonette" },
  { value: "office", label: "Office move", hint: "Desks, furniture and IT" },
  { value: "commercial", label: "Commercial move", hint: "Retail, warehouse or premises" },
  { value: "other", label: "Something else", hint: "A few items, storage, or not sure" },
] as const;

export const propertySizes = [
  "Studio",
  "1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
  "4 bedrooms",
  "5+ bedrooms",
  "Small office (1–10 people)",
  "Medium office (11–50 people)",
  "Large office (50+ people)",
  "A few items only",
  "Not sure yet",
] as const;

export const propertyTypes = [
  "House",
  "Flat / apartment",
  "Maisonette",
  "Bungalow",
  "Office",
  "Commercial unit",
  "Storage unit",
  "Other",
] as const;

export const floorOptions = [
  "Ground floor",
  "1st floor",
  "2nd floor",
  "3rd floor",
  "4th floor or higher",
  "Multiple floors",
] as const;

export const liftOptions = ["Yes, there's a lift", "No lift", "Not applicable"] as const;

export const dateStatuses = [
  { value: "confirmed", label: "Date confirmed", hint: "We've exchanged / it's locked in" },
  { value: "approximate", label: "Date approximate", hint: "Roughly this week or month" },
  { value: "flexible", label: "I'm flexible", hint: "Work around what suits you" },
  { value: "unknown", label: "I don't know yet", hint: "Still waiting on the chain" },
] as const;

export const itemCategories = [
  "Large furniture (sofas, wardrobes, beds)",
  "White goods & appliances",
  "Fragile items (glass, china, mirrors)",
  "Artwork or antiques",
  "Piano or other specialist item",
  "Office equipment & IT",
  "Garden furniture / shed contents",
  "Loft or garage contents",
] as const;

export const extraServices = [
  "Professional packing",
  "Unpacking at the new property",
  "Packing materials & boxes",
  "Furniture dismantling",
  "Furniture reassembly",
  "Storage",
] as const;

export const contactPreferences = ["Phone", "Email", "WhatsApp"] as const;
