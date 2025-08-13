import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

interface Player {
  id: number;
  rank: number;
  username: string;
  score: number;
  country: string;
  flag: string;
  time: string;
  lastActive: string;
  clan?: string;
  team?: string;
  avatar?: string;
}

const mockPlayers: Player[] = [];

const mockClans: Array<{name: string; members: number; avgScore: number; leader: string}> = [];

const mockTeams: Array<{name: string; members: number; totalScore: number; captain: string}> = [];

export default function Index() {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('currentUser') || '';
  });
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('players');
    if (saved && JSON.parse(saved).length > 0) {
      return JSON.parse(saved);
    }
    
    // Заранее созданные места с 1 по 10
    const defaultPlayers: Player[] = [
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
    
    localStorage.setItem('players', JSON.stringify(defaultPlayers));
    return defaultPlayers;
  });
  const [clans, setClans] = useState(() => {
    const saved = localStorage.getItem('clans');
    return saved ? JSON.parse(saved) : [];
  });
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('teams');
    return saved ? JSON.parse(saved) : [];
  });
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    country: ""
  });

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Список админ email-ов
    const adminEmails = ["angel16940841@gmail.com"];
    
    // Проверка валидности email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
      alert("Пожалуйста, введите корректный email адрес!");
      return;
    }
    
    // Проверка на заполненность полей
    if (!registrationData.username || !registrationData.email || !registrationData.country) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }
    
    // Проверка длины никнейма
    if (registrationData.username.length < 3) {
      alert("Никнейм должен содержать минимум 3 символа!");
      return;
    }
    
    // Имитация отправки кода подтверждения
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    const userCode = prompt(`На email ${registrationData.email} отправлен код подтверждения.\n\nДля демонстрации ваш код: ${confirmationCode}\n\nВведите код подтверждения:`);
    
    if (userCode === confirmationCode.toString()) {
      const username = registrationData.username;
      const email = registrationData.email;
      const country = registrationData.country;
      
      // Сохраняем данные пользователя
      setCurrentUser(username);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', username);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Проверяем, является ли email админским
      const isAdminEmail = adminEmails.includes(email.toLowerCase());
      setIsAdmin(isAdminEmail);
      localStorage.setItem('isAdmin', isAdminEmail.toString());
      
      // Добавляем игрока в таблицу лидеров
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
      
      setActiveTab("leaderboard");
      setRegistrationData({ username: "", email: "", country: "" });
    } else {
      alert("Неверный код подтверждения! Попробуйте снова.");
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
  
  const getCountryFlag = (country: string) => {
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
  
  const handleCreateClan = () => {
    const clanName = prompt("Введите название клана:");
    if (clanName && clanName.trim()) {
      const newClan = {
        name: clanName.trim(),
        members: 1,
        avgScore: 0,
        leader: currentUser
      };
      const updatedClans = [...clans, newClan];
      setClans(updatedClans);
      localStorage.setItem('clans', JSON.stringify(updatedClans));
      alert(`Клан "${clanName}" создан! Вы стали лидером клана.`);
      setActiveTab("clans");
    }
  };
  
  const handleCreateTeam = () => {
    const teamName = prompt("Введите название команды:");
    if (teamName && teamName.trim()) {
      const newTeam = {
        name: teamName.trim(),
        members: 1,
        totalScore: 0,
        captain: currentUser
      };
      const updatedTeams = [...teams, newTeam];
      setTeams(updatedTeams);
      localStorage.setItem('teams', JSON.stringify(updatedTeams));
      alert(`Команда "${teamName}" создана! Вы стали капитаном команды.`);
      setActiveTab("teams");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Trophy" className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-orbitron font-bold text-primary">LEADERBOARD</h1>
            </div>
            <div className="flex items-center space-x-2">
              {isLoggedIn && isAdmin && (
                <Button variant="outline" size="sm">
                  <Icon name="Settings" className="h-4 w-4 mr-2" />
                  Админ-панель
                </Button>
              )}
              {isLoggedIn && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Привет, {currentUser}!</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <Icon name="LogOut" className="h-4 w-4 mr-2" />
                    Выйти
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-secondary">
            <TabsTrigger value="leaderboard" className="font-orbitron">
              <Icon name="Trophy" className="h-4 w-4 mr-2" />
              Лидеры
            </TabsTrigger>
            <TabsTrigger value="registration" className="font-orbitron">
              <Icon name="UserPlus" className="h-4 w-4 mr-2" />
              Регистрация
            </TabsTrigger>
            <TabsTrigger value="clans" className="font-orbitron">
              <Icon name="Shield" className="h-4 w-4 mr-2" />
              Кланы
            </TabsTrigger>
            <TabsTrigger value="teams" className="font-orbitron">
              <Icon name="Users" className="h-4 w-4 mr-2" />
              Команды
            </TabsTrigger>
          </TabsList>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Stats Cards */}
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle className="font-orbitron text-primary flex items-center">
                    <Icon name="BarChart3" className="h-5 w-5 mr-2" />
                    Статистика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{players.length}</div>
                      <div className="text-sm text-muted-foreground">Всего игроков</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{players.filter(p => p.lastActive === "Сейчас").length}</div>
                      <div className="text-sm text-muted-foreground">Активных</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{clans.length}</div>
                      <div className="text-sm text-muted-foreground">Кланов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{teams.length}</div>
                      <div className="text-sm text-muted-foreground">Команд</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Leaderboard */}
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle className="font-orbitron text-primary flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon name="Trophy" className="h-5 w-5 mr-2" />
                      Таблица лидеров
                    </div>
                    <Badge variant="secondary">Версия 1.16.1</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="font-orbitron text-primary">#</TableHead>
                        <TableHead className="font-orbitron text-primary">Игрок</TableHead>
                        <TableHead className="font-orbitron text-primary">IGT</TableHead>
                        <TableHead className="font-orbitron text-primary">Время</TableHead>
                        <TableHead className="font-orbitron text-primary">Дата</TableHead>
                        <TableHead className="font-orbitron text-primary">Очки</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {players.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex flex-col items-center space-y-2">
                              <Icon name="Trophy" className="h-12 w-12 text-muted-foreground" />
                              <h3 className="font-orbitron text-lg text-muted-foreground">Таблица лидеров пуста</h3>
                              <p className="text-sm text-muted-foreground">Стань первым! Зарегистрируйся и займи место #1</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        players.map((player) => (
                          <TableRow key={player.id} className="border-border hover:bg-secondary/50 transition-colors">
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {player.rank <= 3 && (
                                  <Icon 
                                    name={player.rank === 1 ? "Crown" : player.rank === 2 ? "Medal" : "Award"} 
                                    className={`h-4 w-4 ${player.rank === 1 ? 'text-yellow-500' : player.rank === 2 ? 'text-gray-400' : 'text-amber-600'}`}
                                  />
                                )}
                                <span className="font-bold">{player.rank}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={player.avatar} />
                                  <AvatarFallback>{player.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">{player.username}</span>
                                    <span className="text-lg">{player.flag}</span>
                                  </div>
                                  {(player.clan || player.team) && (
                                    <div className="text-xs text-muted-foreground">
                                      {player.clan && <Badge variant="outline" className="mr-1">{player.clan}</Badge>}
                                      {player.team && <Badge variant="secondary">{player.team}</Badge>}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-primary">{player.time}</TableCell>
                            <TableCell className="font-mono text-primary">{player.time}</TableCell>
                            <TableCell className="text-muted-foreground">{player.lastActive}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span className="font-bold text-primary">{player.score.toLocaleString()}</span>
                                <Icon name="TrendingUp" className="h-4 w-4 text-green-500" />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Registration Tab */}
          <TabsContent value="registration" className="space-y-6">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="font-orbitron text-primary text-center">
                  <Icon name="UserPlus" className="h-6 w-6 mx-auto mb-2" />
                  Регистрация
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegistration} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Имя пользователя</label>
                    <Input
                      value={registrationData.username}
                      onChange={(e) => setRegistrationData({...registrationData, username: e.target.value})}
                      placeholder="Введите ваш никнейм"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Страна</label>
                    <Input
                      value={registrationData.country}
                      onChange={(e) => setRegistrationData({...registrationData, country: e.target.value})}
                      placeholder="Россия"
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" className="w-full font-orbitron">
                    <Icon name="Rocket" className="h-4 w-4 mr-2" />
                    Зарегистрироваться
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clans Tab */}
          <TabsContent value="clans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-primary flex items-center">
                  <Icon name="Shield" className="h-5 w-5 mr-2" />
                  Кланы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {clans.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="flex flex-col items-center space-y-2">
                        <Icon name="Shield" className="h-12 w-12 text-muted-foreground" />
                        <h3 className="font-orbitron text-lg text-muted-foreground">Пока нет кланов</h3>
                        <p className="text-sm text-muted-foreground">Создай первый клан и собери команду!</p>
                        {isLoggedIn && (
                          <Button onClick={handleCreateClan} className="mt-4">
                            <Icon name="Plus" className="h-4 w-4 mr-2" />
                            Создать клан
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    clans.map((clan, index) => (
                      <Card key={index} className="bg-secondary/30">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-primary text-primary-foreground font-orbitron">
                                  {clan.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-orbitron font-bold">{clan.name}</h3>
                                <p className="text-sm text-muted-foreground">Лидер: {clan.leader}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary">{clan.members} участников</div>
                              <div className="text-sm text-muted-foreground">Ср. очки: {clan.avgScore.toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Progress value={(clan.avgScore / 500000) * 100} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-orbitron text-primary flex items-center">
                  <Icon name="Users" className="h-5 w-5 mr-2" />
                  Команды
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {teams.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="flex flex-col items-center space-y-2">
                        <Icon name="Users" className="h-12 w-12 text-muted-foreground" />
                        <h3 className="font-orbitron text-lg text-muted-foreground">Команды отсутствуют</h3>
                        <p className="text-sm text-muted-foreground">Создай команду и покажи, на что способна дружная команда!</p>
                        {isLoggedIn && (
                          <Button onClick={handleCreateTeam} className="mt-4">
                            <Icon name="Plus" className="h-4 w-4 mr-2" />
                            Создать команду
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    teams.map((team, index) => (
                      <Card key={index} className="bg-secondary/30">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-accent text-accent-foreground font-orbitron">
                                  {team.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-orbitron font-bold">{team.name}</h3>
                                <p className="text-sm text-muted-foreground">Капитан: {team.captain}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary">{team.members} игроков</div>
                              <div className="text-sm text-muted-foreground">Общие очки: {team.totalScore.toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Progress value={(team.totalScore / 2000000) * 100} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}