import { redirect } from "next/navigation";

/** The catalog moved to /gear. Keep old links working. */
export default function ProductsIndex() {
  redirect("/gear");
}
