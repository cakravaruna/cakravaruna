import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Moon, Sun, Menu, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import myPhoto from '@/assets/myphoto.jpg'; 

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  const navigation = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Visi & Misi', href: '#vision' },
    { name: 'Program Kerja', href: '#programs' },
    { name: 'Galeri', href: '#organization' },
    { name: 'Berita', href: '#news' },
    { name: 'Kontak', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-golden">
              <img
                src={myPhoto}
                alt="Logo Saya"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold golden-text">Kader Budaya</h1>
              <p className="text-xs text-muted-foreground">SMA NEGERI 1 JETIS</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="w-9 h-9"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Admin buttons */}
            {isAdmin && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scrollToSection('#admin')}
                  className="w-9 h-9"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="w-9 h-9"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-golden">
                      <img
                        src={myPhoto}
                        alt="Logo Saya"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold golden-text">Kader Budaya</h2>
                      <p className="text-xs text-muted-foreground">Menu Navigasi</p>
                    </div>
                  </div>

                  {/* Navigation */}
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-left py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}

                  {/* Admin menu */}
                  {isAdmin && (
                    <div className="pt-4 border-t space-y-2">
                      <button
                        onClick={() => scrollToSection('#admin')}
                        className="w-full text-left py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Panel Admin</span>
                      </button>
                      <button
                        onClick={logout}
                        className="w-full text-left py-2 px-3 rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

