import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';
import React from 'react';

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="absolute top-20 left-10 w-32 h-32 golden-gradient rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 golden-gradient rounded-full opacity-15 blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 golden-gradient rounded-full opacity-10 blur-3xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Organisasi Pelestari Budaya Nusantara</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="golden-text">Kader Budaya</span>
            <br />
            <span className="text-foreground">cakravaruna</span>
          </h1>

          {/* Slogan */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 animate-slide-up delay-200 max-w-3xl mx-auto leading-relaxed">
            "Melestarikan Warisan, Membangun Peradaban"
          </p>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground mb-12 animate-slide-up delay-300 max-w-2xl mx-auto">
            Bergabunglah dengan kami dalam misi mulia melestarikan kekayaan budaya Indonesia 
            untuk generasi masa depan yang lebih bermartabat dan berkarakter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up delay-500">
            <Button 
              size="lg" 
              onClick={scrollToAbout}
              className="golden-gradient text-white hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Pelajari Lebih Lanjut
              <ArrowDown className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full"
            >
              Lihat Galeri
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5"></div>
    </section>
  );
}
