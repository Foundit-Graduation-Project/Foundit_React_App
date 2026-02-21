import { Switch } from "@/components/ui/switch";

export function RightPanel() {
  return (
    <aside className="hidden xl:flex flex-col w-73 border-l border-border p-6 gap-7 overflow-y-auto bg-background shrink-0">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
        <h3 className="font-bold text-sm mb-2 relative z-10">Pro Tip</h3>
        <p className="text-[12.5px] text-blue-100 mb-4 relative z-10 leading-relaxed">
          Enable mobile push notifications to get instant alerts when a match is found near you.
        </p>
        <button className="w-full bg-white text-blue-600 rounded-lg py-2 text-[13px] font-semibold hover:bg-blue-50 transition-colors relative z-10">
          Enable Mobile Alerts
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-[12.5px] uppercase tracking-wide text-muted-foreground mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-muted-foreground">Email Updates</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-muted-foreground">Match Alerts</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-muted-foreground">Community News</span>
            <Switch />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-[12.5px] uppercase tracking-wide text-muted-foreground mb-4">
          Activity This Week
        </h3>
        {/* Map here also */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="border border-border rounded-xl p-3.5 bg-background">
            <div className="text-[26px] font-bold tracking-tight">12</div>
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">Alerts</div>
          </div>
          <div className="border border-border rounded-xl p-3.5 bg-background">
            <div className="text-[26px] font-bold tracking-tight">3</div>
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">Matches</div>
          </div>
        </div>
      </div>
    </aside>
  );
}