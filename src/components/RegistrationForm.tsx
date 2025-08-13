import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { RegistrationData } from '@/types/player';

interface RegistrationFormProps {
  registrationData: RegistrationData;
  onDataChange: (data: RegistrationData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function RegistrationForm({ registrationData, onDataChange, onSubmit }: RegistrationFormProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-orbitron text-primary text-center">
          <Icon name="UserPlus" className="h-6 w-6 mx-auto mb-2" />
          Регистрация
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Имя пользователя</label>
            <Input
              value={registrationData.username}
              onChange={(e) => onDataChange({...registrationData, username: e.target.value})}
              placeholder="Введите ваш никнейм"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={registrationData.email}
              onChange={(e) => onDataChange({...registrationData, email: e.target.value})}
              placeholder="your@email.com"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Страна</label>
            <Input
              value={registrationData.country}
              onChange={(e) => onDataChange({...registrationData, country: e.target.value})}
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
  );
}