import React from "react";
import { Footer, Navbar } from "../components";
import Wrapper from "../assets/wrappers/Policies";

const Policies = () => {
  return (
    <Wrapper>
      <Navbar />
      <div className="content-container">
        <div className="content">
          <div className="about-us">
            <h3 className="content-title">About Us</h3>
            <p>
              Welcome to <strong>Quizzal</strong> – the ultimate quiz creation
              tool designed for tutors and examiners. Our mission is to simplify
              the assessment process by providing an intuitive platform where
              educators can efficiently design, manage, and evaluate quizzes.
              Whether you're crafting customized tests or generating questions
              from our extensive database, Quizzal ensures a seamless experience
              from quiz creation to result publication. With automated
              participant invitations, real-time scoring, and feedback tools, we
              empower educators to focus on what truly matters – enhancing
              learning outcomes. Join Quizzal today and transform the way you
              assess knowledge!
            </p>
          </div>

          <div className="about-us">
            <h3 className="content-title">Terms of Service</h3>
            <h5>1. Introduction</h5>
            <p>
              By using Quizzal, you agree to abide by these Terms of Service. If
              you do not accept these terms, please refrain from using our
              platform.
            </p>

            <h5>2. User Responsibilities</h5>
            <ul className="content-list">
              <li>
                Tutors must ensure the accuracy and relevance of the quiz
                content they create.
              </li>
              <li>
                Students must not engage in dishonest practices such as cheating
                or sharing quiz answers.
              </li>
              <li>
                Users are responsible for maintaining the confidentiality of
                their account credentials.
              </li>
            </ul>

            <h5>3. Content Ownership</h5>
            <p>
              - Tutors retain ownership of the quizzes they create.
              <br />- By using Quizzal, you grant us a non-exclusive license to
              store and process your quizzes for platform functionality.
            </p>

            <h5>4. Limitations of Liability</h5>
            <p>
              Quizzal is not responsible for any loss of data, disruptions, or
              unintended quiz outcomes. We strive for accuracy but do not
              guarantee error-free services.
            </p>

            <h5>5. Modifications to the Service</h5>
            <p>
              We reserve the right to update, modify, or discontinue any feature
              of Quizzal at our discretion.
            </p>

            <h5>6. Termination</h5>
            <p>
              Quizzal reserves the right to suspend or terminate accounts that
              violate these terms.
            </p>
          </div>

          <div className="about-us">
            <h3 className="content-title">Privacy Policy</h3>
            <h5>1. Information We Collect</h5>
            <ul className="content-list">
              <li>
                Personal details (e.g., name, email) for account creation and
                communication.
              </li>
              <li>Quiz data created by tutors.</li>
              <li>Performance data for assessment purposes.</li>
            </ul>

            <h5>2. How We Use Your Information</h5>
            <ul>
              <li>
                To facilitate quiz creation, distribution, and evaluation.
              </li>
              <li>To notify students about quizzes they are assigned to.</li>
              <li>To improve user experience and platform functionality.</li>
            </ul>

            <h5>3. Data Protection & Security</h5>
            <p>
              We implement industry-standard security measures to protect your
              data but cannot guarantee absolute security.
            </p>

            <h5>4. Sharing of Information</h5>
            <p>
              We do not sell or share user data with third parties, except as
              required by law.
            </p>

            <h5>5. User Rights</h5>
            <p>
              You have the right to request access, modification, or deletion of
              your personal data. Contact us for assistance.
            </p>

            <p>
              By using Quizzal, you agree to our Privacy Policy and Terms of
              Service. For any inquiries, please reach out to our support team.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </Wrapper>
  );
};

export default Policies;
