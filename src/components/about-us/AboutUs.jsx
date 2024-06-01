import "./AboutUs.css";
import alina from "../../assets/pic3.jpg";
import andra from "../../assets/pic3.jpg";

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="alina-container">
        <div className="alina">
          <img src={alina} alt="Person" className="person-image" />
          <div className="person-info">
            <h1>
              Hello, I&apos;m <span className="name">Alina Salomie</span>
            </h1>
            <p>
              I have always been fascinated by human nature and sought answers
              to questions like &apos;Why do we do what we &apos;do?&apos; and
              &apos;Why do we feel what we feel?&apos;
            </p>
            <p>
              This curiosity led me from philosophy to coaching, and finally to
              psychology and psychotherapy. Through extensive study and
              research, I have found answers to these questions and helped
              address the specific concerns people have.
            </p>
          </div>
        </div>
        <div className="tools-container">
          <h2>ABOUT ME</h2>
          <div className="tools-section">
            <div className="tool">
              <h3>1. My Curiosity</h3>
              <p>
                I&apos;ve always been curious about why we act and feel the way
                we do. This led me to psychology and psychotherapy.
              </p>
              <p>
                Through study and research, I&apos;ve found answers and helped
                others.
              </p>
            </div>

            <div className="tool">
              <h3>2. My Role</h3>
              <p>
                As your therapist, I&apos;m here to support you. I&apos;ve seen
                amazing changes and growth in my clients.
              </p>
              <p>
                I&apos;m committed to walking this path with you, offering the
                support you need.
              </p>
            </div>

            <div className="tool">
              <h3>3. Support & Trust</h3>
              <p>
                Trust and support are key in therapy. My goal is to create a
                safe space where you feel comfortable sharing.
              </p>
              <p>
                Together, we&apos;ll build trust and foster your growth and
                healing.
              </p>
            </div>

            <div className="tool">
              <h3>4. Let&apos;s Talk!</h3>
              <p>
                Are you on a journey of self-discovery and growth? I&apos;m here
                to be by your side and support you.
              </p>
              <p>Reach out, and we&apos;ll find new ways for you to succeed.</p>
            </div>
          </div>
        </div>
        <div className="qualifications">
          <h2>Qualifications:</h2>
          <ul>
            <li>
              <strong>CBT Psychotherapist and Counselor</strong> – Training and
              certification in the Master&apos;s program &quot;Psychological
              Techniques for Behavior Control and Human Potential
              Development&quot; at UBB
            </li>
            <li>
              <strong>Clinical Psychologist</strong> – Training and
              certification at the Faculty of Psychology and Educational
              Sciences, UBB
            </li>
            <li>
              <strong>Parenting Program Trainer</strong> – Training and
              certification in the methodologies &quot;All About
              Parenting,&quot; &quot;Parenting Apart&quot;
            </li>
            <li>
              <strong>Coach</strong> – Training at &quot;Coaching Partners&quot;
              school – accredited by the International Coaching Federation
            </li>
          </ul>
        </div>
      </div>
      <div className="andra-container">
        <div className="andra">
          <img src={andra} alt="Person" className="person-image" />
          <div className="person-info">
            <h1>
              Hello, I&apos;m <span className="name">Andra Costin</span>
            </h1>
            <p>
              I have always been fascinated by human nature and sought answers
              to questions like &apos;Why do we do what we &apos;do?&apos; and
              &apos;Why do we feel what we feel?&apos;
            </p>
            <p>
              This curiosity led me from philosophy to coaching, and finally to
              psychology and psychotherapy. Through extensive study and
              research, I have found answers to these questions and helped
              address the specific concerns people have.
            </p>
          </div>
        </div>
        <div className="tools-container">
          <h2>ABOUT ME</h2>
          <div className="tools-section">
            <div className="tool">
              <h3>1. My Curiosity</h3>
              <p>
                I&apos;ve always been curious about why we act and feel the way
                we do. This led me to psychology and psychotherapy.
              </p>
              <p>
                Through study and research, I&apos;ve found answers and helped
                others.
              </p>
            </div>

            <div className="tool">
              <h3>2. My Role</h3>
              <p>
                As your therapist, I&apos;m here to support you. I&apos;ve seen
                amazing changes and growth in my clients.
              </p>
              <p>
                I&apos;m committed to walking this path with you, offering the
                support you need.
              </p>
            </div>

            <div className="tool">
              <h3>3. Support & Trust</h3>
              <p>
                Trust and support are key in therapy. My goal is to create a
                safe space where you feel comfortable sharing.
              </p>
              <p>
                Together, we&apos;ll build trust and foster your growth and
                healing.
              </p>
            </div>

            <div className="tool">
              <h3>4. Let&apos;s Talk!</h3>
              <p>
                Are you on a journey of self-discovery and growth? I&apos;m here
                to be by your side and support you.
              </p>
              <p>Reach out, and we&apos;ll find new ways for you to succeed.</p>
            </div>
          </div>
        </div>
        <div className="qualifications">
          <h2>Qualifications:</h2>
          <ul>
            <li>
              <strong>CBT Psychotherapist and Counselor</strong> – Training and
              certification in the Master&apos;s program &quot;Psychological
              Techniques for Behavior Control and Human Potential
              Development&quot; at UBB
            </li>
            <li>
              <strong>Clinical Psychologist</strong> – Training and
              certification at the Faculty of Psychology and Educational
              Sciences, UBB
            </li>
            <li>
              <strong>Parenting Program Trainer</strong> – Training and
              certification in the methodologies &quot;All About
              Parenting,&quot; &quot;Parenting Apart&quot;
            </li>
            <li>
              <strong>Coach</strong> – Training at &quot;Coaching Partners&quot;
              school – accredited by the International Coaching Federation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;