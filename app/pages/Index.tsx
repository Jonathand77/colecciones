import { useState } from "react";
import type { CollectionItem, CollectionCategory } from "@/types/collection";
import { CollectionCard } from "@/components/CollectionCard";
import { AddItemDialog } from "@/components/AddItemDialog";
import { ItemDetailDialog } from "@/components/ItemDetailDialog";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroImage from "@/assets/hero-gallery.jpg";
import sampleFigure from "@/assets/sample-figure.jpg";
import samplePainting from "@/assets/sample-painting.jpg";
import samplePoster from "@/assets/sample-poster.jpg";

const initialItems: CollectionItem[] = [
  {
    id: "1",
    title: "Figura Coleccionable Edición Limitada",
    description: "Figura de alta calidad de edición limitada",
    category: "Figuras",
    imageUrl: sampleFigure,
    year: "2023",
    artist: "Kotobukiya",
    value: "€250",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Cuadro Original Firmado",
    description: "Obra de arte original con certificado de autenticidad",
    category: "Paleta Drácula",
    imageUrl: samplePainting,
    year: "2022",
    artist: "Artista Reconocido",
    value: "€1,200",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Póster Vintage Firmado",
    description: "Póster vintage en perfecto estado con firma",
    category: "Posters Firmados",
    imageUrl: samplePoster,
    year: "1995",
    artist: "Colección Clásica",
    value: "€180",
    createdAt: new Date(),
  },
];

const Index = () => {
  const [items, setItems] = useState<CollectionItem[]>(initialItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<CollectionItem | null>(null);
  const [editItem, setEditItem] = useState<CollectionItem | undefined>();
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const handleAddItem = (itemData: Omit<CollectionItem, "id" | "createdAt">) => {
    if (editItem) {
      setItems(
        items.map((item) =>
          item.id === editItem.id
            ? { ...itemData, id: editItem.id, createdAt: editItem.createdAt }
            : item
        )
      );
      toast.success("Pieza actualizada correctamente");
      setEditItem(undefined);
    } else {
      const newItem: CollectionItem = {
        ...itemData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setItems([newItem, ...items]);
      toast.success("Pieza añadida a tu colección");
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    toast.success("Pieza eliminada de tu colección");
  };

  const handleEditItem = (item: CollectionItem) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleOpenDialog = () => {
    setEditItem(undefined);
    setDialogOpen(true);
  };

  const filteredItems =
    filterCategory === "all"
      ? items
      : items.filter((item) => item.category === filterCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Gallery Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-background" />
        </div>
        <div className="relative flex h-full items-center justify-center px-4">
          <div className="text-center">
            <h1 className="mb-4 font-serif text-5xl font-bold text-primary-foreground drop-shadow-lg md:text-7xl">
              Mi Colección Privada
            </h1>
            <p className="text-xl text-primary-foreground/90 drop-shadow-md md:text-2xl">
              Gestiona y exhibe tus piezas más preciadas
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="figure">Figuras</SelectItem>
                <SelectItem value="painting">Cuadros</SelectItem>
                <SelectItem value="poster">Pósters</SelectItem>
                <SelectItem value="sculpture">Esculturas</SelectItem>
                <SelectItem value="other">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleOpenDialog} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Añadir Pieza
          </Button>
        </div>

        {/* Collection Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredItems.length} {filteredItems.length === 1 ? "pieza" : "piezas"} en tu
            colección
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
            <h3 className="mb-2 font-serif text-2xl font-semibold">
              Tu colección está vacía
            </h3>
            <p className="mb-6 text-muted-foreground">
              Comienza añadiendo tu primera pieza
            </p>
            <Button onClick={handleOpenDialog} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Añadir Primera Pieza
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <CollectionCard
                key={item.id}
                item={item}
                onView={setDetailItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        )}
      </main>

      {/* Dialogs */}
      <AddItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleAddItem}
        editItem={editItem}
      />
      <ItemDetailDialog
        item={detailItem}
        open={!!detailItem}
        onOpenChange={(open) => !open && setDetailItem(null)}
      />
    </div>
  );
};

export default Index;