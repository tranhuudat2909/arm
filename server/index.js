// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors


const app = express();
const port = 4000;

// Kết nối MongoDB VÀ KẾT NỐI ĐẾN DATABASE VÀO ĐƯỜNG DẪN Ở CUỐI (VD: /ROBOT)
mongoose.connect('mongodb+srv://huudat:Nobita299@atlascluster.lnkfdwu.mongodb.net/ROBOT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Định nghĩa schema cho dữ liệu
const dataSchema = new mongoose.Schema({
  slider1: Number,
  slider2: Number,
  slider3: Number,
  slider4: Number,
});


// ĐẶT TÊN TẠO COLLECTION CHO MONGODB 
//const Data = mongoose.model('Data', dataSchema);
const Data = mongoose.model('data', dataSchema);

app.use(cors()); // Enable CORS
// Sử dụng body-parser để đọc dữ liệu từ request body
app.use(bodyParser.json());

// Handle Preflight Requests
app.options('*', cors());

// Xử lý yêu cầu POST từ React


// app.post('/api/data', async (req, res) => {
//     try {
//       const newData = new Data(req.body);
//       await newData.save();
//       console.log('Data saved to MongoDB:', req.body);
//       res.status(201).json({ message: 'Data saved successfully' });
//     } catch (error) {
//       console.error('Error saving data to MongoDB:', error);
//       res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
//   });

app.post('/api/data', async (req, res) => {
  try {
    const existingData = await Data.findOne();

    if (existingData) {
      // Nếu đã có dữ liệu, cập nhật nó thay vì chèn mới
      await Data.updateOne({}, { $set: req.body });
      console.log('Data updated in MongoDB:', req.body);
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      // Nếu không có dữ liệu, chèn mới
      const newData = new Data(req.body);
      await newData.save();
      console.log('Data saved to MongoDB:', req.body);
      res.status(201).json({ message: 'Data saved successfully' });
    }
  } catch (error) {
    console.error('Error saving/updating data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
