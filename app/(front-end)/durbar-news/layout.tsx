export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 md:py-5 container mx-auto">
      {children}
    </section>
  );
}
