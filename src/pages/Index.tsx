import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import LeaderboardTable from '@/components/LeaderboardTable';
import RegistrationForm from '@/components/RegistrationForm';
import ClansTab from '@/components/ClansTab';
import TeamsTab from '@/components/TeamsTab';
import { useAuth } from '@/hooks/useAuth';
import { Player, Clan, Team } from '@/types/player';
import { getDefaultPlayers } from '@/utils/playerUtils';

export default function Index() {
  const [activeTab, setActiveTab] = useState("leaderboard");
  
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('players');
    if (saved && JSON.parse(saved).length > 0) {
      return JSON.parse(saved);
    }
    
    const defaultPlayers = getDefaultPlayers();
    localStorage.setItem('players', JSON.stringify(defaultPlayers));
    return defaultPlayers;
  });
  
  const [clans, setClans] = useState<Clan[]>(() => {
    const saved = localStorage.getItem('clans');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem('teams');
    return saved ? JSON.parse(saved) : [];
  });

  const {
    isLoggedIn,
    isAdmin,
    currentUser,
    registrationData,
    setRegistrationData,
    handleRegistration,
    handleLogout
  } = useAuth(players, setPlayers);

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    const result = handleRegistration(e);
    if (result) {
      setActiveTab(result);
    }
  };

  const handleCreateClan = () => {
    const clanName = prompt("Введите название клана:");
    if (clanName && clanName.trim()) {
      const newClan: Clan = {
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
      const newTeam: Team = {
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
      <Header 
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

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

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <StatsCard players={players} clans={clans} teams={teams} />
              <LeaderboardTable players={players} />
            </div>
          </TabsContent>

          <TabsContent value="registration" className="space-y-6">
            <RegistrationForm
              registrationData={registrationData}
              onDataChange={setRegistrationData}
              onSubmit={handleRegistrationSubmit}
            />
          </TabsContent>

          <TabsContent value="clans" className="space-y-6">
            <ClansTab
              clans={clans}
              isLoggedIn={isLoggedIn}
              onCreateClan={handleCreateClan}
            />
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            <TeamsTab
              teams={teams}
              isLoggedIn={isLoggedIn}
              onCreateTeam={handleCreateTeam}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}