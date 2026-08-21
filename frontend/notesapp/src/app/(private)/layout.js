
import { encodeSans } from "../../../public/fonts";

export default function PrivateLayout({ children }) {
  return (
    <>
      <div className={`flex h-screen antialiased ${encodeSans.className}`}>
        {children}
      </div>
    </>
  );
}
