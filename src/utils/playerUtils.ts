import { Player } from '@/types/player';

export const getDefaultPlayers = (): Player[] => {
  return [
    { 
      id: 1, rank: 1, username: 'Звездный Капитан', score: 9500, 
      country: 'Россия', flag: '🇷🇺', time: '2h 45m', lastActive: 'Онлайн',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=captain'
    },
    { 
      id: 2, rank: 2, username: 'Космический Рейнджер', score: 8800, 
      country: 'США', flag: '🇺🇸', time: '3h 12m', lastActive: '5 мин назад',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ranger'
    },
    { 
      id: 3, rank: 3, username: 'Лунный Пилот', score: 8200, 
      country: 'Китай', flag: '🇨🇳', time: '2h 58m', lastActive: '12 мин назад',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pilot'
    },
    { 
      id: 4, rank: 4, username: 'Галактический Исследователь', score: 7600, 
      country: 'Япония', flag: '🇯🇵', time: '4h 22m', lastActive: '25 мин назад',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=explorer'
    },
    { 
      id: 5, rank: 5, username: 'Межзвездный Навигатор', score: 7000, 
      country: 'Германия', flag: '🇩🇪', time: '3h 45m', lastActive: '1 час назад',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=navigator'
    },
    { 
      id: 6, rank: 6, username: 'Орбитальный Инженер', score: 6400, 
      country: 'Франция', flag: '🇫🇷', time: '5h 15m', lastActive: '1 час назад',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=engineer'
    },
    { 
      id: 7, rank: 7, username: 'Космический Археолог', score: 5800, 
      country: 'Италия', flag: '🇮🇹', time: '2h 30m', lastActive: '2 часа назад',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=archaeologist'
    },
    { 
      id: 8, rank: 8, username: 'Квантовый Физик', score: 5200, 
      country: 'Канада', flag: '🇨🇦', time: '4h 10m', lastActive: '3 часа назад',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=physicist'
    },
    { 
      id: 9, rank: 9, username: 'Астрономический Картограф', score: 4600, 
      country: 'Австралия', flag: '🇦🇺', time: '3h 55m', lastActive: '4 часа назад',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cartographer'
    },
    { 
      id: 10, rank: 10, username: 'Планетарный Геолог', score: 4000, 
      country: 'Бразилия', flag: '🇧🇷', time: '6h 20m', lastActive: '5 часов назад',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=geologist'
    }
  ];
};

export const getCountryFlag = (country: string): string => {
  const flags: {[key: string]: string} = {
    'россия': '🇷🇺',
    'сша': '🇺🇸',
    'германия': '🇩🇪',
    'франция': '🇫🇷',
    'италия': '🇮🇹',
    'испания': '🇪🇸',
    'канада': '🇨🇦',
    'норвегия': '🇳🇴',
    'финляндия': '🇫🇮'
  };
  return flags[country.toLowerCase()] || '🌍';
};