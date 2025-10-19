import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Star, Globe } from 'lucide-react';
import ft1 from '@/assets/ft1.jpg';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    { icon: Users, title: 'Komunitas Solid', description: 'Terdiri dari individu-individu yang memiliki passion tinggi terhadap pelestarian budaya Indonesia.' },
    { icon: Heart, title: 'Dedikasi Tinggi', description: 'Berkomitmen penuh dalam setiap kegiatan pelestarian dan pengembangan budaya nusantara.' },
    { icon: Star, title: 'Prestasi Gemilang', description: 'Telah meraih berbagai penghargaan dalam bidang pelestarian dan promosi budaya Indonesia.' },
    { icon: Globe, title: 'Jangkauan Luas', description: 'Aktif dalam berbagai kegiatan lokal, nasional, dan internasional untuk memperkenalkan budaya Indonesia.' }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Tentang <span className="golden-text">Kader Budaya</span>
          </h2>
          <div className="w-24 h-1 golden-gradient mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Kader Budaya Indonesia adalah organisasi yang didedikasikan untuk melestarikan, 
            mengembangkan, dan mempromosikan kekayaan budaya nusantara kepada generasi muda 
            dan masyarakat luas.
          </p>
        </div>

        {/* Konten utama */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Pengertian Kader Budaya
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Kader Budaya adalah sekelompok individu yang berkomitmen untuk menjadi 
                garda terdepan dalam pelestarian warisan budaya Indonesia. Kami percaya 
                bahwa budaya adalah identitas bangsa yang harus dijaga dan dilestarikan 
                untuk generasi mendatang.
              </p>
              <p>
                Sebagai organisasi yang berfokus pada pengembangan karakter dan kepribadian 
                melalui nilai-nilai budaya, kami berupaya menciptakan generasi muda yang 
                tidak hanya modern tetapi juga tetap mengakar pada tradisi dan kearifan lokal.
              </p>
              <p>
                Melalui berbagai program dan kegiatan, kami mengajak seluruh lapisan 
                masyarakat untuk turut serta dalam misi mulia ini, karena pelestarian 
                budaya adalah tanggung jawab bersama.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl golden-gradient p-1">
              <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                <img 
                  src={ft1} 
                  alt="Foto Organisasi"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fitur */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 golden-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
