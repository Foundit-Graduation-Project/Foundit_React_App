
// export const MOCK_REPORTS = [
//   { id: 1, title: "iPhone 13 Pro - Graphite", location: "Central Park North, NY", date: "Oct 12, 2023", type: "Lost", status: "Open", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60" },
//   { id: 2, title: "Tan Leather Wallet", location: "Starbucks at 5th Ave", date: "Oct 10, 2023", type: "Found", status: "Open", image: "https://images.unsplash.com/photo-1627123424574-181ce90b594f?w=500&auto=format&fit=crop&q=60" },
//   { id: 3, title: "Golden Retriever Pup", location: "Greenwich Village", date: "Oct 08, 2023", type: "Lost", status: "Matched", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop&q=60" },
//   { id: 4, title: "Honda Car Keys", location: "Transit Center Mall", date: "Oct 05, 2023", type: "Lost", status: "Open", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=60" },
//   { id: 5, title: "MacBook Air M2 Silver", location: "Terminal 4 Lounge", date: "Oct 02, 2023", type: "Found", status: "Open", image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&auto=format&fit=crop&q=60" },
//   { id: 6, title: "Blue North Face Backpack", location: "Library North Wing", date: "Sep 28, 2023", type: "Lost", status: "Matched", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60" },
// ];

export const MOCK_REPORTS = [
  {
    id: 1,
    title: "iPhone 13 Pro - Graphite",
    location: "Central Park North, NY",
    date: "Oct 12, 2023",
    type: "Lost",
    status: "Open",
    brand: "Apple",
    model: "13 Pro",
    color: "Graphite",
    year: "2021",
    description: "Dropped near the north entrance while jogging. It has a cracked screen protector.",
    features: "Black silicone case, 'NASA' sticker on the back.",
    lat: 40.795,
    lng: -73.952,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800", // Keep for old code
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800",
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800"
    ]
  },
  {
    id: 2,
    title: "Tan Leather Wallet",
    location: "Starbucks at 5th Ave",
    date: "Oct 10, 2023",
    type: "Found",
    status: "Open",
    brand: "Fossil",
    model: "Bifold",
    color: "Tan",
    year: "2022",
    description: "Found on a table. Contains several ID cards but no cash.",
    features: "Initials 'J.D.' embossed on the bottom right corner.",
    lat: 40.758,
    lng: -73.979,
    image: "https://images.unsplash.com/photo-1627123424574-181ce90b594f?w=800",
    images: [
      "https://images.unsplash.com/photo-1627123424574-181ce90b594f?w=800",
      "https://images.unsplash.com/photo-1559563458-527698bf5295?w=800",
      "https://images.unsplash.com/photo-1606503176903-622d5ce390d6?w=800",
      "https://images.unsplash.com/photo-1517336714460-4c988911d4cc?w=800"
    ]
  },
  {
    id: 3,
    title: "Golden Retriever Pup",
    location: "Greenwich Village",
    date: "Oct 08, 2023",
    type: "Lost",
    status: "Matched",
    brand: "Dog",
    model: "Golden Retriever",
    color: "Golden",
    year: "6 Months",
    description: "Friendly puppy ran off near the park. Answers to 'Buddy'.",
    features: "Blue collar with a silver bone-shaped tag.",
    lat: 40.733,
    lng: -74.002,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
    images: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800",
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800",
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800"
    ]
  },
  {
    id: 4,
    title: "Honda Car Keys",
    location: "Transit Center Mall",
    date: "Oct 05, 2023",
    type: "Lost",
    status: "Open",
    brand: "Honda",
    model: "Civic/Accord",
    color: "Black/Silver",
    year: "2018-2022",
    description: "Lost a set of keys with a Honda fob and a gym membership card.",
    features: "Red carabiner clip and a small 'I love NY' keychain.",
    lat: 40.712,
    lng: -74.006,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800",
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800",
      "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?w=800",
      "https://images.unsplash.com/photo-1549194810-766737f7e249?w=800",
      "https://images.unsplash.com/photo-1594494250444-984408101683?w=800"
    ]
  },
  {
    id: 5,
    title: "MacBook Air M2 Silver",
    location: "Terminal 4 Lounge",
    date: "Oct 02, 2023",
    type: "Found",
    status: "Open",
    brand: "Apple",
    model: "Air M2",
    color: "Silver",
    year: "2023",
    description: "Found left in the seating area near gate B23.",
    features: "Slight dent on the left corner, custom 'Solar System' wallpaper.",
    lat: 40.641,
    lng: -73.778,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800",
      "https://images.unsplash.com/photo-1517336714460-4c988911d4cc?w=800",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"
    ]
  },
  {
    id: 6,
    title: "Blue North Face Backpack",
    location: "Library North Wing",
    date: "Sep 28, 2023",
    type: "Lost",
    status: "Matched",
    brand: "The North Face",
    model: "Jester",
    color: "Navy Blue",
    year: "N/A",
    description: "Left in the cubbies near the printer room.",
    features: "Contains a calculus textbook and a orange water bottle.",
    lat: 40.729,
    lng: -73.996,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800",
      "https://images.unsplash.com/photo-1577733966973-d680babb2da0?w=800"
    ]
  },
];