import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Target, Lightbulb } from 'lucide-react';

export default function VisionMission() {
  return (
    <section id="vision" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Visi */}
          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 golden-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Eye className="w-10 h-10 text-white" />
              </div>
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

          {/* Misi */}
          <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 golden-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-white" />
              </div>
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
        </div>

        {/* Values */}
        <Card className="glass border-primary/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 golden-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Nilai-Nilai <span className="golden-text">Kader Budaya </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Integritas',
                  description: 'Berkomitmen pada kejujuran dan transparansi dalam setiap tindakan'
                },
                {
                  title: 'Kekeluargaan',
                  description: 'Membangun hubungan yang harmonis dan saling mendukung'
                },
                {
                  title: 'Inovasi',
                  description: 'Terus berinovasi dalam pelestarian dan promosi budaya'
                },
                {
                  title: 'Dedikasi',
                  description: 'Berkomitmen penuh terhadap misi pelestarian budaya Indonesia'
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <h4 className="text-lg font-semibold mb-2 text-primary">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}