// src/data/mockData.js

export const currentUser = {
  name: "Alex Rivera", 
  role: "Pro Seller", 
  initials: "AR", 
  color: "bg-orange-200 text-orange-800"
};

export const INITIAL_CHATS = [
  { 
    id: 1, 
    productName: "Vintage Camera - $120", 
    sellerName: "Jordan Smith", 
    avatarInitials: "JS", 
    avatarColor: "bg-emerald-100 text-emerald-800", 
    productColor: "bg-amber-100", 
    lastMessage: "Where would you like to meet?", 
    time: "2m ago", 
    unread: false, 
    online: true 
  },
  { 
    id: 2, 
    productName: "Nike Air Max", 
    sellerName: "Sarah Wilson", 
    avatarInitials: "SW", 
    avatarColor: "bg-blue-100 text-blue-800", 
    productColor: "bg-slate-200", 
    lastMessage: "Would you take $80 for them?", 
    time: "1h ago", 
    unread: true, 
    online: true 
  },
  { 
    id: 3, 
    productName: "iPhone 13 Pro", 
    sellerName: "Mike Ross", 
    avatarInitials: "MR", 
    avatarColor: "bg-purple-100 text-purple-800", 
    productColor: "bg-orange-100", 
    lastMessage: "Great, see you then!", 
    time: "3h ago", 
    unread: false, 
    online: false 
  },
];

export const INITIAL_MESSAGES = [
  // Chat 1 (Vintage Camera)
  { id: 1, chatId: 1, text: "Hello! Is it still functional?", sender: "other", time: "10:42 AM" },
  { id: 2, chatId: 1, text: "Yes, fully functional. The lens is pristine.", sender: "me", time: "10:45 AM", status: "seen" },
  { id: 3, chatId: 1, text: "I could do $110. What do you think?", sender: "me", time: "10:48 AM", status: "seen" },
  { id: 4, chatId: 1, text: "$110 works for me!", sender: "other", time: "10:50 AM" },
  { id: 5, chatId: 1, text: "Where would you like to meet?", sender: "me", time: "10:52 AM", status: "delivered" },
  
  // Chat 2 (Nike Air Max)
  { id: 6, chatId: 2, text: "Hi! Are the Air Max shoes true to size?", sender: "other", time: "9:00 AM" },
  { id: 7, chatId: 2, text: "Yes they are! Barely worn.", sender: "me", time: "9:15 AM", status: "seen" },
  { id: 8, chatId: 2, text: "Would you take $80 for them?", sender: "other", time: "10:00 AM" },
];