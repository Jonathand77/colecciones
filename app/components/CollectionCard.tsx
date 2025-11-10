import type { CollectionItem } from "@/types/collection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollectionCardProps {
  item: CollectionItem;
  onView: (item: CollectionItem) => void;
  onEdit: (item: CollectionItem) => void;
  onDelete: (id: string) => void;
}

const categoryLabels: Record<string, string> = {
  figure: 'Figura',
  painting: 'Cuadro',
  poster: 'Póster',
  sculpture: 'Escultura',
  other: 'Otro'
};

export const CollectionCard = ({ item, onView, onEdit, onDelete }: CollectionCardProps) => {
  return (
    <Card className="overflow-hidden gallery-card-hover group">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            onClick={() => onView(item)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Ver
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(item)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold leading-tight text-card-foreground">
            {item.title}
          </h3>
          <Badge variant="secondary" className="shrink-0">
            {categoryLabels[item.category]}
          </Badge>
        </div>
        {item.artist && (
          <p className="text-sm text-muted-foreground">{item.artist}</p>
        )}
        {item.year && (
          <p className="text-xs text-muted-foreground">{item.year}</p>
        )}
      </CardContent>
    </Card>
  );
};
