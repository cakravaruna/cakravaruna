import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, Trash2, User } from 'lucide-react';
import { useFirebase } from '@/hooks/useFirebase';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export default function Comments() {
  const { comments, addComment, deleteComment } = useFirebase();
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({ name: '', message: '' });

  const defaultComments = [
    {
      id: '1',
      name: 'Sari Dewi',
      message: 'Terima kasih Kader Budaya atas dedikasi dalam melestarikan budaya Indonesia. Kegiatan workshop batik kemarin sangat bermanfaat!',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Ahmad Rizki',
      message: 'Festival budaya yang luar biasa! Anak-anak saya sangat antusias belajar tari tradisional.',
      createdAt: new Date()
    }
  ];

  const displayComments = comments.length > 0 ? comments : defaultComments;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    try {
      await addComment({ name: formData.name, message: formData.message });
      setFormData({ name: '', message: '' });
      alert('Komentar berhasil dikirim!');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
      await deleteComment(id);
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const commentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Komentar & <span className="golden-text">Masukan</span>
          </h2>
          <div className="w-24 h-1 golden-gradient mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Berbagi pengalaman, saran, dan masukan Anda untuk kemajuan 
            Kader Budaya Indonesia dalam melestarikan warisan nusantara.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Comment Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nama Lengkap</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama Anda"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Komentar</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tulis komentar atau masukan Anda..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full golden-gradient text-white hover:opacity-90 flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" /> Kirim Komentar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Comments Display */}
          <div className="lg:col-span-2">
            {displayComments.length > 0 ? (
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {displayComments.map((comment) => (
                  <motion.div key={comment.id} variants={commentVariants}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          {/* Avatar */}
                          <div className="w-10 h-10 golden-gradient rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-semibold">{comment.name}</span>
                                <p className="text-xs text-muted-foreground">
                                  {comment.createdAt.toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </p>
                              </div>
                              {isAdmin && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDelete(comment.id)}
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>

                            <p className="text-muted-foreground mt-2 leading-relaxed">
                              {comment.message}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-muted-foreground mb-2">
                    Belum ada komentar
                  </h4>
                  <p className="text-muted-foreground">Jadilah yang pertama memberikan komentar!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
