import TypeIt from "typeit-react";

const StartHeroText = () => {
  return (
    <div className="text-2xl font-bold text-white">
      <TypeIt
        options={{
          waitUntilVisible: true,
          speed: 50,
          cursor: true,
        }}
        getBeforeInit={(instance) => {
          instance
            .type(
              "The all-in-one community safety platform for lost items, emergency",
            )
            .pause(500)
            .exec(async () => {
              await new Promise((resolve) => {
                setTimeout(() => {
                  return resolve();
                }, 2000);
              });
            })
            .type("")
            .type(
              "alerts, and social service. Designed to bring peace of mind back",
            )
            .type("to your neighborhood.")
            .pause(1000);

          return instance;
        }}
      />
    </div>
  );
};

export default StartHeroText;
