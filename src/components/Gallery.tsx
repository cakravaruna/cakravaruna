import { useState } from 'react';
import { Card } from '@/components/ui/card';
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
  const [formData, setFormData] = useState({ name: '', position: '', photoUrl: '' });

  const currentYear = new Date().getFullYear().toString();

  // Urutan posisi prioritas
  const posisiUrutan = ["ketua", "wakil ketua", "sekretaris", "bendahara", "pj sie"];

  // Filter anggota periode sekarang dan urutkan sesuai posisi
  const displayMembers = (members.length > 0 ? members : [])
    .filter(item => item.period === currentYear)
    .sort((a, b) => {
      const [, posA] = a.caption.split(' - ');
      const [, posB] = b.caption.split(' - ');

      const indexA = posisiUrutan.indexOf(posA.toLowerCase());
      const indexB = posisiUrutan.indexOf(posB.toLowerCase());

      const finalIndexA = indexA === -1 ? posisiUrutan.length : indexA;
      const finalIndexB = indexB === -1 ? posisiUrutan.length : indexB;

      return finalIndexA - finalIndexB;
    });

  const handleAdd = async () => {
    if (!formData.name || !formData.position || !formData.photoUrl) return;

    try {
      await addMember({
        imageUrl: formData.photoUrl,
        caption: `${formData.name} - ${formData.position}`,
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
    <section className="py-20 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* JUDUL */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Struktur <span className="golden-text">Kepengurusan {currentYear}</span>
          </h2>
          <div className="w-24 h-1 golden-gradient mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto dark:text-gray-300">
            Daftar anggota pengurus Kader Budaya Indonesia periode {currentYear}.
          </p>
        </div>

        {/* ADMIN: Tombol Tambah Anggota */}
        {isAdmin && (
          <div className="flex justify-end mb-8">
            <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
              <DialogTrigger asChild>
                <Button className="golden-gradient text-white hover:opacity-90">
                  Tambah Anggota
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-white dark:bg-gray-800 text-black dark:text-white">
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

        {/* DAFTAR ANGGOTA */}
        {displayMembers.length > 0 ? (
          <div className="flex flex-col items-center space-y-6">
            {displayMembers.map((member) => {
              const [name, position] = member.caption.split(' - ');

              return (
                <Card
                  key={member.id}
                  className="w-full max-w-lg p-4 flex flex-col sm:flex-row items-center sm:items-center 
                             rounded-2xl shadow-md transition-all duration-300 bg-white dark:bg-gray-800 
                             text-black dark:text-white hover:-translate-y-2 hover:shadow-xl"
                >
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={name}
                      className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4 sm:mb-0 sm:mr-6 bg-gray-100 dark:bg-gray-700">
                      <Users className="w-10 h-10 text-primary/60" />
                    </div>
                  )}

                  <div className="text-center sm:text-left flex-1">
                    <h4 className="font-semibold text-lg mb-1 transition-colors duration-300 hover:text-yellow-400 dark:hover:text-yellow-400">
                      {name}
                    </h4>
                    <p className="text-sm">{position}</p>
                  </div>

                  {isAdmin && (
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(member.id)}
                      className="mt-4 sm:mt-0 sm:ml-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Belum ada anggota untuk periode {currentYear}
            </h3>
            {isAdmin && <p>Tambahkan anggota pertama!</p>}
          </div>
        )}
      </div>
    </section>
  );
}
