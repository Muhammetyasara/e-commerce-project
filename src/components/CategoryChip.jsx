export default function CategoryChip({
  title,
  image,
  imgClassName = "",
  btnClassName = ""
}) {
  return (
    <div className="relative m-10 lg:m-3">
      <img src={image} alt={title} className={`${imgClassName} w-full`} />
      <div className="absolute inset-0 flex items-end justify-start m-5">
        <button className={btnClassName}>
          {title}
        </button>
      </div>
    </div>
  );
}
