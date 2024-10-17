// ฟังก์ชันดึงรายการกล้องจาก API และแสดงผล
function loadCameras() {
    fetch('/api/cameras')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cameraContainer');
            container.innerHTML = ''; // ล้างกล้องเก่าทั้งหมด

            data.forEach((camera, index) => {
                const cameraElement = document.createElement('div');
                cameraElement.classList.add('camera');
                
                cameraElement.innerHTML = `
                    <h3>${camera.name}</h3>
                    <iframe src="${camera.url}" allowfullscreen></iframe>
                `;

                // <button onclick="deleteCamera(${index})">ลบกล้อง</button>

                container.appendChild(cameraElement);
            });
        })
        .catch(error => console.error('Error:', error));
}

// ฟังก์ชันเพิ่มกล้องใหม่
function addCamera() {
    const name = document.getElementById('cameraName').value;
    const url = document.getElementById('cameraUrl').value;

    if (name && url) {
        fetch('/api/cameras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, url })
        })
        .then(response => response.json())
        .then(() => {
            loadCameras(); // รีเฟรชรายการกล้อง
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('กรุณากรอกชื่อและ URL ของกล้อง');
    }
}

// ฟังก์ชันลบกล้อง
function deleteCamera(index) {
    fetch(`/api/cameras/${index}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        loadCameras(); // รีเฟรชรายการกล้อง
    })
    .catch(error => console.error('Error:', error));
}

// ฟังก์ชันเปลี่ยน layout
function changeLayout(columns) {
    const container = document.getElementById('cameraContainer');
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

// โหลดรายการกล้องเมื่อเปิดหน้าเว็บ
loadCameras();
