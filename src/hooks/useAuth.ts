import { useState } from 'react';
import { Player, RegistrationData } from '@/types/player';
import { getCountryFlag } from '@/utils/playerUtils';

export const useAuth = (players: Player[], setPlayers: (players: Player[]) => void) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('currentUser') || '';
  });
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    username: "",
    email: "",
    country: ""
  });

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    const adminEmails = ["angel16940841@gmail.com"];
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
      alert("Пожалуйста, введите корректный email адрес!");
      return;
    }
    
    if (!registrationData.username || !registrationData.email || !registrationData.country) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }
    
    if (registrationData.username.length < 3) {
      alert("Никнейм должен содержать минимум 3 символа!");
      return;
    }
    
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    const userCode = prompt(`На email ${registrationData.email} отправлен код подтверждения.\n\nДля демонстрации ваш код: ${confirmationCode}\n\nВведите код подтверждения:`);
    
    if (userCode === confirmationCode.toString()) {
      const username = registrationData.username;
      const email = registrationData.email;
      const country = registrationData.country;
      
      setCurrentUser(username);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', username);
      localStorage.setItem('isLoggedIn', 'true');
      
      const isAdminEmail = adminEmails.includes(email.toLowerCase());
      setIsAdmin(isAdminEmail);
      localStorage.setItem('isAdmin', isAdminEmail.toString());
      
      const newPlayer: Player = {
        id: Date.now(),
        rank: players.length + 1,
        username: username,
        score: 0,
        country: country,
        flag: getCountryFlag(country),
        time: "--:--",
        lastActive: "Сейчас",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
      };
      
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));
      
      if (isAdminEmail) {
        alert(`Email подтвержден! Добро пожаловать, ${username}! Вы получили права администратора!`);
      } else {
        alert(`Email подтвержден! Добро пожаловать, ${username}! Вы добавлены в таблицу лидеров.`);
      }
      
      setRegistrationData({ username: "", email: "", country: "" });
      return 'leaderboard';
    } else {
      alert("Неверный код подтверждения! Попробуйте снова.");
      return null;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser("");
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    alert("Вы вышли из аккаунта");
  };

  return {
    isLoggedIn,
    isAdmin,
    currentUser,
    registrationData,
    setRegistrationData,
    handleRegistration,
    handleLogout
  };
};