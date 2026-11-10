// ================= EDIT YOUR CONTENT HERE =================
var NAME = "Ajay Kumar Ojha";
var TITLE = "3D Artist & Visualizer";
var EMAIL = "ajaykumarojha16@gmail.com";
var PHONE = "+91-8802820881";
var LOCATION = "Sarita Vihar, New Delhi 110076";
var RESUME_PDF = "assets/ajay_kumar_ojha_resume.pdf";
var EXT = "jpg"; // image type: jpg, png or webp (lowercase, must match your files)
var BEHANCE = "https://behance.net"; // your Behance profile URL (used when a project has no own link)
var WEB3FORMS_KEY = "30d6000f-8052-492e-9921-cc05a0f0aaf8";

// Projects Archive — Featuring Ajay's Real 3D Visualisation Works
var P = [
  {
    title: "Karim's Restaurant — Kolkata",
    cat: "Commercial",
    slug: "karim-kolkata",
    imagesCount: 7,
    mat: "Smoked walnut, brass fretwork, fluted columns, velvet upholstery, heritage archways",
    problem: "High-end 3D architectural and interior visualization for the historic Mughal cuisine brand in Kolkata, requiring regal grandeur paired with high-volume hospitality flow.",
    arch: "Heritage arched ceiling portals, custom illuminated brass chandeliers, ambient cove illumination, and grand exterior storefront facade designed for visual impact.",
    metrics: "Autodesk 3ds Max · V-Ray · Adobe Photoshop · 1920×1080 Widescreen",
    year: "2023",
    location: "Kolkata, India",
    live: "",
    behance: ""
  },
  {
    title: "Pind Balluchi Restaurant",
    cat: "Commercial",
    slug: "pind-baluchi",
    imagesCount: 8,
    mat: "Carved teak, exposed brick, mud plaster finish, wrought iron, copper vessels",
    problem: "Reimagining the rustic heritage village dining aesthetic into an immersive, atmospheric restaurant & bar dining space.",
    arch: "Handcrafted timber ceiling pergolas, traditional terracotta pottery alcoves, carved wood entrance doorway, and layered 2400K warm atmospheric lighting.",
    metrics: "Autodesk 3ds Max · AutoCAD · Lumion · 1920×1080 Widescreen",
    year: "2023",
    location: "Delhi NCR",
    live: "",
    behance: ""
  },
  {
    title: "Smart Dukan Retail Chain",
    cat: "Commercial",
    slug: "smart-dukan",
    imagesCount: 9,
    mat: "Acrylic solid surface, powder-coated steel, glass showcases, LED lightboxes, ACP exterior",
    problem: "Standardized modern retail outlet store concept engineered for multi-location rollout across Delhi NCR.",
    arch: "High-visibility retail showroom layout with central demo counters, perimeter branded display bays, and striking exterior facade with illuminated 3D signage.",
    metrics: "Autodesk 3ds Max · AutoCAD · CorelDraw · Delhi Signage",
    year: "2020",
    location: "Delhi NCR",
    live: "",
    behance: ""
  },
  {
    title: "Patanjali Mega Store",
    cat: "Commercial",
    slug: "patanjali-mega-store",
    imagesCount: 3,
    mat: "Natural pine wood, green branding accents, modular retail gondolas, steel shelving",
    problem: "Large-format retail outlet and flagship supermarket spatial interior planning and 3D visualization.",
    arch: "Wide ergonomic customer circulation aisles, branded wooden display plinths, and high-efficiency commercial track lighting system.",
    metrics: "Autodesk 3ds Max · AutoCAD · V-Ray · Delhi Signage",
    year: "2021",
    location: "Commercial Retail",
    live: "",
    behance: ""
  },
  {
    title: "Linen House Residence",
    cat: "Residential",
    slug: "linen-house",
    imagesCount: 4,
    mat: "Raw Belgian linen, smoked oak, lime plaster, silver travertine",
    problem: "A full restoration of a light-filled duplex apartment seeking visual calm, acoustic softness, and honest tactile materials to unwind from urban density.",
    arch: "Monolithic structural volumes, hand-applied lime plaster to soften ambient light, and floor-to-ceiling smoked oak joinery concealing storage seamlessly.",
    metrics: "Autodesk 3ds Max · D5 Render · Photoshop · 1920×1080 Widescreen",
    year: "2025",
    location: "DLF Phase 1, Gurgaon",
    live: "",
    behance: ""
  },
  {
    title: "Oak & Stone Residence",
    cat: "Residential",
    slug: "oak-and-stone-residence",
    imagesCount: 4,
    mat: "European white oak, silver travertine, brushed brass, fluted glass",
    problem: "Designing an enduring family sanctuary with generous natural illumination, celebrating the contrast between warm timber and monumental masonry.",
    arch: "Monolithic travertine kitchen islands anchor the open-plan living pavilion. Subtle brass reveal details and pocket doors create seamless visual transitions.",
    metrics: "Autodesk Maya · 3ds Max · V-Ray · Photometric Lighting",
    year: "2024",
    location: "ARGROUP Design Studio, New Delhi",
    live: "",
    behance: ""
  },
  {
    title: "Courtyard Villa",
    cat: "Residential",
    slug: "courtyard-villa",
    imagesCount: 4,
    mat: "Terracotta clay, charred cedar, low-iron glass, poured terrazzo",
    problem: "Harmonising modern indoor-outdoor tropical architecture with passive cross-ventilation and monsoon climate resilience.",
    arch: "All living spaces wrap around an open-air central water courtyard with lush indigenous flora. Deep roof overhangs eliminate boundaries between nature and shelter.",
    metrics: "AutoCAD · 3ds Max · Lumion · Daylighting Study",
    year: "2022",
    location: "Residential Project",
    live: "",
    behance: ""
  },
  {
    title: "Minimal Quartzite Kitchen",
    cat: "Residential",
    slug: "minimal-kitchen",
    imagesCount: 4,
    mat: "Quarter-sawn oak, Taj Mahal quartzite, matte black steel, clay plaster",
    problem: "A high-performance chef's culinary space stripped of visual clutter, focusing on ergonomic touchpoints and honest stone fabrication.",
    arch: "Handleless cabinetry with 45-degree chamfer edges, integrated cooktop with downdraft ventilation, and an uninterrupted 3.8-meter quartzite monolith.",
    metrics: "3ds Max · V-Ray · Millwork Detailing · D5 Render",
    year: "2022",
    location: "Gurgaon",
    live: "",
    behance: ""
  },
  {
    title: "Japandi Bedroom Concept",
    cat: "Concept",
    slug: "japandi-bedroom-concept",
    imagesCount: 4,
    mat: "Blonde ash, Washi paper, tatami mats, brushed wool",
    problem: "Synthesising Scandinavian functional minimalism with the Japanese philosophy of Wabi-sabi in a sleep retreat.",
    arch: "Low-profile platform bed floating above woven tatami, accompanied by custom floor-to-ceiling sliding Washi screen partitions that softly filter morning rays.",
    metrics: "Autodesk Maya · 3ds Max · D5 Render · 16-bit Shaders",
    year: "2025",
    location: "Concept Study",
    live: "",
    behance: ""
  },
  {
    title: "Reading Room Alcove",
    cat: "Concept",
    slug: "reading-room-concept",
    imagesCount: 4,
    mat: "American walnut, cognac saddle leather, unlacquered brass, mohair",
    problem: "An introspective private study designed for bibliophiles, with integrated book stacks and acoustically dampened reading niches.",
    arch: "Full-height walnut library shelving with concealed LED edge illumination, ergonomic fireside lounge chair, and sound-absorbing acoustic felt wall panels.",
    metrics: "3ds Max · Lumion · Photometric IES Lighting",
    year: "2024",
    location: "Concept Study",
    live: "",
    behance: ""
  },
  {
    title: "Boutique Hotel Lobby",
    cat: "Commercial",
    slug: "boutique-hotel-lobby",
    imagesCount: 4,
    mat: "Arabescato marble, fluted walnut, patinated bronze, bouclé",
    problem: "Balancing monumental grandeur with intimate hospitality checkpoints for an independent heritage boutique hotel.",
    arch: "A sequence of arched portals frames axial vistas toward an interior courtyard garden. Bespoke bronze lighting fixtures cast soft downward pools of light.",
    metrics: "Autodesk 3ds Max · V-Ray · Custom FF&E Modeling",
    year: "2023",
    location: "New Delhi",
    live: "",
    behance: ""
  },
  {
    title: "Wellness Spa Sanctuary",
    cat: "Commercial",
    slug: "wellness-spa",
    imagesCount: 4,
    mat: "Warm limewash, reclaimed teak, river stone, water features",
    problem: "Crafting a sensory subterranean sanctuary dedicated to holistic hydrotherapy and meditative mindfulness.",
    arch: "Indirect perimeter coves wash textured limewash walls with 2400K candlelight warmth. Deep teak stepping stones cross shallow reflection pools leading into private treatment chambers.",
    metrics: "3ds Max · Lumion · Lighting Simulation · Acoustic Zoning",
    year: "2023",
    location: "Commercial Project",
    live: "",
    behance: ""
  }
];

// Expertise based on Ajay Kumar Ojha's Resume:
var S = [
  ["Autodesk 3ds Max & Maya", 96, "Advanced 3D poly modeling, high-density meshes, architectural assets & VFX"],
  ["AutoCAD (2D & 3D Drafting)", 94, "Architectural plans, elevation drawings, structural layout conversion & millwork"],
  ["D5 Render & Lumion", 95, "Real-time photoreal daylighting, environmental animation & 4K cinematic walkthroughs"],
  ["Photorealistic Lighting & Texturing", 92, "PBR shaders, raytraced reflection, IES luminaire mapping & interior warmth"],
  ["Adobe Photoshop & Post-Production", 90, "Render color grading, digital matte painting, visual compositing & client decks"],
  ["CorelDraw & Commercial Signage", 88, "Retail outlet store design, exhibition signage, vectors & print marketing"]
];

// Work Experience & Career Timeline from Resume:
var L = [
  ["2025 – Present", "Exhibition & Events", "3D Designer at 4 Dimension Marcom Pvt Ltd", "Leading 3D visualization, spatial design, and immersive exhibition environments for corporate brands in Ghitorni, New Delhi."],
  ["2023 – 2024", "Commercial & Residential", "3D Designer at ARGROUP Design Studio", "Completed 2 years delivering high-end 3D architectural renders and interior walkthroughs for commercial & residential projects in Kalkaji, New Delhi."],
  ["2021 – 2022", "Architecture + Interiors", "3D Designer (DLF Phase 1, Gurgaon)", "2 years specializing in luxury residential architectural models, exterior elevations, and detailed interior visualisations."],
  ["2017 – 2020", "Retail & Signage", "3D Designer at Delhi Signage", "Spearheaded 3 years of 3D outlet store concepts, exterior commercial signage, retail spaces, and interior fit-outs in Okhla Phase-2, New Delhi."],
  ["2015 – 2017", "Structure & Design", "3D Designer at Structure & Designs Pvt Ltd", "3 years producing 3D architectural models, CAD conversion, and spatial visualisations in Indirapuram Ghaziabad."]
];

// ================= END OF CONTENT (do not edit below) =================
P.forEach(function(p, i) {
  p.i = i;
  if (!p.slug) {
    p.slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
});