const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// ใช้เพื่อ parse body ของ request ที่เป็น JSON
app.use(cors())
app.use(express.json());
app.use(express.static('public_iframe'));

// ตัวอย่างข้อมูลกล้องในรูปแบบ JSON
let cameras = [
    {
        "name": "main site (via NVR)",
        "url": "http://159.192.122.86:8888/radnvr_channel_1"
    },
    {
        "name": "เกาะคราม 02 (กล้อง 1)",
        "url": "http://159.192.122.86:8888/raddss_channel_0_camera_1000005"
    },
    {
        "name": "เกาะคราม 02 (กล้อง 2)",
        "url": "http://159.192.122.86:8888/raddss_channel_1_camera_1000005"
    },
    {
        "name": "เกาะจวง 01 (กล้อง 1)",
        "url": "http://159.192.122.86:8888/raddss_channel_0_camera_1000003"
    },
    {
        "name": "เกาะจวง 01 (กล้อง 2)",
        "url": "http://159.192.122.86:8888/raddss_channel_1_camera_1000003"
    },
    {
        "name": "เกาะยอ 02 (กล้อง 1)",
        "url": "http://159.192.122.86:8888/raddss_channel_0_camera_1000002"
    },
    {
        "name": "เกาะยอ 02 (กล้อง 2)",
        "url": "http://159.192.122.86:8888/raddss_channel_1_camera_1000002"
    }
];

// API เพื่อส่งข้อมูลกล้องทั้งหมด
app.get('/api/cameras', (req, res) => {
    res.json(cameras);
});

// API เพื่อเพิ่มกล้องใหม่
app.post('/api/cameras', (req, res) => {
    const newCamera = req.body;
    cameras.push(newCamera);
    res.status(201).json({ message: 'กล้องถูกเพิ่มแล้ว', camera: newCamera });
});

// API เพื่อแก้ไขข้อมูลกล้อง
app.put('/api/cameras/:index', (req, res) => {
    const index = req.params.index;
    const updatedCamera = req.body;

    if (cameras[index]) {
        cameras[index] = updatedCamera;
        res.json({ message: 'กล้องถูกแก้ไขแล้ว', camera: updatedCamera });
    } else {
        res.status(404).json({ message: 'ไม่พบกล้องนี้' });
    }
});

// API เพื่อลบกล้อง
app.delete('/api/cameras/:index', (req, res) => {
    const index = req.params.index;

    if (cameras[index]) {
        const deletedCamera = cameras.splice(index, 1);
        res.json({ message: 'กล้องถูกลบแล้ว', camera: deletedCamera });
    } else {
        res.status(404).json({ message: 'ไม่พบกล้องนี้' });
    }
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
