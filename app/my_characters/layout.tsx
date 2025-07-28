export const metadata = {
  title: "My Characters",
  description: "My Characters",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
