import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const timeSlots = [
    '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
  ];

  const services = [
    { icon: 'Gamepad2', title: 'Игровые сеансы', description: 'Современные ПК с RTX 4080, 240Hz мониторы, игровые кресла премиум-класса' },
    { icon: 'Users', title: 'Турниры', description: 'Еженедельные турниры по CS:GO, Dota 2, Valorant с призовым фондом' },
    { icon: 'Trophy', title: 'VIP-зона', description: 'Приватные игровые комнаты для команд с эксклюзивным оборудованием' },
    { icon: 'Wifi', title: 'Гигабитный интернет', description: 'Выделенные каналы 1 Гбит/с для каждого ПК, пинг до серверов < 5 мс' },
  ];

  const equipment = [
    { name: 'Процессор', spec: 'Intel Core i9-13900K' },
    { name: 'Видеокарта', spec: 'NVIDIA RTX 4080 16GB' },
    { name: 'Оперативная память', spec: '32GB DDR5 6000MHz' },
    { name: 'Монитор', spec: 'ASUS ROG 27" 240Hz 1ms' },
    { name: 'Периферия', spec: 'Logitech G Pro X, HyperX' },
    { name: 'Интернет', spec: '1 Гбит/с выделенный канал' },
  ];

  const tournaments = [
    { game: 'CS:GO', date: '15 декабря', prize: '50 000 ₽', status: 'Регистрация открыта' },
    { game: 'Dota 2', date: '22 декабря', prize: '75 000 ₽', status: 'Регистрация открыта' },
    { game: 'Valorant', date: '29 декабря', prize: '40 000 ₽', status: 'Скоро' },
  ];

  const gallery = [
    { url: 'https://cdn.poehali.dev/projects/5e0fd140-70f8-4ebf-b966-1128f4fb321c/files/7341e2f8-0cd3-4962-829e-6879efd8e52d.jpg', title: 'Игровой зал' },
    { url: 'https://cdn.poehali.dev/projects/5e0fd140-70f8-4ebf-b966-1128f4fb321c/files/94f75976-e5e9-49cf-bce5-8d103ac6135f.jpg', title: 'Турнирная арена' },
    { url: 'https://cdn.poehali.dev/projects/5e0fd140-70f8-4ebf-b966-1128f4fb321c/files/435f4744-d5d3-48c4-8777-bbd43b86f8a8.jpg', title: 'Игровое оборудование' },
  ];

  const handleBooking = () => {
    if (!date || !selectedTime) {
      toast({
        title: "Ошибка",
        description: "Выберите дату и время для бронирования",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Успешно!",
      description: `Место забронировано на ${format(date, 'dd MMMM', { locale: ru })} в ${selectedTime}`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      toast({
        title: "Ошибка",
        description: "Введите корректный email",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Спасибо за обращение!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold neon-glow neon-cyan">CYBER ARENA</h1>
            <div className="hidden md:flex gap-6">
              {['home', 'services', 'equipment', 'tournaments', 'gallery', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-sm hover:text-primary transition-colors capitalize"
                >
                  {section === 'home' ? 'Главная' : 
                   section === 'services' ? 'Услуги' :
                   section === 'equipment' ? 'Оборудование' :
                   section === 'tournaments' ? 'Турниры' :
                   section === 'gallery' ? 'Галерея' : 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 neon-glow neon-cyan animate-pulse-glow">
            КИБЕРСПОРТИВНАЯ АРЕНА
          </h2>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Лучшее игровое оборудование, профессиональные турниры и незабываемая атмосфера киберспорта в самом центре города
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="neon-border bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => scrollToSection('booking')}
            >
              <Icon name="Calendar" className="mr-2" />
              Забронировать место
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10"
              onClick={() => scrollToSection('tournaments')}
            >
              <Icon name="Trophy" className="mr-2" />
              Турниры
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 neon-glow neon-magenta">
            Наши услуги
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Card key={idx} className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Icon name={service.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="equipment" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 neon-glow neon-orange">
            Оборудование
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {equipment.map((item, idx) => (
              <Card key={idx} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-semibold text-primary">{item.spec}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="tournaments" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 neon-glow neon-cyan">
            Ближайшие турниры
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tournaments.map((tournament, idx) => (
              <Card key={idx} className="border-border hover:border-secondary transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">{tournament.game}</CardTitle>
                  <CardDescription className="space-y-2 text-base">
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" className="w-4 h-4" />
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Trophy" className="w-4 h-4 text-accent" />
                      <span className="text-accent font-semibold">{tournament.prize}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary">
                        {tournament.status}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 neon-glow neon-magenta">
            Бронирование
          </h3>
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Выберите дату</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Icon name="Calendar" className="mr-2 h-4 w-4" />
                        {date ? format(date, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={ru}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Выберите время</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        className={selectedTime === time ? 'bg-primary' : ''}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 neon-border"
                  onClick={handleBooking}
                >
                  <Icon name="Check" className="mr-2" />
                  Забронировать
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 neon-glow neon-orange">
            Галерея
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {gallery.map((image, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-lg border border-border hover:border-primary transition-all duration-300">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-lg font-semibold p-4 text-primary">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 neon-glow neon-cyan">
            Контакты
          </h3>
          <Card className="border-border">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя</label>
                  <Input 
                    placeholder="Ваше имя" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Сообщение</label>
                  <Textarea 
                    placeholder="Ваше сообщение" 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Icon name="Send" className="mr-2" />
                  Отправить
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-border space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="w-5 h-5 text-primary" />
                  <a href="tel:+79991234567" className="hover:text-primary transition-colors">
                    +7 (999) 123-45-67
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="w-5 h-5 text-primary" />
                  <a href="mailto:info@cyberarena.ru" className="hover:text-primary transition-colors">
                    info@cyberarena.ru
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="w-5 h-5 text-primary" />
                  <span>г. Москва, ул. Геймерская, д. 42</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © 2024 CYBER ARENA. Все права защищены.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://vk.com" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Icon name="MessageCircle" className="w-5 h-5 text-primary" />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Icon name="Send" className="w-5 h-5 text-primary" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Icon name="Gamepad2" className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;