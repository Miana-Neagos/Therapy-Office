import React from "react";
import "./Services.css";
import { services } from "../lib/services";

function ServicesPage() {
    console.log({services});
  return (
    <div className="services-container">
      <h1>FETELE CU PSIHO</h1>
      <div className="intro-services">
        <h2>
            Choose to start your journey towards better health and wellbeing!
        </h2>
        <div>
            {/* <p>
                People strive for meaningful and fulfilling lives, seeking happiness,
                self-improvement, and growth.
            </p>
            <p>We enthusiastically share this passion!</p> */}
            <p>
                In our practice we focus on improving mental skills and overall health. Our
                care, knowledge, and support aim to help you thrive in all aspects of
                your life.
            </p>

            <p>
                Explore the services below, think about what resonates with you, what triggers an emotion and get in touch with us.
            </p>
        </div>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>
              {index + 1}. {service.title}
            </h3>
            <p>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;