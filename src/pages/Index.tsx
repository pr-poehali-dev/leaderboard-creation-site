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

const mockPlayers: Player[] = [
  { id: 1, rank: 1, username: "IgorKay", score: 359359, country: "RU", flag: "🇷🇺", time: "6m 50s", lastActive: "2 месяца назад", clan: "SpeedRunners", avatar: "https://cdn.poehali.dev/files/7085a218-a37e-4843-9cbb-616918f4434b.jpg" },
  { id: 2, rank: 2, username: "drip120", score: 494000, country: "IT", flag: "🇮🇹", time: "7m 01s", lastActive: "1 год назад", team: "Elite Squad" },
  { id: 3, rank: 3, username: "NoHacsJustRoblox", score: 283000, country: "CA", flag: "🇨🇦", time: "7m 22s", lastActive: "1 год назад", clan: "ProGamers" },
  { id: 4, rank: 4, username: "skycrab1", score: 784000, country: "NO", flag: "🇳🇴", time: "7m 23s", lastActive: "1 год назад" },
  { id: 5, rank: 5, username: "NoFear1337", score: 254000, country: "ES", flag: "🇪🇸", time: "7m 26s", lastActive: "1 год назад", team: "Thunder Wolves" },
  { id: 6, rank: 6, username: "Jay12310", score: 121000, country: "CA", flag: "🇨🇦", time: "7m 29s", lastActive: "1 год назад" },
  { id: 7, rank: 7, username: "jason_n", score: 374000, country: "DE", flag: "🇩🇪", time: "7m 29s", lastActive: "10 месяцев назад", clan: "Velocity" },
  { id: 8, rank: 8, username: "sadekeppi", score: 931000, country: "FI", flag: "🇫🇮", time: "7m 29s", lastActive: "4 месяца назад" },
];

const mockClans = [
  { name: "SpeedRunners", members: 15, avgScore: 285000, leader: "IgorKay" },
  { name: "ProGamers", members: 23, avgScore: 198000, leader: "NoHacsJustRoblox" },
  { name: "Velocity", members: 8, avgScore: 245000, leader: "jason_n" },
];

const mockTeams = [
  { name: "Elite Squad", members: 5, totalScore: 1250000, captain: "drip120" },
  { name: "Thunder Wolves", members: 4, totalScore: 890000, captain: "NoFear1337" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    country: ""
  });

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Регистрация успешна! Добро пожаловать в таблицу лидеров!");
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
              <Button variant="outline" size="sm">
                <Icon name="Settings" className="h-4 w-4 mr-2" />
                Админ-панель
              </Button>
              <Button variant="default" size="sm">
                <Icon name="UserPlus" className="h-4 w-4 mr-2" />
                Войти
              </Button>
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
                      <div className="text-2xl font-bold text-primary">1,247</div>
                      <div className="text-sm text-muted-foreground">Всего игроков</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">156</div>
                      <div className="text-sm text-muted-foreground">Активных</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">23</div>
                      <div className="text-sm text-muted-foreground">Кланов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">45</div>
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
                      {mockPlayers.map((player) => (
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
                      ))}
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
                  {mockClans.map((clan, index) => (
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
                  ))}
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
                  {mockTeams.map((team, index) => (
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}