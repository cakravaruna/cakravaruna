import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Calendar, User } from 'lucide-react';
import { useFirebase } from '@/hooks/useFirebase';
import { useAuth } from '@/hooks/useAuth';
import { NewsItem } from '@/lib/types';

export default function News() {
  const { news, addNews, updateNews, deleteNews } = useFirebase();
  const { isAdmin } = useAuth();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  const defaultNews: NewsItem[] = [
    {
      id: '1',
      title: 'Festival Budaya Nusantara 2024 Sukses Digelar',
      content: 'Kegiatan festival menampilkan berbagai pertunjukan seni tradisional.',
      imageUrl: '',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-03-15')
    }
  ];

  const displayNews = news.length > 0 ? news : defaultNews;

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) return;

    try {
      if (editingId) {
        await updateNews(editingId, {
          title: formData.title,
          content: formData.content,
          imageUrl: formData.imageUrl || ''
        });
      } else {
        await addNews({
          title: formData.title,
          content: formData.content,
          imageUrl: formData.imageUrl || ''
        });
      }

      setFormData({ title: '', content: '', imageUrl: '' });
      setShowDialog(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      imageUrl: newsItem.imageUrl || ''
    });
    setEditingId(newsItem.id);
    setShowDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      await deleteNews(id);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', imageUrl: '' });
    setEditingId(null);
    setShowDialog(false);
  };

  return (
    <section id="news" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Berita & <span className="golden-text">Kegiatan</span>
          </h2>
          <div className="w-24 h-1 golden-gradient mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ikuti perkembangan terbaru kegiatan dan pencapaian Kader Budaya Indonesia.
          </p>
        </div>

        {isAdmin && (
          <div className="flex justify-end mb-8">
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="golden-gradient text-white hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Berita
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingId ? 'Edit Berita' : 'Tambah Berita Baru'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Judul Berita</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Masukkan judul berita..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Konten Berita</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Tulis konten berita..."
                      rows={6}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">URL Gambar (Opsional)</label>
                    <Input
                      type="text"
                      placeholder="Masukkan URL gambar..."
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.title || !formData.content}
                      className="flex-1"
                    >
                      {editingId ? 'Update' : 'Publish'}
                    </Button>
                    <Button variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {displayNews.map((newsItem) => (
            <Card key={newsItem.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="aspect-video flex items-center justify-center bg-gray-100">
                {newsItem.imageUrl ? (
                  <img src={newsItem.imageUrl} alt="Berita" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-2" />
                    <p>Gambar berita</p>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors flex-1">
                    {newsItem.title}
                  </CardTitle>
                  {isAdmin && (
                    <div className="flex space-x-1 ml-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(newsItem)} className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(newsItem.id)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{newsItem.createdAt.toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Admin</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground leading-relaxed line-clamp-4 flex-1">{newsItem.content}</p>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Baca Selengkapnya
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
