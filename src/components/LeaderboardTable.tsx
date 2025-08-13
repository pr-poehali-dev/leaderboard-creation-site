import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Player } from '@/types/player';

interface LeaderboardTableProps {
  players: Player[];
}

export default function LeaderboardTable({ players }: LeaderboardTableProps) {
  return (
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
  );
}