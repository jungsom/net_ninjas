import styled from 'styled-components';
import React, { useState, useEffect } from 'react';


function ScrollTriggerDemo() {
    const [visibleSections, setVisibleSections] = useState({});
    const sections = ['target1', 'target2', 'target3'];

    const handleScroll = () => {
      const updatedVisibleSections = {};
      sections.forEach(section => {
        const targetSection = document.getElementById(section);
        const position = targetSection.getBoundingClientRect();
  
        if (position.top + 100 < window.innerHeight && position.bottom >= 0) // + 100 은 임의값
          updatedVisibleSections[section] = true;
         else 
          updatedVisibleSections[section] = false;
      });
      setVisibleSections(updatedVisibleSections);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
            return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);    

  return (
    <StyledCenterLayout>
      <StyledContent>
        <h2>스크롤 트리거 데모</h2>

        <div id='target1' style={{height:window.innerHeight}} className={`${(visibleSections['target1'] ? 'visible' : 'hidden')}`} />
        <div id='target2' style={{height:window.innerHeight}} className={`${(visibleSections['target2'] ? 'visible' : 'hidden')}`} />
        <div id='target3' style={{height:window.innerHeight}} className={`${(visibleSections['target3'] ? 'visible' : 'hidden')}`}/>

      </StyledContent>
    </StyledCenterLayout>
  );
}

const StyledCenterLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContent = styled.div`
  h2 {
    margin-top: 30px;
    text-align: center;
  }

   display: flex;
    flex-direction: column;
    gap: 100px;


    #target1, #target2, #target3{
        width:100%;
    }

    #target1{
        background-color:red;
    }

    #target2{
        background-color:yellow;
    }

    #target3{
        background-color:green;
    }


    .hidden {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 1s, transform 1s;
    }

    .visible {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 1s, transform 1s;
    }    
`;

export default ScrollTriggerDemo;
