// SliderForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SliderForm = () => {
  const [sliderValues, setSliderValues] = useState({
    slider1: 0,
    slider2: 0,
    slider3: 0,
    slider4: 0,
  });

  const handleSliderChange = (slider, value) => {
    setSliderValues({ ...sliderValues, [slider]: value });
  };

  // src/components/SliderForm.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu lên server
     // await axios.post('http://localhost:4000/api/data', sliderValues);
      await axios.post('https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-zsywh/endpoint/person', sliderValues);
      console.log('Data sent to MongoDB:', sliderValues);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Slider 1</label>
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValues.slider1}
          onChange={(e) => handleSliderChange('slider1', e.target.value)}
        />
         <p>GIA TRI THANH TRƯỢT: {sliderValues.slider1}</p>
      </div>
      <div>
        <label>Slider 2</label>
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValues.slider2}
          onChange={(e) => handleSliderChange('slider2', e.target.value)}
        />
        <p>GIA TRI THANH TRƯỢT: {sliderValues.slider2}</p>
      </div>
      <div>
        <label>Slider 3</label>
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValues.slider3}
          onChange={(e) => handleSliderChange('slider3', e.target.value)}
        />
        <p>GIA TRI THANH TRƯỢT: {sliderValues.slider3}</p>
      </div>
      <div>
        <label>Slider 4</label>
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValues.slider4}
          onChange={(e) => handleSliderChange('slider4', e.target.value)}
        />
        <p>GIA TRI THANH TRƯỢT: {sliderValues.slider4}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SliderForm;
