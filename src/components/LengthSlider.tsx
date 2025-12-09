import { Slider } from "@/components/ui/slider";

interface LengthSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function LengthSlider({ value, onChange }: LengthSliderProps) {
  const getLengthLabel = (val: number) => {
    if (val <= 25) return "Sangat Singkat";
    if (val <= 50) return "Singkat";
    if (val <= 75) return "Sedang";
    return "Detail";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground font-body">
          Panjang Ringkasan
        </label>
        <span className="text-sm font-medium text-primary font-body">
          {getLengthLabel(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        min={10}
        max={100}
        step={5}
        className="cursor-pointer"
      />
      <div className="flex justify-between text-xs text-muted-foreground font-body">
        <span>Singkat</span>
        <span>Detail</span>
      </div>
    </div>
  );
}
