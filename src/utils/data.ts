import { createStore } from '@stencil/store';

export interface RoomData {
  id: string;
  hotelName: string;
  roomType: string;
  imageUrl: string;
  adults: number;
  checkIn: string;
  checkOut: string;
  price: number;
}

const initialRooms: RoomData[] = [
  {
    id: '1',
    hotelName: 'Grand Palace Hotel',
    roomType: 'Royal Suite',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    adults: 2,
    checkIn: '2026-03-10',
    checkOut: '2026-03-14',
    price: 420,
  },
  {
    id: '2',
    hotelName: 'Grand Palace Hotel',
    roomType: 'Deluxe Room',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
    adults: 2,
    checkIn: '2026-03-10',
    checkOut: '2026-03-14',
    price: 260,
  },

  {
    id: '3',
    hotelName: 'Ocean Breeze Resort',
    roomType: 'Standard Room',
    imageUrl: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=900&q=80',
    adults: 2,
    checkIn: '2026-04-02',
    checkOut: '2026-04-06',
    price: 290,
  },

  {
    id: '4',
    hotelName: 'City Central Inn',
    roomType: 'Business Suite',
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80',
    adults: 1,
    checkIn: '2026-05-12',
    checkOut: '2026-05-15',
    price: 340,
  },

  {
    id: '5',
    hotelName: 'Forest Valley Lodge',
    roomType: 'Woodland Suite',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80',
    adults: 2,
    checkIn: '2026-06-01',
    checkOut: '2026-06-05',
    price: 390,
  },
  {
    id: '6',
    hotelName: 'Forest Valley Lodge',
    roomType: 'Garden Room',
    imageUrl: 'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=900&q=80',
    adults: 2,
    checkIn: '2026-06-01',
    checkOut: '2026-06-05',
    price: 240,
  },
];

const { state } = createStore({ rooms: initialRooms });

export const cartsStore = state;

export const cartsData = state.rooms;

// const store = createStore({
//   rooms: initialRooms,
// });

// export const cartsStore = store.state;

// export const cartsData = cartsStore.rooms;

export function updateRoom(updated: RoomData) {
  cartsStore.rooms = cartsStore.rooms.map(room => (room.id === updated.id ? { ...updated } : room));
}
