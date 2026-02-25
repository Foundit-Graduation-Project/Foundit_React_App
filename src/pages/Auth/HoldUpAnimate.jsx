import TypeIt from "typeit-react";

const HoldUpAnimated = () => {
  return (
    <div className="text-2xl font-bold text-slate-800">
      <TypeIt
        options={{
          waitUntilVisible: true,
          speed: 50, // سرعة الكتابة
          cursor: true,
        }}
        getBeforeInit={(instance) => {
          instance
            .type("Hold up!")
            .pause(500) // توقف بسيط للجماليات
            .exec(async () => {
              // الانتظار لمدة ثانيتين (مثلاً لمحاكاة تحميل بيانات)
              await new Promise((resolve) => {
                setTimeout(() => {
                  return resolve();
                }, 2000);
              });
            })
            .type(" OK, now go Verify your email.")
            .pause(1000);

          return instance;
        }}
      />
    </div>
  );
};

export default HoldUpAnimated;
