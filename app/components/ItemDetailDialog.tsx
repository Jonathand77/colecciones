import type { CollectionItem } from "@/types/collection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ItemDetailDialogProps {
  item: CollectionItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryLabels: Record<string, string> = {
  figure: 'Figura',
  painting: 'Cuadro',
  poster: 'Póster',
  sculpture: 'Escultura',
  other: 'Otro'
};

export const ItemDetailDialog = ({ item, open, onOpenChange }: ItemDetailDialogProps) => {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl">{item.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{categoryLabels[item.category]}</Badge>
            {item.year && <Badge variant="outline">{item.year}</Badge>}
          </div>

          {item.artist && (
            <div>
              <h4 className="mb-1 text-sm font-medium text-muted-foreground">Artista/Marca</h4>
              <p className="text-lg">{item.artist}</p>
            </div>
          )}

          {item.description && (
            <div>
              <h4 className="mb-1 text-sm font-medium text-muted-foreground">Descripción</h4>
              <p className="text-foreground">{item.description}</p>
            </div>
          )}

          {item.value && (
            <div>
              <h4 className="mb-1 text-sm font-medium text-muted-foreground">Valor Estimado</h4>
              <p className="text-lg font-semibold text-accent">{item.value}</p>
            </div>
          )}

          {item.notes && (
            <>
              <Separator />
              <div>
                <h4 className="mb-2 text-sm font-medium text-muted-foreground">Notas</h4>
                <p className="text-sm text-foreground/80">{item.notes}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};