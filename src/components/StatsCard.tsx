import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Player, Clan, Team } from '@/types/player';

interface StatsCardProps {
  players: Player[];
  clans: Clan[];
  teams: Team[];
}

export default function StatsCard({ players, clans, teams }: StatsCardProps) {
  return (
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
  );
}