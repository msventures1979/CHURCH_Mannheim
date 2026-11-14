import { photoCredit } from "@/content/photos";

// Fotonachweis – Link auf den Fotografen (bewusst ohne nofollow).
export default function PhotoCredit({ withEvent = true }: { withEvent?: boolean }) {
  return (
    <>
      Fotos:{" "}
      <a href={photoCredit.url} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-foreground">
        {photoCredit.name}
      </a>
      {withEvent && <> · {photoCredit.event}</>}
    </>
  );
}
