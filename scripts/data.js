/**
 * Faith Automation Works - Technical Project & Infrastructure Data
 * Extracted and compiled from official engineering profile
 */

export const siteConfig = {
  name: "Faith Automation Works",
  tagline: "Automotive Assembly Lines, Robotic Cells & Precision Tool Room",
  founded: "June 2015",
  director: "Mr. Kaushal K Khandelwal",
  experience: "10+ Years in Automotive Engineering & Mechanical Design",
  headquarters: "Plot No. 711B, Ground Floor, Pace City II, Sector-37, Gurgaon – 122001 (Haryana), India",
  phones: ["+91 9990813151", "+91 9456258802", "+91 9012248578"],
  emails: ["kaushalkhandelwal@faithautomation.co.in", "info@faithautomation.co.in"],
  website: "www.faithautomation.co.in",
  metrics: [
    { value: "10+", label: "Years Engineering Leadership", sub: "Since June 2015" },
    { value: "50+", label: "Turnkey SPMs & Lines Delivered", sub: "Poka-Yoke & Industry 4.0" },
    { value: "30+", label: "Tier-1 Automotive Clients", sub: "Across India & Global OEM Supply" },
    { value: "100%", label: "Quality & On-Time Compliance", sub: "Zero-Defect Philosophy" }
  ]
};

export const capabilityPills = [
  {
    icon: "layers",
    title: "Turnkey Assembly Lines",
    desc: "Multi-station ergonomic lines with Poka-Yoke, automatic vision inspection, and digital traceability."
  },
  {
    icon: "cpu",
    title: "Robotic Automation Cells",
    desc: "6-Axis robotic welding, gantry pick-and-place, and automated part loading/unloading systems."
  },
  {
    icon: "eye",
    title: "Vision & EOL Testing",
    desc: "Child part presence, color detection, angle checking, ALT/WLT leak testing, and torque verification."
  },
  {
    icon: "tool",
    title: "In-House Precision Tool Room",
    desc: "Equipped with Manford VMC, M1TR DRO milling, cylindrical grinding, and precision surface grinders."
  },
  {
    icon: "shield-check",
    title: "Tier-1 Proven Quality",
    desc: "Supplying trusted equipment to Hanon, Lumax, JRG, Hero Motors, BorgWarner, and PPAP Automotive."
  }
];

export const projectCatalog = [
  {
    id: "shark-fin",
    category: "assembly",
    title: "Shark Fin Antenna Multi-Station Assembly Line",
    client: "Tier-1 Automotive Electronics",
    image: "/assets/images/shark-fin-assembly.jpg",
    specs: {
      "Cycle Time": "< 18 Seconds",
      "Stations": "Multi-Station Ergonomic Line",
      "Inspection": "Integrated Camera & Continuity Check",
      "Poka-Yoke": "Digital Sensor Seating & Screw Fastening"
    },
    description: "High-throughput progressive assembly line for automotive shark fin antenna modules, featuring aluminum structural profiles, ESD workbenches, automated torque screwdriving, and optical part presence sensors."
  },
  {
    id: "bumper-assembly",
    category: "assembly",
    title: "Automotive Bumper Assembly & Pressing Rig",
    client: "Automotive Exterior Systems",
    image: "/assets/images/bumper-assembly.jpg",
    specs: {
      "Clamping": "Multi-Point Pneumatic Cylinders",
      "Lighting": "Integrated High-Lumen Inspection Canopy",
      "Control": "PLC Touchscreen HMI with Preset Profiles",
      "Safety": "Dual-Hand Anti-Tie-Down Triggers"
    },
    description: "Heavy-duty bumper bracket and garnish assembly station engineered with precision contour fixtures, pneumatic clamping, overhead task lighting, and synchronized safety controls."
  },
  {
    id: "robotic-welding-cell",
    category: "robotics",
    title: "Turnkey Robotic Welding Cell (YHB Model)",
    client: "Automotive Structural Components",
    image: "/assets/images/robotic-welding-cell.jpg",
    specs: {
      "Robot": "6-Axis Industrial Articulated Robot",
      "Positioner": "Dual-Station Indexing Turntable",
      "Safety": "Interlocked Optical Light Curtains & Steel Mesh Cage",
      "Control": "Custom Operator Console & Teach Pendant Dock"
    },
    description: "Fully automated robotic welding enclosure delivering rapid cycle times and consistent weld beads for automotive frame assemblies, complete with fume extraction ports and safety interlocks."
  },
  {
    id: "yfg-assembly-line",
    category: "assembly",
    title: "YFG Automated Conveyor Assembly Line",
    client: "Automotive Tier-1 Sub-Assemblies",
    image: "/assets/images/yfg-assembly-line.jpg",
    specs: {
      "Conveyor": "Synchronous Palletized Transfer System",
      "Traceability": "2D Barcode Scanner at Each Station",
      "Verification": "Automated Height & Seating Probes",
      "Architecture": "Modular Aluminum Frame"
    },
    description: "State-of-the-art multi-operator flow line designed for high-mix automotive components, minimizing material handling fatigue and ensuring error-proof assembly sequences."
  },
  {
    id: "garnish-vision",
    category: "vision",
    title: "Garnish Optical Vision Inspection Machine",
    client: "JRG Automotive Bawal",
    image: "/assets/images/garnish-vision.jpg",
    specs: {
      "Cameras": "High-Resolution Industrial Telecentric Lens",
      "Checking": "Clip Presence, Color Matching, Alignment",
      "Output": "OK / NG Reject Mechanism with Sound/Light Beacon",
      "Cycle Time": "< 6 Seconds per Part"
    },
    description: "Autonomous vision inspection station purpose-built for automotive interior garnish trims, detecting missing clips, surface defects, and positional tolerance within ±0.05 mm."
  },
  {
    id: "lever-assembly",
    category: "assembly",
    title: "YG8 & Y9T Gear Shift Lever Assembly Line",
    client: "Transmission Systems Leader",
    image: "/assets/images/lever-assembly.jpg",
    specs: {
      "Operations": "Bush Pressing, Greasing, Pin Insertion",
      "Sensors": "Linear Transducers & Load Cells",
      "Ergonomics": "Custom Tool Balancers & Component Bins",
      "Poka-Yoke": "100% Interlocked Operation Sequence"
    },
    description: "Integrated manual and pneumatic assembly cell for automotive gear lever linkages, featuring load-vs-displacement curve monitoring for precision bushing fitment."
  },
  {
    id: "dot-marking",
    category: "marking",
    title: "Pneumatic Dot Pin Marking & Verification Rig",
    client: "Engine & Powertrain Components",
    image: "/assets/images/dot-marking.jpg",
    specs: {
      "Marking Head": "Pneumatic Tungsten Carbide Stylus",
      "Readable Codes": "Alphanumeric, VIN, 2D Data Matrix",
      "Fixture": "Custom Quick-Change Pneumatic Clamp",
      "Depth Control": "Adjustable Impact Pressure (0.1 - 0.8 mm)"
    },
    description: "Robust industrial marking station for permanent serialization of automotive metal castings and structural brackets, integrated with barcode verification scanners."
  },
  {
    id: "leak-test-rig",
    category: "testing",
    title: "Oil Pan Differential Pressure Leak Test SPM",
    client: "Engine Powertrain Systems",
    image: "/assets/images/leak-test-rig.jpg",
    specs: {
      "Method": "Differential Pressure Decay (Air-to-Air)",
      "Resolution": "0.1 Pa / 0.001 sccm",
      "Sealing": "Custom Polyurethane Inflatable / Direct Plugs",
      "Certification": "NIST Traceable Calibration"
    },
    description: "Production-line End-of-Line (EOL) leak detector for automotive engine oil pans, validating sealing integrity under calibrated pneumatic pressures before assembly."
  },
  {
    id: "mahindra-w501-fixture",
    category: "fixtures",
    title: "Mahindra W501 Side Cover Checking Fixture",
    client: "JRG Automotive / Mahindra Tier-1",
    image: "/assets/images/mahindra-w501-fixture.jpg",
    specs: {
      "Base Material": "Stabilized Tool Steel & Anodized Aluminum Base",
      "Inspection": "Flush & Gap Dial Indicators + Go/No-Go Pins",
      "Accuracy": "± 0.02 mm CMM Certified",
      "Application": "Mahindra Automotive Platform"
    },
    description: "High-precision metrology checking fixture engineered to verify the profile contour, perimeter gap, and fastener hole positions on critical automotive side covers."
  },
  {
    id: "vmc-manford",
    category: "toolroom",
    title: "MANFORD High-Precision Vertical Machining Center",
    client: "In-House Tool Room Facility",
    image: "/assets/images/vmc-manford.jpg",
    specs: {
      "Working Table": "700 mm x 500 mm",
      "Spindle": "High-Speed Rigid Tapping Spindle",
      "Tolerances": "Achievable Precision within ±0.005 mm",
      "Tooling": "Direct CAM High-Speed 3D Contour Milling"
    },
    description: "Core tool room CNC machining powerhouse utilized for milling complex checking fixture profiles, precision dies, mold cavities, and custom automation brackets."
  },
  {
    id: "torque-test-machine",
    category: "testing",
    title: "Lock-to-Lock Mechanism Torque Testing Machine",
    client: "Steering & Mechanical Assemblies",
    image: "/assets/images/torque-test-machine.jpg",
    specs: {
      "Torque Sensor": "Dynamic Rotary Torque Transducer",
      "Measurement": "Peak Torque, Running Torque, Angle Profiling",
      "Display": "Digital Graphical Screen with Limit Envelopes",
      "Action": "Bi-Directional Servo Motor Drive"
    },
    description: "Precision endurance and quality test rig measuring the rotational torque resistance across full lock-to-lock travel for automotive hinges, locks, and steering gear."
  },
  {
    id: "m1tr-milling",
    category: "toolroom",
    title: "M1TR Milling Machine with Precision DRO",
    client: "In-House Tool Room Facility",
    image: "/assets/images/m1tr-milling-1.jpg",
    specs: {
      "Bed Size": "450 mm x 1050 mm",
      "Readout": "3-Axis Digital Readout (DRO)",
      "Quantity": "2 Operational Units",
      "Machining": "Fixture Bases, Precision Jigs & Slides"
    },
    description: "Heavy-duty conventional milling machines fitted with precision glass-scale DROs for rapid prototype machining, fixture base flattening, and bespoke tooling manufacture."
  }
];

export const toolRoomInventory = [
  { sNo: 1, machine: "M1TR Milling Machine with DRO", spec: "450 mm x 1050 mm Bed, 3-Axis DRO", qty: 2, status: "Active" },
  { sNo: 2, machine: "Precision Surface Grinder", spec: "12\" x 24\" High-Precision Magnetic Chuck", qty: 2, status: "Active" },
  { sNo: 3, machine: "Heavy-Duty Lathe Machine", spec: "6-Foot Bed Length, Facing & Turning", qty: 1, status: "Active" },
  { sNo: 4, machine: "Radial / Pillar Drilling Machine", spec: "Drill Capacity: 5 mm to 30 mm", qty: 3, status: "Active" },
  { sNo: 5, machine: "Cylindrical Grinding (CG) Machine", spec: "1000 mm Length x 300 mm Diameter Envelope", qty: 1, status: "Active" },
  { sNo: 6, machine: "Vertical Machining Center (VMC)", spec: "MANFORD Make, 700 mm x 500 mm Envelope", qty: 1, status: "Active" },
  { sNo: 7, machine: "Kirloskar Diesel Generator (DG Set)", spec: "20 KVA Uninterrupted Power Backup", qty: 1, status: "Active" }
];

export const clientsList = [
  { name: "Hanon Automotive Systems", plant: "Gujarat Plant", category: "Thermal & Climate Systems" },
  { name: "Hanon Climate Systems", plant: "Bhiwadi Plant", category: "HVAC & Fluid Management" },
  { name: "Lumax Auto Technologies", plant: "Manesar", category: "Lighting & Gear Shift Systems" },
  { name: "Lumax Mannoh Allied Tech", plant: "Manesar", category: "Gear Shifters & Kinematics" },
  { name: "Lumax FAE Technologies", plant: "Manesar", category: "Oxygen Sensors & Emission" },
  { name: "Lumax Yokowo Technologies", plant: "Manesar", category: "Antennas & Connectivity" },
  { name: "Hero Motors (HMC)", plant: "Gurgaon / Haridwar", category: "Two-Wheeler & Powertrain" },
  { name: "BorgWarner Emissions Systems", plant: "India Operations", category: "Powertrain & Emission SPM" },
  { name: "JRG Automotive Industries", plant: "All Plants (Bawal / Manesar)", category: "Interior Trims & Fixtures" },
  { name: "PPAP Automotive Ltd.", plant: "Bhiwadi, Rajasthan", category: "Sealing & Extruded Systems" },
  { name: "Sogefi Engine Systems", plant: "Gurgaon", category: "Air Intake & Engine Filtration" },
  { name: "Takahata Precision", plant: "Neemrana, Rajasthan", category: "High-Precision Injection Parts" },
  { name: "NTN NEI Manufacturing", plant: "India Operations", category: "Bearings & Driveline" },
  { name: "India Nippon Electricals", plant: "Rewari / Pondicherry", category: "Automotive Electronics" },
  { name: "Munjal Shoba Limited", plant: "Gurgaon / Manesar", category: "Automotive Precision Tooling" },
  { name: "Radiant Polymers Pvt. Ltd.", plant: "All Plants", category: "Engineering Plastics & Parts" },
  { name: "Kumi Supreme India", plant: "Bawal / Gujarat", category: "Automotive Trim Systems" },
  { name: "Premier Plasmotec", plant: "Manesar", category: "Precision Injection Tooling" },
  { name: "Reckitt Benckiser", plant: "India Operations", category: "FMCG Packaging Automation" },
  { name: "Alpha Maier", plant: "Manesar", category: "Automotive Mirror Systems" },
  { name: "Delseal India Pvt. Ltd.", plant: "Faridabad", category: "Sealing & Gasket SPMs" },
  { name: "Otsuka Venus Automotive", plant: "Faridabad", category: "Transmission Components" },
  { name: "HSIL Limited", plant: "Bhiwadi", category: "Industrial Manufacturing" },
  { name: "Sellowrap Industries", plant: "Manesar", category: "Automotive Wrapping & Liners" }
];

export const processWorkflow = [
  {
    step: "01",
    title: "Engineering Concept & 3D CAD",
    desc: "Component drawing review, cycle time estimation, station ergonomics, and complete SolidWorks/CATIA modeling with kinematics simulation."
  },
  {
    step: "02",
    title: "Precision Tool Room Machining",
    desc: "In-house CNC milling on Manford VMC, precision surface grinding, DRO milling, and heat treatment to guarantee ±0.01 mm tooling tolerances."
  },
  {
    step: "03",
    title: "Controls & Automation Integration",
    desc: "Electrical panel fabrication, PLC ladder logic programming, servo drive commissioning, and machine vision algorithm integration."
  },
  {
    step: "04",
    title: "Poka-Yoke & Rigorous EOL Validation",
    desc: "100% sensor checking, error proofing, master sample repeatability trials, and customer pre-dispatch inspection (PDI)."
  },
  {
    step: "05",
    title: "On-Site Commissioning & Handover",
    desc: "Turnkey installation at customer plant, operator training, cycle time verification, and ongoing technical support."
  }
];
