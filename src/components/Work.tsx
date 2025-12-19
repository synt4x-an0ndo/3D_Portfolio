import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger
} from "gsap/ScrollTrigger";
import { useGSAP
} from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;
    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[
        0
      ].getBoundingClientRect();
      const parentWidth = box[
        0
      ].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[
        0
      ]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinType: !ScrollTrigger.isTouch ? "transform": "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex",
    {
      x: -translateX,
      duration: 40,
      delay: 0.2,
    });
  },
  []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>ConfidenSee</h4>
                  <p>AI Career Platform</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>JavaScript, CSS, HTML</p>
            </div>
            <WorkImage image="/images/confidenSee.jpeg" alt="ConfidenSee" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>IngreChec</h4>
                  <p>Web Application</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>HTML, CSS, Interactive UI</p>
            </div>
            <WorkImage image="/images/ingre.png" alt="IngreChec" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>SkillSwap</h4>
                  <p>Skill Exchange Platform</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Full-stack, Community Platform</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="SkillSwap" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>Cosmic Knowledge Explorer</h4>
                  <p>Interactive App</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>JavaScript, Frontend Development</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Cosmic Knowledge" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>05</h3>
                <div>
                  <h4>HarmoniQ</h4>
                  <p>Music Platform</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>HTML, CSS, Interactive Design</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="HarmoniQ" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
