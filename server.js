const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Koneksi MongoDB
mongoose.connect('mongodb://localhost:27017/namaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema
const NamaSchema = new mongoose.Schema({ nama: String });
const Nama = mongoose.model('Nama', NamaSchema);

// Route API
app.post('/api/nama', async (req, res) => {
  const data = new Nama({ nama: req.body.nama });
  await data.save();
  res.send('Nama berhasil disimpan!');
});

// Tambahkan ini sebelum app.listen
app.get('/api/nama', async (req, res) => {
  const daftarNama = await Nama.find(); // ambil semua data
  res.json(daftarNama); // kirim sebagai JSON
});

// Start server
app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});
