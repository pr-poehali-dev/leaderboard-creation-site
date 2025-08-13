import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Clan } from '@/types/player';

interface ClansTabProps {
  clans: Clan[];
  isLoggedIn: boolean;
  onCreateClan: () => void;
}

export default function ClansTab({ clans, isLoggedIn, onCreateClan }: ClansTabProps) {
  return (
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
                  <Button onClick={onCreateClan} className="mt-4">
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
  );
}