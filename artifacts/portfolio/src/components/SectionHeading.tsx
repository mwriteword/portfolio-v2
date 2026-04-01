export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-[#ffffff] mb-6">
      {children}
    </h2>
  );
}
