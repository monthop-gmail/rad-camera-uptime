# ใช้ node image ที่เบาและเสถียร
FROM node:18-alpine

# กำหนด working directory ภายใน container
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์โปรเจกต์ทั้งหมด
COPY . .

# กำหนดพอร์ตที่ใช้ใน container
EXPOSE 3000

# สั่งให้รันแอป Express.js
CMD ["npm", "start"]
