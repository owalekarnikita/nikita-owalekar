import { ChevronDown } from 'lucide-react';

import type { ArchitectureLayer } from '@/data/projects';

/**
 * Data-driven layered architecture diagram. Plain DOM rather than an image, so
 * it stays sharp, themeable, translatable and readable by a screen reader.
 */
export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <figure className="glass overflow-hidden p-6 sm:p-8">
      <figcaption className="sr-only">
        Architecture diagram: {layers.map((layer) => layer.label).join(' above ')}.
      </figcaption>

      <div className="space-y-3">
        {layers.map((layer, layerIndex) => (
          <div key={layer.label}>
            <div className="rounded-xl border border-border/70 bg-elevated/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {layer.label}
                </span>
                <span aria-hidden className="h-px flex-1 bg-border/70" />
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {layer.nodes.map((node) => (
                  <div
                    key={node.name}
                    className="group rounded-lg border border-border bg-surface/80 px-3.5 py-3 transition-colors duration-200 hover:border-accent/40"
                  >
                    <div className="text-sm font-medium text-foreground/90">{node.name}</div>
                    {node.hint ? (
                      <div className="mt-0.5 font-mono text-[0.7rem] text-muted-foreground">
                        {node.hint}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {layerIndex < layers.length - 1 ? (
              <div aria-hidden className="flex justify-center py-1">
                <ChevronDown size={16} className="text-border" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}
