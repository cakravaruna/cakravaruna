import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/cakravarunajesaba/', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const quickLinks = [
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Visi & Misi', href: '#vision' },
    { name: 'Program Kerja', href: '#programs' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Berita', href: '#news' },
    { name: 'Kontak', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 golden-gradient rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold golden-text">Kader Budaya</h3>
                <p className="text-sm text-muted-foreground">Indonesia</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Organisasi yang didedikasikan untuk melestarikan, mengembangkan, 
              dan mempromosikan kekayaan budaya nusantara kepada generasi muda 
              dan masyarakat luas.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  onClick={() => window.open(social.href, '_blank')}
                >
                  <social.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Navigasi Cepat</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {currentYear} Devisi media Kader Budaya Cakavaruna.
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                "Melestarikan Warisan, Membangun Peradaban"
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <button className="hover:text-primary transition-colors">
                Kebijakan Privasi
              </button>
              <span>•</span>
              <button className="hover:text-primary transition-colors">
                Syarat & Ketentuan
              </button>
              <span>•</span>
              <button className="hover:text-primary transition-colors">
                Bantuan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 golden-gradient"></div>
    </footer>
  );
}
