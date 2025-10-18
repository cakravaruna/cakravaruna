import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  LogIn, 
  BarChart3, 
  Users, 
  FileText, 
  Image, 
  MessageSquare,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFirebase } from '@/hooks/useFirebase';

export default function AdminPanel() {
  const { user, isAdmin, login } = useAuth();
  const { news, programs, gallery, comments } = useFirebase();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    const result = await login(loginForm.email, loginForm.password);
    if (!result.success) {
      alert('Login gagal: ' + result.error);
    }
    
    setIsLoggingIn(false);
  };

  // Statistics
  const stats = [
    { title: 'Total Berita', value: news.length, icon: FileText, color: 'text-blue-600' },
    { title: 'Foto Galeri', value: gallery.length, icon: Image, color: 'text-green-600' },
    { title: 'Komentar', value: comments.length, icon: MessageSquare, color: 'text-purple-600' },
    { title: 'Program Kerja', value: programs.length, icon: Users, color: 'text-orange-600' }
  ];

  const pendingComments = comments.filter(comment => !comment.approved).length;
  const recentNews = news.slice(0, 3);
  const recentComments = comments.slice(0, 5);

  if (!isAdmin) {
    return (
      <section id="admin" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 golden-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">
                  Panel <span className="golden-text">Admin</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Masuk untuk mengelola konten website
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email Admin</label>
                    <Input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      placeholder="admin@kaderbudaya.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="Masukkan password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full golden-gradient text-white hover:opacity-90"
                    disabled={isLoggingIn}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    {isLoggingIn ? 'Masuk...' : 'Masuk'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Dashboard <span className="golden-text">Admin</span>
          </h2>
          <p className="text-muted-foreground">
            Kelola konten dan pengaturan website Kader Budaya Indonesia
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Konten</TabsTrigger>
            <TabsTrigger value="comments">
              Komentar
              {pendingComments > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {pendingComments}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview content sama seperti sebelumnya */}
          </TabsContent>

          <TabsContent value="content">
            {/* Konten content sama seperti sebelumnya */}
          </TabsContent>

          <TabsContent value="comments">
            {/* Komentar content sama seperti sebelumnya */}
          </TabsContent>

          <TabsContent value="settings">
            {/* Pengaturan content sama seperti sebelumnya */}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
