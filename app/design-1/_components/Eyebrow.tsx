// Iron eyebrow tag — mono number + short rule + dim label. Used at the top
// of every section to anchor the visual rhythm (01 Programs, 02 About, etc.).

export default function Eyebrow({
  num,
  label,
}: {
  num: string;
  label: string;
}) {
  return (
    <div className="font-iron-mono flex items-center gap-3.5 text-[12px] uppercase tracking-[0.12em] text-iron-orange font-medium">
      <span>{num}</span>
      <span
        className="block h-px w-9 bg-iron-orange/70 shrink-0"
        aria-hidden="true"
      />
      <span className="text-iron-text-dim">{label}</span>
    </div>
  );
}
