import React from "react";
import "./Faq.css";
import { Link } from "react-router-dom";

function Faq() {
  return (
    <div className="faq-wrapper">
      <div className="faq-container">
        <h1>FAQs</h1>
      </div>

      <div className="faq-container">
        <div className="faq-item">
          <h2>1. WHAT CAN I EXPECT AT MY FIRST THERAPY SESSION?</h2>
          <p>
            People often feel a rainbow of emotions leading up to their first
            session, and great relief once they finally get everything off their
            chest. You don&apos;t need to have your thoughts in order, or a coherent
            story to present at your sessions. Show up as you are.
          </p>
          <p>
            The first session is where your therapist dives into your world and
            figures out what will work best for you as a unique individual. They
            will gently guide you through with thoughtful questions and
            carefully listen to your experiences. Our therapists specialize in
            doing the technical part of their job in a caring, natural way. So
            you will leave your session feeling deeply heard not evaluated.
          </p>
          <p>
            At the first session your therapist may also discuss the recommended
            type or styles of therapy likely to produce the best outcome for
            you, and if time allows, initial strategies will also be provided to
            start working on straight away.
          </p>
          <p>
            Most people feel like a huge weight has lifted after the first
            session. It&apos;s a great feeling, knowing you are finally tackling
            things head on with a skilled clinician who&apos;s invested in your
            happiness.
          </p>
        </div>
      </div>

      <div className="faq-container">
        <div className="faq-item">
          <h2>2. HOW MANY THERAPY SESSIONS DO I NEED?</h2>
          <p>
            Your lived experiences and personality are completely unique to you,
            and what you may want to achieve from therapy can vary the session
            number greatly. This makes it difficult to say how many sessions you
            will need without meeting you first.
          </p>
          <p>
            That said, some people benefit from short-term therapy (6 to 12
            sessions) while others will find forming a lasting connection with a
            psychologist more helpful. Weekly sessions are recommended initially
            if you are feeling very distressed, and as you start to feel better,
            sessions can be held fortnightly or monthly.
          </p>
          <p>
            If time or financial investment are a concern we can work together
            using a brief solution focussed approach. This is where our work is
            broken into stages where you focus on one set of goals, for example
            improving sleep and anxiety levels, and leave the rest for later.
          </p>
        </div>
      </div>

      <div className="faq-container">
        <div className="faq-item">
          <h2>3. HOW DO I SCHEDULE MY FIRST THERAPY SESSION?</h2>
          <p>
            You can book your appointment online, even if it is your first time
            with us, through the{" "}
            <Link to="/doc-selection">Book Appointment</Link> menu. Please
            ensure you create a user account to access this feature.
          </p>
          <p>
            Our online booking system also lets you view your upcoming
            appointments, cancel an appointment if necessary, and reschedule for
            a different time.
          </p>
          <p></p>
        </div>
      </div>

      <div className="faq-container">
        <div className="faq-item">
          <h2>
            4. WHAT IS THE DIFFERENCE BETWEEN A SESSION WITH A PSYCHOLOGIST AND
            A SESSION WITH A PSYCHOTHERAPIST?
          </h2>
          <p>
            Although psychologists and psychotherapists have different training
            and educational backgrounds, the key factor during a therapy session
            is largely the therapist`&apos;`s personality and their approach to various
            modalities. Each therapist offers a unique experience, and it`&apos;`s
            important to find one you resonate with. We recommend scheduling a {' '}
            <Link to="/">20 Min Discovery</Link> session with each of our psychotherapists to
            understand their styles, see what makes them unique, and determine
            which one you connect with the best.  
          </p>
          <p>
            Our psychotherapists have a bachelors and masters degree in
            psychotherapy and are also required to complete a practical
            component within their degrees. We must mention again that there are
            more differences between each of our clinicians than there are
            differences between psychologists and psychotherapists in general,
            which is why it`&apos;`s actually a difficult question to answer!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Faq;