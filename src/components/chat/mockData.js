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
  // Chat 1 (Vintage Camera) - All today, with a new message at the end
  { id: 1, chatId: 1, text: "Hello! I'm really interested in the vintage camera. Is it still functional and are there any scratches on the lens?", sender: "other", time: "10:42 AM", date: "Today" },
  { id: 2, chatId: 1, text: "Hi Jordan! Yes, it's fully functional. I recently tested it with a roll of film. The lens is pristine—no scratches or fungus.", sender: "me", time: "10:45 AM", status: "seen", date: "Today" },
  { id: 3, chatId: 1, text: "That's great to hear. I've been looking for this specific model for my collection. Is the price firm at $120?", sender: "other", time: "10:46 AM", date: "Today" },
  { id: 4, chatId: 1, text: "I could do $110 if we can meet today. What do you think?", sender: "me", time: "10:48 AM", status: "seen", date: "Today" },
  { id: 5, chatId: 1, text: "$110 works for me! Where would you like to meet? I'm available anytime after 4 PM.", sender: "other", time: "10:50 AM", isNew: true, date: "Today" },
  { id: 6, chatId: 1, text: "Is there a coffee shop nearby that would be convenient for you?", sender: "other", time: "Just now", isNew: true, date: "Today" },
  
  // Chat 2 (Nike Air Max) - Spans Yesterday and Today
  { id: 7, chatId: 2, text: "Hi! Are the Air Max shoes true to size?", sender: "other", time: "9:00 AM", date: "Yesterday" },
  { id: 8, chatId: 2, text: "Yes they are! Barely worn.", sender: "me", time: "9:15 AM", status: "seen", date: "Yesterday" },
  { id: 9, chatId: 2, text: "Would you take $80 for them?", sender: "other", time: "10:00 AM", isNew: true, date: "Today" },
];