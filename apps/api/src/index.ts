const express = require("express");
const app = express();
const port = 3003;
import { UserInput } from "@keyur-gondaliya/common";

app.get("/", (req: any, res: any) => {
  let parsedUser = UserInput.safeParse({ email: "hgdg", password: "fgffg" });
  if (!parsedUser.success) {
    res.send("Incorrect input for harkirat!");
    return;
  }
  res.send("correct input!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
