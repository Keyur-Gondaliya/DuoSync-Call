"use client";
import { UserInput } from "common";
import { SignUp } from "@keyur-gondaliya/ui";
export default function Home() {
  try {
    console.log(UserInput.parse({ email: "ghf", password: "gffgfgf" }));
  } catch (error) {
    console.log("f", error);
  }

  return (
    <>
      <SignUp />
    </>
  );
}
