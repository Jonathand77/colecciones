import { useState } from "react";
import type { CollectionItem, CollectionCategory } from "@/types/collection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: Omit<CollectionItem, "id" | "createdAt">) => void;
  editItem?: CollectionItem;
}

const categoryOptions = [
  { value: "figure", label: "Figura" },
  { value: "painting", label: "Cuadro" },
  { value: "poster", label: "Póster" },
  { value: "sculpture", label: "Escultura" },
  { value: "other", label: "Otro" },
];

export const AddItemDialog = ({
  open,
  onOpenChange,
  onSave,
  editItem,
}: AddItemDialogProps) => {
  const [formData, setFormData] = useState({
    title: editItem?.title || "",
    description: editItem?.description || "",
    category: editItem?.category || ("figure" as CollectionCategory),
    imageUrl: editItem?.imageUrl || "",
    year: editItem?.year || "",
    artist: editItem?.artist || "",
    value: editItem?.value || "",
    notes: editItem?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: "",
      description: "",
      category: "Figuras",
      imageUrl: "",
      year: "",
      artist: "",
      value: "",
      notes: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {editItem ? "Editar Pieza" : "Añadir Nueva Pieza"}
          </DialogTitle>
          <DialogDescription>
            Completa los detalles de tu pieza de colección
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Nombre de la pieza"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value as CollectionCategory })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL de Imagen *</Label>
            <Input
              id="imageUrl"
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="artist">Artista/Marca</Label>
              <Input
                id="artist"
                value={formData.artist}
                onChange={(e) =>
                  setFormData({ ...formData, artist: e.target.value })
                }
                placeholder="Nombre del artista"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Año</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                placeholder="2024"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor Estimado</Label>
            <Input
              id="value"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
              placeholder="€500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descripción de la pieza"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Condición, procedencia, etc."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {editItem ? "Guardar Cambios" : "Añadir Pieza"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};