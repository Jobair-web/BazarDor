export default function Avatar({
  name, image, size = "size-9",
}: { name: string; image?: string | null; size?: string }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={name} referrerPolicy="no-referrer" className={`${size} rounded-full object-cover`} />;
  }
  return (
    <span className={`grid ${size} place-items-center rounded-full bg-primary font-semibold text-primary-content`}>
      {name.charAt(0).toUpperCase()}
    </span>
  );
}