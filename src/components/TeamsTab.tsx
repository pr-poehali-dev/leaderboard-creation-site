import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Team } from '@/types/player';

interface TeamsTabProps {
  teams: Team[];
  isLoggedIn: boolean;
  onCreateTeam: () => void;
}

export default function TeamsTab({ teams, isLoggedIn, onCreateTeam }: TeamsTabProps) {
  return (
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
                  <Button onClick={onCreateTeam} className="mt-4">
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
  );
}