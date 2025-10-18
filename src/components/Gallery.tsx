import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Users } from 'lucide-react';
import { useFirebase } from '@/hooks/useFirebase';
import { useAuth } from '@/hooks/useAuth';

interface Member {
  id: string;
  name: string;
  position: string;
  photoUrl: string;
  period: string;
}

export default function Organization() {
  const { gallery: members, addGalleryItem: addMember, deleteGalleryItem: deleteMember } = useFirebase();
  const { isAdmin } = useAuth();
  const [uploadDialog, setUploadDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    photoUrl: ''
  });

  const currentYear = new Date().getFullYear().toString();

  // Filter hanya anggota periode sekarang
  const displayMembers = (members.length > 0 ? members : []).filter(item => item.period === currentYear);

  const handleAdd = async () => {
    if (!formData.name || !formData.position || !formData.photoUrl) return;

    try {
      await addMember({
        imageUrl: formData.photoUrl,
        caption: `${formData.name} - ${formData.position}`, // gunakan caption untuk menyimpan nama & posisi
        period: currentYear
      });
      setFormData({ name: '', position: '', photoUrl: '' });
      setUploadDialog(false);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
      await deleteMember(id);
    }
  };

  return (
    <section id="organization" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Struktur <span className="golden-text">Kepengurusan {currentYear}</span>
          </h2>
          <div className="w-24 h-1 golden-gradient mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Daftar anggota pengurus Kader Budaya Indonesia periode {currentYear}.
          </p>
        </div>

        {isAdmin && (
          <div className="flex justify-end mb-8">
            <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
              <DialogTrigger asChild>
                <Button className="golden-gradient text-white hover:opacity-90">
                  Tambah Anggota
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Anggota Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nama Lengkap</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Jabatan</label>
                    <Input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Masukkan jabatan"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">URL Foto</label>
                    <Input
                      type="text"
                      value={formData.photoUrl}
                      onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                      placeholder="Masukkan URL foto"
                    />
                  </div>
                  <Button
                    onClick={handleAdd}
                    disabled={!formData.name || !formData.position || !formData.photoUrl}
                    className="w-full"
                  >
                    Tambah Anggota
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayMembers.map((member) => {
            const [name, position] = member.caption.split(' - ');
            return (
              <Card key={member.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-square overflow-hidden">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Users className="w-16 h-16 text-primary/60 mx-auto" />
                    </div>
                  )}

                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-foreground mb-1 line-clamp-1">{name}</h4>
                  <p className="text-sm text-muted-foreground">{position}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {displayMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Belum ada anggota untuk periode {currentYear}
            </h3>
            {isAdmin && <p className="text-muted-foreground">Tambahkan anggota pertama!</p>}
          </div>
        )}
      </div>
    </section>
  );
}
