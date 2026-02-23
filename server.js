const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const outDir = path.join(__dirname, "out");

app.use(express.static(outDir));

app.get("*", (req, res) => {
  res.sendFile(path.join(outDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
