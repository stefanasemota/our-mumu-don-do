/** @SABI_LOCKED */
'use client';

import { useState } from 'react';
import { db } from '@/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { WeeklyEducationalTopic } from '@/types';
import Link from 'next/link';

export default function EditStoryForm({ story }: { story: WeeklyEducationalTopic }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Form State
  const [description, setDescription] = useState(story.description || '');
  const [audioUrl, setAudioUrl] = useState(story.audioUrl || '');
  const [guidelineCategory, setGuidelineCategory] = useState(story.guidelineCategory || '');
  const [pages, setPages] = useState(story.pages || []);

  // Page Array Handlers
  const handlePageChange = (index: number, field: 'text' | 'imageUrl', value: string) => {
    const newPages = [...pages];
    newPages[index] = { ...newPages[index], [field]: value };
    setPages(newPages);
  };

  const addPage = () => {
    setPages([...pages, { text: '', imageUrl: '' }]);
  };

  const removePage = (index: number) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  // The Save Logic
  const handleSave = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'weeklyEducationalTopics', story.id);
      
      await updateDoc(docRef, {
        description,
        audioUrl,
        guidelineCategory,
        pages,
        lastUpdated: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Story updated successfully!",
      });
      
      router.refresh(); // Refresh server data
      router.push('/admin-dashboard');
    } catch (error: any) {
      console.error("Save error:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "You might not have permission to edit this document.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin-dashboard"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Editing: {story.title}</h1>
      </div>

      {/* Main Metadata */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold">Guideline Category</label>
            <Input 
              value={guidelineCategory} 
              onChange={(e) => setGuidelineCategory(e.target.value)} 
              placeholder="e.g. Nigerian Solutions"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold">Audio URL (Path)</label>
            <Input 
              value={audioUrl} 
              onChange={(e) => setAudioUrl(e.target.value)} 
              placeholder="/audio/filename.mp3"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold">Description</label>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={3} 
              placeholder="Short summary of the story..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Pages Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-headline">Story Pages</h2>
          <Button type="button" variant="secondary" onClick={addPage}>
            <Plus className="w-4 h-4 mr-2" /> Add New Page
          </Button>
        </div>

        {pages.map((page, index) => (
          <Card key={index} className="group relative border-muted hover:border-primary/40 transition-colors">
            <div className="absolute top-4 right-4 z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removePage(index)} 
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <CardContent className="pt-8 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                  PAGE {index + 1}
                </span>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-semibold">Image URL (Path)</label>
                <Input 
                  value={page.imageUrl} 
                  onChange={(e) => handlePageChange(index, 'imageUrl', e.target.value)} 
                  placeholder="/images/story-folder/page_x.png"
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-semibold">Page Text</label>
                <Textarea 
                  value={page.text} 
                  onChange={(e) => handlePageChange(index, 'text', e.target.value)} 
                  rows={4}
                  placeholder="The text for this specific page..."
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t p-4 flex justify-center z-50">
        <Button 
          onClick={handleSave} 
          className="w-full max-w-2xl h-12 text-lg shadow-lg" 
          disabled={loading}
        >
          <Save className="w-5 h-5 mr-2" />
          {loading ? "Saving to Firestore..." : "Update Story Now"}
        </Button>
      </div>
    </div>
  );
}