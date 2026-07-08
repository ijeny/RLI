import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface CartIconProps {
  itemCount?: number;
}

export default function CartIcon({ itemCount = 0 }: CartIconProps) {
  return (
    <Link to="/cart" className="relative p-2 hover:bg-primary/10 rounded-lg transition-colors">
      <ShoppingCart className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  );
}
