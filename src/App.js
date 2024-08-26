import React, { useState, useEffect } from 'react';
import { CardLooper } from './Components/CardComponents/CardLooper.tsx';
import Akkordeon from './Components/Akkordeon/Akkordeon.tsx';
import { ABCrollBar } from './Components/ABCrollBar/ABCrollBar.tsx';
import { SampleDataProvider } from './Context/SampleDataProvider.tsx';
import './css/basic.css';

function App() {

  const [isIPhoneVisible, setIPhoneVisible] = useState(window.innerWidth >= 550);

  useEffect(() => {
    const handleResize = () => {
      setIPhoneVisible(window.innerWidth >= 550);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  const akkordeon_structure = [
    {
      tabname: "Europe",
      checkboxes: [
        "Turkey", "United Kingdom", "France", "Spain"
      ]
    },
    {
      tabname: "Asia",
      checkboxes: [
        "Japan", "Thailand", "India", "South Korea"
      ]
    },
    {
      tabname: "America",
      checkboxes: [
        "United States", "Canada", "Mexico"
      ]
    },
  ]

  return (
    <div className="App">
     
          <SampleDataProvider>
            <main>
              <div className='left-main-row'>
                <Akkordeon structure={akkordeon_structure} />
                <CardLooper />
              </div>
              <div className='right-main-row'>
                <ABCrollBar />
              </div>
            </main>
        </SampleDataProvider>
    </div>
  );
}

export default App;