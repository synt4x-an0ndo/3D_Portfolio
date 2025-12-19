import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Pre-seed Grant Achievement</h4>
                <h5>ConfidenSee - University Innovation Hub Program</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Successfully completed the pre-seed grant journey with ConfidenSee under the University Innovation Hub Program (UIHP). Grateful to mentors Sumaiya Mutiatur Rasul and Razin Mustafiz for their unwavering guidance and inspiration. Special thanks to Md. Safaet Hossain for constant motivation and support throughout this empowering journey.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack MERN Web Development Certification</h4>
                <h5>Aptech Computer Education - BFEW Technical Training Center</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Successfully completed the Webinar on Full Stack MERN Web Development organized by Aptech Computer Education. Gained comprehensive knowledge in modern web development technologies and best practices from industry experts.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Website Launch</h4>
                <h5>Ingrechec.online</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Successfully launched my first website - Ingrechec.online, a food nutrition scanner platform. This milestone marks my journey as a full-stack developer, bringing an idea from concept to live production with a fully functional web application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
