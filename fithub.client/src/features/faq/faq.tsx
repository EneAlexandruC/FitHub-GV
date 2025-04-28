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
                    {/* 2.1 General Questions */}
                    <div className= {styles.faq_box}>
                        <div className= {styles.faq_header} onClick={() => toggleQuestions('general', 'arrow1')}>
                            <span>2.1 General Questions</span>
                            <span className="arrow" id="arrow1">▶</span>
                        </div>
                        <div className= {styles.questions} id="general">
                            <div className= {styles.question} onClick = {() => toggleAnswer('g1', 'qa1')}>
                            <span>How do I create an account?</span>
                            <span className={styles.q_arrow} id="qa1">▼</span>
                            </div>
                            <div className={styles.answer} id="g1">
                            Hi,<br />
                            After accessing our website, FitHub, please click on “Sign Up” in the top right corner. There, you will enter the necessary details to create an account, such as: First Name, Last Name, Email, Password, Confirm Password, Weight, Height, and Date. Once you've filled in each field, you can click the “Submit” button. That’s how you create an account—quick and easy!
                            </div>

                            <div className={styles.question} onClick = {() => toggleAnswer('g2', 'qa2')}>
                            <span>How do I reset my password? / What should I do if I forgot my password?</span>
                            <span className={styles.q_arrow} id="qa2">▼</span>
                            </div>
                            <div className={styles.answer} id="g2">
                            Hi,<br />
                            After accessing the FitHub website, click on “Log In” in the top right corner. Then, click on “Forgot your password?”.
                            </div>
                        </div>
                    </div>

                    {/* 2.2 Questions About Training Programs */}
                    <div className={styles.faq_box}>
                    <div className={styles.faq_header} onClick={() => toggleQuestions('training', 'arrow2')}>
                        <span>2.2 Questions About Training Programs</span>
                        <span className={styles.arrow} id="arrow2">▶</span>
                    </div>
                    <div className={styles.questions} id="training">
                        <div className={styles.question} onClick={() => toggleAnswer('t1', 'qa3')}>
                        <span>What workouts do you offer?</span>
                        <span className={styles.q_arrow} id="qa3">▼</span>
                        </div>
                        <div className={styles.answer} id="t1">
                        Hi,<br />
                        At the moment, if you go to the “Workouts” section, you will find two training programs: “Full Body Strength” and “HIIT Cardio”.
                        </div>

                        <div className={styles.question} onClick={() => toggleAnswer('t2', 'qa4')}>
                        <span>Are there short workout options?</span>
                        <span className={styles.q_arrow} id="qa4">▼</span>
                        </div>
                        <div className={styles.answer} id="t2">
                        Hi,<br />
                        Yes, we also offer 10–15 minute workouts, perfect for busy days.
                        </div>

                        <div className={styles.question} onClick={() => toggleAnswer('t3', 'qa5')}>
                        <span>How can I become a premium member and what are the benefits?</span>
                        <span className={styles.q_arrow} id="qa5">▼</span>
                        </div>
                        <div className={styles.answer} id="t3">
                        Hi,<br />
                        The benefits you can enjoy include:<br />
                        • Personalized workout plans<br />
                        • Progress tracking<br />
                        • Unlimited access to all programs
                        </div>
                    </div>
                    </div>
                    </div>

                    {/* 2.3 Questions About Safety and Privacy */}
                    <div className={styles.faq_box}>
                    <div className={styles.faq_header} onClick={() => toggleQuestions('privacy', 'arrow3')}>
                        <span>2.3 Questions About Safety and Privacy</span>
                        <span className={styles.arrow} id="arrow3">▶</span>
                    </div>
                    <div className={styles.questions} id="privacy">
                        <div className={styles.question} onClick={() => toggleAnswer('p1', 'qa6')}>
                        <span>Is my personal data protected?</span>
                        <span className={styles.q_arrow} id="qa6">▼</span>
                        </div>
                        <div className={styles.answer} id="p1">
                        Hi,<br />
                        Yes, we comply with all privacy and data protection standards.
                        </div>
                    </div>
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br />
                
    </>
  );
};

export default Faq;
