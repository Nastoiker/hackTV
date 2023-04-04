export default function Page({
                               params,
                               searchParams,
                             }: {
  params: { id: string; };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <h1>My Page</h1>;
}
