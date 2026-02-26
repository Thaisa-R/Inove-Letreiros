import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = forwardRef<HTMLSpanElement, NavLinkCompatProps>(
  ({ className, to, children, ...props }, ref) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();

      if (to.startsWith('#')) {
        const id = to.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }

        const cleanPath = to === '#hero' ? '/inicio' : `/${id}`;
        navigate(cleanPath);
      } else {

        navigate(to);
      }
    };

    return (
      <span
        ref={ref}
        onClick={handleClick}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };