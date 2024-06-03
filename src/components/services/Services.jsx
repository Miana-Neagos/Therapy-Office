import React from "react";
import "./Services.css";
import { services } from "../lib/services";

/**
 * The ServicesPage component displays a list of mental health services.
 * Each service includes a title and a description.
 */
function ServicesPage() {
  return (
    <div className="services-container">
      <h1>FETELE CU PSIHO</h1>
      <div className="intro-services">
        <h2>
          Choose to start your journey towards better health and wellbeing!
        </h2>
        <div>
          <p>
            In our practice we focus on improving mental skills and overall
            health. We help you cut the crap, see things as they truly are and
            support you to thrive in all aspects of your life.
          </p>

          <p>
            Explore the services below, think about what resonates with you,
            what triggers an emotion and get in touch with us.
          </p>
        </div>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>
              {index + 1}. {service.title}
            </h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
