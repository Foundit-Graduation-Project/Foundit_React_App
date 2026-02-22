import TypeIt from "typeit-react";

const WelcomeText = () => {
  return (
    <div className="text-2xl font-bold text-blue-600">
      <TypeIt
        options={{
          strings: [
            "Lost something?",
            "Found something?",
            "We help you find it.",
          ],
          speed: 50,
          waitUntilVisible: true,
          breakLines: false, // عشان يمسح السطر ويكتب اللي بعده في نفس المكان
          loop: true,
        }}
      />
    </div>
  );
};

export default WelcomeText;
