export default function TechTag({ label }: { label: string }) {
  return (
    <span className="glass rounded-full px-3.5 py-1.5 font-body text-[11px] tracking-wide text-mist-dim">
      {label}
    </span>
  );
}
