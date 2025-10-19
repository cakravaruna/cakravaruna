import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Target, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function VisionMission() {
  const values = [
    { title: 'Integritas', description: 'Berkomitmen pada kejujuran dan transparansi dalam setiap tindakan' },
    { title: 'Kekeluargaan', description: 'Membangun hubungan yang harmonis dan saling mendukung' },
    { title: 'Inovasi', description: 'Terus berinovasi dalam pelestarian dan promosi budaya' },
    { title: 'Dedikasi', description: 'Berkomitmen penuh terhadap misi pelestarian budaya Indonesia' },
  ];

  return (
    <section id="vision" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Visi & <span className="golden-text">Misi</span>
          </h2>
          <div className="w-24 h-1 golden-gradient mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Landasan fundamental yang mengarahkan setiap langkah perjalanan 
            Kader Budaya Indonesia dalam melestarikan warisan nusantara.
          </p>
        </div>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Visi */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <CardHeader className="text-center pb-4">
                <motion.div
                  className="w-20 h-20 golden-gradient rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Eye className="w-10 h-10 text-white" />
                </motion.div>
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  <span className="golden-text">Visi</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  "Menjadi organisasi terdepan dalam pelestarian dan pengembangan 
                  budaya Indonesia yang mampu menciptakan generasi muda berkarakter, 
                  bermartabat, dan bangga akan identitas budaya nusantara."
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Misi */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <CardHeader className="text-center pb-4">
                <motion.div
                  className="w-20 h-20 golden-gradient rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Target className="w-10 h-10 text-white" />
                </motion.div>
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  <span className="golden-text">Misi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 golden-gradient rounded-full mt-2 flex-shrink-0"></div>
                    <span>Menyelenggarakan program pendidikan dan pelatihan budaya yang berkualitas</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 golden-gradient rounded-full mt-2 flex-shrink-0"></div>
                    <span>Mengadakan kegiatan pelestarian seni dan budaya tradisional Indonesia</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 golden-gradient rounded-full mt-2 flex-shrink-0"></div>
                    <span>Membangun jaringan kerjasama dengan berbagai pihak untuk pengembangan budaya</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 golden-gradient rounded-full mt-2 flex-shrink-0"></div>
                    <span>Menciptakan inovasi dalam promosi budaya Indonesia di era digital</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 golden-gradient rounded-full mt-2 flex-shrink-0"></div>
                    <span>Membentuk karakter generasi muda melalui nilai-nilai budaya luhur</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="glass border-primary/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <CardHeader className="text-center">
              <motion.div
                className="w-16 h-16 golden-gradient rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Lightbulb className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl font-bold">
                Nilai-Nilai <span className="golden-text">Kader Budaya </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-lg hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <h4 className="text-lg font-semibold mb-2 text-primary">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
