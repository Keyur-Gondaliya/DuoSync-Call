import "./App.css";
import { SignUp } from "@keyur-gondaliya/ui";
import { UserInput } from "@keyur-gondaliya/common";

function App() {
  try {
    console.log(UserInput.safeParse({ email: "yg", password: "gffgfgf" }));
  } catch (error) {
    console.log("f", error);
  }
  return (
    <>
      <SignUp />
    </>
  );
}

export default App;
