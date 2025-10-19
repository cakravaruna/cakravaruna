import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { useFirebase } from '@/hooks/useFirebase';
import { useAuth } from '@/hooks/useAuth';
import { ProgramItem } from '@/lib/types';

export default function Programs() {
  const { programs, updateProgram, addProgramSie, deleteProgramSie } = useFirebase();
  const { isAdmin } = useAuth();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ProgramItem>>({});
  const [newSieData, setNewSieData] = useState<Partial<ProgramItem>>({
    sieName: '',
    description: '',
    programs: ['']
  });

  const handleEdit = (program: ProgramItem) => {
    setEditingId(program.id);
    setEditData({
      sieName: program.sieName,
      description: program.description,
      programs: program.programs || []
    });
  };

  const handleSave = async () => {
    if (editingId && editData) {
      await updateProgram(editingId, {
        sieName: editData.sieName || '',
        description: editData.description || '',
        programs: editData.programs || []
      });
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const addProgramItem = () => {
    if (editData.programs) {
      setEditData({
        ...editData,
        programs: [...editData.programs, '']
      });
    }
  };

  const updateProgramItem = (index: number, value: string) => {
    if (editData.programs) {
      const newPrograms = [...editData.programs];
      newPrograms[index] = value;
      setEditData({ ...editData, programs: newPrograms });
    }
  };

  const removeProgramItem = (index: number) => {
    if (editData.programs) {
      const newPrograms = editData.programs.filter((_, i) => i !== index);
      setEditData({ ...editData, programs: newPrograms });
    }
  };

  const handleAddNewSie = async () => {
    if (newSieData.sieName && newSieData.description) {
      await addProgramSie({
        sieName: newSieData.sieName,
        description: newSieData.description,
        programs: newSieData.programs || []
      });
      setNewSieData({ sieName: '', description: '', programs: [''] });
    }
  };

  return (
    <section id="programs" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Program <span className="golden-text">Kerja</span>
          </h2>
          <div className="w-24 h-1 golden-gradient mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Berbagai program kerja yang dijalankan oleh setiap sie untuk mencapai tujuan pelestarian dan pengembangan budaya Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program) => (
            <Card key={program.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {editingId === program.id ? (
                      <Input
                        value={editData.sieName || ''}
                        onChange={(e) => setEditData({ ...editData, sieName: e.target.value })}
                        className="text-xl font-bold mb-2"
                      />
                    ) : (
                      <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                        {program.sieName}
                      </CardTitle>
                    )}
                  </div>
                  {isAdmin && (
                    <div className="flex space-x-2">
                      {editingId === program.id ? (
                        <>
                          <Button size="sm" onClick={handleSave} className="h-8 w-8 p-0">
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 w-8 p-0">
                            <X className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              if (confirm(`Apakah Anda yakin ingin menghapus sie "${program.sieName}"?`)) {
                                await deleteProgramSie(program.id);
                              }
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(program)} className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              if (confirm(`Apakah Anda yakin ingin menghapus sie "${program.sieName}"?`)) {
                                await deleteProgramSie(program.id);
                              }
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {editingId === program.id ? (
                  <Textarea
                    value={editData.description || ''}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="mt-2"
                    rows={3}
                  />
                ) : (
                  <p className="text-muted-foreground mt-2 leading-relaxed">{program.description}</p>
                )}
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center justify-between">
                    Program Kerja:
                    {isAdmin && editingId === program.id && (
                      <Button size="sm" variant="outline" onClick={addProgramItem} className="h-8">
                        <Plus className="w-4 h-4 mr-1" /> Tambah
                      </Button>
                    )}
                  </h4>
                  <div className="space-y-2">
                    {editingId === program.id
                      ? editData.programs?.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              value={item}
                              onChange={(e) => updateProgramItem(index, e.target.value)}
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeProgramItem(index)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))
                      : program.programs.map((item, index) => (
                          <Badge key={index} variant="secondary" className="mr-2 mb-2 text-sm py-1 px-3">
                            {item}
                          </Badge>
                        ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Form tambah sie baru */}
          {isAdmin && (
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <Input
                  placeholder="Nama Sie"
                  value={newSieData.sieName || ''}
                  onChange={(e) => setNewSieData({ ...newSieData, sieName: e.target.value })}
                  className="text-xl font-bold mb-2"
                />
                <Textarea
                  placeholder="Deskripsi Sie"
                  value={newSieData.description || ''}
                  onChange={(e) => setNewSieData({ ...newSieData, description: e.target.value })}
                  className="mt-2"
                  rows={3}
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center justify-between">
                    Program Kerja:
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setNewSieData({
                          ...newSieData,
                          programs: [...(newSieData.programs || []), '']
                        });
                      }}
                      className="h-8"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Tambah
                    </Button>
                  </h4>
                  {(newSieData.programs || []).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const newPrograms = [...(newSieData.programs || [])];
                          newPrograms[index] = e.target.value;
                          setNewSieData({ ...newSieData, programs: newPrograms });
                        }}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newPrograms = (newSieData.programs || []).filter((_, i) => i !== index);
                          setNewSieData({ ...newSieData, programs: newPrograms });
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={handleAddNewSie} className="mt-4 w-full">
                    Simpan Sie Baru
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
