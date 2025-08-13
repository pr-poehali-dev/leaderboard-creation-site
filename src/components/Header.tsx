import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  currentUser: string;
  onLogout: () => void;
}

export default function Header({ isLoggedIn, isAdmin, currentUser, onLogout }: HeaderProps) {
  return (
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
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <Icon name="LogOut" className="h-4 w-4 mr-2" />
                  Выйти
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}