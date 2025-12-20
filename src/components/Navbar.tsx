import { useEffect
} from "react";
import { ScrollTrigger
} from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap
} from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Smoother replacement object for compatibility
export const smoother = {
  _paused: true,
  paused(value?: boolean) {
    if (value !== undefined) {
      this._paused = value;
      document.body.style.overflow = value ? 'hidden' : 'auto';
    }
    return this._paused;
  },
  scrollTop(value?: number) {
    if (value !== undefined) {
      window.scrollTo({ top: value, behavior: 'instant' });
    }
    return window.scrollY;
  },
  scrollTo(target: string | null, smooth?: boolean, _position?: string) {
    if (target) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' });
      }
    }
  }
};

const Navbar = () => {
  useEffect(() => {
    // Initialize scroll position
    window.scrollTo(0, 0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh(true);
    });
  },
  []);
  return (
    <>
      <div className="header">
        <a href="/" className="navbar-title" data-cursor="disable">
          <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
        </a>
        <a
          href="mailto:gmmillat1100@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          gmmillat1100@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
