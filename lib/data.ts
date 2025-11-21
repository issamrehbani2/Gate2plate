import type { Restaurant, Airport, FlightInfo } from "./types"

export const airportsByCountry: Record<string, Airport[]> = {
  "United States": [
    {
      code: "JFK",
      name: "John F. Kennedy International Airport",
      location: { lat: 40.6413, lng: -73.7781 },
      terminals: [
        { id: "1", name: "Terminal 1", gates: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
        { id: "4", name: "Terminal 4", gates: ["A1", "A2", "A3", "A4", "B20", "B21", "B22", "B23", "B24"] },
        { id: "5", name: "Terminal 5", gates: ["1", "2", "3", "4", "5", "6", "7", "8"] },
        { id: "7", name: "Terminal 7", gates: ["1", "2", "3", "4", "5", "6", "7"] },
        { id: "8", name: "Terminal 8", gates: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
      ],
    },
    {
      code: "LAX",
      name: "Los Angeles International Airport",
      location: { lat: 33.9416, lng: -118.4085 },
      terminals: [
        { id: "1", name: "Terminal 1", gates: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
        { id: "2", name: "Terminal 2", gates: ["20", "21", "22", "23", "24", "25", "26", "27"] },
        { id: "3", name: "Terminal 3", gates: ["30", "31", "32", "33", "34", "35"] },
        { id: "4", name: "Terminal 4", gates: ["40", "41", "42", "43", "44", "45"] },
        { id: "5", name: "Terminal 5", gates: ["50", "51", "52", "53", "54"] },
      ],
    },
    {
      code: "ORD",
      name: "Chicago O'Hare International Airport",
      location: { lat: 41.9742, lng: -87.9073 },
      terminals: [
        { id: "1", name: "Terminal 1", gates: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"] },
        { id: "2", name: "Terminal 2", gates: ["E1", "E2", "E3", "E4", "E5", "E6"] },
        { id: "3", name: "Terminal 3", gates: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8"] },
        { id: "5", name: "Terminal 5", gates: ["M1", "M2", "M3", "M4", "M5", "M6"] },
      ],
    },
  ],
  "United Kingdom": [
    {
      code: "LHR",
      name: "London Heathrow Airport",
      location: { lat: 51.47, lng: -0.4543 },
      terminals: [
        { id: "2", name: "Terminal 2", gates: ["A1", "A2", "A3", "B1", "B2", "B3", "B4", "B5"] },
        { id: "3", name: "Terminal 3", gates: ["1", "2", "3", "4", "5", "6", "7", "8"] },
        { id: "4", name: "Terminal 4", gates: ["1", "2", "3", "4", "5", "6", "7"] },
        { id: "5", name: "Terminal 5", gates: ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2"] },
      ],
    },
    {
      code: "LGW",
      name: "London Gatwick Airport",
      location: { lat: 51.1537, lng: -0.1821 },
      terminals: [
        { id: "N", name: "North Terminal", gates: ["1", "2", "3", "4", "5", "6", "7", "8"] },
        { id: "S", name: "South Terminal", gates: ["10", "11", "12", "13", "14", "15", "16"] },
      ],
    },
  ],
  "United Arab Emirates": [
    {
      code: "DXB",
      name: "Dubai International Airport",
      location: { lat: 25.2532, lng: 55.3657 },
      terminals: [
        { id: "1", name: "Terminal 1", gates: ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "D1", "D2"] },
        { id: "2", name: "Terminal 2", gates: ["1", "2", "3", "4", "5", "6"] },
        { id: "3", name: "Terminal 3", gates: ["A1", "A2", "B1", "B2", "B3", "B4", "C1", "C2"] },
      ],
    },
  ],
  Japan: [
    {
      code: "HND",
      name: "Tokyo Haneda Airport",
      location: { lat: 35.5494, lng: 139.7798 },
      terminals: [
        { id: "1", name: "Terminal 1", gates: ["1", "2", "3", "4", "5", "6", "7", "8"] },
        { id: "2", name: "Terminal 2", gates: ["10", "11", "12", "13", "14", "15"] },
        { id: "3", name: "Terminal 3", gates: ["101", "102", "103", "104", "105", "106"] },
      ],
    },
    {
      code: "NRT",
      name: "Tokyo Narita International Airport",
      location: { lat: 35.772, lng: 140.3929 },
      terminals: [
        { id: "1", name: "Terminal 1", gates: ["11", "12", "13", "14", "15", "21", "22", "23"] },
        { id: "2", name: "Terminal 2", gates: ["51", "52", "53", "54", "55", "56"] },
        { id: "3", name: "Terminal 3", gates: ["1", "2", "3", "4"] },
      ],
    },
  ],
  France: [
    {
      code: "CDG",
      name: "Paris Charles de Gaulle Airport",
      location: { lat: 49.0097, lng: 2.5479 },
      terminals: [
        { id: "1", name: "Terminal 1", gates: ["1", "2", "3", "4", "5", "6", "7"] },
        { id: "2A", name: "Terminal 2A", gates: ["A1", "A2", "A3", "A4", "A5"] },
        { id: "2E", name: "Terminal 2E", gates: ["E1", "E2", "E3", "K1", "K2", "L1", "L2"] },
        { id: "2F", name: "Terminal 2F", gates: ["F1", "F2", "F3", "F4"] },
      ],
    },
  ],
  Germany: [
    {
      code: "FRA",
      name: "Frankfurt Airport",
      location: { lat: 50.0379, lng: 8.5622 },
      terminals: [
        { id: "1", name: "Terminal 1", gates: ["A1", "A2", "B1", "B2", "C1", "C2", "Z1", "Z2"] },
        { id: "2", name: "Terminal 2", gates: ["D1", "D2", "D3", "E1", "E2"] },
      ],
    },
  ],
  Lebanon: [
    {
      code: "BEY",
      name: "Beirut-Rafic Hariri International Airport",
      location: { lat: 33.8209, lng: 35.4884 },
      terminals: [
        { id: "1", name: "Terminal 1", gates: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
        { id: "2", name: "Terminal 2", gates: ["11", "12", "13", "14", "15", "16"] },
      ],
    },
  ],
}

export const airports: Airport[] = Object.values(airportsByCountry).flat()

// Predefined sample flights per airport. Each airport key is the airport code.
export const flightsByAirport: Record<string, FlightInfo[]> = {
  JFK: [
    { flightNumber: "AA123", airline: "American Airlines", boardingTime: "14:30", gate: "4", terminal: "4" },
    { flightNumber: "DL456", airline: "Delta Air Lines", boardingTime: "15:10", gate: "6", terminal: "1" },
    { flightNumber: "UA789", airline: "United Airlines", boardingTime: "16:00", gate: "2", terminal: "5" },
      { flightNumber: "BA321", airline: "British Airways", boardingTime: "17:20", gate: "B20", terminal: "4" },
  ],
  LAX: [
    { flightNumber: "AA201", airline: "American Airlines", boardingTime: "12:20", gate: "3", terminal: "1" },
    { flightNumber: "DL305", airline: "Delta Air Lines", boardingTime: "13:05", gate: "25", terminal: "2" },
      { flightNumber: "UA502", airline: "United Airlines", boardingTime: "14:40", gate: "30", terminal: "3" },
  ],
  ORD: [
    { flightNumber: "UA400", airline: "United Airlines", boardingTime: "18:45", gate: "G3", terminal: "3" },
      { flightNumber: "AA410", airline: "American Airlines", boardingTime: "19:10", gate: "B2", terminal: "1" },
  ],
  LHR: [
    { flightNumber: "BA100", airline: "British Airways", boardingTime: "09:30", gate: "B2", terminal: "2" },
      { flightNumber: "VS210", airline: "Virgin Atlantic", boardingTime: "10:15", gate: "C3", terminal: "3" },
  ],

  LGW: [
    { flightNumber: "EW101", airline: "EasyJet", boardingTime: "11:00", gate: "5", terminal: "N" },
    { flightNumber: "BA202", airline: "British Airways", boardingTime: "12:30", gate: "7", terminal: "S" },
  ],
  DXB: [
    { flightNumber: "EK001", airline: "Emirates", boardingTime: "20:00", gate: "A1", terminal: "3" },
    { flightNumber: "EK002", airline: "Emirates", boardingTime: "21:15", gate: "B2", terminal: "1" },
  ],
  HND: [
    { flightNumber: "JL300", airline: "Japan Airlines", boardingTime: "08:10", gate: "3", terminal: "1" },
    { flightNumber: "NH305", airline: "ANA", boardingTime: "09:45", gate: "11", terminal: "2" },
  ],
  NRT: [
    { flightNumber: "JL400", airline: "Japan Airlines", boardingTime: "07:30", gate: "12", terminal: "1" },
    { flightNumber: "NH420", airline: "ANA", boardingTime: "10:20", gate: "55", terminal: "2" },
  ],
  CDG: [
    { flightNumber: "AF150", airline: "Air France", boardingTime: "13:00", gate: "A3", terminal: "2E" },
    { flightNumber: "AF151", airline: "Air France", boardingTime: "14:25", gate: "F2", terminal: "2F" },
  ],
  FRA: [
    { flightNumber: "LH200", airline: "Lufthansa", boardingTime: "16:40", gate: "A1", terminal: "1" },
    { flightNumber: "LH201", airline: "Lufthansa", boardingTime: "17:55", gate: "D2", terminal: "2" },
  ],
  BEY:
   [
  {
    "flightNumber": "GB101",
    "airline": "Middle East Airlines (MEA)",
    "boardingTime": "05:30",
    "gate": "1",
    "terminal": "1"
  },
  {
    "flightNumber": "GB102",
    "airline": "Turkish Airlines",
    "boardingTime": "05:36",
    "gate": "14",
    "terminal": "1"
  },
  {
    "flightNumber": "GB103",
    "airline": "Qatar Airways",
    "boardingTime": "05:42",
    "gate": "3",
    "terminal": "1"
  },
  {
    "flightNumber": "GB104",
    "airline": "Emirates",
    "boardingTime": "05:48",
    "gate": "6",
    "terminal": "1"
  },
  {
    "flightNumber": "GB105",
    "airline": "Air France",
    "boardingTime": "05:54",
    "gate": "6",
    "terminal": "1"
  },
  {
    "flightNumber": "GB106",
    "airline": "Lufthansa",
    "boardingTime": "06:00",
    "gate": "14",
    "terminal": "1"
  },
  {
    "flightNumber": "GB107",
    "airline": "Pegasus Airlines",
    "boardingTime": "06:06",
    "gate": "18",
    "terminal": "1"
  },
  {
    "flightNumber": "GB108",
    "airline": "Flydubai",
    "boardingTime": "06:12",
    "gate": "18",
    "terminal": "1"
  },
  {
    "flightNumber": "GB109",
    "airline": "Royal Jordanian",
    "boardingTime": "06:18",
    "gate": "6",
    "terminal": "1"
  },
  {
    "flightNumber": "GB110",
    "airline": "EgyptAir",
    "boardingTime": "06:24",
    "gate": "8",
    "terminal": "1"
  },
  {
    "flightNumber": "GB111",
    "airline": "Cyprus Airways",
    "boardingTime": "06:30",
    "gate": "2",
    "terminal": "1"
  },
  {
    "flightNumber": "GB112",
    "airline": "Transavia",
    "boardingTime": "06:36",
    "gate": "22",
    "terminal": "1"
  },
  {
    "flightNumber": "GB113",
    "airline": "Etihad Airways",
    "boardingTime": "06:42",
    "gate": "18",
    "terminal": "1"
  },
  {
    "flightNumber": "GB114",
    "airline": "Kuwait Airways",
    "boardingTime": "06:48",
    "gate": "21",
    "terminal": "1"
  },
  {
    "flightNumber": "GB115",
    "airline": "Saudia",
    "boardingTime": "06:54",
    "gate": "6",
    "terminal": "1"
  },
  {
    "flightNumber": "GB116",
    "airline": "Iraqi Airways",
    "boardingTime": "07:00",
    "gate": "3",
    "terminal": "1"
  },
  {
    "flightNumber": "GB117",
    "airline": "Middle East Airlines (MEA)",
    "boardingTime": "07:06",
    "gate": "20",
    "terminal": "1"
  },
  {
    "flightNumber": "GB118",
    "airline": "Turkish Airlines",
    "boardingTime": "07:12",
    "gate": "16",
    "terminal": "1"
  },
  {
    "flightNumber": "GB119",
    "airline": "Qatar Airways",
    "boardingTime": "07:18",
    "gate": "1",
    "terminal": "1"
  },
  {
    "flightNumber": "GB120",
    "airline": "Emirates",
    "boardingTime": "07:24",
    "gate": "20",
    "terminal": "1"
  },
  {
    "flightNumber": "GB121",
    "airline": "Air France",
    "boardingTime": "07:30",
    "gate": "18",
    "terminal": "1"
  },
  {
    "flightNumber": "GB122",
    "airline": "Lufthansa",
    "boardingTime": "07:36",
    "gate": "3",
    "terminal": "1"
  },
  {
    "flightNumber": "GB123",
    "airline": "Pegasus Airlines",
    "boardingTime": "07:42",
    "gate": "17",
    "terminal": "1"
  },
  {
    "flightNumber": "GB124",
    "airline": "Flydubai",
    "boardingTime": "07:48",
    "gate": "4",
    "terminal": "1"
  },
  {
    "flightNumber": "GB125",
    "airline": "Royal Jordanian",
    "boardingTime": "07:54",
    "gate": "3",
    "terminal": "1"
  },
  {
    "flightNumber": "GB126",
    "airline": "EgyptAir",
    "boardingTime": "08:00",
    "gate": "2",
    "terminal": "1"
  },
  {
    "flightNumber": "GB127",
    "airline": "Cyprus Airways",
    "boardingTime": "08:06",
    "gate": "7",
    "terminal": "1"
  },
  {
    "flightNumber": "GB128",
    "airline": "Transavia",
    "boardingTime": "08:12",
    "gate": "4",
    "terminal": "1"
  },
  {
    "flightNumber": "GB129",
    "airline": "Etihad Airways",
    "boardingTime": "08:18",
    "gate": "2",
    "terminal": "1"
  },
  {
    "flightNumber": "GB130",
    "airline": "Kuwait Airways",
    "boardingTime": "08:24",
    "gate": "11",
    "terminal": "1"
  },
  {
    "flightNumber": "GB131",
    "airline": "Saudia",
    "boardingTime": "08:30",
    "gate": "17",
    "terminal": "1"
  },
  {
    "flightNumber": "GB132",
    "airline": "Iraqi Airways",
    "boardingTime": "08:36",
    "gate": "13",
    "terminal": "1"
  },
  {
    "flightNumber": "GB133",
    "airline": "Middle East Airlines (MEA)",
    "boardingTime": "08:42",
    "gate": "2",
    "terminal": "1"
  },
  {
    "flightNumber": "GB134",
    "airline": "Turkish Airlines",
    "boardingTime": "08:48",
    "gate": "15",
    "terminal": "1"
  },
  {
    "flightNumber": "GB135",
    "airline": "Qatar Airways",
    "boardingTime": "08:54",
    "gate": "10",
    "terminal": "1"
  },
  {
    "flightNumber": "GB136",
    "airline": "Emirates",
    "boardingTime": "09:00",
    "gate": "1",
    "terminal": "1"
  },
  {
    "flightNumber": "GB137",
    "airline": "Air France",
    "boardingTime": "09:06",
    "gate": "5",
    "terminal": "1"
  },
  {
    "flightNumber": "GB138",
    "airline": "Lufthansa",
    "boardingTime": "09:12",
    "gate": "4",
    "terminal": "1"
  },
  {
    "flightNumber": "GB139",
    "airline": "Pegasus Airlines",
    "boardingTime": "09:18",
    "gate": "8",
    "terminal": "1"
  },
  {
    "flightNumber": "GB140",
    "airline": "Flydubai",
    "boardingTime": "09:24",
    "gate": "2",
    "terminal": "1"
  },
  {
    "flightNumber": "GB141",
    "airline": "Royal Jordanian",
    "boardingTime": "09:30",
    "gate": "9",
    "terminal": "1"
  },
  {
    "flightNumber": "GB142",
    "airline": "EgyptAir",
    "boardingTime": "10:30",
    "gate": "4",
    "terminal": "1"
  },
  {
    "flightNumber": "GB143",
    "airline": "Cyprus Airways",
    "boardingTime": "10:36",
    "gate": "13",
    "terminal": "1"
  },
  {
    "flightNumber": "GB144",
    "airline": "Transavia",
    "boardingTime": "10:42",
    "gate": "15",
    "terminal": "1"
  },
  {
    "flightNumber": "GB145",
    "airline": "Etihad Airways",
    "boardingTime": "10:48",
    "gate": "1",
    "terminal": "1"
  },
  {
    "flightNumber": "GB146",
    "airline": "Kuwait Airways",
    "boardingTime": "10:54",
    "gate": "22",
    "terminal": "1"
  },
  {
    "flightNumber": "GB147",
    "airline": "Saudia",
    "boardingTime": "11:00",
    "gate": "12",
    "terminal": "1"
  },
  {
    "flightNumber": "GB148",
    "airline": "Iraqi Airways",
    "boardingTime": "11:06",
    "gate": "23",
    "terminal": "1"
  },
  {
    "flightNumber": "GB149",
    "airline": "Middle East Airlines (MEA)",
    "boardingTime": "11:12",
    "gate": "5",
    "terminal": "1"
  },
  {
    "flightNumber": "GB150",
    "airline": "Turkish Airlines",
    "boardingTime": "11:18",
    "gate": "8",
    "terminal": "1"
  },
  {
    "flightNumber": "GB151",
    "airline": "Qatar Airways",
    "boardingTime": "11:24",
    "gate": "14",
    "terminal": "1"
  },
  {
    "flightNumber": "GB152",
    "airline": "Emirates",
    "boardingTime": "11:30",
    "gate": "11",
    "terminal": "1"
  },
  {
    "flightNumber": "GB153",
    "airline": "Air France",
    "boardingTime": "11:36",
    "gate": "5",
    "terminal": "1"
  },
  {
    "flightNumber": "GB154",
    "airline": "Lufthansa",
    "boardingTime": "11:42",
    "gate": "2",
    "terminal": "1"
  },
  {
    "flightNumber": "GB155",
    "airline": "Pegasus Airlines",
    "boardingTime": "11:48",
    "gate": "15",
    "terminal": "1"
  },
  {
    "flightNumber": "GB156",
    "airline": "Flydubai",
    "boardingTime": "11:54",
    "gate": "1",
    "terminal": "1"
  },
  {
    "flightNumber": "GB157",
    "airline": "Royal Jordanian",
    "boardingTime": "12:00",
    "gate": "13",
    "terminal": "1"
  },
  {
    "flightNumber": "GB158",
    "airline": "EgyptAir",
    "boardingTime": "12:06",
    "gate": "1",
    "terminal": "1"
  },
  {
    "flightNumber": "GB159",
    "airline": "Cyprus Airways",
    "boardingTime": "12:12",
    "gate": "5",
    "terminal": "1"
  },
  {
    "flightNumber": "GB160",
    "airline": "Transavia",
    "boardingTime": "12:18",
    "gate": "6",
    "terminal": "1"
  },
  {
    "flightNumber": "GB161",
    "airline": "Etihad Airways",
    "boardingTime": "12:24",
    "gate": "6",
    "terminal": "1"
  },
  {
    "flightNumber": "GB162",
    "airline": "Kuwait Airways",
    "boardingTime": "12:30",
    "gate": "9",
    "terminal": "1"
  },
  {
    "flightNumber": "GB163",
    "airline": "Saudia",
    "boardingTime": "12:36",
    "gate": "23",
    "terminal": "1"
  },
  {
    "flightNumber": "GB164",
    "airline": "Iraqi Airways",
    "boardingTime": "12:42",
    "gate": "4",
    "terminal": "1"
  },
  {
    "flightNumber": "GB165",
    "airline": "Middle East Airlines (MEA)",
    "boardingTime": "12:48",
    "gate": "4",
    "terminal": "1"
  },
  {
    "flightNumber": "GB166",
    "airline": "Turkish Airlines",
    "boardingTime": "12:54",
    "gate": "8",
    "terminal": "1"
  },
  {
    "flightNumber": "GB167",
    "airline": "Qatar Airways",
    "boardingTime": "13:00",
    "gate": "22",
    "terminal": "1"
  },
  {
    "flightNumber": "GB168",
    "airline": "Emirates",
    "boardingTime": "13:06",
    "gate": "20",
    "terminal": "1"
  },
  {
    "flightNumber": "GB169",
    "airline": "Air France",
    "boardingTime": "13:12",
    "gate": "2",
    "terminal": "1"
  },
  {
    "flightNumber": "GB170",
    "airline": "Lufthansa",
    "boardingTime": "13:18",
    "gate": "6",
    "terminal": "1"
  },
  {
    "flightNumber": "GB171",
    "airline": "Pegasus Airlines",
    "boardingTime": "13:24",
    "gate": "5",
    "terminal": "1"
  },
  {
    "flightNumber": "GB172",
    "airline": "Flydubai",
    "boardingTime": "13:30",
    "gate": "4",
    "terminal": "1"
  },
  {
    "flightNumber": "GB173",
    "airline": "Royal Jordanian",
    "boardingTime": "13:36",
    "gate": "22",
    "terminal": "1"
  },
  {
    "flightNumber": "GB174",
    "airline": "EgyptAir",
    "boardingTime": "13:42",
    "gate": "18",
    "terminal": "1"
  },
  {
    "flightNumber": "GB175",
    "airline": "Cyprus Airways",
    "boardingTime": "13:48",
    "gate": "12",
    "terminal": "1"
  },
  {
    "flightNumber": "GB176",
    "airline": "Transavia",
    "boardingTime": "13:54",
    "gate": "10",
    "terminal": "1"
  },
  {
    "flightNumber": "GB177",
    "airline": "Etihad Airways",
    "boardingTime": "14:00",
    "gate": "3",
    "terminal": "1"
  },
  {
    "flightNumber": "GB178",
    "airline": "Kuwait Airways",
    "boardingTime": "14:06",
    "gate": "16",
    "terminal": "1"
  },
  {
    "flightNumber": "GB179",
    "airline": "Saudia",
    "boardingTime": "14:12",
    "gate": "18",
    "terminal": "1"
  },
  {
    "flightNumber": "GB180",
    "airline": "Iraqi Airways",
    "boardingTime": "14:18",
    "gate": "15",
    "terminal": "1"
  },
  {
    "flightNumber": "GB181",
    "airline": "Middle East Airlines (MEA)",
    "boardingTime": "14:24",
    "gate": "14",
    "terminal": "1"
  },
  {
    "flightNumber": "GB182",
    "airline": "Turkish Airlines",
    "boardingTime": "14:30",
    "gate": "20",
    "terminal": "1"
  },
  {
    "flightNumber": "GB183",
    "airline": "Qatar Airways",
    "boardingTime": "16:30",
    "gate": "17",
    "terminal": "1"
  },
  {
    "flightNumber": "GB184",
    "airline": "Emirates",
    "boardingTime": "16:36",
    "gate": "10",
    "terminal": "1"
  },
  {
    "flightNumber": "GB185",
    "airline": "Air France",
    "boardingTime": "16:42",
    "gate": "22",
    "terminal": "1"
  },
  {
    "flightNumber": "GB186",
    "airline": "Lufthansa",
    "boardingTime": "16:48",
    "gate": "19",
    "terminal": "1"
  },
  {
    "flightNumber": "GB187",
    "airline": "Pegasus Airlines",
    "boardingTime": "16:54",
    "gate": "14",
    "terminal": "1"
  },
  {
    "flightNumber": "GB188",
    "airline": "Flydubai",
    "boardingTime": "17:00",
    "gate": "16",
    "terminal": "1"
  },
  {
    "flightNumber": "GB189",
    "airline": "Royal Jordanian",
    "boardingTime": "17:06",
    "gate": "11",
    "terminal": "1"
  },
  {
    "flightNumber": "GB190",
    "airline": "EgyptAir",
    "boardingTime": "17:12",
    "gate": "18",
    "terminal": "1"
  },
  {
    "flightNumber": "GB191",
    "airline": "Cyprus Airways",
    "boardingTime": "17:18",
    "gate": "2",
    "terminal": "1"
  },
  {
    "flightNumber": "GB192",
    "airline": "Transavia",
    "boardingTime": "17:24",
    "gate": "22",
    "terminal": "1"
  },
  {
    "flightNumber": "GB193",
    "airline": "Etihad Airways",
    "boardingTime": "17:30",
    "gate": "4",
    "terminal": "1"
  },
  {
    "flightNumber": "GB194",
    "airline": "Kuwait Airways",
    "boardingTime": "17:36",
    "gate": "13",
    "terminal": "1"
  },
  {
    "flightNumber": "GB195",
    "airline": "Saudia",
    "boardingTime": "17:42",
    "gate": "1",
    "terminal": "1"
  },
  {
    "flightNumber": "GB196",
    "airline": "Iraqi Airways",
    "boardingTime": "17:48",
    "gate": "1",
    "terminal": "1"
  },
  {
    "flightNumber": "GB197",
    "airline": "Middle East Airlines (MEA)",
    "boardingTime": "17:54",
    "gate": "15",
    "terminal": "1"
  },
  {
    "flightNumber": "GB198",
    "airline": "Turkish Airlines",
    "boardingTime": "18:00",
    "gate": "1",
    "terminal": "1"
  },
  {
    "flightNumber": "GB199",
    "airline": "Qatar Airways",
    "boardingTime": "18:06",
    "gate": "17",
    "terminal": "1"
  },
  {
    "flightNumber": "GB200",
    "airline": "Emirates",
    "boardingTime": "18:12",
    "gate": "15",
    "terminal": "1"
  }
  ],
}

export const restaurants: Restaurant[] = [
  // JFK Restaurants
  {
    id: "1",
    name: "Shake Shack",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "15-25 min",
    image: "/shake-shack-burger-restaurant.jpg",
    location: { lat: 40.6413, lng: -73.7781 },
    airport: "JFK",
    menu: [
      {
        id: "1-1",
        name: "ShackBurger",
        description: "Angus beef cheeseburger with lettuce, tomato, ShackSauce",
        price: 8.99,
        image: "/shackburger.jpg",
        category: "Burgers",
      },
      {
        id: "1-2",
        name: "SmokeShack",
        description: "Cheeseburger topped with applewood smoked bacon, cherry peppers",
        price: 9.99,
        image: "/smokeshack-burger-with-bacon.jpg",
        category: "Burgers",
      },
      {
        id: "1-3",
        name: "Shroom Burger",
        description: "Crisp-fried portobello mushroom filled with melted cheese",
        price: 9.49,
        image: "/portobello-mushroom-burger.jpg",
        category: "Burgers",
      },
      {
        id: "1-4",
        name: "Crinkle Cut Fries",
        description: "Classic crinkle-cut fries",
        price: 4.49,
        image: "/crinkle-fries.jpg",
        category: "Sides",
      },
      {
        id: "1-5",
        name: "Cheese Fries",
        description: "Crinkle fries topped with cheese sauce",
        price: 5.99,
        image: "/cheese-fries.png",
        category: "Sides",
      },
      {
        id: "1-6",
        name: "Chocolate Shake",
        description: "Hand-spun chocolate frozen custard shake",
        price: 6.49,
        image: "/chocolate-milkshake.png",
        category: "Drinks",
      },
      {
        id: "1-7",
        name: "Vanilla Shake",
        description: "Classic vanilla frozen custard shake",
        price: 6.49,
        image: "/vanilla-milkshake.png",
        category: "Drinks",
      },
      {
        id: "1-8",
        name: "Strawberry Shake",
        description: "Fresh strawberry frozen custard shake",
        price: 6.49,
        image: "/strawberry-milkshake.jpg",
        category: "Drinks",
      },
    ],
  },
  {
    id: "2",
    name: "Deep Blue Sushi",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "25-35 min",
    image: "/bustling-sushi-restaurant.png",
    location: { lat: 40.6413, lng: -73.7781 },
    airport: "JFK",
    menu: [
      {
        id: "2-1",
        name: "California Roll",
        description: "Crab, avocado, and cucumber",
        price: 10.99,
        image: "/california-roll.png",
        category: "Rolls",
      },
      {
        id: "2-2",
        name: "Spicy Tuna Roll",
        description: "Fresh tuna with spicy mayo",
        price: 12.99,
        image: "/spicy-tuna-roll.png",
        category: "Rolls",
      },
      {
        id: "2-3",
        name: "Dragon Roll",
        description: "Eel, cucumber topped with avocado and eel sauce",
        price: 15.99,
        image: "/dragon-sushi-roll.jpg",
        category: "Rolls",
      },
      {
        id: "2-4",
        name: "Rainbow Roll",
        description: "California roll topped with assorted fish",
        price: 16.99,
        image: "/rainbow-sushi-roll.jpg",
        category: "Rolls",
      },
      {
        id: "2-5",
        name: "Philadelphia Roll",
        description: "Smoked salmon, cream cheese, cucumber",
        price: 11.99,
        image: "/philadelphia-roll.jpg",
        category: "Rolls",
      },
      {
        id: "2-6",
        name: "Salmon Nigiri",
        description: "Fresh salmon over pressed rice (2 pieces)",
        price: 7.99,
        image: "/salmon-nigiri.png",
        category: "Nigiri",
      },
      {
        id: "2-7",
        name: "Tuna Nigiri",
        description: "Fresh tuna over pressed rice (2 pieces)",
        price: 8.99,
        image: "/tuna-nigiri.jpg",
        category: "Nigiri",
      },
      {
        id: "2-8",
        name: "Miso Soup",
        description: "Traditional Japanese soup",
        price: 4.99,
        image: "/miso-soup.png",
        category: "Soup",
      },
      {
        id: "2-9",
        name: "Edamame",
        description: "Steamed soybeans with sea salt",
        price: 5.99,
        image: "/edamame-bowl.png",
        category: "Appetizers",
      },
    ],
  },

  // LAX Restaurants
  {
    id: "3",
    name: "In-N-Out Burger",
    cuisine: "American",
    rating: 4.9,
    deliveryTime: "20-30 min",
    image: "/in-n-out-burger.jpg",
    location: { lat: 33.9416, lng: -118.4085 },
    airport: "LAX",
    menu: [
      {
        id: "3-1",
        name: "Double-Double",
        description: "Two beef patties, two slices of cheese",
        price: 5.99,
        image: "/double-double-burger.jpg",
        category: "Burgers",
      },
      {
        id: "3-2",
        name: "Hamburger",
        description: "Single beef patty with spread, lettuce, tomato, onions",
        price: 3.99,
        image: "/in-n-out-hamburger.jpg",
        category: "Burgers",
      },
      {
        id: "3-3",
        name: "Cheeseburger",
        description: "Single beef patty with cheese",
        price: 4.49,
        image: "/in-n-out-cheeseburger.jpg",
        category: "Burgers",
      },
      {
        id: "3-4",
        name: "French Fries",
        description: "Fresh-cut potatoes cooked in 100% sunflower oil",
        price: 2.99,
        image: "/crispy-french-fries.png",
        category: "Sides",
      },
      {
        id: "3-5",
        name: "Animal Style Fries",
        description: "Fries with cheese, grilled onions, spread",
        price: 4.99,
        image: "/animal-style-fries.jpg",
        category: "Sides",
      },
      {
        id: "3-6",
        name: "Chocolate Shake",
        description: "Real ice cream shake",
        price: 3.99,
        image: "/chocolate-milkshake.png",
        category: "Drinks",
      },
      {
        id: "3-7",
        name: "Vanilla Shake",
        description: "Real ice cream shake",
        price: 3.99,
        image: "/vanilla-shake.jpg",
        category: "Drinks",
      },
      {
        id: "3-8",
        name: "Strawberry Shake",
        description: "Real ice cream shake",
        price: 3.99,
        image: "/strawberry-milkshake.jpg",
        category: "Drinks",
      },
    ],
  },
  {
    id: "4",
    name: "Umami Burger",
    cuisine: "American",
    rating: 4.6,
    deliveryTime: "25-35 min",
    image: "/umami-burger.jpg",
    location: { lat: 33.9416, lng: -118.4085 },
    airport: "LAX",
    menu: [
      {
        id: "4-1",
        name: "Umami Burger",
        description: "Shiitake mushrooms, caramelized onions, truffle aioli",
        price: 14.99,
        image: "/umami-burger.jpg",
        category: "Burgers",
      },
      {
        id: "4-2",
        name: "Truffle Burger",
        description: "Truffle cheese, truffle aioli, truffle glaze",
        price: 16.99,
        image: "/truffle-burger.jpg",
        category: "Burgers",
      },
      {
        id: "4-3",
        name: "BBQ Burger",
        description: "Bacon, cheddar, onion rings, BBQ sauce",
        price: 15.99,
        image: "/bbq-bacon-burger.png",
        category: "Burgers",
      },
      {
        id: "4-4",
        name: "Impossible Burger",
        description: "Plant-based patty with all the toppings",
        price: 15.99,
        image: "/plant-based-burger.png",
        category: "Burgers",
      },
      {
        id: "4-5",
        name: "Truffle Fries",
        description: "Hand-cut fries with truffle oil and parmesan",
        price: 6.99,
        image: "/truffle-fries.png",
        category: "Sides",
      },
      {
        id: "4-6",
        name: "Sweet Potato Fries",
        description: "Crispy sweet potato fries with garlic aioli",
        price: 6.49,
        image: "/sweet-potato-fries.png",
        category: "Sides",
      },
      {
        id: "4-7",
        name: "Onion Rings",
        description: "Beer-battered onion rings",
        price: 5.99,
        image: "/crispy-onion-rings.png",
        category: "Sides",
      },
      {
        id: "4-8",
        name: "Umami Cola",
        description: "House-made cola",
        price: 3.99,
        image: "/refreshing-cola.png",
        category: "Drinks",
      },
    ],
  },

  // ORD Restaurants
  {
    id: "5",
    name: "Garrett Popcorn",
    cuisine: "American",
    rating: 4.7,
    deliveryTime: "10-20 min",
    image: "/garrett-popcorn-chicago.jpg",
    location: { lat: 41.9742, lng: -87.9073 },
    airport: "ORD",
    menu: [
      {
        id: "5-1",
        name: "Chicago Mix",
        description: "CaramelCrisp and CheeseCorn blend",
        price: 12.99,
        image: "/popcorn-mix.jpg",
        category: "Snacks",
      },
      {
        id: "5-2",
        name: "CaramelCrisp",
        description: "Sweet caramel-coated popcorn",
        price: 10.99,
        image: "/caramel-popcorn.jpg",
        category: "Snacks",
      },
      {
        id: "5-3",
        name: "CheeseCorn",
        description: "Savory cheddar cheese popcorn",
        price: 9.99,
        image: "/cheese-popcorn.jpg",
        category: "Snacks",
      },
      {
        id: "5-4",
        name: "Plain Popcorn",
        description: "Classic buttery popcorn",
        price: 7.99,
        image: "/butter-popcorn.jpg",
        category: "Snacks",
      },
      {
        id: "5-5",
        name: "Cashew CaramelCrisp",
        description: "Caramel popcorn with roasted cashews",
        price: 14.99,
        image: "/caramel-cashew-popcorn.jpg",
        category: "Snacks",
      },
    ],
  },
  {
    id: "6",
    name: "Tortas Frontera",
    cuisine: "Mexican",
    rating: 4.8,
    deliveryTime: "20-30 min",
    image: "/mexican-tortas-restaurant.jpg",
    location: { lat: 41.9742, lng: -87.9073 },
    airport: "ORD",
    menu: [
      {
        id: "6-1",
        name: "Chicken Torta",
        description: "Grilled chicken with avocado, black beans, chipotle mayo",
        price: 11.99,
        image: "/chicken-torta.jpg",
        category: "Tortas",
      },
      {
        id: "6-2",
        name: "Beef Torta",
        description: "Braised beef with peppers, onions, cheese",
        price: 12.99,
        image: "/beef-torta-sandwich.jpg",
        category: "Tortas",
      },
      {
        id: "6-3",
        name: "Vegetarian Torta",
        description: "Grilled vegetables, black beans, avocado, cheese",
        price: 10.99,
        image: "/vegetarian-torta.jpg",
        category: "Tortas",
      },
      {
        id: "6-4",
        name: "Chicken Tacos",
        description: "Two soft tacos with grilled chicken (3 pieces)",
        price: 9.99,
        image: "/chicken-tacos.png",
        category: "Tacos",
      },
      {
        id: "6-5",
        name: "Carnitas Tacos",
        description: "Slow-roasted pork tacos (3 pieces)",
        price: 10.99,
        image: "/carnitas-tacos.png",
        category: "Tacos",
      },
      {
        id: "6-6",
        name: "Guacamole & Chips",
        description: "Fresh guacamole with tortilla chips",
        price: 8.99,
        image: "/guacamole-chips.jpg",
        category: "Appetizers",
      },
      {
        id: "6-7",
        name: "Queso Fundido",
        description: "Melted cheese with chorizo",
        price: 9.99,
        image: "/queso-fundido.jpg",
        category: "Appetizers",
      },
      {
        id: "6-8",
        name: "Horchata",
        description: "Traditional rice drink",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Drinks",
      },
    ],
  },

  // LHR Restaurants
  {
    id: "7",
    name: "Gordon Ramsay Plane Food",
    cuisine: "British",
    rating: 4.6,
    deliveryTime: "30-40 min",
    image: "/gordon-ramsay-restaurant.jpg",
    location: { lat: 51.47, lng: -0.4543 },
    airport: "LHR",
    menu: [
      {
        id: "7-1",
        name: "Fish & Chips",
        description: "Beer-battered cod with hand-cut chips and mushy peas",
        price: 18.99,
        image: "/classic-fish-and-chips.png",
        category: "Mains",
      },
      {
        id: "7-2",
        name: "Beef Wellington",
        description: "Signature dish with mushroom duxelles and puff pastry",
        price: 28.99,
        image: "/beef-wellington.png",
        category: "Mains",
      },
      {
        id: "7-3",
        name: "Shepherd's Pie",
        description: "Lamb mince with vegetables topped with mashed potato",
        price: 16.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "7-4",
        name: "Bangers & Mash",
        description: "British sausages with mashed potatoes and onion gravy",
        price: 15.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "7-5",
        name: "Caesar Salad",
        description: "Romaine lettuce, parmesan, croutons, Caesar dressing",
        price: 12.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Salads",
      },
      {
        id: "7-6",
        name: "Sticky Toffee Pudding",
        description: "Warm sponge cake with toffee sauce and vanilla ice cream",
        price: 8.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Desserts",
      },
      {
        id: "7-7",
        name: "Eton Mess",
        description: "Meringue, strawberries, and whipped cream",
        price: 7.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Desserts",
      },
    ],
  },

  // DXB Restaurants
  {
    id: "8",
    name: "Arabian Tea House",
    cuisine: "Middle Eastern",
    rating: 4.9,
    deliveryTime: "25-35 min",
    image: "/arabian-tea-house-restaurant.jpg",
    location: { lat: 25.2532, lng: 55.3657 },
    airport: "DXB",
    menu: [
      {
        id: "8-1",
        name: "Lamb Kabsa",
        description: "Traditional rice dish with spiced lamb and nuts",
        price: 22.99,
        image: "/lamb-kabsa.jpg",
        category: "Mains",
      },
      {
        id: "8-2",
        name: "Chicken Machboos",
        description: "Spiced chicken with fragrant rice",
        price: 19.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "8-3",
        name: "Mixed Grill",
        description: "Lamb, chicken, and kafta kebabs with rice",
        price: 26.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "8-4",
        name: "Hummus & Pita",
        description: "Fresh hummus with warm pita bread",
        price: 8.99,
        image: "/hummus-pita.jpg",
        category: "Appetizers",
      },
      {
        id: "8-5",
        name: "Baba Ghanoush",
        description: "Smoky eggplant dip with tahini",
        price: 9.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Appetizers",
      },
      {
        id: "8-6",
        name: "Falafel Plate",
        description: "Crispy chickpea fritters with tahini sauce",
        price: 12.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Appetizers",
      },
      {
        id: "8-7",
        name: "Tabbouleh",
        description: "Fresh parsley salad with bulgur and tomatoes",
        price: 8.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Salads",
      },
      {
        id: "8-8",
        name: "Baklava",
        description: "Sweet pastry with honey and pistachios",
        price: 6.99,
        image: "/baklava-dessert.jpg",
        category: "Dessert",
      },
      {
        id: "8-9",
        name: "Kunafa",
        description: "Cheese pastry soaked in sweet syrup",
        price: 7.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Dessert",
      },
      {
        id: "8-10",
        name: "Arabic Coffee",
        description: "Traditional cardamom-spiced coffee",
        price: 5.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Drinks",
      },
    ],
  },

  // HND Restaurants
  {
    id: "9",
    name: "Tsukiji Sushi",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "25-35 min",
    image: "/bustling-sushi-restaurant.png",
    location: { lat: 35.5494, lng: 139.7798 },
    airport: "HND",
    menu: [
      {
        id: "9-1",
        name: "Omakase Set",
        description: "Chef's selection of 10 pieces premium nigiri",
        price: 35.99,
        image: "/salmon-nigiri.png",
        category: "Sets",
      },
      {
        id: "9-2",
        name: "Tuna Sashimi",
        description: "Fresh bluefin tuna slices (6 pieces)",
        price: 24.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sashimi",
      },
      {
        id: "9-3",
        name: "Salmon Sashimi",
        description: "Fresh salmon slices (6 pieces)",
        price: 19.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sashimi",
      },
      {
        id: "9-4",
        name: "Chirashi Bowl",
        description: "Assorted sashimi over sushi rice",
        price: 28.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Bowls",
      },
      {
        id: "9-5",
        name: "Tempura Udon",
        description: "Thick noodles in hot broth with shrimp tempura",
        price: 16.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Noodles",
      },
      {
        id: "9-6",
        name: "Tonkotsu Ramen",
        description: "Rich pork bone broth with noodles and chashu pork",
        price: 15.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Noodles",
      },
      {
        id: "9-7",
        name: "Gyoza",
        description: "Pan-fried pork dumplings (6 pieces)",
        price: 8.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Appetizers",
      },
      {
        id: "9-8",
        name: "Miso Soup",
        description: "Traditional soybean paste soup",
        price: 3.99,
        image: "/miso-soup.png",
        category: "Soup",
      },
      {
        id: "9-9",
        name: "Green Tea",
        description: "Hot Japanese green tea",
        price: 2.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Drinks",
      },
    ],
  },

  // CDG Restaurants
  {
    id: "10",
    name: "Ladurée",
    cuisine: "French",
    rating: 4.8,
    deliveryTime: "20-30 min",
    image: "/placeholder.svg?height=200&width=400",
    location: { lat: 49.0097, lng: 2.5479 },
    airport: "CDG",
    menu: [
      {
        id: "10-1",
        name: "Macarons Box",
        description: "Assorted French macarons (6 pieces)",
        price: 18.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Dessert",
      },
      {
        id: "10-2",
        name: "Croque Monsieur",
        description: "Classic ham and gruyere cheese sandwich",
        price: 14.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sandwiches",
      },
      {
        id: "10-3",
        name: "Croque Madame",
        description: "Croque Monsieur topped with fried egg",
        price: 16.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sandwiches",
      },
      {
        id: "10-4",
        name: "Quiche Lorraine",
        description: "Traditional bacon and cheese quiche",
        price: 12.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "10-5",
        name: "French Onion Soup",
        description: "Caramelized onions in rich broth with gruyere",
        price: 11.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Soup",
      },
      {
        id: "10-6",
        name: "Éclair",
        description: "Chocolate or vanilla cream-filled pastry",
        price: 7.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Dessert",
      },
      {
        id: "10-7",
        name: "Croissant",
        description: "Buttery French croissant",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Bakery",
      },
      {
        id: "10-8",
        name: "Pain au Chocolat",
        description: "Croissant with chocolate",
        price: 5.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Bakery",
      },
      {
        id: "10-9",
        name: "Café au Lait",
        description: "Coffee with steamed milk",
        price: 5.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Drinks",
      },
    ],
  },

  // FRA Restaurants
  {
    id: "11",
    name: "Wurst & Bier",
    cuisine: "German",
    rating: 4.7,
    deliveryTime: "20-30 min",
    image: "/placeholder.svg?height=200&width=400",
    location: { lat: 50.0379, lng: 8.5622 },
    airport: "FRA",
    menu: [
      {
        id: "11-1",
        name: "Bratwurst Platter",
        description: "Traditional German sausages with sauerkraut and mustard",
        price: 13.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "11-2",
        name: "Currywurst",
        description: "Sliced sausage with curry ketchup and fries",
        price: 11.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "11-3",
        name: "Schnitzel",
        description: "Breaded pork cutlet with lemon and potato salad",
        price: 16.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "11-4",
        name: "Sauerbraten",
        description: "Pot roast with red cabbage and dumplings",
        price: 18.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "11-5",
        name: "Pretzel",
        description: "Large Bavarian soft pretzel with butter",
        price: 5.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sides",
      },
      {
        id: "11-6",
        name: "Potato Pancakes",
        description: "Crispy potato pancakes with apple sauce",
        price: 7.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sides",
      },
      {
        id: "11-7",
        name: "Black Forest Cake",
        description: "Chocolate cake with cherries and whipped cream",
        price: 8.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Desserts",
      },
      {
        id: "11-8",
        name: "German Beer",
        description: "Selection of German lagers",
        price: 6.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Drinks",
      },
    ],
  },

  // BEY Restaurants (Lebanon)
  {
    id: "12",
    name: "Al Falamanki",
    cuisine: "Lebanese",
    rating: 4.9,
    deliveryTime: "25-35 min",
    image: "/placeholder.svg?height=200&width=400",
    location: { lat: 33.8209, lng: 35.4884 },
    airport: "BEY",
    menu: [
      {
        id: "12-1",
        name: "Mixed Grill Platter",
        description: "Assorted grilled meats with rice and grilled vegetables",
        price: 24.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "12-2",
        name: "Mezze Platter",
        description: "Hummus, baba ghanoush, tabbouleh, fattoush, labneh",
        price: 16.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Appetizers",
      },
      {
        id: "12-3",
        name: "Chicken Shawarma Plate",
        description: "Marinated chicken with garlic sauce, pickles, and rice",
        price: 14.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "12-4",
        name: "Shawarma Wrap",
        description: "Chicken shawarma in flatbread with garlic sauce",
        price: 9.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Wraps",
      },
      {
        id: "12-5",
        name: "Lamb Kofta",
        description: "Grilled minced lamb kebabs with tahini",
        price: 18.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Mains",
      },
      {
        id: "12-6",
        name: "Fattoush Salad",
        description: "Mixed greens with fried pita, sumac dressing",
        price: 9.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Salads",
      },
      {
        id: "12-7",
        name: "Kibbeh",
        description: "Fried bulgur and meat croquettes",
        price: 11.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Appetizers",
      },
      {
        id: "12-8",
        name: "Knefeh",
        description: "Sweet cheese pastry with orange blossom syrup",
        price: 7.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Dessert",
      },
      {
        id: "12-9",
        name: "Baklava",
        description: "Layered phyllo with nuts and honey",
        price: 6.99,
        image: "/baklava-dessert.jpg",
        category: "Dessert",
      },
      {
        id: "12-10",
        name: "Ayran",
        description: "Salted yogurt drink",
        price: 3.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Drinks",
      },
    ],
  },
  {
    id: "13",
    name: "Zaatar w Zeit",
    cuisine: "Lebanese",
    rating: 4.7,
    deliveryTime: "20-30 min",
    image: "/placeholder.svg?height=200&width=400",
    location: { lat: 33.8209, lng: 35.4884 },
    airport: "BEY",
    menu: [
      {
        id: "13-1",
        name: "Manakeesh Zaatar",
        description: "Fresh thyme flatbread with olive oil",
        price: 5.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Breakfast",
      },
      {
        id: "13-2",
        name: "Cheese Manakeesh",
        description: "Flatbread with melted cheese blend",
        price: 6.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Breakfast",
      },
      {
        id: "13-3",
        name: "Zaatar & Cheese Manakeesh",
        description: "Combination of thyme and cheese",
        price: 7.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Breakfast",
      },
      {
        id: "13-4",
        name: "Lahmajoun",
        description: "Armenian-style meat pizza",
        price: 8.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Breakfast",
      },
      {
        id: "13-5",
        name: "Falafel Sandwich",
        description: "Crispy falafel with tahini and vegetables in pita",
        price: 7.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sandwiches",
      },
      {
        id: "13-6",
        name: "Halloumi Sandwich",
        description: "Grilled halloumi cheese with vegetables",
        price: 8.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Sandwiches",
      },
      {
        id: "13-7",
        name: "Chicken Saj",
        description: "Grilled chicken wrap with garlic paste",
        price: 10.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Wraps",
      },
      {
        id: "13-8",
        name: "Hummus Bowl",
        description: "Creamy hummus with chickpeas and pita",
        price: 7.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Bowls",
      },
      {
        id: "13-9",
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Drinks",
      },
      {
        id: "13-10",
        name: "Mint Lemonade",
        description: "Fresh lemonade with mint leaves",
        price: 4.99,
        image: "/placeholder.svg?height=150&width=150",
        category: "Drinks",
      },
    ],
  },
]
