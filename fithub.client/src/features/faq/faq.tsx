import React, { useEffect } from "react"; //
import styles from "./faq.module.css";

const Faq: React.FC = () => {
    useEffect(() => { 
        document.body.classList.add(styles.faq);
        return () => {
          document.body.classList.remove(styles.faq);
        };
      }, []); // Add a class to the body when the component mounts


      function toggleQuestions(id: string, arrowId: string) {
        const section = document.getElementById(id) as HTMLElement | null;
        const arrow = document.getElementById(arrowId) as HTMLElement | null;
      
        if (section) {
          const isVisible = section.style.display === 'block';
          section.style.display = isVisible ? 'none' : 'block';
        }
      
        if (arrow) {
          arrow.classList.toggle('rotate');
        }
      }
      
      function toggleAnswer(answerId: string, arrowId: string) {
        const answer = document.getElementById(answerId) as HTMLElement | null;
        const arrow = document.getElementById(arrowId) as HTMLElement | null;
      
        if (answer && arrow) {
          const isVisible = answer.style.display === 'block';
          answer.style.display = isVisible ? 'none' : 'block';
          arrow.classList.toggle('rotate', !isVisible);
        }
      }
    

  return (
            <>  
                <div className={styles.banner} />
                <div className={styles.qa}>
                    {/* 1. General Questions */}
                    <div className={styles.faq_box}>
                        <div className={styles.faq_header} onClick={() => toggleQuestions('general', 'arrow1')}>
                            <span>1. General Questions</span>
                            <span className="arrow" id="arrow1">▶</span>
                        </div>
                        <div className={styles.questions} id="general">
                            <div className={styles.question} onClick={() => toggleAnswer('g1', 'qa1')}>
                                <span>What is FitHub?</span>
                                <span className={styles.q_arrow} id="qa1">▼</span>
                            </div>
                            <div className={styles.answer} id="g1">
                                FitHub is an all-in-one fitness platform designed to help you reach your health and wellness goals with personalized plans, community support, and progress tracking.
                            </div>
                        </div>
                    </div>

                    {/* 2. Account & Membership */}
                    <div className={styles.faq_box}>
                        <div className={styles.faq_header} onClick={() => toggleQuestions('account', 'arrow2')}>
                            <span>2. Account & Membership</span>
                            <span className="arrow" id="arrow2">▶</span>
                        </div>
                        <div className={styles.questions} id="account">
                            <div className={styles.question} onClick={() => toggleAnswer('a1', 'qa2')}>
                                <span>How do I create an account?</span>
                                <span className={styles.q_arrow} id="qa2">▼</span>
                            </div>
                            <div className={styles.answer} id="a1">
                                Click “Sign Up” in the top right corner and fill out the required information. After submitting, you’ll receive a confirmation email.
                            </div>
                            <div className={styles.question} onClick={() => toggleAnswer('a2', 'qa3')}>
                                <span>How can I upgrade or cancel my membership?</span>
                                <span className={styles.q_arrow} id="qa3">▼</span>
                            </div>
                            <div className={styles.answer} id="a2">
                                Go to your account settings, select “Membership”, and follow the instructions to upgrade or cancel your plan.
                            </div>
                        </div>
                    </div>

                    {/* 3. Workouts & Programs */}
                    <div className={styles.faq_box}>
                        <div className={styles.faq_header} onClick={() => toggleQuestions('workouts', 'arrow3')}>
                            <span>3. Workouts & Programs</span>
                            <span className="arrow" id="arrow3">▶</span>
                        </div>
                        <div className={styles.questions} id="workouts">
                            <div className={styles.question} onClick={() => toggleAnswer('w1', 'qa4')}>
                                <span>Can I customize my workout plan?</span>
                                <span className={styles.q_arrow} id="qa4">▼</span>
                            </div>
                            <div className={styles.answer} id="w1">
                                Yes! Use the Workout Builder feature to create personalized routines tailored to your goals.
                            </div>
                            <div className={styles.question} onClick={() => toggleAnswer('w2', 'qa5')}>
                                <span>Are the workouts suitable for beginners?</span>
                                <span className={styles.q_arrow} id="qa5">▼</span>
                            </div>
                            <div className={styles.answer} id="w2">
                                Absolutely. We offer beginner, intermediate, and advanced workouts for all fitness levels.
                            </div>
                        </div>
                    </div>

                    {/* 4. Features & Tools */}
                    <div className={styles.faq_box}>
                        <div className={styles.faq_header} onClick={() => toggleQuestions('features', 'arrow4')}>
                            <span>4. Features & Tools</span>
                            <span className="arrow" id="arrow4">▶</span>
                        </div>
                        <div className={styles.questions} id="features">
                            <div className={styles.question} onClick={() => toggleAnswer('f1', 'qa6')}>
                                <span>What is the Community section for?</span>
                                <span className={styles.q_arrow} id="qa6">▼</span>
                            </div>
                            <div className={styles.answer} id="f1">
                                The Community section lets you connect, share progress, and support other members on their fitness journey.
                            </div>
                        </div>
                    </div>

                    {/* 5. Payments & Security */}
                    <div className={styles.faq_box}>
                        <div className={styles.faq_header} onClick={() => toggleQuestions('payments', 'arrow5')}>
                            <span>5. Payments & Security</span>
                            <span className="arrow" id="arrow5">▶</span>
                        </div>
                        <div className={styles.questions} id="payments">
                            <div className={styles.question} onClick={() => toggleAnswer('p1', 'qa7')}>
                                <span>Is my payment information secure?</span>
                                <span className={styles.q_arrow} id="qa7">▼</span>
                            </div>
                            <div className={styles.answer} id="p1">
                                Yes, all payments are processed securely using industry-standard encryption.
                            </div>
                        </div>
                    </div>

                    {/* 6. Technical Issues */}
                    <div className={styles.faq_box}>
                        <div className={styles.faq_header} onClick={() => toggleQuestions('tech', 'arrow6')}>
                            <span>6. Technical Issues</span>
                            <span className="arrow" id="arrow6">▶</span>
                        </div>
                        <div className={styles.questions} id="tech">
                            <div className={styles.question} onClick={() => toggleAnswer('t1', 'qa8')}>
                                <span>I forgot my password. What should I do?</span>
                                <span className={styles.q_arrow} id="qa8">▼</span>
                            </div>
                            <div className={styles.answer} id="t1">
                                Click “Log In” and then “Forgot your password?” to reset it via email.
                            </div>
                        </div>
                    </div>

                    {/* 7. Product Offers */}
                    <div className={styles.faq_box}>
                        <div className={styles.faq_header} onClick={() => toggleQuestions('offers', 'arrow7')}>
                            <span>7. Product Offers</span>
                            <span className="arrow" id="arrow7">▶</span>
                        </div>
                        <div className={styles.questions} id="offers">
                            <div className={styles.question} onClick={() => toggleAnswer('o1', 'qa9')}>
                                <span>How can I access special offers on fitness products?</span>
                                <span className={styles.q_arrow} id="qa9">▼</span>
                            </div>
                            <div className={styles.answer} id="o1">
                                Go to the “Special Offers” section to view and redeem exclusive discounts from our partners.
                            </div>
                        </div>
                    </div>

                    {/* 8. Other */}
                    <div className={styles.faq_box}>
                        <div className={styles.faq_header} onClick={() => toggleQuestions('other', 'arrow8')}>
                            <span>8. Other</span>
                            <span className="arrow" id="arrow8">▶</span>
                        </div>
                        <div className={styles.questions} id="other">
                            <div className={styles.question} onClick={() => toggleAnswer('ot1', 'qa10')}>
                                <span>How do I contact FitHub?</span>
                                <span className={styles.q_arrow} id="qa10">▼</span>
                            </div>
                            <div className={styles.answer} id="ot1">
                                You can reach us via the Contact page or by emailing support@fithub.com.
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br />
                
    </>
  );
};

export default Faq;
