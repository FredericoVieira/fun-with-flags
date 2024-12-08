type Props = {
  params: Promise<{ id: string }>;
};

export default async function Country({ params }: Props) {
  const id = (await params).id;
  return <span>Country page: {id}</span>;
}
