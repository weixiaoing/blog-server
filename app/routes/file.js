const express = require("express");
const router = express.Router();
const multer = require("multer");
const fse = require("fs-extra");
const path = require("path");
// file upload
const uploadPath = "./uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  const { hash, index } = req.body;
  let tempFileDir = path.resolve("uploadFiles", hash);
  // 如果当前文件的临时文件夹不存在，则创建该文件夹
  if (!fse.pathExistsSync(tempFileDir)) {
    fse.mkdirSync(tempFileDir);
  }
  // 如果无临时文件夹或不存在该切片，则将用户上传的切片移到临时文件夹里
  // 如果有临时文件夹并存在该切片，则删除用户上传的切片（因为用不到了）
  // 目标切片位置
  const tempChunkPath = path.resolve(tempFileDir, index);
  // 当前切片位置（multer默认保存的位置）
  let currentChunkPath = path.resolve(req.file.path);
  if (!fse.existsSync(tempChunkPath)) {
    fse.moveSync(currentChunkPath, tempChunkPath);
  } else {
    fse.removeSync(currentChunkPath);
  }
  res.send({
    msg: "上传成功",
    success: true,
  });
});

router.get("/merge", async (req, res) => {
  const { hash, name } = req.query;
  // 最终合并的文件路径
  const filePath = path.resolve("uploadFiles", hash + path.extname(name));
  // 临时文件夹路径
  let tempFileDir = path.resolve("uploadFiles", hash);
  // 读取临时文件夹，获取所有切片
  const chunkPaths = fse.readdirSync(tempFileDir);
  console.log("chunkPaths：", chunkPaths);
  let mergeTasks = [];
  for (let index = 0; index < chunkPaths.length; index++) {
    mergeTasks.push(
      new Promise((resolve) => {
        // 当前遍历的切片路径
        const chunkPath = path.resolve(tempFileDir, index + "");
        // 将当前遍历的切片切片追加到文件中
        fse.appendFileSync(filePath, fse.readFileSync(chunkPath));
        // 删除当前遍历的切片
        fse.unlinkSync(chunkPath);
        resolve();
      })
    );
  }
  await Promise.all(mergeTasks);
  // 等待所有切片追加到文件后，删除临时文件夹
  fse.removeSync(tempFileDir);

  res.send({
    msg: "合并成功",
    success: true,
  });
});

module.exports = router;
