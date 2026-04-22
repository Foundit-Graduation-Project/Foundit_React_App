import TypeIt from "typeit-react";

const HoldUpAnimated = () => {
  return (
    <div className="text-2xl font-bold text-slate-900 h-8">
      <TypeIt
        options={{
          waitUntilVisible: true,
          speed: 40, 
          cursor: true,
          loop: false,
        }}
        getBeforeInit={(instance) => {
          instance
            .type("Secure your account")
            .pause(1000)
            .delete(19)
            .pause(500)
            .type("Verify your email address")
            .pause(1000);

          return instance;
        }}
      />
    </div>
  );
};

export default HoldUpAnimated;